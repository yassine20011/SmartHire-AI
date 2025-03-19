import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'recruiters'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('recruiterId').notNullable()
      table.string('companyName', 80).notNullable()
      table.integer('jobPostedCount').notNullable()
      table.integer('companySize').notNullable()
      table.string('industry', 80).notNullable()
      table.integer('userId').unsigned().references('users.userId').onDelete('CASCADE')
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
