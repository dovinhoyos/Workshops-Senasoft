import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'

interface Payload {
  fullName?: string
  email: string
  password: string
}

export class AuthService {
  async register(payload: Payload) {
    return await User.create(payload)
  }

  async login({ email, password }: Payload) {
    const user = await User.verifyCredentials(email, password)
    const token = await User.accessTokens.create(user)
    return { token }
  }

  async me({ auth }: HttpContext) {
    const user = auth.getUserOrFail()
    return user
  }

  async logout({ auth }: HttpContext) {
    const user = auth.getUserOrFail()
    const token = auth.user?.currentAccessToken.identifier
    if (!token) {
      return { ok: false, message: 'Token not found' }
    }

    await User.accessTokens.delete(user, token)
    return { ok: true }
  }
}
