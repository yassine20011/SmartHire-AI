import Job from '#models/job'
import db from '@adonisjs/lucid/services/db'
import Candidate from '#models/candidate'

export class JobService {
  /**
   * Get a job by ID
   */
  static async getJobById(jobId: number): Promise<Job | null> {
    try {
      return await Job.findOrFail(jobId)
    } catch (error) {
      console.error('Error fetching job:', error)
      return null
    }
  }

  /**
   * Get recommended jobs based on candidate embedding
   */
  static async getRecommendedJobs(candidate: Candidate, limit: number = 10): Promise<Job[]> {
    try {

      if (!candidate) {
        console.error(`Candidate is null or undefined`)
        return []
      }

      if (!candidate.embedding) {
        console.error(`No embedding found for candidate ID: ${candidate.candidateId}`)
        return await this.getRecentJobs(limit)
      }


      let embedding
      try {
        if (candidate.embedding.startsWith('[') && candidate.embedding.endsWith(']')) {
          embedding = JSON.parse(candidate.embedding)
        } else if (candidate.embedding.startsWith('{') && candidate.embedding.endsWith('}')) {
          embedding = candidate.embedding.replace(/^\{|\}$/g, '').split(',').map(Number)
        } else {
          embedding = candidate.embedding.split(',').map(Number)
        }
      } catch (parseError) {
        console.error('Error parsing embedding:', parseError)
        console.error('Raw embedding string:', candidate.embedding)
        return await this.getRecentJobs(limit)
      }


      const vectorString = JSON.stringify(embedding)

      const query = `
        SELECT j.*,
               (1 - (j.embedding <=> '${vectorString}'::vector)) AS similarity
        FROM jobs j
        WHERE j.embedding IS NOT NULL
        ORDER BY similarity DESC
        LIMIT ${limit}
      `


      const jobs = await db.rawQuery(query)

      console.log(`Query returned ${jobs.rows.length} jobs`)

      if (jobs.rows.length === 0) {
        console.log('No matching jobs found, checking query execution...')
        const testQuery = `
          SELECT COUNT(*)
          FROM jobs
          WHERE embedding IS NOT NULL
        `
        const testResult = await db.rawQuery(testQuery, [])
        console.log(`Total jobs with embeddings: ${testResult.rows[0].count}`)
      }

      return jobs.rows.map((job: any) => {
        const jobModel = new Job()
        Object.assign(jobModel, job)
        return jobModel
      })
    } catch (error) {
      console.error('Error fetching recommended jobs:', error)
      return this.getRecentJobs(limit) // Fall back to recent jobs on error
    }
  }

  /**
   * Get recent jobs
   */
  static async getRecentJobs(limit: number = 10): Promise<Job[]> {
    try {
      return await Job.query()
        .orderBy('createdAt', 'desc')
        .limit(limit)
    } catch (error) {
      console.error('Error fetching recent jobs:', error)
      return []
    }
  }

  /**
   * Create a new job
   */
  static async createJob(data: Partial<Job>): Promise<Job> {
    try {
      const job = await Job.create(data)
      return job
    } catch (error) {
      console.error('Error creating job:', error)
      throw new Error('Failed to create job')
    }
  }
}
