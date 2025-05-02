import { UserService } from '#services/user_service'
import type { HttpContext } from '@adonisjs/core/http'
import vine from '@vinejs/vine'

export default class LoginController {
  async show({ inertia }: HttpContext) {
    return inertia.render('auth/login')
  }

  async handle({ auth, request, response, session }: HttpContext) {
    const schema = vine.object({
      email: vine.string().email().trim().normalizeEmail(),
      password: vine.string().minLength(8),
      nextPath: vine.string().optional(),
    })

    const { email, password, nextPath } = await request.validateUsing(vine.compile(schema))

    try {
      const user = await UserService.verifyCredentials(email, password)

      if (!user) {
        session.flashMessages.set('errors', {
          email: 'Invalid credentials',
          password: 'Invalid credentials',
        })
        session.flash('flash', 'Invalid credentials')

        return response.redirect().toPath('sign_in')
      }

      await auth.use('web').login(user)

      if (nextPath) {
        return response.redirect().toPath(nextPath)
      }

      return response.redirect().toPath('/')
    } catch {
      session.flash('flash', 'Invalid credentials')
      return response.redirect().toPath('sign_in')
    }
  }
}
