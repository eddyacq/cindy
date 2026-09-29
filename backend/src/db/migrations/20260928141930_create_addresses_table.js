export async function up(knex) {
  await knex.schema.createTable('addresses', (t) => {
    t.increments('id')
    t.integer('user_id').unsigned().notNullable()
      .references('id').inTable('users').onDelete('CASCADE')
    t.string('full_name', 200).notNullable()
    t.string('phone', 30).notNullable()
    t.string('country', 100).notNullable().defaultTo('Ghana')
    t.string('region', 100).notNullable()
    t.string('city', 100).notNullable()
    t.string('area', 100)
    t.string('address', 255).notNullable()
    t.text('directions')
    t.boolean('is_default').notNullable().defaultTo(false)
    t.timestamps(true, true)
  })
}

export async function down(knex) {
  await knex.schema.dropTableIfExists('addresses')
}