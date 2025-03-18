import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Job from '#models/job'
import Candidate from '#models/candidate'

export default class AiMatching extends BaseModel {
  /**
   * Attributes.
   */
  @column({ isPrimary: true })
  declare macthingId: number

  @column()
  declare matchingScore: number

  @column()
  declare recommendation_details: object

  /**
   * Relationships.
   */
  @belongsTo(() => Job, { foreignKey: 'jobId' })
  declare job: BelongsTo<typeof Job>

  @belongsTo(() => Candidate, { foreignKey: 'candidateId' })
  declare candidate: BelongsTo<typeof Candidate>

  /**
   *
   * Timestamps.
   **/
  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
