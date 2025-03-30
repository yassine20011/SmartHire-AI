import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'applications'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('application_id').notNullable()
      table.enum('status', ['pending', 'accepted', 'rejected']).notNullable()
      table.float('score').notNullable()
      table.text('conver_letter').notNullable()
      table.integer('job_id').unsigned().references('jobs.job_id').onDelete('CASCADE')
      table.integer('candidate_id').unsigned().references('candidates.candidate_id').onDelete('CASCADE')
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
