import type { HttpContext } from '@adonisjs/core/http'
import vine from '@vinejs/vine'
import { UserService } from '#services/user_service'


export default class SettingsController {

  async show({ inertia }: HttpContext) {
    return inertia.render('settings')
  }

  async patch({auth, request, response, session, inertia }: HttpContext) {

    const user = auth.user

    if (!user) {
      return response.status(401).json({ message: 'Unauthorized' })
    }

    const schema = vine.object({
      firstName: vine.string().trim().minLength(2).maxLength(255),
      lastName: vine.string().trim().minLength(2).maxLength(255),
      email: vine.string().email().trim().normalizeEmail(),
      phone: vine.string().optional(),
      location: vine.string().optional(),
      bio: vine.string().optional(),
      jobTitle: vine.string().optional(),
    })

    const validator = vine.compile(schema)

    const payload = await request.validateUsing(validator)
    const AlreadyinUse = await UserService.findByEmail(payload.email)

    if (AlreadyinUse && AlreadyinUse.userId !== user.userId) {
      session.flash('flash', 'Email already in use')
      return inertia.render('settings', {
        errors: {
          email: 'Email already in use',
        },
      })
    }

    try {
      await UserService.updateUser(user.userId, payload)
      session.flash('success', 'Profile updated successfully')
    } catch (error) {
      session.flash('error', 'Error updating profile')
    }

    return inertia.render('settings', {
      errors: {},
    })
  }
}
