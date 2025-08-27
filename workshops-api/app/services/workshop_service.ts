import Workshop from '#models/workshop'

export default class WorkshopService {
  async list() {
    return Workshop.all()
  }
}
