// [name, description, category, price, old_price, sku, stock, featured, new_arrival]
const items = [
  ['Wireless Bluetooth Headphones', 'Over-ear headphones with noise isolation and 30-hour battery life.', 'Electronics', 450, 600, 'ELEC-001', 40, true, false],
  ['Smartphone 128GB', 'Dual-SIM smartphone with a 6.5" display and 50MP camera.', 'Electronics', 2800, 3200, 'ELEC-002', 25, true, true],
  ['Portable Power Bank 20000mAh', 'Fast-charging power bank with dual USB ports.', 'Electronics', 220, 300, 'ELEC-003', 80, false, false],
  ['Smart Watch Series X', 'Fitness tracking, heart-rate monitor, and message alerts.', 'Electronics', 650, 850, 'ELEC-004', 30, true, true],
  ['Men\'s Classic Denim Jacket', 'Durable denim jacket with a relaxed everyday fit.', 'Fashion', 380, 480, 'FASH-001', 35, false, true],
  ['Women\'s Floral Summer Dress', 'Lightweight breathable dress, perfect for warm weather.', 'Fashion', 260, 340, 'FASH-002', 50, true, false],
  ['Running Sneakers', 'Cushioned sole and breathable mesh for daily runs.', 'Fashion', 420, 550, 'FASH-003', 60, true, false],
  ['Vitamin C Face Serum', 'Brightening serum that evens skin tone and adds glow.', 'Beauty', 120, 160, 'BEAU-001', 100, true, true],
  ['Hydrating Body Lotion 500ml', 'Non-greasy daily moisturiser with shea butter.', 'Beauty', 75, 95, 'BEAU-002', 120, false, false],
  ['Professional Hair Dryer', '2000W ionic dryer with three heat settings.', 'Beauty', 240, 320, 'BEAU-003', 45, false, true],
  ['Non-Stick Cookware Set (5pc)', 'Durable non-stick pots and pans for everyday cooking.', 'Home', 520, 680, 'HOME-001', 20, true, false],
  ['Memory Foam Pillow', 'Ergonomic pillow that supports neck and shoulders.', 'Home', 140, 180, 'HOME-002', 70, false, false],
  ['LED Desk Lamp', 'Adjustable lamp with three brightness levels and USB port.', 'Home', 110, 150, 'HOME-003', 55, false, true],
  ['Leather Crossbody Bag', 'Compact genuine-leather bag with adjustable strap.', 'Accessories', 310, 400, 'ACCE-001', 30, true, false],
  ['Polarized Sunglasses', 'UV400 protection with a lightweight durable frame.', 'Accessories', 130, 180, 'ACCE-002', 65, false, true],
]

export async function seed(knex) {
  // look up category ids by name (ids change when categories are re-seeded)
  const cats = await knex('categories').select('id', 'name')
  const idByName = Object.fromEntries(cats.map((c) => [c.name, c.id]))

  await knex('products').insert(
    items.map(([name, description, cat, price, old_price, sku, stock, featured, new_arrival]) => ({
      name,
      description,
      category_id: idByName[cat],
      price,
      old_price,
      sku,
      stock_quantity: stock,
      image_url: `https://picsum.photos/seed/${sku}/600/600`,
      featured,
      new_arrival,
    }))
  )
}