import { Star } from 'lucide-react'

export function Rating({ value, size = 14, showNumber = false, count = null }) {
  return (
    <div className="flex items-center gap-1">
      <div className="flex items-center">
        {[1, 2, 3, 4, 5].map(n => (
          <Star
            key={n}
            size={size}
            className={n <= Math.round(value) ? 'fill-amber-400 text-amber-400' : 'fill-gray-200 text-gray-200'}
          />
        ))}
      </div>
      {showNumber && <span className="text-sm font-medium text-gray-700">{value.toFixed(1)}</span>}
      {count !== null && <span className="text-xs text-gray-500">({count})</span>}
    </div>
  )
}
