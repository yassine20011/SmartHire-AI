import { DateTime } from 'luxon'
import { column, belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import User from '#models/user'
import BaseModelWithCamelCase from './baseModel.js'


interface ClickedJob {
  job_id: number
  job_title: string
  company: string
  location: string
}

export default class SearchLog extends BaseModelWithCamelCase {

  /**
   * Attributes.
   */
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
   * Timestamps.
   */
  @column.dateTime({ autoCreate: true })
  declare timestamp: DateTime
}
