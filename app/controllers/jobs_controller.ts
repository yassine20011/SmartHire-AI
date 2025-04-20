import type { HttpContext } from '@adonisjs/core/http'

export default class JobsController {

  async show({ inertia }: HttpContext) {
    return inertia.render('jobs', {
      title: 'Jobs',
      description: 'Explore job opportunities and find your dream job.',
    })
  }

}
