import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import User from '#models/user'

export default class Notification extends BaseModel {
  /**
   * Attributes.
   */
  @column({ isPrimary: true })
  declare notification_id: number

  @column()
  declare message: string

  @column()
  declare read_status: boolean

  /**
   * Relationships.
   */
  @belongsTo(() => User, { foreignKey: 'user_id' })
  declare user: BelongsTo<typeof User>

  /**
   * Timestamps.
   */
  @column.dateTime({ autoCreate: true })
  declare created_at: DateTime

  markAsRead() {}
}
