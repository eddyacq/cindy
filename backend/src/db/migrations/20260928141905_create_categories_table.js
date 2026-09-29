export async function up(knex) {
  await knex.schema.createTable('categories', (t) => {
    t.increments('id')
    t.string('name', 100).notNullable().unique()
    t.text('description')
    t.string('image_url', 500)
    t.enu('status', ['active', 'inactive']).notNullable().defaultTo('active')
    t.timestamps(true, true)
  })
}

export async function down(knex) {
  await knex.schema.dropTableIfExists('categories')
}