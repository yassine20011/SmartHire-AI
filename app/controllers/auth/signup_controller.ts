import type { HttpContext } from '@adonisjs/core/http'
import vine from '@vinejs/vine'
import { UserService } from '#services/user_service'
import { info } from 'node:console'
import User from '#models/user'

export default class SignupController {
  async show({ inertia, request }: HttpContext) {
    const type = request.input('type', 'candidate')
    return inertia.render('auth/signup', { type })
  }

  async handle({ auth, request, response, session }: HttpContext) {
    const schema = vine.object({
      firstName: vine.string().trim().minLength(2).maxLength(255),
      lastName: vine.string().trim().minLength(2).maxLength(255),
      email: vine
        .string()
        .email()
        .trim()
        .normalizeEmail()
        .unique(async (_db, value) => {
          const userFoundByEmail = await UserService.findByEmail(value)
          return !userFoundByEmail
        }),
      password: vine.string().minLength(8),
      terms: vine.boolean(),
      role: vine.enum(['recruiter', 'candidate']),
      companyName: vine.string().trim().maxLength(255).optional(),
    })

    const validator = vine.compile(schema)
    const playload = await request.validateUsing(validator)
    info('schema', playload)

    try {
      const user = await UserService.findByEmail(playload.email)
      if (user) {
        session.flash('error', 'Email déjà utilisé')
        return response.redirect().back()
      }
    } catch (error) {
      session.flash('error', error.message)
      return response.redirect().back()
    }

    const user = await User.create({
      first_name: playload.firstName,
      last_name: playload.lastName,
      email: playload.email,
      password: playload.password,
      role: playload.role,
    })

    const role = playload.role.toLowerCase()

    if (role === 'candidate') {
      const candidate = await user.related('candidate').create({})
      candidate.user_id = user.user_id
    } else if (role === 'recruiter') {
      const recruiter = await user.related('recruiter').create({
        company_name: playload.companyName,
      })
      recruiter.user_id = user.user_id
    } else {
      session.flash('error', 'Erreur lors de la création du compte')
      return response.redirect().back()
    }

    await auth.use('web').login(user)
    session.flash('success', 'Inscription réussie')
    return response.redirect().toPath(`dashboard/${role}`)
  }
}
