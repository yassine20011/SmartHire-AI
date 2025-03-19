import { BaseModel, column, belongsTo, manyToMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, ManyToMany } from '@adonisjs/lucid/types/relations'
import Job from '#models/job'
import Candidate from '#models/candidate'

export default class Skill extends BaseModel {
  /**
   * Attributes.
   */

  @column({ isPrimary: true })
  declare skillId: number

  @column()
  declare name: string

  @column()
  declare category: string

  /**
   * Relationships.
   */
  @belongsTo(() => Job, { foreignKey: 'jobId' })
  declare job: BelongsTo<typeof Job>

  @belongsTo(() => Candidate, { foreignKey: 'candidateId' })
  declare candidate: BelongsTo<typeof Candidate>

  @manyToMany(() => Candidate, {
    pivotTable: 'candidate_skills',
  })
  declare candidates: ManyToMany<typeof Candidate>

  @manyToMany(() => Job, {
    pivotTable: 'job_skills',
  })
  declare jobs: ManyToMany<typeof Job>


  get_related_jobs(): void {
    console.log('Related jobs')
  }

  get_related_candidates(): void {
    console.log('Related candidates')
  }
}
