export async function up(knex) {
  await knex.schema.createTable('product_images', (t) => {
    t.increments('id')
    t.integer('product_id').unsigned().notNullable()
      .references('id').inTable('products').onDelete('CASCADE')
    t.string('image_url', 500).notNullable()
    t.integer('sort_order').notNullable().defaultTo(0)
    t.timestamp('created_at').defaultTo(knex.fn.now())
  })
}

export async function down(knex) {
  await knex.schema.dropTableIfExists('product_images')
}