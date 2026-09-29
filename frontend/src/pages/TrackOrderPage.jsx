import { useParams, Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { OrderTimeline } from '../components/OrderTimeline'
import { trackingSteps } from '../data/mockData'

export function TrackOrderPage() {
  const { id } = useParams()

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8">
      <Link to="/account/orders" className="flex items-center gap-2 text-sm text-gray-500 hover:text-primary-600 mb-4">
        <ArrowLeft size={16} /> Back to Orders
      </Link>
      <h1 className="text-2xl font-bold text-gray-900 mb-2">Track Order #{id}</h1>
      <p className="text-sm text-gray-500 mb-6">Estimated delivery: September 27, 2026</p>
      <div className="card p-6">
        <OrderTimeline steps={trackingSteps} />
      </div>
    </div>
  )
}
