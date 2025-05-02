import type { HttpContext } from '@adonisjs/core/http'

export default class JobsController {
  async index({ auth, inertia }: HttpContext) {
    const user = auth.user

    if (user) {
      if (user.role === 'candidate') {
        return inertia.render('dashboard/candidates')
      }
      if (user.role === 'recruiter') {
        return inertia.render('dashboard/recruiters')
      }
    }

    return inertia.render('home')
  }
}
