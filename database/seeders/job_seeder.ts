import { BaseSeeder } from '@adonisjs/lucid/seeders'
import { UserFactory } from '#database/factories/user_factory'
import { RecruiterFactory } from '#database/factories/recruiter_factory'
import { JobFactory } from '#database/factories/job_factory'

export default class extends BaseSeeder {
  async run() {
   try {
    UserFactory.createMany(30)
     const recruiters = await RecruiterFactory.createMany(15)
     const jobs = await JobFactory.createMany(50)
     for (const job of jobs) {
       const randomRecruiter = recruiters[Math.floor(Math.random() * recruiters.length)]
       await job.related('recruiter').associate(randomRecruiter)
       await job.save()
     }
   } catch (error) {
      console.error('Error seeding data:', error)
      throw error
   }
  }
}
