import Enrollment from '#models/enrollment'
import Workshop from '#models/workshop'
import { Exception } from '@adonisjs/core/exceptions'

export default class EnrollmentService {
  async enrollUser(userId: number, workshopId: number) {
    const workshop = await Workshop.findOrFail(workshopId)

    if (workshop.availableSlots <= 0) {
      throw new Exception('No hay cupos disponibles', { status: 400 })
    }

    const existing = await Enrollment.query()
      .where('user_id', userId)
      .andWhere('workshop_id', workshopId)
      .first()

    if (existing) {
      throw new Exception('Ya estás inscrito en este taller', { status: 400 })
    }

    // Crear la inscripción
    const enrollment = await Enrollment.create({
      userId,
      workshopId,
    })

    // Reducir un cupo
    workshop.availableSlots -= 1
    await workshop.save()

    return enrollment
  }
}
