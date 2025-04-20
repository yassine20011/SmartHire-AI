import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'

export default class RoleRestrictionMiddleware {

  async handle(ctx: HttpContext, next: NextFn, allowedRoles: string[]) {
    const { auth, response } = ctx

    try {
      // Ensure the user is authenticated
      const user = await auth.authenticate()

      if (!allowedRoles.includes(user.role)) {
        return response.redirect(`/dashboard/${user.role}`, true)
      }

      // Proceed to the next middleware or controller
      await next()
    } catch (error) {
      return response.unauthorized('Authentication required')
    }
  }
}
