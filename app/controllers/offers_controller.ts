import type { HttpContext } from '@adonisjs/core/http'
import { JobService } from '#services/job_service'
import { CandidateService } from '#services/candidate_service'
export default class OffersController {
  async show({ inertia, auth }: HttpContext) {
    const user = auth.user

    try {
      let recommendedJobs = []

      if (user && user.role === 'candidate' && user.candidate) {
        const candidate = await CandidateService.getCandidateByuserId(user.userId)
        if (!candidate) {
          console.error(`No candidate found for user ID: ${user.userId}`)
          return inertia.render('offers', {
            title: 'Offers',
            recommendedJobs: [],
          })
        }

        recommendedJobs = await JobService.getRecommendedJobs(candidate, 20)
      } else {
        recommendedJobs = await JobService.getRecentJobs(20)
      }

      return inertia.render('offers', {
        title: 'Offers',
        recommendedJobs: recommendedJobs,
      })
    } catch (error) {
      console.error('Error loading offers:', error)
      return inertia.render('offers', {
        title: 'Offers',
        recommendedJobs: [],
      })
    }
  }

  async handle({ inertia }: HttpContext) {
    return inertia.render('offers/new', {
      title: 'Create Offer',
    })
  }
}
