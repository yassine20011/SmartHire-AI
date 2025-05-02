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

    console.log('Email:', email)
    console.log('Password:', password)
    console.log('Next Path:', nextPath)

    try {
      const user = await UserService.verifyCredentials(email, password)
      console.log('User:', user)

      if (!user) {
        session.flash('flash', 'Credentials do not match')
        return response.redirect().toPath('/login')
      }

      await auth.use('web').login(user)

      if (nextPath) {
        return response.redirect().toPath(nextPath)
      }

      return response.redirect().toPath('/')
    } catch {
      session.flash('flash', 'Credentials do not match')
      return response.redirect().toPath('/login')
    }
  }
}
