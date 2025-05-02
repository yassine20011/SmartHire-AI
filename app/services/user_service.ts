import User from '#models/user'
import hash from '@adonisjs/core/services/hash'

export class UserService {
  static async verifyCredentials(email: string, password: string): Promise<User | null> {
    try {
      const user = await User.query().where('email', email).first()

      if (user && (await hash.verify(user.password, password))) {
        return user
      }
    }
    catch (error) {
      console.error('Error verifying credentials:', error)
      return null
    }
    return null
  }

  static async findByEmail(email: string): Promise<User | null> {
    try {
      const user = await User.query().where('email', email).first()
      return user
    } catch (error) {
      return null
    }
  }

  static async createUser(userData: Partial<User>): Promise<User> {
    try {
      const user = await User.create(userData)
      return user
    } catch (error) {
      throw new Error('Error creating user')
    }
  }
}
