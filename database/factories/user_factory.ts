import factory from '@adonisjs/lucid/factories'
import User from '#models/user'

export const UserFactory = factory
  .define(User, async ({ faker }) => {
    return {
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      phone: faker.phone.number().match(/^\d{10}$/) ? faker.phone.number() : null,
      role: faker.helpers.arrayElement(['recruiter', 'candidate']),
      location: faker.location.city(),
      bio: faker.lorem.sentence(),
      jobTitle: faker.helpers.arrayElement([
        'Software Engineer',
        'Data Scientist',
        'Product Manager',
        'UX Designer',
        'DevOps Engineer',
        'Project Manager',
        'Marketing Specialist',
        'Sales Executive',
        'HR Manager',
        'Business Analyst',
        'Web Developer',
        'Graphic Designer',
        'Network Administrator',])
    }
  })
  .build()
