import type { HttpContext } from '@adonisjs/core/http'
import EnrollmentService from '#services/enrollment_service'
import { inject } from '@adonisjs/core'

@inject()
export default class EnrollmentsController {
  constructor(protected enrollmentService: EnrollmentService) {}

  async store({ auth, params, response }: HttpContext) {
    await auth.authenticate()
    const user = auth.user!
    const workshopId = params.id

    try {
      const enrollment = await this.enrollmentService.enrollUser(user.id, workshopId)
      return enrollment
    } catch (error) {
      return response.badRequest({ message: error.message })
    }
  }
}
