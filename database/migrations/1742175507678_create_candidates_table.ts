import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'candidates'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('candidateId').notNullable()
      table.string('resume_url', 80).notNullable()
      table.integer('experience_years').notNullable()
      table.string('desired_position', 80).notNullable()
      table.boolean('profile_visibility').notNullable()

      table.integer('userId').unsigned().references('users.userId').onDelete('CASCADE')

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
