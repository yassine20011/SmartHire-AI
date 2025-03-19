import { BaseModel, column, belongsTo, hasMany, manyToMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany, ManyToMany } from '@adonisjs/lucid/types/relations'
import User from '#models/user'
import AiMatching from '#models/ai_matching'
import Application from '#models/application'
import Skill from '#models/skill'


interface DesiredPosition {
  title: string
  location: string
  salaryRange: string
}

export default class Candidate extends BaseModel {
  /**
   * Attributes.
   */
  @column({ isPrimary: true })
  declare candidateId: number

  @column()
  declare resume_url: string

  @column()
  declare experience_years: number

  @column()
  declare desired_position: DesiredPosition

  @column()
  declare profile_visibility: boolean

  /**
   * Relationships.
   */
  @belongsTo(() => User, { foreignKey: 'userId' })
  declare user: BelongsTo<typeof User>

  @hasMany(() => AiMatching, { foreignKey: 'candidateId' })
  declare matches: HasMany<typeof AiMatching>

  @hasMany(() => Application, { foreignKey: 'candidateId' })
  declare applications: HasMany<typeof Application>

  @manyToMany(() => Skill, { pivotTable: 'candidate_skills' })
  declare skills: ManyToMany<typeof Skill>

  uploadResume() {}

  applyToJob() {}

  getMatches() {}
}
