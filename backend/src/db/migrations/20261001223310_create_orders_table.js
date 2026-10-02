export async function up(knex) {
  await knex.schema.createTable('orders', (t) => {
    t.increments('id')
    t.integer('user_id').unsigned().notNullable()
      .references('id').inTable('users').onDelete('RESTRICT')
    t.decimal('subtotal', 10, 2).notNullable()
    t.decimal('delivery_fee', 10, 2).notNullable().defaultTo(0)
    t.decimal('total', 10, 2).notNullable()
    t.enu('payment_status', ['pending', 'paid', 'failed']).notNullable().defaultTo('pending')
    t.string('payment_reference', 100).notNullable().unique() // what we hand Paystack and verify back
    t.string('payment_channel', 50) // e.g. 'mobile_money', 'card' — filled in after verification
    t.json('delivery_address').notNullable() // snapshot at order time — an edited/deleted address shouldn't change history
    t.timestamps(true, true)

    t.index(['user_id', 'created_at'])
  })
}

export async function down(knex) {
  await knex.schema.dropTableIfExists('orders')
}