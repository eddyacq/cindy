import { Link } from 'react-router-dom'
import { Package, CheckCircle2, Truck } from 'lucide-react'

export function OrderCard({ order }) {
  const statusColor = {
    'Paid': 'text-green-600 bg-green-50',
    'Pending': 'text-amber-600 bg-amber-50',
    'Shipped': 'text-blue-600 bg-blue-50',
    'Delivered': 'text-green-600 bg-green-50',
    'Processing': 'text-amber-600 bg-amber-50',
  }

  return (
    <div className="card p-5">
      <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
        <div>
          <p className="font-semibold text-gray-900">Order #{order.id}</p>
          <p className="text-sm text-gray-500">{new Date(order.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
        </div>
        <div className="flex gap-2">
          <span className={`badge ${statusColor[order.paymentStatus] || 'text-gray-600 bg-gray-50'}`}>{order.paymentStatus}</span>
          <span className={`badge ${statusColor[order.deliveryStatus] || 'text-gray-600 bg-gray-50'}`}>{order.deliveryStatus}</span>
        </div>
      </div>
      <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
        <Package size={16} />
        {order.items.reduce((s, i) => s + i.quantity, 0)} Items
        <span className="font-semibold text-gray-900 ml-auto">GH₵ {order.total.toLocaleString()}</span>
      </div>
      <Link to={`/account/orders/${order.id}`} className="btn-outline w-full">
        View Order
      </Link>
    </div>
  )
}
