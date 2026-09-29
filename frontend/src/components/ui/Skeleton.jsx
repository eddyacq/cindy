import PropTypes from 'prop-types'

export function Skeleton({ className = '' }) {
  return <div className={`animate-pulse bg-gray-200 rounded ${className}`} />
}

export function ProductCardSkeleton() {
  return (
    <div className="card p-4">
      <Skeleton className="aspect-square w-full rounded-lg" />
      <Skeleton className="h-4 w-3/4 mt-4" />
      <Skeleton className="h-3 w-1/2 mt-2" />
      <Skeleton className="h-5 w-1/3 mt-3" />
    </div>
  )
}

export function ProductGridSkeleton({ count = 8 }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
      {Array.from({ length: count }).map((_, i) => <ProductCardSkeleton key={i} />)}
    </div>
  )
}

Skeleton.propTypes = {
  className: PropTypes.string,
}

ProductGridSkeleton.propTypes = {
  count: PropTypes.number,
}
