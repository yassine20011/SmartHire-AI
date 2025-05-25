import Candidate from '#models/candidate'
import db from '@adonisjs/lucid/services/db'
export class CandidateService {
  static async createCandidate(data: Partial<Candidate>) {
    try {
      const candidate = await Candidate.create(data)
      return candidate
    } catch (error) {
      console.error('Error creating candidate:', error)
      throw new Error('Failed to create candidate')
    }
  }

  static async updateCandidate(candidateId: number, data: Partial<Candidate>) {
    try {
      const candidate = await Candidate.findOrFail(candidateId)
      candidate.merge(data)
      await candidate.save()
      return candidate
    } catch (error) {
      console.error('Error updating candidate:', error)
      throw new Error('Failed to update candidate')
    }
  }

  static async updateEmbedding(candidateId: number, embedding: Array<number>) {
    try {
      const embeddingArray = `{${embedding.join(',')}}`

      await db.rawQuery(`UPDATE candidates SET embedding = ? WHERE candidateId = ?`, [
        embeddingArray,
        candidateId,
      ])
    } catch (error) {
      console.error('Error updating candidate embedding:', error)
      throw new Error('Failed to update candidate embedding')
    }
  }

  static async getCandidateByuserId(userId: number): Promise<Candidate | null> {
    try {
      const candidate = await Candidate.findByOrFail('userId', userId)
      return candidate
    } catch (error) {
      return null
    }
  }


  static async getSkills(userId: number): Promise<string[]> {
    try {
      const candidate = await Candidate.query().where('userId', userId).first()

      if (!candidate) {
        throw new Error('Candidate not found')
      }
      const parsedResume = candidate.parsedResume
      if (!parsedResume || !parsedResume.skills) {
        throw new Error('Parsed resume or skills not found')
      }
      const skills = parsedResume.skills
      return skills
    } catch (error) {
      console.error('Error fetching skills:', error)
      return []
    }
  }

}
