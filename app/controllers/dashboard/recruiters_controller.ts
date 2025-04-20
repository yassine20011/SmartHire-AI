import type { HttpContext } from '@adonisjs/core/http'

export default class DashboardRecruitersController {

   async show({ inertia }: HttpContext) {
      return inertia.render('dashboard/recruiter', {
          title: 'Recruiters'
      })
    }


}
