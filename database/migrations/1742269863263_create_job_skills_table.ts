import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'job_skills'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.integer('jobId').unsigned().references('jobs.jobId').onDelete('CASCADE')
      table.integer('skillId').unsigned().references('skills.skillId').onDelete('CASCADE')
      table.primary(['jobId', 'skillId'])
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
