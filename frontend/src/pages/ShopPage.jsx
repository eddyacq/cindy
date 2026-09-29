import { useState, useMemo } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import { SlidersHorizontal, X } from 'lucide-react'
import { ProductGrid } from '../components/ProductGrid'
import { ProductGridSkeleton } from '../components/ui/Skeleton'
import { EmptyState } from '../components/ui/EmptyState'
import { SearchX } from 'lucide-react'
import { products, categories } from '../data/mockData'

export function ShopPage() {
  const { category } = useParams()
  const [searchParams] = useSearchParams()
  const query = searchParams.get('q') || ''

  const [search, setSearch] = useState(query)
  const [selectedCategory, setSelectedCategory] = useState(category || 'all')
  const [priceRange, setPriceRange] = useState('all')
  const [minRating, setMinRating] = useState(0)
  const [inStockOnly, setInStockOnly] = useState(false)
  const [sortBy, setSortBy] = useState('featured')
  const [loading, setLoading] = useState(false)
  const [filtersOpen, setFiltersOpen] = useState(false)

  const priceRanges = {
    'all': [0, Infinity],
    '0-200': [0, 200],
    '200-500': [200, 500],
    '500-1000': [500, 1000],
    '1000+': [1000, Infinity],
  }

  const filtered = useMemo(() => {
    let result = [...products]
    if (search) result = result.filter(p => p.name.toLowerCase().includes(search.toLowerCase()) || p.description.toLowerCase().includes(search.toLowerCase()))
    if (selectedCategory !== 'all') result = result.filter(p => p.category === selectedCategory)
    const [min, max] = priceRanges[priceRange]
    result = result.filter(p => p.price >= min && p.price < max)
    if (minRating > 0) result = result.filter(p => p.rating >= minRating)
    if (inStockOnly) result = result.filter(p => p.stock > 0)

    switch (sortBy) {
      case 'newest': result.sort((a, b) => b.newArrival - a.newArrival); break
      case 'price-low': result.sort((a, b) => a.price - b.price); break
      case 'price-high': result.sort((a, b) => b.price - a.price); break
      case 'rating': result.sort((a, b) => b.rating - a.rating); break
      default: result.sort((a, b) => b.featured - a.featured)
    }
    return result
  }, [search, selectedCategory, priceRange, minRating, inStockOnly, sortBy])

  const FilterContent = () => (
    <div className="space-y-6">
      <div>
        <h4 className="text-sm font-semibold text-gray-900 mb-3">Categories</h4>
        <div className="space-y-1.5">
          <button onClick={() => setSelectedCategory('all')} className={`block w-full text-left px-3 py-2 rounded-lg text-sm transition ${selectedCategory === 'all' ? 'bg-primary-50 text-primary-700 font-medium' : 'text-gray-600 hover:bg-gray-100'}`}>All Categories</button>
          {categories.map(c => (
            <button key={c.id} onClick={() => setSelectedCategory(c.id)} className={`block w-full text-left px-3 py-2 rounded-lg text-sm capitalize transition ${selectedCategory === c.id ? 'bg-primary-50 text-primary-700 font-medium' : 'text-gray-600 hover:bg-gray-100'}`}>
              {c.name}
            </button>
          ))}
        </div>
      </div>
      <div>
        <h4 className="text-sm font-semibold text-gray-900 mb-3">Price Range</h4>
        <div className="space-y-1.5">
          {[['all', 'All Prices'], ['0-200', 'Under GH₵ 200'], ['200-500', 'GH₵ 200 - 500'], ['500-1000', 'GH₵ 500 - 1,000'], ['1000+', 'Over GH₵ 1,000']].map(([val, label]) => (
            <button key={val} onClick={() => setPriceRange(val)} className={`block w-full text-left px-3 py-2 rounded-lg text-sm transition ${priceRange === val ? 'bg-primary-50 text-primary-700 font-medium' : 'text-gray-600 hover:bg-gray-100'}`}>
              {label}
            </button>
          ))}
        </div>
      </div>
      <div>
        <h4 className="text-sm font-semibold text-gray-900 mb-3">Rating</h4>
        <div className="space-y-1.5">
          {[0, 3, 4, 4.5].map(r => (
            <button key={r} onClick={() => setMinRating(r)} className={`block w-full text-left px-3 py-2 rounded-lg text-sm transition ${minRating === r ? 'bg-primary-50 text-primary-700 font-medium' : 'text-gray-600 hover:bg-gray-100'}`}>
              {r === 0 ? 'All Ratings' : `${r}+ Stars`}
            </button>
          ))}
        </div>
      </div>
      <div>
        <h4 className="text-sm font-semibold text-gray-900 mb-3">Availability</h4>
        <label className="flex items-center gap-2 cursor-pointer">
          <input type="checkbox" checked={inStockOnly} onChange={e => setInStockOnly(e.target.checked)} className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500" />
          <span className="text-sm text-gray-600">In Stock Only</span>
        </label>
      </div>
    </div>
  )

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">
        {selectedCategory !== 'all' ? <span className="capitalize">{selectedCategory}</span> : 'Shop All Products'}
      </h1>

      <div className="flex gap-6">
        {/* Desktop sidebar */}
        <aside className="hidden lg:block w-64 shrink-0">
          <div className="card p-5 sticky top-20">
            <FilterContent />
          </div>
        </aside>

        <div className="flex-1 min-w-0">
          {/* Search + sort */}
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search products..."
              className="input flex-1 min-w-48"
            />
            <select value={sortBy} onChange={e => setSortBy(e.target.value)} className="input w-auto">
              <option value="featured">Sort: Featured</option>
              <option value="newest">Newest</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
            <button onClick={() => setFiltersOpen(true)} className="btn-outline lg:hidden">
              <SlidersHorizontal size={16} /> Filters
            </button>
          </div>

          <p className="text-sm text-gray-500 mb-4">{filtered.length} products found</p>

          {loading ? (
            <ProductGridSkeleton count={8} />
          ) : filtered.length === 0 ? (
            <EmptyState icon={SearchX} title="No products found" description="Try adjusting your filters or search terms." actionLabel="Clear Filters" onAction={() => { setSearch(''); setSelectedCategory('all'); setPriceRange('all'); setMinRating(0); setInStockOnly(false) }} />
          ) : (
            <ProductGrid products={filtered} />
          )}
        </div>
      </div>

      {/* Mobile filter drawer */}
      {filtersOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setFiltersOpen(false)} />
          <div className="absolute right-0 top-0 bottom-0 w-80 max-w-full bg-white p-5 overflow-y-auto animate-slide-in">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Filters</h3>
              <button onClick={() => setFiltersOpen(false)} className="p-1.5 rounded-lg hover:bg-gray-100">
                <X size={20} />
              </button>
            </div>
            <FilterContent />
            <button onClick={() => setFiltersOpen(false)} className="btn-primary w-full mt-6">
              Show {filtered.length} Results
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
