import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'jobs'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('job_id').notNullable()
      table.string('title').notNullable()
      table.string('description').notNullable()
      table.json('required_skills').notNullable()
      table.string('location').notNullable()
      table.string('salary_range').notNullable()
      table.string('job_type').notNullable()
      table.string('employment_type').notNullable()
      table.integer('recruiter_id').unsigned().references('recruiters.recruiter_id').onDelete('CASCADE')
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
