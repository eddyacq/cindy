import { Star } from 'lucide-react'
import { Rating } from './ui/Rating'

export function ReviewCard({ review }) {
  return (
    <div className="flex gap-3 py-4 border-b border-gray-100 last:border-0">
      <img src={review.avatar} alt={review.name} className="h-10 w-10 rounded-full object-cover shrink-0" />
      <div>
        <div className="flex items-center gap-2">
          <p className="font-medium text-sm text-gray-900">{review.name}</p>
          <span className="text-xs text-gray-400">{new Date(review.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
        </div>
        <div className="mt-1">
          <Rating value={review.rating} size={12} />
        </div>
        <p className="text-sm text-gray-600 mt-1.5">{review.comment}</p>
      </div>
    </div>
  )
}
