import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'candidates'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('candidate_id').notNullable()
      table.string('resume_url', 80)
      table.integer('experience_years')
      table.string('desired_position', 80)
      table.boolean('profile_visibility')

      table.integer('user_id').unsigned().references('users.user_id').onDelete('CASCADE')

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
