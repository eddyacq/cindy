import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { SearchX } from 'lucide-react'
import { ProductGrid } from '../components/ProductGrid'
import { ProductGridSkeleton } from '../components/ui/Skeleton'
import { EmptyState } from '../components/ui/EmptyState'
import { productService } from '../services/productService'

export function SearchPage() {
  const [searchParams] = useSearchParams()
  const q = searchParams.get('q') || ''
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!q) { setResults([]); return }
    setLoading(true)
    setError(null)
    productService.list({ search: q, limit: 24 })
      .then(res => setResults(res.data))
      .catch(() => setError('Unable to search right now.'))
      .finally(() => setLoading(false))
  }, [q])

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-2">
        {q ? `Search results for "${q}"` : 'Search Products'}
      </h1>
      {q && !loading && <p className="text-sm text-gray-500 mb-6">{results.length} product{results.length !== 1 ? 's' : ''} found</p>}

      {!q ? (
        <div className="card p-8 text-center">
          <p className="text-gray-500">Start searching by typing in the search bar above.</p>
        </div>
      ) : error ? (
        <EmptyState icon={SearchX} title="Something went wrong" description={error} />
      ) : loading ? (
        <ProductGridSkeleton count={8} />
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