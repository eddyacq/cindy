import { useSearchParams, Link } from 'react-router-dom'
import { SearchX } from 'lucide-react'
import { ProductGrid } from '../components/ProductGrid'
import { EmptyState } from '../components/ui/EmptyState'
import { products } from '../data/mockData'

export function SearchPage() {
  const [searchParams] = useSearchParams()
  const q = searchParams.get('q') || ''
  const results = q
    ? products.filter(p =>
        p.name.toLowerCase().includes(q.toLowerCase()) ||
        p.description.toLowerCase().includes(q.toLowerCase()) ||
        p.category.toLowerCase().includes(q.toLowerCase())
      )
    : []

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-2">
        {q ? `Search results for "${q}"` : 'Search Products'}
      </h1>
      {q && <p className="text-sm text-gray-500 mb-6">{results.length} product{results.length !== 1 ? 's' : ''} found</p>}

      {!q ? (
        <div className="card p-8 text-center">
          <p className="text-gray-500">Start searching by typing in the search bar above.</p>
        </div>
      ) : results.length === 0 ? (
        <EmptyState
          icon={SearchX}
          title="No products found"
          description="Try searching for something else."
          actionLabel="Browse All Products"
          onAction={() => window.location.href = '/shop'}
        />
      ) : (
        <ProductGrid products={results} />
      )}
    </div>
  )
}
