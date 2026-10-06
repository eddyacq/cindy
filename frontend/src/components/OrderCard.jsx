import { Link } from 'react-router-dom'
import { Package, Truck } from 'lucide-react'
import PropTypes from 'prop-types'
import { DELIVERY_STATUS_LABELS } from '../utils/orderStatus'

const STATUS_COLOR = {
  paid: 'text-green-600 bg-green-50',
  pending: 'text-amber-600 bg-amber-50',
  failed: 'text-red-600 bg-red-50',
}

export function OrderCard({ order }) {
  const isPaid = order.paymentStatus === 'paid'

  return (
    <div className="card p-5">
      <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
        <div>
          <p className="font-semibold text-gray-900">Order #{order.id}</p>
          <p className="text-sm text-gray-500">{new Date(order.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
        </div>
        <span className={`badge capitalize ${STATUS_COLOR[order.paymentStatus] || 'text-gray-600 bg-gray-50'}`}>{order.paymentStatus}</span>
      </div>
      <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
        <Package size={16} />
        {order.itemCount} Items
        <span className="font-semibold text-gray-900 ml-auto">GH₵ {order.total.toLocaleString()}</span>
      </div>
      {isPaid && order.deliveryStatus && (
        <p className="flex items-center gap-1.5 text-xs text-primary-700 bg-primary-50 rounded-lg px-2.5 py-1.5 mb-4 w-fit">
          <Truck size={14} /> {DELIVERY_STATUS_LABELS[order.deliveryStatus]}
        </p>
      )}
      <div className="flex gap-2">
        <Link to={`/account/orders/${order.id}`} className="btn-outline flex-1">
          View Order
        </Link>
        {isPaid && (
          <Link to={`/track-order/${order.id}`} className="btn-primary flex-1">
            Track
          </Link>
        )}
      </div>
    </div>
  )
}

OrderCard.propTypes = {
  order: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    createdAt: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]).isRequired,
    paymentStatus: PropTypes.string.isRequired,
    deliveryStatus: PropTypes.string,
    itemCount: PropTypes.number.isRequired,
    total: PropTypes.number.isRequired,
  }).isRequired,
}
