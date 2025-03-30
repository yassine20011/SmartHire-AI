import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'recruiters'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('recruiter_id').notNullable()
      table.string('company_name', 80).notNullable()
      table.integer('job_posted_count')
      table.integer('company_size')
      table.string('industry', 80)
      table.integer('user_id').unsigned().references('users.user_id').onDelete('CASCADE')
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
