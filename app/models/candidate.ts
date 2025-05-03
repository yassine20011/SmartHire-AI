import { column, belongsTo, hasMany, manyToMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany, ManyToMany } from '@adonisjs/lucid/types/relations'
import User from '#models/user'
import AiMatching from '#models/ai_matching'
import Application from '#models/application'
import Skill from '#models/skill'
import BaseModelWithCamelCase from './baseModel.js'

interface DesiredPosition {
  title: string
  location: string
  salary_range: string
}

export default class Candidate extends BaseModelWithCamelCase {


  /**
   * Attributes.
   */
  @column({ isPrimary: true })
  declare candidateId: number

  @column()
  declare resumeUrl: string

  @column()
  declare experienceYears: number

  @column()
  declare desiredPosition: DesiredPosition

  @column()
  declare profileVisibility: boolean

  @column()
  declare embedding: string

  @column()
  declare userId: number

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


  public serializeExtras(){
    return {
      embedding: JSON.parse(this.$extras.embedding || '[]'),
    }
  }
}
