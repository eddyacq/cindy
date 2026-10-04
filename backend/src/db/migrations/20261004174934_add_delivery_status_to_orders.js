export async function up(knex) {
  await knex.schema.alterTable('orders', (t) => {
    t.enu('delivery_status', ['order_placed', 'payment_confirmed', 'preparing', 'shipped', 'out_for_delivery', 'delivered'])
      .notNullable().defaultTo('order_placed')
  })
}

export async function down(knex) {
  await knex.schema.alterTable('orders', (t) => {
    t.dropColumn('delivery_status')
  })
}