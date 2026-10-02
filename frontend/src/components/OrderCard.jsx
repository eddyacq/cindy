import { Link } from 'react-router-dom'
import { Package } from 'lucide-react'
import PropTypes from 'prop-types'

const STATUS_COLOR = {
  paid: 'text-green-600 bg-green-50',
  pending: 'text-amber-600 bg-amber-50',
  failed: 'text-red-600 bg-red-50',
}

export function OrderCard({ order }) {
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
      <Link to={`/account/orders/${order.id}`} className="btn-outline w-full">
        View Order
      </Link>
    </div>
  )
}

OrderCard.propTypes = {
  order: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    createdAt: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]).isRequired,
    paymentStatus: PropTypes.string.isRequired,
    itemCount: PropTypes.number.isRequired,
    total: PropTypes.number.isRequired,
  }).isRequired,
}