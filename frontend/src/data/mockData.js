export const categories = [
  { id: 'electronics', name: 'Electronics', icon: 'Smartphone', image: 'https://images.pexels.com/photos/7989742/pexels-photo-7989742.jpeg?auto=compress&cs=tinysrgb&h=400&w=400' },
  { id: 'fashion', name: 'Fashion', icon: 'Shirt', image: 'https://images.pexels.com/photos/27127416/pexels-photo-27127416.jpeg?auto=compress&cs=tinysrgb&h=400&w=400' },
  { id: 'beauty', name: 'Beauty', icon: 'Sparkles', image: 'https://images.pexels.com/photos/3018845/pexels-photo-3018845.jpeg?auto=compress&cs=tinysrgb&h=400&w=400' },
  { id: 'home', name: 'Home', icon: 'Home', image: 'https://images.pexels.com/photos/31410610/pexels-photo-31410610.jpeg?auto=compress&cs=tinysrgb&h=400&w=400' },
  { id: 'accessories', name: 'Accessories', icon: 'Watch', image: 'https://images.pexels.com/photos/28977357/pexels-photo-28977357.jpeg?auto=compress&cs=tinysrgb&h=400&w=400' },
]

export const products = [
  {
    id: 1, name: 'Galaxy Ultra Smartphone', description: 'Experience the next generation of mobile technology with a stunning 6.8-inch display, 200MP camera, and all-day battery life. The ultimate flagship phone for power users.', price: 4200, oldPrice: 4800, image: 'https://images.pexels.com/photos/36680544/pexels-photo-36680544.jpeg?auto=compress&cs=tinysrgb&h=600&w=600', category: 'electronics', rating: 4.8, reviews: 124, stock: 15, featured: true, newArrival: false,
  },
  {
    id: 2, name: 'Wireless Noise-Cancel Headphones', description: 'Immerse yourself in pure sound with premium noise cancellation, 40-hour battery life, and ultra-comfortable ear cushions. Perfect for music lovers and travelers.', price: 850, oldPrice: 1100, image: 'https://images.pexels.com/photos/9058883/pexels-photo-9058883.jpeg?auto=compress&cs=tinysrgb&h=600&w=600', category: 'electronics', rating: 4.7, reviews: 89, stock: 30, featured: true, newArrival: true,
  },
  {
    id: 3, name: 'UltraBook Pro 14 Laptop', description: 'Thin, light, and powerful. Featuring an Intel Core i7 processor, 16GB RAM, 512GB SSD, and a stunning 14-inch Retina display. Built for professionals on the go.', price: 6500, oldPrice: null, image: 'https://images.pexels.com/photos/12200696/pexels-photo-12200696.jpeg?auto=compress&cs=tinysrgb&h=600&w=600', category: 'electronics', rating: 4.9, reviews: 56, stock: 8, featured: true, newArrival: false,
  },
  {
    id: 4, name: 'Classic Leather Chronograph Watch', description: 'A timeless luxury chronograph with genuine leather strap, sapphire crystal, and water resistance up to 100m. Elegance meets precision.', price: 1250, oldPrice: 1600, image: 'https://images.pexels.com/photos/28977357/pexels-photo-28977357.jpeg?auto=compress&cs=tinysrgb&h=600&w=600', category: 'accessories', rating: 4.6, reviews: 42, stock: 12, featured: true, newArrival: false,
  },
  {
    id: 5, name: 'Urban Street Sneakers', description: 'Step out in style with these premium sneakers. Lightweight construction, breathable mesh upper, and durable rubber outsole for all-day comfort.', price: 320, oldPrice: 450, image: 'https://images.pexels.com/photos/19845610/pexels-photo-19845610.jpeg?auto=compress&cs=tinysrgb&h=600&w=600', category: 'fashion', rating: 4.5, reviews: 78, stock: 50, featured: true, newArrival: true,
  },
  {
    id: 6, name: 'Designer Denim Jacket', description: 'A classic denim jacket crafted from premium cotton denim. Versatile, durable, and perfect for layering in any season.', price: 280, oldPrice: null, image: 'https://images.pexels.com/photos/3649765/pexels-photo-3649765.jpeg?auto=compress&cs=tinysrgb&h=600&w=600', category: 'fashion', rating: 4.4, reviews: 34, stock: 25, featured: false, newArrival: true,
  },
  {
    id: 7, name: 'Luxury Makeup Collection', description: 'A curated set of premium makeup essentials. Includes foundation, eyeshadow palette, lipsticks, and brushes. Everything you need for a flawless look.', price: 450, oldPrice: 600, image: 'https://images.pexels.com/photos/3018845/pexels-photo-3018845.jpeg?auto=compress&cs=tinysrgb&h=600&w=600', category: 'beauty', rating: 4.6, reviews: 91, stock: 40, featured: true, newArrival: false,
  },
  {
    id: 8, name: 'Premium Leather Handbag', description: 'Handcrafted from genuine full-grain leather. Spacious interior with multiple compartments. A perfect blend of style and functionality.', price: 680, oldPrice: 900, image: 'https://images.pexels.com/photos/27174573/pexels-photo-27174573.jpeg?auto=compress&cs=tinysrgb&h=600&w=600', category: 'accessories', rating: 4.7, reviews: 65, stock: 18, featured: false, newArrival: true,
  },
  {
    id: 9, name: 'Polarized Designer Sunglasses', description: 'UV400 protection with polarized lenses. Lightweight acetate frame with a timeless design. Comes with a premium case and cleaning cloth.', price: 180, oldPrice: 250, image: 'https://images.pexels.com/photos/10237074/pexels-photo-10237074.jpeg?auto=compress&cs=tinysrgb&h=600&w=600', category: 'accessories', rating: 4.3, reviews: 28, stock: 35, featured: false, newArrival: false,
  },
  {
    id: 10, name: 'Modern Desk Lamp', description: 'Adjustable LED desk lamp with 3 brightness levels and a sleek minimalist design. Perfect for home office or study.', price: 150, oldPrice: null, image: 'https://images.pexels.com/photos/31410610/pexels-photo-31410610.jpeg?auto=compress&cs=tinysrgb&h=600&w=600', category: 'home', rating: 4.5, reviews: 19, stock: 22, featured: false, newArrival: true,
  },
  {
    id: 11, name: 'FitPro Smart Watch', description: 'Track your fitness, heart rate, sleep, and more. Water-resistant with a 7-day battery life. Compatible with iOS and Android.', price: 520, oldPrice: 700, image: 'https://images.pexels.com/photos/31541678/pexels-photo-31541678.jpeg?auto=compress&cs=tinysrgb&h=600&w=600', category: 'electronics', rating: 4.6, reviews: 112, stock: 28, featured: true, newArrival: true,
  },
  {
    id: 12, name: 'Pro DSLR Camera Kit', description: '24.2MP sensor, 4K video recording, and interchangeable lens system. Includes 18-55mm lens, carrying strap, and 64GB SD card.', price: 3800, oldPrice: 4500, image: 'https://images.pexels.com/photos/1203819/pexels-photo-1203819.jpeg?auto=compress&cs=tinysrgb&h=600&w=600', category: 'electronics', rating: 4.8, reviews: 47, stock: 6, featured: false, newArrival: false,
  },
  {
    id: 13, name: 'Eau de Parfum Spray', description: 'A sophisticated fragrance with notes of bergamot, jasmine, and sandalwood. Long-lasting scent in an elegant 100ml bottle.', price: 340, oldPrice: null, image: 'https://images.pexels.com/photos/28481966/pexels-photo-28481966.jpeg?auto=compress&cs=tinysrgb&h=600&w=600', category: 'beauty', rating: 4.5, reviews: 53, stock: 33, featured: false, newArrival: true,
  },
  {
    id: 14, name: 'Portable Bluetooth Speaker', description: '360-degree sound with deep bass. Waterproof design, 20-hour battery life, and Bluetooth 5.0. Perfect for parties and outdoor adventures.', price: 230, oldPrice: 320, image: 'https://images.pexels.com/photos/2659939/pexels-photo-2659939.jpeg?auto=compress&cs=tinysrgb&h=600&w=600', category: 'electronics', rating: 4.4, reviews: 67, stock: 45, featured: false, newArrival: false,
  },
  {
    id: 15, name: 'Travel Backpack 30L', description: 'Durable, water-resistant backpack with USB charging port, laptop compartment, and anti-theft pockets. Perfect for daily commute or travel.', price: 190, oldPrice: 260, image: 'https://images.pexels.com/photos/33861296/pexels-photo-33861296.jpeg?auto=compress&cs=tinysrgb&h=600&w=600', category: 'accessories', rating: 4.6, reviews: 84, stock: 60, featured: true, newArrival: false,
  },
  {
    id: 16, name: 'Minimalist Home Decor Set', description: 'A curated set of minimalist home decor pieces. Includes vase, picture frame, and decorative bowl. Elevate your living space.', price: 210, oldPrice: null, image: 'https://images.pexels.com/photos/20557088/pexels-photo-20557088.jpeg?auto=compress&cs=tinysrgb&h=600&w=600', category: 'home', rating: 4.3, reviews: 15, stock: 20, featured: false, newArrival: true,
  },
  {
    id: 17, name: 'Canvas Low-Top Sneakers', description: 'Classic canvas sneakers in white. Breathable, lightweight, and versatile. A wardrobe essential for every casual outfit.', price: 140, oldPrice: 200, image: 'https://images.pexels.com/photos/4296075/pexels-photo-4296075.jpeg?auto=compress&cs=tinysrgb&h=600&w=600', category: 'fashion', rating: 4.2, reviews: 96, stock: 80, featured: false, newArrival: false,
  },
  {
    id: 18, name: 'Premium Skincare Set', description: 'A complete skincare routine in one set. Cleanser, toner, serum, and moisturizer. Formulated for all skin types with natural ingredients.', price: 380, oldPrice: 500, image: 'https://images.pexels.com/photos/3750640/pexels-photo-3750640.jpeg?auto=compress&cs=tinysrgb&h=600&w=600', category: 'beauty', rating: 4.7, reviews: 108, stock: 38, featured: true, newArrival: false,
  },
  {
    id: 19, name: 'Luxury Wristwatch Black Edition', description: 'A sophisticated black wristwatch with stainless steel case and silicone strap. Chronograph functionality with date display.', price: 980, oldPrice: 1300, image: 'https://images.pexels.com/photos/8839887/pexels-photo-8839887.jpeg?auto=compress&cs=tinysrgb&h=600&w=600', category: 'accessories', rating: 4.5, reviews: 31, stock: 14, featured: false, newArrival: false,
  },
  {
    id: 20, name: 'Red High-Top Sneakers', description: 'Bold red high-top sneakers with premium construction. Padded ankle support and grippy rubber sole for style and comfort.', price: 260, oldPrice: null, image: 'https://images.pexels.com/photos/26852497/pexels-photo-26852497.png?auto=compress&cs=tinysrgb&h=600&w=600', category: 'fashion', rating: 4.4, reviews: 22, stock: 30, featured: false, newArrival: true,
  },
]

