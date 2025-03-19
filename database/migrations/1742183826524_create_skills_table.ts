import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'skills'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('skillId').notNullable()
      table.string('name', 80).notNullable()
      table.string('category', 80).notNullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
