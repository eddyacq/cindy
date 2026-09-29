import { useNavigate, Link } from 'react-router-dom'
import { Heart, Trash2, ShoppingCart } from 'lucide-react'
import { useWishlist } from '../context/WishlistContext'
import { useCart } from '../context/CartContext'
import { useToast } from '../context/ToastContext'
import { EmptyState } from '../components/ui/EmptyState'
import { Rating } from '../components/ui/Rating'

export function WishlistPage() {
  const { items, removeItem } = useWishlist()
  const { addItem } = useCart()
  const { showToast } = useToast()
  const navigate = useNavigate()

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <EmptyState
          icon={Heart}
          title="Your wishlist is empty"
          description="Save items you love to find them quickly later."
          actionLabel="Explore Products"
          onAction={() => navigate('/shop')}
        />
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">My Wishlist ({items.length})</h1>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map(item => (
          <div key={item.id} className="card p-4 flex gap-4">
            <Link to={`/product/${item.id}`} className="shrink-0">
              <img src={item.image} alt={item.name} className="h-24 w-24 rounded-lg object-cover" />
            </Link>
            <div className="flex-1 min-w-0">
              <Link to={`/product/${item.id}`} className="text-sm font-medium text-gray-900 hover:text-primary-600 line-clamp-2">{item.name}</Link>
              <div className="mt-1"><Rating value={item.rating || 0} size={12} /></div>
              <div className="flex items-center gap-2 mt-1.5">
                <span className="text-base font-bold text-gray-900">GH₵ {item.price.toLocaleString()}</span>
                {item.oldPrice && <span className="text-xs text-gray-400 line-through">GH₵ {item.oldPrice.toLocaleString()}</span>}
              </div>
              <div className="flex gap-2 mt-3">
                <button onClick={() => { addItem(item); showToast('Product added to cart') }} className="btn-primary text-xs px-3 py-2">
                  <ShoppingCart size={14} /> Add to Cart
                </button>
                <button onClick={() => { removeItem(item.id); showToast('Removed from wishlist', 'info') }} className="btn-outline p-2 text-red-500 hover:border-red-400">
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
