import factory from '@adonisjs/lucid/factories'
import Job from '#models/job'
import Recruiter from '#models/recruiter'
import axios from 'axios'
import env from '#start/env'

const api = env.get('AI_MODEL_ENDPOINT')

export const JobFactory = factory
  .define(Job, async ({ faker }) => {

    const skills = Array(faker.number.int({ min: 2, max: 6 }))
      .fill(null)
      .map(() => faker.helpers.arrayElement([
        'JavaScript', 'TypeScript', 'React', 'Vue', 'Angular', 'Node.js',
        'Express', 'SQL', 'NoSQL', 'MongoDB', 'AWS', 'Docker',
        'Kubernetes', 'CI/CD', 'Python', 'Java', 'Go', 'Ruby'
      ]))

    const embeddingResponse = await axios.post(
        `${api}/embeddings?text=${encodeURIComponent(skills.join(','))}`,
        {},
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )

      if (!embeddingResponse.data || !embeddingResponse.data) {
        throw new Error('Embedding API response did not contain embeddings data.')
      }
      const embedding = embeddingResponse.data

      const formattedEmbedding = `[${embedding.join(',')}]`

    const employmentTypes = ['Full-time', 'Part-time', 'Contract', 'Temporary', 'Internship']
    const listOfRecruiters = await Recruiter.query().preload('jobs')
    const recruiterIds = listOfRecruiters.map((recruiter) => recruiter.recruiterId)
    if (recruiterIds.length === 0) {
      throw new Error('No recruiters found. Ensure RecruiterFactory creates recruiters before jobs.')
    }

    return {
      title: faker.helpers.arrayElement([
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
        'Network Administrator',
      ]),
      description: `${faker.lorem.paragraph(3)}\n\n${faker.lorem.paragraph(2)}\n\n${faker.lorem.paragraph(1)}`,
      requiredSkills: JSON.stringify(skills),
      location: `${faker.location.city()}, ${faker.location.country()}`,
      salaryRange: `${faker.number.int({ min: 40, max: 150 })},000 - ${faker.number.int({ min: 60, max: 200 })},000`,
      jobType: faker.helpers.arrayElement(['Remote', 'On-site', 'Hybrid']),
      employmentType: faker.helpers.arrayElement(employmentTypes),
      embedding: formattedEmbedding,
      recruiterId: faker.helpers.arrayElement(recruiterIds),
    }
  })
  .build()
