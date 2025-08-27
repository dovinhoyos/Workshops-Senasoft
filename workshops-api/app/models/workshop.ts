import { DateTime } from 'luxon'
import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import Enrollment from './enrollment.js'
import type { HasMany } from '@adonisjs/lucid/types/relations'

export default class Workshop extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare title: string

  @column()
  declare description: string

  @column()
  declare capacity: number

  @column()
  declare availableSlots: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @hasMany(() => Enrollment)
  declare enrollments: HasMany<typeof Enrollment>
}
