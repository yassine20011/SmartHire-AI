import { BaseModel, column, belongsTo, hasMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import Job from '#models/job'
import User from '#models/user'

export default class Recruiter extends BaseModel {
  /**
  * Attributes.
  **/
  @column({ isPrimary: true })
  declare recruiterId: number

  @column()
  declare companyName: string

  @column()
  declare jobPostedCount: number

  @column()
  declare companySize: number

  @column()
  declare industry: string

  /**
   * Relationships.
   */
  @belongsTo(() => User, { foreignKey: 'userId' })
  declare user: BelongsTo<typeof User>

  @hasMany(() => Job, { foreignKey: 'recruiterId' })
  declare jobs: HasMany<typeof Job>

  postJobs() {}

  search_candidates() {}
}
