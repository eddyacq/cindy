import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, Loader2 } from 'lucide-react'
import { OrderTimeline } from '../components/OrderTimeline'
import { orderService } from '../services/orderService'
import { DELIVERY_STATUS_ORDER, DELIVERY_STATUS_LABELS } from '../utils/orderStatus'

function buildSteps(order) {
  const currentIndex = DELIVERY_STATUS_ORDER.indexOf(order.deliveryStatus)
  return DELIVERY_STATUS_ORDER.map((status, i) => ({
    id: status,
    label: DELIVERY_STATUS_LABELS[status],
    completed: i <= currentIndex,
    // we only record a timestamp for when the order was placed, not for each later stage
    date: status === 'order_placed'
      ? new Date(order.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
      : undefined,
  }))
}

export function TrackOrderPage() {
  const { id } = useParams()
  const [order, setOrder] = useState(null)
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    setLoading(true)
    orderService.getById(id)
      .then((res) => setOrder(res.data))
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false))
  }, [id])

  if (loading) {
    return (
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-24 flex justify-center text-gray-400">
        <Loader2 size={28} className="animate-spin" />
      </div>
    )
  }

  if (notFound || !order) {
    return (
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8">
        <p className="text-gray-500">Order not found.</p>
        <Link to="/account/orders" className="btn-primary mt-4 inline-flex">Back to Orders</Link>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8">
      <Link to={`/account/orders/${id}`} className="flex items-center gap-2 text-sm text-gray-500 hover:text-primary-600 mb-4">
        <ArrowLeft size={16} /> Back to Order
      </Link>
      <h1 className="text-2xl font-bold text-gray-900 mb-2">Track Order #{order.id}</h1>

      {order.paymentStatus === 'pending' && (
        <p className="text-sm text-amber-600 bg-amber-50 rounded-lg px-3 py-2 mb-6">
          Waiting for payment confirmation before this order starts moving.
        </p>
      )}
      {order.paymentStatus === 'failed' && (
        <p className="text-sm text-red-600 bg-red-50 rounded-lg px-3 py-2 mb-6">
          Payment for this order failed, so it will not be processed. Place a new order to try again.
        </p>
      )}
      {order.paymentStatus === 'paid' && order.deliveryStatus !== 'delivered' && (
        <p className="text-sm text-gray-500 mb-6">Current status: {DELIVERY_STATUS_LABELS[order.deliveryStatus]}</p>
      )}
      {order.deliveryStatus === 'delivered' && (
        <p className="text-sm text-green-600 mb-6">Delivered — enjoy your order!</p>
      )}

      <div className="card p-6">
        <OrderTimeline steps={buildSteps(order)} />
      </div>
    </div>
  )
}
