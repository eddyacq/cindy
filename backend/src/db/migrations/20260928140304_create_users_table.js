export async function up(knex) {
  await knex.schema.createTable('users', (t) => {
    t.increments('id')
    t.string('first_name', 100).notNullable()
    t.string('last_name', 100).notNullable()
    t.string('email', 255).notNullable().unique()
    t.string('phone', 30)
    t.string('password_hash', 255).notNullable()
    t.enu('role', ['customer', 'admin']).notNullable().defaultTo('customer')
    t.enu('status', ['active', 'suspended']).notNullable().defaultTo('active')
    t.timestamps(true, true) // created_at, updated_at
  })
}

export async function down(knex) {
  await knex.schema.dropTableIfExists('users')
}