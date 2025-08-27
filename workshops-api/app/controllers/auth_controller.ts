import { AuthService } from '#services/auth_service'
import { loginValidator, registerValidator } from '#validators/auth'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'

@inject()
export default class AuthController {
  constructor(private authService: AuthService) {}

  async register({ request, response }: HttpContext) {
    const payload = await request.validateUsing(registerValidator)

    const user = await this.authService.register(payload)

    return response.created(user)
  }

  async login({ request, response }: HttpContext) {
    const payload = await request.validateUsing(loginValidator)

    const token = await this.authService.login(payload)

    console.log(token.token)
    return response.ok(token)
  }

  async me(ctx: HttpContext) {
    const user = await this.authService.me(ctx)
    return ctx.response.ok(user)
  }

  async logout(ctx: HttpContext) {
    const res = await this.authService.logout(ctx)
    if (!res.ok) {
      return ctx.response.badRequest({ message: res.message })
    }
    return ctx.response.ok({ message: 'Logged out' })
  }
}
