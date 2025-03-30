import { UserService } from '#services/user_service'
import type { HttpContext } from '@adonisjs/core/http'


export default class LoginController {

  async show({ inertia }: HttpContext) {
    return inertia.render('auth/login')
  }


  async handle({ auth, request, response, session }: HttpContext) {
    const email = request.input('email')
    const password = request.input('password')
    const nextPath = request.input('next')

    try {
      const user = await UserService.verifyCredentials(email, password)

      if (!user) {
        session.flash('errors.auth', 'Invalid credentials')
        return response.redirect().toPath('auth/sign_in')
      }

      await auth.use('web').login(user)

      if (nextPath) {
        return response.redirect().toPath(nextPath)
      }

      return response.redirect().toPath('/')
    } catch {
      session.flash('errors.auth', 'Invalid credentials')
      let redirectPath = `/auth/sign_in`
      if (nextPath) {
        redirectPath += `?next=${nextPath}`
      }
      return response.redirect().toPath(redirectPath)
    }
  }


}
