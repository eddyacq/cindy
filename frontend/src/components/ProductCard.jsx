import { Link } from 'react-router-dom'
import { Heart, ShoppingCart } from 'lucide-react'
import { Rating } from './ui/Rating'
import { useCart } from '../context/CartContext'
import { useWishlist } from '../context/WishlistContext'
import { useToast } from '../context/ToastContext'
import PropTypes from 'prop-types'

export function ProductCard({ product }) {
  const { addItem } = useCart()
  const { toggleItem, hasItem } = useWishlist()
  const { showToast } = useToast()
  const inWishlist = hasItem(product.id)

  const handleAddCart = (e) => {
    e.preventDefault()
    e.stopPropagation()
    addItem(product)
    showToast('Product added to cart')
  }

  const handleWishlist = (e) => {
    e.preventDefault()
    e.stopPropagation()
    toggleItem(product)
    showToast(inWishlist ? 'Removed from wishlist' : 'Added to wishlist', inWishlist ? 'info' : 'success')
  }

  const discount = product.oldPrice ? Math.round((1 - product.price / product.oldPrice) * 100) : 0
  const categoryLabel = product.category?.name || product.category // works for both API shape and any leftover mock usage

  return (
    <Link to={`/product/${product.id}`} className="card group overflow-hidden transition-all duration-200 hover:shadow-md hover:border-primary-200">
      <div className="relative aspect-square overflow-hidden bg-gray-50">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {discount > 0 && (
          <span className="absolute top-2.5 left-2.5 badge bg-red-500 text-white">-{discount}%</span>
        )}
        <button
          onClick={handleWishlist}
          className={`absolute top-2.5 right-2.5 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 backdrop-blur shadow-sm transition hover:scale-110 ${
            inWishlist ? 'text-red-500' : 'text-gray-400'
          }`}
        >
          <Heart size={18} className={inWishlist ? 'fill-red-500' : ''} />
        </button>
      </div>
      <div className="p-4">
        <p className="text-xs text-gray-500 capitalize mb-1">{categoryLabel}</p>
        <h3 className="text-sm font-medium text-gray-900 line-clamp-2 group-hover:text-primary-600 transition">
          {product.name}
        </h3>
        <div className="mt-1.5">
          <Rating value={product.rating || 0} count={product.reviews || 0} />
        </div>
        <div className="mt-2.5 flex items-center gap-2">
          <span className="text-base font-bold text-gray-900">GH₵ {product.price.toLocaleString()}</span>
          {product.oldPrice && (
            <span className="text-xs text-gray-400 line-through">GH₵ {product.oldPrice.toLocaleString()}</span>
          )}
        </div>
        <button onClick={handleAddCart} className="btn-primary w-full mt-3 group/btn">
          <ShoppingCart size={16} />
          Add to Cart
        </button>
      </div>
    </Link>
  )
}

ProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    name: PropTypes.string.isRequired,
    image: PropTypes.string,
    price: PropTypes.number.isRequired,
    oldPrice: PropTypes.number,
    category: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.shape({ name: PropTypes.string }),
    ]),
    rating: PropTypes.number,
    reviews: PropTypes.number,
  }).isRequired,
}