import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Job from './job.js'
import Candidate from './candidate.js'

type ApplicationStatus = 'Pending' | 'Accepted' | 'Rejected'

export default class Application extends BaseModel {
  /**
   * Attributes.
   */
  @column({ isPrimary: true })
  declare application_id: number

  @column()
  declare status: ApplicationStatus

  @column()
  declare score: number

  @column()
  declare cover_letter: string

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

  update_status(): void {
    console.log('Application status updated')
  }
}
