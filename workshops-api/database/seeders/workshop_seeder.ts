import Workshop from '#models/workshop'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    await Workshop.createMany([
      {
        title: 'React Avanzado',
        description: 'Hooks, Context y patrones avanzados en React',
        capacity: 20,
        availableSlots: 20,
      },
      {
        title: 'AdonisJS Fullstack',
        description: 'API REST con Auth, Lucid y Services',
        capacity: 15,
        availableSlots: 10,
      },
      {
        title: 'Tailwind + shadcn',
        description: 'UI moderna y accesible con TailwindCSS v4 y shadcn/ui',
        capacity: 25,
        availableSlots: 25,
      },
    ])
  }
}
