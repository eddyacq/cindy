import { Link } from 'react-router-dom'
import { Package, Truck } from 'lucide-react'
import { AccountSidebar } from '../components/AccountSidebar'
import { EmptyState } from '../components/ui/EmptyState'
import { orders } from '../data/mockData'

export function MyItemsPage() {
  const allItems = orders.flatMap(o => o.items.map(i => ({ ...i, orderId: o.id, date: o.date, deliveryStatus: o.deliveryStatus })))

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">My Items</h1>
      <div className="grid lg:grid-cols-4 gap-6">
        <aside className="lg:col-span-1"><AccountSidebar /></aside>
        <div className="lg:col-span-3">
          {allItems.length > 0 ? (
            <div className="space-y-3">
              {allItems.map((item, i) => (
                <div key={i} className="card p-4 flex items-center gap-4">
                  <img src={item.image} alt={item.name} className="h-16 w-16 rounded-lg object-cover shrink-0" />
                  <div className="flex-1 min-w-0">
                    <Link to={`/product/${item.productId}`} className="text-sm font-medium text-gray-900 hover:text-primary-600">{item.name}</Link>
                    <p className="text-xs text-gray-500 mt-0.5">Qty: {item.quantity} • Order #{item.orderId}</p>
                    <p className="text-xs text-gray-500">{new Date(item.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
                  </div>
                  <div className="text-right">
                    <span className={`badge ${item.deliveryStatus === 'Delivered' ? 'text-green-600 bg-green-50' : 'text-blue-600 bg-blue-50'}`}>{item.deliveryStatus}</span>
                    <Link to={`/track-order/${item.orderId}`} className="btn-outline text-xs px-3 py-1.5 mt-2 inline-flex">
                      <Truck size={14} /> Track
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <EmptyState icon={Package} title="No items purchased" description="Products you buy will appear here." />
          )}
        </div>
      </div>
    </div>
  )
}
