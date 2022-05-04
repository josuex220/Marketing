import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class CustomerSchema extends BaseSchema {
  protected tableName = 'customer'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id_customer').primary()
      table.string('firstname', 255).notNullable()
      table.string('lastname', 255).notNullable()
      table.string('email', 255).notNullable()
      table.text('avatarUrl').notNullable()
      table.string('password', 180).notNullable()
      table.integer('status', 1).notNullable()
      table.timestamp('date_expire').notNullable()
      table.string('remember_me_token').nullable()

      /**
       * Uses timestampz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true }).notNullable()
      table.timestamp('updated_at', { useTz: true }).notNullable()
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
