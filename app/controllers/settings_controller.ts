import type { HttpContext } from '@adonisjs/core/http'
import vine from '@vinejs/vine'
import { UserService } from '#services/user_service'

export default class SettingsController {

  async show({ inertia }: HttpContext) {
    return inertia.render('settings')
  }

  async update({ request, response }: HttpContext) {
    const schema = vine.object({
      first_name: vine.string().trim().minLength(2).maxLength(255),
      last_name: vine.string().trim().minLength(2).maxLength(255),
      email: vine.string().email().trim().normalizeEmail(),
      phone: vine.string().optional(),
      location: vine.string().optional(),
      bio: vine.string().optional(),
    })

    const validator = vine.compile(schema)

    const payload = await request.validateUsing(validator)
    const user = await UserService.findByEmail(payload.email)

    if (!user) {
      return response.status(404).json({ message: 'User not found' })
    }

  }

}
