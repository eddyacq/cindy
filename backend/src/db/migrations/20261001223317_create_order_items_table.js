export async function up(knex) {
  await knex.schema.createTable('order_items', (t) => {
    t.increments('id')
    t.integer('order_id').unsigned().notNullable()
      .references('id').inTable('orders').onDelete('CASCADE')
    t.integer('product_id').unsigned().notNullable()
      .references('id').inTable('products').onDelete('RESTRICT')
    t.string('product_name', 255).notNullable() // snapshot — keeps the receipt correct even if the product is renamed later
    t.decimal('price', 10, 2).notNullable()      // snapshot — price at time of purchase, not today's price
    t.integer('quantity').unsigned().notNullable()
    t.timestamps(true, true)
  })
}

export async function down(knex) {
  await knex.schema.dropTableIfExists('order_items')
}