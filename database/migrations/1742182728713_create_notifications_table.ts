import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'notifications'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('notificationId').notNullable()
      table.string('message', 255).notNullable()
      table.boolean('read_status').notNullable()
      table.integer('userId').unsigned().references('users.userId').onDelete('CASCADE')
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
