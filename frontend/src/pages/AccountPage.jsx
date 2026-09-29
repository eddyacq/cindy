import { Link } from 'react-router-dom'
import { ShoppingBag, Package, Heart, Truck } from 'lucide-react'
import { AccountSidebar } from '../components/AccountSidebar'
import { useAuth } from '../context/AuthContext'
import { useWishlist } from '../context/WishlistContext'
import { orders } from '../data/mockData'

export function AccountPage() {
  const { user } = useAuth()
  const { count: wishlistCount } = useWishlist()
  const totalItems = orders.reduce((s, o) => s + o.items.reduce((a, i) => a + i.quantity, 0), 0)
  const pending = orders.filter(o => o.deliveryStatus !== 'Delivered').length

  const stats = [
    { label: 'Total Orders', value: orders.length, icon: ShoppingBag, color: 'bg-blue-50 text-blue-600' },
    { label: 'Items Purchased', value: totalItems, icon: Package, color: 'bg-green-50 text-green-600' },
    { label: 'Wishlist', value: wishlistCount, icon: Heart, color: 'bg-red-50 text-red-600' },
    { label: 'Pending Delivery', value: pending, icon: Truck, color: 'bg-amber-50 text-amber-600' },
  ]

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Welcome back, {user?.firstName || 'User'}</h1>
      <div className="grid lg:grid-cols-4 gap-6">
        <aside className="lg:col-span-1"><AccountSidebar /></aside>
        <div className="lg:col-span-3">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map(s => (
              <div key={s.label} className="card p-5">
                <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${s.color}`}>
                  <s.icon size={20} />
                </div>
                <p className="text-2xl font-bold text-gray-900 mt-3">{s.value}</p>
                <p className="text-sm text-gray-500">{s.label}</p>
              </div>
            ))}
          </div>
          <div className="card p-5 mt-4">
            <h2 className="text-base font-semibold text-gray-900 mb-4">Recent Orders</h2>
            <div className="space-y-3">
              {orders.slice(0, 3).map(o => (
                <Link key={o.id} to={`/account/orders/${o.id}`} className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition">
                  <div>
                    <p className="text-sm font-medium text-gray-900">Order #{o.id}</p>
                    <p className="text-xs text-gray-500">{new Date(o.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })} • {o.items.length} items</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-gray-900">GH₵ {o.total.toLocaleString()}</p>
                    <span className="text-xs text-gray-500">{o.deliveryStatus}</span>
                  </div>
                </Link>
              ))}
            </div>
            <Link to="/account/orders" className="btn-outline w-full mt-4">View All Orders</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
