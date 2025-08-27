import WorkshopService from '#services/workshop_service'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'

@inject()
export default class WorkshopsController {
  constructor(private workshopService: WorkshopService) {}

  async index({ response }: HttpContext) {
    const workshops = await this.workshopService.list()
    return response.ok(workshops)
  }
}
