import type { HttpContext } from '@adonisjs/core/http'
import vine from '@vinejs/vine'
import drive from '@adonisjs/drive/services/main'
import { cuid } from '@adonisjs/core/helpers'

export default class DashboardCandidatesController {

  async show({ inertia }: HttpContext) {
    return inertia.render('dashboard/candidate', {
      title: 'Candidates'
    })
  }

  async uploadResume({ auth, request, response, session }: HttpContext)
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
    const fileName = `${user.userId}-${cuid()}.${resume.extname}`
    const filePath = `resumes/${fileName}`
    await drive.use('s3').put(filePath, resume.tmpPath!, {
      contentType: resume.type,
      visibility: 'public',
    })

    session.flash('success', 'Resume uploaded successfully')
    return response.status(200).json({
      message: 'Resume uploaded successfully',
      filePath: filePath,
    })
  }


}
