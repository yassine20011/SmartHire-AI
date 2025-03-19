import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'candidate_skills'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table
        .integer('candidateId')
        .unsigned()
        .references('candidates.candidateId')
        .onDelete('CASCADE')
      table.integer('skillId').unsigned().references('skills.skillId').onDelete('CASCADE')
      table.primary(['candidateId', 'skillId'])
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
