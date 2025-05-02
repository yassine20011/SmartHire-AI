import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'users'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('userId').notNullable()
      table.string('firstName', 80).notNullable()
      table.string('lastName', 80).notNullable()
      table.string('email', 254).notNullable().unique()
      table.string('password').notNullable()
      table.string('phone', 20).nullable()
      table.string('location', 100).nullable()
      table.string('profilePicture').nullable()
      table.string('bio', 500).nullable()
      table.enu('role', ['recruiter', 'candidate']).notNullable()
      table.timestamp('createdAt').notNullable()
      table.timestamp('updatedAt').nullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
