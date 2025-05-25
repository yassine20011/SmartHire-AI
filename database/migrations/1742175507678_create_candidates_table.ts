import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'candidates'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('candidateId').notNullable()
      table.string('resumeUrl', 80)
      table.integer('experienceYears')
      table.boolean('profileVisibility')
      table.json('parsedResume')
      table.integer('userId').unsigned().references('users.userId').onDelete('CASCADE')

      table.timestamp('createdAt')
      table.timestamp('updatedAt')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
