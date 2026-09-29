import { useState, useEffect } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import { SlidersHorizontal, X, SearchX } from 'lucide-react'
import { ProductGrid } from '../components/ProductGrid'
import { ProductGridSkeleton } from '../components/ui/Skeleton'
import { EmptyState } from '../components/ui/EmptyState'
import { categoryService } from '../services/categoryService'
import { productService } from '../services/productService'

const SORT_OPTIONS = [
  ['featured', 'Sort: Featured'],
  ['newest', 'Newest'],
  ['price_asc', 'Price: Low to High'],
  ['price_desc', 'Price: High to Low'],
]

export function ShopPage() {
  const { category } = useParams()
  const [searchParams] = useSearchParams()
  const query = searchParams.get('q') || ''

  const [categories, setCategories] = useState([])
  const [search, setSearch] = useState(query)
  const [selectedCategory, setSelectedCategory] = useState(category || 'all')
  const [sortBy, setSortBy] = useState('featured')
  const [products, setProducts] = useState([])
  const [pagination, setPagination] = useState({ page: 1, totalPages: 1 })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [filtersOpen, setFiltersOpen] = useState(false)

  useEffect(() => {
    categoryService.list().then(res => setCategories(res.data)).catch(() => {})
  }, [])

  // debounce typing in the search box so we don't fire a request on every keystroke
  useEffect(() => {
    const handle = setTimeout(() => fetchProducts(1), search !== query ? 400 : 0)
    return () => clearTimeout(handle)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, selectedCategory, sortBy])

  function fetchProducts(page) {
    setLoading(true)
    setError(null)
    productService
      .list({
        search: search || undefined,
        category: selectedCategory !== 'all' ? selectedCategory : undefined,
        sort: sortBy === 'featured' ? undefined : sortBy,
        page,
        limit: 12,
      })
      .then((res) => {
        setProducts(res.data)
        setPagination(res.pagination)
      })
      .catch(() => setError('Unable to load products right now.'))
      .finally(() => setLoading(false))
  }

  const clearFilters = () => { setSearch(''); setSelectedCategory('all'); setSortBy('featured') }

  const FilterContent = () => (
    <div className="space-y-6">
      <div>
        <h4 className="text-sm font-semibold text-gray-900 mb-3">Categories</h4>
        <div className="space-y-1.5">
          <button onClick={() => setSelectedCategory('all')} className={`block w-full text-left px-3 py-2 rounded-lg text-sm transition ${selectedCategory === 'all' ? 'bg-primary-50 text-primary-700 font-medium' : 'text-gray-600 hover:bg-gray-100'}`}>All Categories</button>
          {categories.map(c => (
            <button key={c.id} onClick={() => setSelectedCategory(c.name.toLowerCase())} className={`block w-full text-left px-3 py-2 rounded-lg text-sm capitalize transition ${selectedCategory === c.name.toLowerCase() ? 'bg-primary-50 text-primary-700 font-medium' : 'text-gray-600 hover:bg-gray-100'}`}>
              {c.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  )

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">
        {selectedCategory !== 'all' ? <span className="capitalize">{selectedCategory}</span> : 'Shop All Products'}
      </h1>

      <div className="flex gap-6">
        <aside className="hidden lg:block w-64 shrink-0">
          <div className="card p-5 sticky top-20">
            <FilterContent />
          </div>
        </aside>

        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search products..."
              className="input flex-1 min-w-48"
            />
            <select value={sortBy} onChange={e => setSortBy(e.target.value)} className="input w-auto">
              {SORT_OPTIONS.map(([val, label]) => <option key={val} value={val}>{label}</option>)}
            </select>
            <button onClick={() => setFiltersOpen(true)} className="btn-outline lg:hidden">
              <SlidersHorizontal size={16} /> Filters
            </button>
          </div>

          {error ? (
            <EmptyState icon={SearchX} title="Something went wrong" description={error} actionLabel="Try Again" onAction={() => fetchProducts(pagination.page)} />
          ) : loading ? (
            <ProductGridSkeleton count={8} />
          ) : products.length === 0 ? (
            <EmptyState icon={SearchX} title="No products found" description="Try adjusting your filters or search terms." actionLabel="Clear Filters" onAction={clearFilters} />
          ) : (
            <>
              <p className="text-sm text-gray-500 mb-4">{pagination.total} products found</p>
              <ProductGrid products={products} />
              {pagination.totalPages > 1 && (
                <div className="flex justify-center gap-2 mt-8">
                  {Array.from({ length: pagination.totalPages }).map((_, i) => (
                    <button
                      key={i}
                      onClick={() => fetchProducts(i + 1)}
                      className={`h-9 w-9 rounded-lg text-sm font-medium transition ${pagination.page === i + 1 ? 'bg-primary-600 text-white' : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'}`}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>

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
              Show Results
            </button>
          </div>
        </div>
      )}
    </div>
  )
}