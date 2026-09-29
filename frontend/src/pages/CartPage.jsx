import { Link, useNavigate } from 'react-router-dom'
import { Minus, Plus, Trash2, ShoppingBag } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { useToast } from '../context/ToastContext'
import { EmptyState } from '../components/ui/EmptyState'
import { OrderSummary } from '../components/OrderSummary'

export function CartPage() {
  const { items, updateQuantity, removeItem, subtotal } = useCart()
  const { showToast } = useToast()
  const navigate = useNavigate()

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <EmptyState
          icon={ShoppingBag}
          title="Your cart is empty"
          description="Looks like you haven't added anything yet."
          actionLabel="Start Shopping"
          onAction={() => navigate('/shop')}
        />
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Shopping Cart</h1>
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-3">
          {items.map(item => (
            <div key={item.id} className="card p-4 flex gap-4">
              <Link to={`/product/${item.id}`} className="shrink-0">
                <img src={item.image} alt={item.name} className="h-24 w-24 rounded-lg object-cover" />
              </Link>
              <div className="flex-1 min-w-0">
                <Link to={`/product/${item.id}`} className="text-sm font-medium text-gray-900 hover:text-primary-600 line-clamp-2">{item.name}</Link>
                <p className="text-lg font-bold text-gray-900 mt-1">GH₵ {item.price.toLocaleString()}</p>
                <div className="flex items-center gap-4 mt-2">
                  <div className="inline-flex items-center rounded-lg border border-gray-300">
                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="h-8 w-8 flex items-center justify-center text-gray-600 hover:bg-gray-100 transition" disabled={item.quantity <= 1}>
                      <Minus size={15} />
                    </button>
                    <span className="w-10 text-center text-sm font-semibold">{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="h-8 w-8 flex items-center justify-center text-gray-600 hover:bg-gray-100 transition">
                      <Plus size={15} />
                    </button>
                  </div>
                  <button onClick={() => { removeItem(item.id); showToast('Item removed from cart', 'info') }} className="text-red-500 hover:text-red-600 transition">
                    <Trash2 size={18} />
                  </button>
                  <span className="text-sm font-medium text-gray-900 ml-auto">GH₵ {(item.price * item.quantity).toLocaleString()}</span>
                </div>
              </div>
            </div>
          ))}
          <Link to="/shop" className="inline-flex items-center gap-2 text-sm font-medium text-primary-600 hover:text-primary-700 mt-2">
            ← Continue Shopping
          </Link>
        </div>
        <div className="lg:sticky lg:top-20 h-fit">
          <OrderSummary deliveryFee={30} discount={0} />
          <button onClick={() => navigate('/checkout')} className="btn-primary w-full mt-4 py-3 text-base">
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  )
}