export const reviews = [
  { id: 1, productId: 1, name: 'Edwin Acquah', avatar: 'https://i.pravatar.cc/100?img=12', rating: 5, comment: 'Absolutely love this phone! The camera quality is incredible and the battery lasts all day.', date: '2026-09-15' },
  { id: 2, productId: 1, name: 'Sarah Mensah', avatar: 'https://i.pravatar.cc/100?img=5', rating: 4, comment: 'Great phone overall, but the price is a bit steep. Still worth it for the features.', date: '2026-09-10' },
  { id: 3, productId: 1, name: 'Kwame Boateng', avatar: 'https://i.pravatar.cc/100?img=33', rating: 5, comment: 'Best smartphone I have ever owned. Highly recommend!', date: '2026-09-01' },
  { id: 4, productId: 2, name: 'Ama Owusu', avatar: 'https://i.pravatar.cc/100?img=20', rating: 5, comment: 'The noise cancellation is amazing. I use them every day on my commute.', date: '2026-09-18' },
  { id: 5, productId: 2, name: 'Daniel Adjei', avatar: 'https://i.pravatar.cc/100?img=15', rating: 4, comment: 'Sound quality is top notch. Wish the case was a bit more compact.', date: '2026-09-05' },
  { id: 6, productId: 3, name: 'Grace Asante', avatar: 'https://i.pravatar.cc/100?img=9', rating: 5, comment: 'Perfect laptop for my work. Fast, light, and the display is gorgeous.', date: '2026-09-12' },
  { id: 7, productId: 4, name: 'Michael Osei', avatar: 'https://i.pravatar.cc/100?img=51', rating: 4, comment: 'Beautiful watch, looks even better in person. The leather strap is very comfortable.', date: '2026-09-08' },
  { id: 8, productId: 5, name: 'Linda Tetteh', avatar: 'https://i.pravatar.cc/100?img=25', rating: 5, comment: 'So comfortable and stylish. I get compliments every time I wear them.', date: '2026-09-20' },
]

