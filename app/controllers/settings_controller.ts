import type { HttpContext } from '@adonisjs/core/http'
import vine from '@vinejs/vine'
import { UserService } from '#services/user_service'
import { CandidateService } from '#services/candidate_service'
import drive from '@adonisjs/drive/services/main'
import { cuid } from '@adonisjs/core/helpers'
import queue from '@rlanz/bull-queue/services/main';
import env from '#start/env'
import CvProcessingJob from '#jobs/cv_processing_job'
import fs from 'node:fs';

export default class SettingsController {

  async show({ inertia, auth }: HttpContext) {

    const user = auth.user!
    const candidate = await CandidateService.getCandidateByuserId(user.userId)
    if(!candidate?.resumeUrl){
      return inertia.render('settings', {
        errors: {
          resumeUrl: null,
        },
      })
    }

    const publicUrl = await drive.use('s3').getSignedUrl(candidate.resumeUrl, {
      expiresIn: '1h',
      contentType: 'application/pdf',
    })

    return inertia.render('settings', {
      resumeUrl: publicUrl,
    })
  }

  async patch({auth, request, response, session, inertia }: HttpContext) {

    const user = auth.user

    if (!user) {
      return response.status(401).json({ message: 'Unauthorized' })
    }

    const schema = vine.object({
      firstName: vine.string().trim().minLength(2).maxLength(255),
      lastName: vine.string().trim().minLength(2).maxLength(255),
      email: vine.string().email().trim().normalizeEmail(),
      phone: vine.string().optional(),
      location: vine.string().optional(),
      bio: vine.string().optional(),
      jobTitle: vine.string().optional(),
    })

    const validator = vine.compile(schema)

    const payload = await request.validateUsing(validator)
    const AlreadyinUse = await UserService.findByEmail(payload.email)

    if (AlreadyinUse && AlreadyinUse.userId !== user.userId) {
      session.flash('flash', 'Email already in use')
      return inertia.render('settings', {
        errors: {
          email: 'Email already in use',
        },
      })
    }

    try {
      await UserService.updateUser(user.userId, payload)
      session.flash('success', 'Profile updated successfully')
    } catch (error) {
      session.flash('error', 'Error updating profile')
    }

    return inertia.render('settings', {
      errors: {},
    })
  }


  async uploadResume({ auth, request, response, session, inertia}: HttpContext)
  {
    const user = auth.user

    if (!user) {
      return response.status(401).json({ message: 'Unauthorized' })
    }

    const schema = vine.object({
      resume: vine.file({
        size: '5mb',
        extnames: ['pdf', 'doc', 'docx'],
      }),
    })

    const validator = vine.compile(schema)

    const payload = await request.validateUsing(validator)

    const resume = payload.resume


    const fileName = `${cuid()}.${resume.extname}`
    const s3Key = fileName;

    try {
        await drive.use('s3').putStream(`${env.get('S3_BUCKET')}/${s3Key}`, fs.createReadStream(resume.tmpPath!), {
          contentType: resume.type,
          visibility: 'public',
        })
        console.log('File uploaded to S3:', env.get('AWS_ENDPOINT'), `Bucket: ${env.get('S3_BUCKET')}`, `Key: ${s3Key}`)
    } catch (uploadError) {
        console.error('Error uploading file to S3:', uploadError);
        session.flash('error', 'Failed to upload resume to storage.');
        return inertia.render('settings', {
          errors: {
            resumeUrl: 'Failed to upload resume to storage.',
          },
        })
    }

    await user.load('candidate')

    if (!user.candidate) {
      session.flash('error', 'Candidate information not found')
      return response.status(400).json({
        error: 'Candidate information not found'
      })
    }

    await queue.dispatch(CvProcessingJob, {
      candidateId: user.candidate.candidateId,
      key: `${env.get('S3_BUCKET')}/${s3Key}`,
    })

    session.flash('success', 'Resume uploaded successfully')
    return inertia.render('settings', {
      errors: {},
      resumeUrl: `${env.get('AWS_ENDPOINT')}/${s3Key}`,
    })
  }
}
