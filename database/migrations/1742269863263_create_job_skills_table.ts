import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'job_skills'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.integer('job_id').unsigned().references('jobs.job_id').onDelete('CASCADE')
      table.integer('skill_id').unsigned().references('skills.skill_id').onDelete('CASCADE')
      table.primary(['job_id', 'skill_id'])
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
