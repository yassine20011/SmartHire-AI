import type { HttpContext } from '@adonisjs/core/http'
import vine from '@vinejs/vine'
import { UserService } from '#services/user_service'

export default class SignupController {
  async show({ inertia }: HttpContext) {
    return inertia.render('auth/signup')
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
      role: vine.enum(['Recruiter', 'Candidate']),
    })

    const validator = vine.compile(schema)
    const playload = await request.validateUsing(validator)
    const userAlreadyExists = await UserService.findByEmail(playload.email)
    if (userAlreadyExists) {
      session.flash('erreur', 'Email déjà utilisé')
      return response.redirect().back()
    }

    const user = await UserService.createUser({
      firstName: playload.firstName,
      lastName: playload.lastName,
      email: playload.email,
      password: playload.password,
      role: 'Candidate',
    })
  }
}
