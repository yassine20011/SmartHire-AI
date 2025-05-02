import { column, belongsTo, hasMany, manyToMany } from '@adonisjs/lucid/orm'
import Recruiter from '#models/recruiter'
import AiMatching from './ai_matching.js'
import Application from '#models/application'
import Skill from './skill.js'
import { DateTime } from 'luxon'
import type { BelongsTo, HasMany, ManyToMany } from '@adonisjs/lucid/types/relations'
import BaseModelWithCamelCase from './baseModel.js'

export default class Job extends BaseModelWithCamelCase {
  /**
   * Attributes.
   */

  @column({ isPrimary: true })
  declare jobId: number

  @column()
  declare title: string

  @column()
  declare description: string

  @column()
  declare requiredSkills: object

  @column()
  declare location: string

  @column()
  declare salaryRange: string

  @column()
  declare jobType: string

  @column()
  declare employmentType: string

  /**
   * Relationships.
   * */

  @belongsTo(() => Recruiter, { foreignKey: 'recruiterId' })
  declare recruiter: BelongsTo<typeof Recruiter>

  @hasMany(() => Application, { foreignKey: 'jobId' })
  declare applications: HasMany<typeof Application>

  @hasMany(() => AiMatching, { foreignKey: 'jobId' })
  declare matches: HasMany<typeof AiMatching>

  @manyToMany(() => Skill, {
    pivotTable: 'job_skills',
  })
  declare skills: ManyToMany<typeof Skill>

  /**
   * Timestamps.
   * */
  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  updatePost(): void {
    console.log('Job updated')
  }

  getApplications(): Application[] {
    return []
  }
}
