import type { HttpContext } from '@adonisjs/core/http'
import { CandidateService } from '#services/candidate_service'
import { JobService } from '#services/job_service'
export default class DashboardCandidatesController {

  async show({ inertia, auth }: HttpContext) {
    const user = auth.user

    if (!user) {
      // If no user is authenticated, render the page without recommended jobs
      return inertia.render('dashboard/candidate', {
        title: 'Candidates',
        skills: []
      })
    }

    const skills = await CandidateService.getSkills(user.userId)
    const candidate = await CandidateService.getCandidateByuserId(user.userId)

    if (!candidate) {
      console.error(`No candidate found for user ID: ${user.userId}`)
      return inertia.render('dashboard/candidate', {
        title: 'Candidates',
        skills: skills,
        recommendedJobs: []
      })
    }

    console.log(`Found candidate with ID: ${candidate.candidateId} for user: ${user.userId}`)

    // Get recommended jobs using the candidate's ID, not the user ID
    const jobs = await JobService.getRecommendedJobs(candidate, 3)

    // Log for debugging
    console.log(`Recommended jobs count: ${jobs.length}`)
    if (jobs.length === 0) {
      console.log('No recommended jobs found, check embeddings in database')
    }

    return inertia.render('dashboard/candidate', {
      title: 'Candidates',
      skills: skills,
      recommendedJobs: jobs
    })
  }
}
