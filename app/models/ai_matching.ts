import { DateTime } from 'luxon'
import { column, belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Job from '#models/job'
import Candidate from '#models/candidate'
import BaseModelWithCamelCase from './baseModel.js'

interface RecommendationDetails {
  jobId: number
  jobTitle: string
  company: string
  location: string
}

export default class AiMatching extends BaseModelWithCamelCase {


  /**
   * Attributes.
   */
  @column({ isPrimary: true })
  declare matchingId: number

  @column()
  declare matchingScore: number

  @column()
  declare recommendationDetails: RecommendationDetails

  /**
   * Relationships.
   */
  @belongsTo(() => Job, { foreignKey: 'jobId' })
  declare job: BelongsTo<typeof Job>

  @belongsTo(() => Candidate, { foreignKey: 'candidateId' })
  declare candidate: BelongsTo<typeof Candidate>

  /**
   * Timestamps.
   */
  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
