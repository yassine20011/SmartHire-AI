import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import User from '#models/user'

interface ClickedJob {
  job_id: number
  job_title: string
  company: string
  location: string
}

export default class SearchLog extends BaseModel {
  /**
   * Attributes.
   */
  @column({ isPrimary: true })
  declare search_log_id: number

  @column()
  declare search_query: string

  @column()
  declare clicked_job: ClickedJob

  /**
   * Relationships.
   */
  @belongsTo(() => User, { foreignKey: 'user_id' })
  declare user: BelongsTo<typeof User>

  /**
   * Timestamps.
   */
  @column.dateTime({ autoCreate: true })
  declare timestamp: DateTime
}
