import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'search_logs'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('search_log_id').notNullable()
      table.string('search_query', 255).notNullable()
      table.json('clicked_job').notNullable()
      table.integer('user_id').unsigned().references('users.user_id').onDelete('CASCADE')
      table.timestamp('timestamp')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
