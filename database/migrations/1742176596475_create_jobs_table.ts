import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'jobs'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('jobId').notNullable()
      table.string('title').notNullable()
      table.string('description').notNullable()
      table.json('requiredSkills').notNullable()
      table.string('location').notNullable()
      table.string('salaryRange').notNullable()
      table.string('jobType').notNullable()
      table.string('employmentType').notNullable()
      table.integer('recruiterId').unsigned().references('recruiters.recruiterId').onDelete('CASCADE')
      table.timestamp('createdAt')
      table.timestamp('updatedAt')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
