import type { HttpContext } from '@adonisjs/core/http'

export default class DashboardCandidatesController {

  async show({ inertia }: HttpContext) {
    return inertia.render('dashboard/candidat', {
      title: 'Candidates'
    })
  }

}
