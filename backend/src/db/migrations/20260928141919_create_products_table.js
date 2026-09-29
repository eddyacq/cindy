export async function up(knex) {
  await knex.schema.createTable('products', (t) => {
    t.increments('id')
    t.string('name', 255).notNullable()
    t.text('description')
    t.integer('category_id').unsigned().notNullable()
      .references('id').inTable('categories').onDelete('RESTRICT')
    t.decimal('price', 10, 2).notNullable()
    t.decimal('old_price', 10, 2)
    t.string('sku', 100).notNullable().unique()
    t.integer('stock_quantity').unsigned().notNullable().defaultTo(0)
    t.string('image_url', 500)
    t.enu('status', ['active', 'inactive']).notNullable().defaultTo('active')
    t.boolean('featured').notNullable().defaultTo(false)
    t.boolean('new_arrival').notNullable().defaultTo(false)
    t.timestamps(true, true)

    t.index('name')
    t.index(['status', 'featured'])
  })
}

export async function down(knex) {
  await knex.schema.dropTableIfExists('products')
}