export const orders = [
  {
    id: 'ORD-10245', date: '2026-09-25', items: [
      { productId: 1, name: 'Galaxy Ultra Smartphone', quantity: 1, price: 4200, image: 'https://images.pexels.com/photos/36680544/pexels-photo-36680544.jpeg?auto=compress&cs=tinysrgb&h=200&w=200' },
      { productId: 2, name: 'Wireless Noise-Cancel Headphones', quantity: 1, price: 850, image: 'https://images.pexels.com/photos/9058883/pexels-photo-9058883.jpeg?auto=compress&cs=tinysrgb&h=200&w=200' },
    ], total: 5050 + 30, subtotal: 5050, deliveryFee: 30, discount: 0, paymentStatus: 'Paid', deliveryStatus: 'Shipped', address: { name: 'Edwin Acquah', street: '12 Osu Lane', city: 'Accra', region: 'Greater Accra', phone: '+233 24 123 4567' },
  },
  {
    id: 'ORD-10244', date: '2026-09-20', items: [
      { productId: 5, name: 'Urban Street Sneakers', quantity: 2, price: 320, image: 'https://images.pexels.com/photos/19845610/pexels-photo-19845610.jpeg?auto=compress&cs=tinysrgb&h=200&w=200' },
    ], total: 640 + 30, subtotal: 640, deliveryFee: 30, discount: 0, paymentStatus: 'Paid', deliveryStatus: 'Delivered', address: { name: 'Edwin Acquah', street: '12 Osu Lane', city: 'Accra', region: 'Greater Accra', phone: '+233 24 123 4567' },
  },
  {
    id: 'ORD-10243', date: '2026-09-15', items: [
      { productId: 7, name: 'Luxury Makeup Collection', quantity: 1, price: 450, image: 'https://images.pexels.com/photos/3018845/pexels-photo-3018845.jpeg?auto=compress&cs=tinysrgb&h=200&w=200' },
      { productId: 13, name: 'Eau de Parfum Spray', quantity: 1, price: 340, image: 'https://images.pexels.com/photos/28481966/pexels-photo-28481966.jpeg?auto=compress&cs=tinysrgb&h=200&w=200' },
    ], total: 790 + 30, subtotal: 790, deliveryFee: 30, discount: 50, paymentStatus: 'Paid', deliveryStatus: 'Delivered', address: { name: 'Edwin Acquah', street: '12 Osu Lane', city: 'Accra', region: 'Greater Accra', phone: '+233 24 123 4567' },
  },
  {
    id: 'ORD-10242', date: '2026-09-08', items: [
      { productId: 11, name: 'FitPro Smart Watch', quantity: 1, price: 520, image: 'https://images.pexels.com/photos/31541678/pexels-photo-31541678.jpeg?auto=compress&cs=tinysrgb&h=200&w=200' },
    ], total: 520 + 60, subtotal: 520, deliveryFee: 60, discount: 0, paymentStatus: 'Paid', deliveryStatus: 'Delivered', address: { name: 'Edwin Acquah', street: '12 Osu Lane', city: 'Accra', region: 'Greater Accra', phone: '+233 24 123 4567' },
  },
]

export const userAddresses = [
  { id: 1, label: 'Home', name: 'Edwin Acquah', street: '12 Osu Lane', city: 'Accra', region: 'Greater Accra', phone: '+233 24 123 4567' },
  { id: 2, label: 'Work', name: 'Edwin Acquah', street: '45 Ring Road East', city: 'Kumasi', region: 'Ashanti', phone: '+233 20 987 6543' },
]

export const userProfile = {
  firstName: 'Edwin',
  lastName: 'Acquah',
  email: 'edwin@example.com',
  phone: '+233 24 123 4567',
}

export const trackingSteps = [
  { id: 1, label: 'Order Placed', date: 'September 25', completed: true },
  { id: 2, label: 'Payment Confirmed', date: 'September 25', completed: true },
  { id: 3, label: 'Preparing Order', date: 'September 25', completed: true },
  { id: 4, label: 'Shipped', date: 'September 26', completed: true },
  { id: 5, label: 'Out for Delivery', date: 'September 27', completed: false },
  { id: 6, label: 'Delivered', date: 'September 27', completed: false },
]
