import factory from '@adonisjs/lucid/factories'
import Recruiter from '#models/recruiter'
import User from '#models/user'



export const RecruiterFactory = factory
  .define(Recruiter, async ({ faker }) => {

    const listOfRecruiter = await User.query()
      .where('role', 'recruiter')
      .orderBy('userId', 'desc')


    return {
      companyName: faker.company.name(),
      jobPostedCount: faker.number.int({ min: 0, max: 100 }),
      companySize: faker.number.int({ min: 1, max: 10000 }),
      industry: faker.commerce.department(),
      userId: faker.helpers.arrayElement(listOfRecruiter).userId,
    }
  })
  .build()
