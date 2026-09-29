import { Link, useParams } from 'react-router-dom'
import { Truck, ArrowLeft } from 'lucide-react'
import { AccountSidebar } from '../components/AccountSidebar'
import { OrderTimeline } from '../components/OrderTimeline'
import { orders, trackingSteps } from '../data/mockData'

export function OrderDetailsPage() {
  const { id } = useParams()
  const order = orders.find(o => o.id === id)

  if (!order) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <p className="text-gray-500">Order not found.</p>
        <Link to="/account/orders" className="btn-primary mt-4">Back to Orders</Link>
      </div>
    )
  }

  const statusColor = {
    'Paid': 'text-green-600 bg-green-50', 'Shipped': 'text-blue-600 bg-blue-50',
    'Delivered': 'text-green-600 bg-green-50', 'Processing': 'text-amber-600 bg-amber-50',
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <Link to="/account/orders" className="flex items-center gap-2 text-sm text-gray-500 hover:text-primary-600 mb-4">
        <ArrowLeft size={16} /> Back to Orders
      </Link>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Order #{order.id}</h1>
      <div className="grid lg:grid-cols-4 gap-6">
        <aside className="lg:col-span-1"><AccountSidebar /></aside>
        <div className="lg:col-span-3 space-y-4">
          <div className="card p-5">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
              <div>
                <p className="text-sm text-gray-500">Order Date</p>
                <p className="font-medium text-gray-900">{new Date(order.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
              </div>
              <div className="flex gap-2">
                <span className={`badge ${statusColor[order.paymentStatus]}`}>{order.paymentStatus}</span>
                <span className={`badge ${statusColor[order.deliveryStatus]}`}>{order.deliveryStatus}</span>
              </div>
            </div>
            <div className="space-y-3">
              {order.items.map((item, i) => (
                <div key={i} className="flex items-center gap-3 py-2 border-b border-gray-100 last:border-0">
                  <img src={item.image} alt={item.name} className="h-16 w-16 rounded-lg object-cover" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{item.name}</p>
                    <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                  </div>
                  <p className="text-sm font-semibold text-gray-900">GH₵ {(item.price * item.quantity).toLocaleString()}</p>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t border-gray-200 space-y-1.5 text-sm">
              <div className="flex justify-between text-gray-600"><span>Subtotal</span><span>GH₵ {order.subtotal.toLocaleString()}</span></div>
              <div className="flex justify-between text-gray-600"><span>Delivery Fee</span><span>GH₵ {order.deliveryFee.toLocaleString()}</span></div>
              {order.discount > 0 && <div className="flex justify-between text-green-600"><span>Discount</span><span>-GH₵ {order.discount.toLocaleString()}</span></div>}
              <div className="flex justify-between font-bold text-gray-900 pt-1.5"><span>Total</span><span>GH₵ {order.total.toLocaleString()}</span></div>
            </div>
          </div>

          <div className="card p-5">
            <h3 className="text-base font-semibold text-gray-900 mb-2">Delivery Address</h3>
            <p className="text-sm text-gray-600">{order.address.name}</p>
            <p className="text-sm text-gray-600">{order.address.street}, {order.address.city}</p>
            <p className="text-sm text-gray-600">{order.address.region}</p>
            <p className="text-sm text-gray-600">{order.address.phone}</p>
          </div>

          <div className="card p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-semibold text-gray-900">Order Tracking</h3>
              <Link to={`/track-order/${order.id}`} className="btn-outline text-sm">
                <Truck size={16} /> Track Order
              </Link>
            </div>
            <OrderTimeline steps={trackingSteps} />
          </div>
        </div>
      </div>
    </div>
  )
}
