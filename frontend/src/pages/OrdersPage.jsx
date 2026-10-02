import { useState, useEffect } from 'react'
import { AccountSidebar } from '../components/AccountSidebar'
import { OrderCard } from '../components/OrderCard'
import { EmptyState } from '../components/ui/EmptyState'
import { ShoppingBag } from 'lucide-react'
import { orderService } from '../services/orderService'

export function OrdersPage() {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    orderService.list()
      .then(res => setOrders(res.data))
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">My Orders</h1>
      <div className="grid lg:grid-cols-4 gap-6">
        <aside className="lg:col-span-1"><AccountSidebar /></aside>
        <div className="lg:col-span-3">
          {loading ? (
            <div className="grid sm:grid-cols-2 gap-4">
              {[1, 2].map(i => <div key={i} className="card p-5 h-32 bg-gray-100 animate-pulse" />)}
            </div>
          ) : orders.length > 0 ? (
            <div className="grid sm:grid-cols-2 gap-4">
              {orders.map(o => <OrderCard key={o.id} order={o} />)}
            </div>
          ) : (
            <EmptyState icon={ShoppingBag} title="No orders yet" description="When you place an order, it will appear here." />
          )}
        </div>
      </div>
    </div>
  )
}