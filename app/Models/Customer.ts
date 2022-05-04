import { DateTime } from 'luxon'
import { BaseModel, beforeSave, column } from '@ioc:Adonis/Lucid/Orm'
import Hash from '@ioc:Adonis/Core/Hash'

export default class Customer extends BaseModel {
  static get table () {
    return 'customer'
  }
  @column({ isPrimary: true })
  public id_customer: number

  @column()
  public firstname: string
  @column()
  public lastname: string
  @column()
  public email: string
  @column()
  public password: string
  @column()
  public status: number
  @column()
  public date_expire: DateTime
  @column()
  public avatarUrl: string | null
  


  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeSave()
  public static async hashPassword (user: Customer) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password)
    }
  }
}
