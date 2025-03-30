import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'candidate_skills'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table
        .integer('candidate_id')
        .unsigned()
        .references('candidates.candidate_id')
        .onDelete('CASCADE')
      table.integer('skill_id').unsigned().references('skills.skill_id').onDelete('CASCADE')
      table.primary(['candidate_id', 'skill_id'])
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
