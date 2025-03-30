import { BaseModel, column, belongsTo, hasMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import Job from '#models/job'
import User from '#models/user'

export default class Recruiter extends BaseModel {
  /**
   * Attributes.
   */
  @column({ isPrimary: true })
  declare recruiter_id: number

  @column()
  declare company_name: string

  @column()
  declare job_posted_count: number

  @column()
  declare company_size: number

  @column()
  declare industry: string

  @column()
  declare user_id: number

  /**
   * Relationships.
   */
  @belongsTo(() => User, { foreignKey: 'user_id' })
  declare user: BelongsTo<typeof User>

  @hasMany(() => Job, { foreignKey: 'recruiter_id' })
  declare jobs: HasMany<typeof Job>

  postJobs() {}

  search_candidates() {}
}
