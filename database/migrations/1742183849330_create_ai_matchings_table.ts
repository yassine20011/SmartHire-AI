import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'ai_matchings'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('macthingId').notNullable()
      table.float('matchingScore').notNullable()
      table.json('recommendationDetails').notNullable()

      table.integer('jobId').unsigned().references('jobs.jobId').onDelete('CASCADE')
      table
        .integer('candidateId')
        .unsigned()
        .references('candidates.candidateId')
        .onDelete('CASCADE')

      table.timestamp('createdAt')
      table.timestamp('updatedAt')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
