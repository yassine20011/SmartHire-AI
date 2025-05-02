import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'applications'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('applicationId').notNullable()
      table.enum('status', ['pending', 'accepted', 'rejected']).notNullable()
      table.float('score').notNullable()
      table.text('converLetter').notNullable()
      table.integer('jobId').unsigned().references('jobs.jobId').onDelete('CASCADE')
      table.integer('candidateId').unsigned().references('candidates.candidateId').onDelete('CASCADE')
      table.timestamp('createdAt')
      table.timestamp('updatedAt')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
