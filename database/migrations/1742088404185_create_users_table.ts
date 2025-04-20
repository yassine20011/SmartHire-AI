import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'users'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('user_id').notNullable()
      table.string('first_name', 80).notNullable()
      table.string('last_name', 80).notNullable()
      table.string('email', 254).notNullable().unique()
      table.string('password').notNullable()
      table.string('phone', 20).nullable()
      table.string('location', 100).nullable()
      table.string('profile_picture').nullable()
      table.string('bio', 500).nullable()
      table.enu('role', ['recruiter', 'candidate']).notNullable()
      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').nullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
