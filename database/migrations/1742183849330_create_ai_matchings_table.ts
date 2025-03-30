import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'ai_matchings'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('macthing_id').notNullable()
      table.float('matching_score').notNullable()
      table.json('recommendation_details').notNullable()

      table.integer('job_id').unsigned().references('jobs.job_id').onDelete('CASCADE')
      table
        .integer('candidate_id')
        .unsigned()
        .references('candidates.candidate_id')
        .onDelete('CASCADE')

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
