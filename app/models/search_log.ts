import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import User from '#models/user'

interface ClickedJob {
  jobId: number
  jobTitle: string
  company: string
  location: string
}

export default class SearchLog extends BaseModel {
  /**
   *  Attributes.
   * */
  @column({ isPrimary: true })
  declare searchLogId: number

  @column()
  declare searchQuery: string

  @column()
  declare clickedJob: ClickedJob

  /**
   * Relationships.
   */
  @belongsTo(() => User, { foreignKey: 'userId' })
  declare user: BelongsTo<typeof User>

  /**
   *
   * Timestamps.
   * */
  @column.dateTime({ autoCreate: true })
  declare timestamp: DateTime
}
