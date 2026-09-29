export async function seed(knex) {
  // products reference categories, so clear products first
  await knex('products').del()
  await knex('categories').del()

  await knex('categories').insert([
    { name: 'Electronics', description: 'Phones, audio, and gadgets', image_url: 'https://picsum.photos/seed/electronics/600/400' },
    { name: 'Fashion', description: 'Clothing, shoes, and style', image_url: 'https://picsum.photos/seed/fashion/600/400' },
    { name: 'Beauty', description: 'Skincare, makeup, and grooming', image_url: 'https://picsum.photos/seed/beauty/600/400' },
    { name: 'Home', description: 'Everything for your living space', image_url: 'https://picsum.photos/seed/home/600/400' },
    { name: 'Accessories', description: 'Bags, watches, and extras', image_url: 'https://picsum.photos/seed/accessories/600/400' },
  ])
}