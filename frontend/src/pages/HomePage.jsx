import { Link } from 'react-router-dom'
import { ArrowRight, Sparkles } from 'lucide-react'
import { ProductGrid } from '../components/ProductGrid'
import { CategoryCard } from '../components/CategoryCard'
import { categories, products } from '../data/mockData'

export function HomePage() {
  const featured = products.filter(p => p.featured).slice(0, 8)
  const newArrivals = products.filter(p => p.newArrival).slice(0, 4)

  return (
    <div>
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-primary-50 via-white to-accent-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-20">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div className="animate-fade-in">
              <span className="badge bg-primary-100 text-primary-700 mb-4">New Season Collection</span>
              <h1 className="text-3xl sm:text-5xl font-bold text-gray-900 leading-tight">
                Discover Quality Products for Modern Living
              </h1>
              <p className="mt-4 text-base text-gray-600 max-w-md">
                Shop the latest electronics, fashion, beauty, and more. Premium products at unbeatable prices, delivered to your door.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link to="/shop" className="btn-primary text-base px-6 py-3">
                  Shop Now <ArrowRight size={18} />
                </Link>
                <a href="#categories" className="btn-outline text-base px-6 py-3">
                  View Categories
                </a>
              </div>
            </div>
            <div className="relative hidden lg:block">
              <img
                src="https://images.pexels.com/photos/7679784/pexels-photo-7679784.jpeg?auto=compress&cs=tinysrgb&h=600&w=800"
                alt="Shopping"
                className="rounded-2xl shadow-lg w-full h-[400px] object-cover"
              />
              <div className="absolute -bottom-4 -left-4 card p-4 flex items-center gap-3 animate-fade-in">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100 text-green-600">
                  <Sparkles size={20} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">Up to 30% Off</p>
                  <p className="text-xs text-gray-500">Selected items</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section id="categories" className="max-w-7xl mx-auto px-4 sm:px-6 py-12 scroll-mt-20">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Featured Categories</h2>
          <Link to="/shop" className="text-sm font-medium text-primary-600 hover:text-primary-700 flex items-center gap-1">
            View All <ArrowRight size={16} />
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {categories.map(c => <CategoryCard key={c.id} category={c} />)}
        </div>
      </section>

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Featured Products</h2>
          <Link to="/shop" className="text-sm font-medium text-primary-600 hover:text-primary-700 flex items-center gap-1">
            View All <ArrowRight size={16} />
          </Link>
        </div>
        <ProductGrid products={featured} />
      </section>

      {/* Promo Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-primary-700 to-primary-900 px-6 py-12 sm:px-12 sm:py-16 text-center">
          <div className="relative z-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-white">Up to 30% Off</h2>
            <p className="mt-2 text-primary-100 max-w-md mx-auto">Don't miss our biggest sale of the season. Limited time only.</p>
            <Link to="/shop" className="btn bg-white text-primary-700 hover:bg-primary-50 mt-6 px-6 py-3 text-base font-semibold">
              Shop Deals <ArrowRight size={18} />
            </Link>
          </div>
          <div className="absolute right-0 top-0 h-full w-1/2 opacity-10">
            <div className="h-full w-full bg-gradient-to-l from-white/30 to-transparent" />
          </div>
        </div>
      </section>

      {/* New Arrivals */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">New Arrivals</h2>
          <Link to="/shop" className="text-sm font-medium text-primary-600 hover:text-primary-700 flex items-center gap-1">
            View All <ArrowRight size={16} />
          </Link>
        </div>
        <ProductGrid products={newArrivals} />
      </section>
    </div>
  )
}
