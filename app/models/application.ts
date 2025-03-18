import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Job from './job.js'
import Candidate from './candidate.js'

export default class Application extends BaseModel {
  /**
   * Attributes.
   */

  @column({ isPrimary: true })
  declare applicationId: number

  @column()
  declare status: string

  @column()
  declare score: number

  @column()
  declare conver_letter: string

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

  update_status(): void {
    console.log('Application status updated')
  }
}
