import { Job } from '@rlanz/bull-queue'
import env from '#start/env'
import { CandidateService } from '#services/candidate_service'
import Candidate from '#models/candidate'
import fs from 'fs'
import os from 'os'
import path from 'path'
import FormData from 'form-data'
import axios from 'axios'
import drive from '@adonisjs/drive/services/main'
import { pipeline } from 'stream/promises'
import { UserService } from '#services/user_service'


export interface CvProcessingJobPayload {
  candidateId: number
  key: string
}




export default class CvProcessingJob extends Job {
  // This is the path to the file that is used to create the job
  static get $$filepath() {
    return import.meta.url
  }

  /**
   * Base Entry point
   */
  async handle(payload: CvProcessingJobPayload) {
    const { candidateId, key } = payload
    console.log(`Processing job for candidateId: ${candidateId}, key: ${key}`)
    const candidate = await Candidate.find(candidateId)

    if (!candidate) {
      throw new Error('Candidate not found')
    }

    const api = env.get('AI_MODEL_ENDPOINT')
    const tempFilePath = path.join(os.tmpdir(), `cv-${Date.now()}-${path.basename(key)}`)

    try {
      let s3Metadata
      try {
        s3Metadata = await drive.use('s3').getMetaData(key)
        console.log(`S3 Metadata for key ${key}:`, s3Metadata)
        if (!s3Metadata.contentLength || s3Metadata.contentLength < 1024) {
          throw new Error(
            `S3 object size is suspiciously small (${s3Metadata.contentLength} bytes) for key: ${key}. Upload might be corrupted.`
          )
        }
      } catch (s3Error) {
        console.error(`Failed to get S3 metadata for key ${key}:`, s3Error)
        throw new Error(
          `Failed to access S3 object metadata for key: ${key}. Error: ${s3Error.message}`
        )
      }

      const fileStream = await drive.use('s3').getStream(key)
      const writeStream = fs.createWriteStream(tempFilePath)

      await pipeline(fileStream, writeStream)
      console.log('File downloaded successfully to:', tempFilePath)

      const stats = fs.statSync(tempFilePath)
      if (!fs.existsSync(tempFilePath) || stats.size === 0) {
        if (fs.existsSync(tempFilePath)) fs.unlinkSync(tempFilePath)
        throw new Error(
          `Temporary file not found or is empty at: ${tempFilePath} despite successful download claim.`
        )
      }

      const fileBuffer = fs.readFileSync(tempFilePath)

      const formData = new FormData()
      formData.append('file', fileBuffer, {
        filename: path.basename(key),
        contentType: 'application/pdf',
      })

      const headers = formData.getHeaders()

      const apiResponse = await axios.post(`${api}/process-cv`, formData, {
        headers: headers,
        maxBodyLength: 5 * 1024 * 1024,
        maxContentLength: 5 * 1024 * 1024,
      })

      const data = apiResponse.data
      console.log('API Response Status:', apiResponse.status)
      console.log('API Response Data:', data)
      candidate.parsedResume = data

      const skills = data?.skills
      if (!skills || !Array.isArray(skills) || skills.length === 0) {
        console.warn(
          'No skills found in parsed resume or skills array is empty. Skipping embedding step.'
        )
      } else {
        console.log(`Found skills: ${skills.join(', ')}. Fetching embeddings...`)
        try {
          const embeddingResponse = await axios.post(
            `${api}/embeddings?text=${encodeURIComponent(skills.join(','))}`,
            {},
            {
              headers: {
                'Content-Type': 'application/json',
              },
            }
          )
          if (!embeddingResponse.data || !embeddingResponse.data) {
            throw new Error('Embedding API response did not contain embeddings data.')
          }
          const embedding = embeddingResponse.data

          const formattedEmbedding = `[${embedding.join(',')}]`

          await CandidateService.updateCandidate(candidateId, {
            parsedResume: data,
            embedding: formattedEmbedding,
            resumeUrl: key,
          })

          const user  = await UserService.updateUser(candidate.userId, {
            firstName: data.name.split(' ')[0],
            lastName: data.name.split(' ').slice(1).join(' '),
            jobTitle: data.jobTitle,
            phone: data.phone,
            location: data.location,
            bio: data.bio,
          })

          if (!user) {
            throw new Error('Failed to update user information.')
          }

          console.log('Embeddings fetched and saved successfully.')
        } catch (error) {
          if (axios.isAxiosError(error) && error.response) {
            console.error('Error fetching embedding:', error.response.data)
          } else {
            console.error('Error fetching embedding:', error.message)
          }
          throw new Error('Failed to fetch embeddings from API.')
        }
      }

      await candidate.save()
    } catch (error) {
      console.error('Error processing CV:', error)
      throw error
    } finally {
      if (fs.existsSync(tempFilePath)) {
        try {
          fs.unlinkSync(tempFilePath)
        } catch (err) {}
      }
    }
  }

  /**
   * This is an optional method that gets called when the retries has exceeded and is marked failed.
   */
  async rescue(payload: CvProcessingJobPayload) {}
}
