import { DateTime } from 'luxon'
import { column, belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import User from '#models/user'
import BaseModelWithCamelCase from './baseModel.js'

export default class Notification extends BaseModelWithCamelCase {
  /**
   * Attributes.
   */
  @column({ isPrimary: true })
  declare notificationId: number

  @column()
  declare message: string

  @column()
  declare readStatus: boolean

  /**
   * Relationships.
   */
  @belongsTo(() => User, { foreignKey: 'userId' })
  declare user: BelongsTo<typeof User>

  /**
   * Timestamps.
   */
  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  markAsRead() {}
}
