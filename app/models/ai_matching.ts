import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Job from '#models/job'
import Candidate from '#models/candidate'

interface RecommendationDetails {
  job_id: number
  job_title: string
  company: string
  location: string
}

export default class AiMatching extends BaseModel {
  /**
   * Attributes.
   */
  @column({ isPrimary: true })
  declare matching_id: number

  @column()
  declare matching_score: number

  @column()
  declare recommendation_details: RecommendationDetails

  /**
   * Relationships.
   */
  @belongsTo(() => Job, { foreignKey: 'job_id' })
  declare job: BelongsTo<typeof Job>

  @belongsTo(() => Candidate, { foreignKey: 'candidate_id' })
  declare candidate: BelongsTo<typeof Candidate>

  /**
   * Timestamps.
   */
  @column.dateTime({ autoCreate: true })
  declare created_at: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updated_at: DateTime
}
