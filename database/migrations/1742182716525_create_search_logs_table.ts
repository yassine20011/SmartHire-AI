import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'search_logs'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('searchLogId').notNullable()
      table.string('searchQuery', 255).notNullable()
      table.json('clickedJob').notNullable()
      table.integer('userId').unsigned().references('users.userId').onDelete('CASCADE')
      table.timestamp('timestamp')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
