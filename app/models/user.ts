import { DateTime } from 'luxon'
import hash from '@adonisjs/core/services/hash'
import { column, beforeSave, hasOne, hasMany } from '@adonisjs/lucid/orm'
import type { HasOne, HasMany } from '@adonisjs/lucid/types/relations'
import Recruiter from '#models/recruiter'
import SearchLog from '#models/search_log'
import Notification from '#models/notification'
import Candidate from '#models/candidate'
import BaseModelWithCamelCase from './baseModel.js'

export default class User extends BaseModelWithCamelCase {
  /**
   * Attributes.
   */
  @column({ isPrimary: true })
  declare userId: number

  @column()
  declare firstName: string

  @column()
  declare lastName: string

  @column()
  declare email: string

  @column({ serializeAs: null })
  declare password: string

  @column()
  declare role: 'recruiter' | 'candidate'

  @column()
  declare phone: string | null

  @column()
  declare location: string | null

  @column()
  declare bio: string | null

  @column()
  declare jobTitle: string | null

  /**
   * Relationships.
   */
  @hasOne(() => Recruiter, { foreignKey: 'userId' })
  declare recruiter: HasOne<typeof Recruiter>

  @hasOne(() => Candidate, { foreignKey: 'userId' })
  declare candidate: HasOne<typeof Candidate>

  @hasMany(() => SearchLog, { foreignKey: 'userId' })
  declare searchLogs: HasMany<typeof SearchLog>

  @hasMany(() => Notification, { foreignKey: 'userId' })
  declare notifications: HasMany<typeof Notification>

  /**
   * Timestamps.
   */
  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null

  @beforeSave()
  static async hashPassword(user: User) {
    if (user.$dirty.password) {
      user.password = await hash.make(user.password)
    }
  }

  getFullName(): string {
    return `${this.firstName} ${this.lastName}`
  }
}
