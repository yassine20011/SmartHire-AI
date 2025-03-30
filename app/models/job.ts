import { BaseModel, column, belongsTo, hasMany, manyToMany } from '@adonisjs/lucid/orm'
import Recruiter from '#models/recruiter'
import AiMatching from './ai_matching.js'
import Application from '#models/application'
import Skill from './skill.js'
import { DateTime } from 'luxon'
import type { BelongsTo, HasMany, ManyToMany } from '@adonisjs/lucid/types/relations'

export default class Job extends BaseModel {
  /**
   * Attributes.
   */

  @column({ isPrimary: true })
  declare job_id: number

  @column()
  declare title: string

  @column()
  declare description: string

  @column()
  declare required_skills: object

  @column()
  declare location: string

  @column()
  declare salary_range: string

  @column()
  declare job_type: string

  @column()
  declare employment_type: string

  /**
   * Relationships.
   * */

  @belongsTo(() => Recruiter, { foreignKey: 'recruiter_id' })
  declare recruiter: BelongsTo<typeof Recruiter>

  @hasMany(() => Application, { foreignKey: 'job_id' })
  declare applications: HasMany<typeof Application>

  @hasMany(() => AiMatching, { foreignKey: 'job_id' })
  declare matches: HasMany<typeof AiMatching>

  @manyToMany(() => Skill, {
    pivotTable: 'job_skills',
  })
  declare skills: ManyToMany<typeof Skill>

  /**
   * Timestamps.
   * */
  @column.dateTime({ autoCreate: true })
  declare created_at: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updated_at: DateTime

  updatePost(): void {
    console.log('Job updated')
  }

  getApplications(): Application[] {
    return []
  }
}
