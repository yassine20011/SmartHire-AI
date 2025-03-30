import { DateTime } from 'luxon'
import hash from '@adonisjs/core/services/hash'
import { column, beforeSave, BaseModel, hasOne, hasMany } from '@adonisjs/lucid/orm'
import type { HasOne, HasMany } from '@adonisjs/lucid/types/relations'
import Recruiter from '#models/recruiter'
import SearchLog from '#models/search_log'
import Notification from '#models/notification'
import Candidate from '#models/candidate'

export default class User extends BaseModel {
  /**
   * Attributes.
   */
  @column({ isPrimary: true })
  declare user_id: number

  @column()
  declare first_name: string

  @column()
  declare last_name: string

  @column()
  declare email: string

  @column({ serializeAs: null })
  declare password: string

  @column()
  declare role: 'recruiter' | 'candidate'

  /**
   * Relationships.
   */
  @hasOne(() => Recruiter, { foreignKey: 'user_id' })
  declare recruiter: HasOne<typeof Recruiter>

  @hasOne(() => Candidate, { foreignKey: 'user_id' })
  declare candidate: HasOne<typeof Candidate>

  @hasMany(() => SearchLog, { foreignKey: 'user_id' })
  declare search_logs: HasMany<typeof SearchLog>

  @hasMany(() => Notification, { foreignKey: 'user_id' })
  declare notifications: HasMany<typeof Notification>

  /**
   * Timestamps.
   */
  @column.dateTime({ autoCreate: true })
  declare created_at: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updated_at: DateTime | null

  @beforeSave()
  static async hashPassword(user: User) {
    if (user.$dirty.password) {
      user.password = await hash.make(user.password)
    }
  }

  getFullName(): string {
    return `${this.first_name} ${this.last_name}`
  }
}
