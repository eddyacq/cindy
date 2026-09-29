import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { Heart, ShoppingCart, Check, Truck, Shield, RotateCcw } from 'lucide-react'
import { productService } from '../services/productService'
import { Rating } from '../components/ui/Rating'
import { QuantitySelector } from '../components/ui/QuantitySelector'
import { ProductGrid } from '../components/ProductGrid'
import { useCart } from '../context/CartContext'
import { useWishlist } from '../context/WishlistContext'
import { useToast } from '../context/ToastContext'

export function ProductDetailsPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { addItem } = useCart()
  const { toggleItem, hasItem } = useWishlist()
  const { showToast } = useToast()

  const [product, setProduct] = useState(null)
  const [related, setRelated] = useState([])
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)
  const [quantity, setQuantity] = useState(1)
  const [activeImage, setActiveImage] = useState(0)

  useEffect(() => {
    setLoading(true)
    setNotFound(false)
    setActiveImage(0)
    productService.getById(id)
      .then((res) => {
        setProduct(res.data)
        return productService.list({ category: res.data.category.name.toLowerCase(), limit: 5 })
      })
      .then((res) => setRelated(res.data.filter(p => p.id !== Number(id)).slice(0, 4)))
      .catch((err) => { if (err.status === 404) setNotFound(true) })
      .finally(() => setLoading(false))
  }, [id])

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          <div className="aspect-square rounded-2xl bg-gray-200 animate-pulse" />
          <div className="space-y-4">
            <div className="h-6 w-1/3 bg-gray-200 rounded animate-pulse" />
            <div className="h-8 w-2/3 bg-gray-200 rounded animate-pulse" />
            <div className="h-24 w-full bg-gray-200 rounded animate-pulse" />
          </div>
        </div>
      </div>
    )
  }

  if (notFound || !product) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 text-center">
        <h1 className="text-2xl font-bold text-gray-900">Product not found</h1>
        <Link to="/shop" className="btn-primary mt-4">Back to Shop</Link>
      </div>
    )
  }

  const inWishlist = hasItem(product.id)
  const discount = product.oldPrice ? Math.round((1 - product.price / product.oldPrice) * 100) : 0
  const galleryImages = product.images?.length ? product.images : [product.image]

  const handleAddCart = () => { addItem(product, quantity); showToast('Product added to cart') }
  const handleBuyNow = () => { addItem(product, quantity); navigate('/checkout') }
  const handleWishlist = () => { toggleItem(product); showToast(inWishlist ? 'Removed from wishlist' : 'Added to wishlist', inWishlist ? 'info' : 'success') }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <nav className="text-sm text-gray-500 mb-6 flex items-center gap-2">
        <Link to="/" className="hover:text-primary-600">Home</Link>
        <span>/</span>
        <Link to="/shop" className="hover:text-primary-600">Shop</Link>
        <span>/</span>
        <Link to={`/category/${product.category.name.toLowerCase()}`} className="hover:text-primary-600 capitalize">{product.category.name}</Link>
        <span>/</span>
        <span className="text-gray-900 truncate">{product.name}</span>
      </nav>

      <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
        <div>
          <div className="aspect-square rounded-2xl overflow-hidden bg-gray-50 border border-gray-200">
            <img src={galleryImages[activeImage]} alt={product.name} className="h-full w-full object-cover" />
          </div>
          {galleryImages.length > 1 && (
            <div className="mt-4 flex gap-3">
              {galleryImages.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImage(i)}
                  className={`h-20 w-20 rounded-lg overflow-hidden border-2 transition ${activeImage === i ? 'border-primary-600' : 'border-gray-200 hover:border-gray-300'}`}
                >
                  <img src={img} alt={`${product.name} ${i + 1}`} className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        <div>
          <p className="text-sm text-gray-500 capitalize">{product.category.name}</p>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mt-1">{product.name}</h1>
          <div className="flex items-center gap-3 mt-3">
            <Rating value={product.rating || 0} size={18} showNumber />
          </div>

          <div className="mt-5 flex items-center gap-3">
            <span className="text-3xl font-bold text-gray-900">GH₵ {product.price.toLocaleString()}</span>
            {product.oldPrice && (
              <>
                <span className="text-lg text-gray-400 line-through">GH₵ {product.oldPrice.toLocaleString()}</span>
                <span className="badge bg-red-100 text-red-600">-{discount}%</span>
              </>
            )}
          </div>

          <p className="mt-5 text-gray-600 leading-relaxed">{product.description}</p>

          <div className="mt-5 flex items-center gap-2">
            {product.inStock ? (
              <span className="flex items-center gap-1.5 text-sm font-medium text-green-600">
                <Check size={16} /> In Stock ({product.stock} available)
              </span>
            ) : (
              <span className="text-sm font-medium text-red-600">Out of Stock</span>
            )}
          </div>

          <div className="mt-6 flex items-center gap-4">
            <div>
              <p className="text-sm text-gray-500 mb-2">Quantity</p>
              <QuantitySelector quantity={quantity} onChange={setQuantity} />
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <button onClick={handleAddCart} disabled={!product.inStock} className="btn-primary flex-1 min-w-40 py-3 text-base">
              <ShoppingCart size={18} /> Add to Cart
            </button>
            <button onClick={handleBuyNow} disabled={!product.inStock} className="btn bg-accent-500 text-white hover:bg-accent-600 flex-1 min-w-40 py-3 text-base">
              Buy Now
            </button>
            <button onClick={handleWishlist} className={`btn-outline p-3 ${inWishlist ? 'border-red-400 text-red-500' : ''}`}>
              <Heart size={20} className={inWishlist ? 'fill-red-500 text-red-500' : ''} />
            </button>
          </div>

          <div className="mt-8 grid grid-cols-3 gap-4 pt-6 border-t border-gray-200">
            <div className="flex flex-col items-center text-center gap-1.5">
              <Truck className="text-primary-600" size={24} />
              <p className="text-xs text-gray-600">Free delivery over GH₵ 500</p>
            </div>
            <div className="flex flex-col items-center text-center gap-1.5">
              <Shield className="text-primary-600" size={24} />
              <p className="text-xs text-gray-600">2 year warranty</p>
            </div>
            <div className="flex flex-col items-center text-center gap-1.5">
              <RotateCcw className="text-primary-600" size={24} />
              <p className="text-xs text-gray-600">7 day returns</p>
            </div>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-12">
          <h2 className="text-xl font-bold text-gray-900 mb-6">You May Also Like</h2>
          <ProductGrid products={related} />
        </section>
      )}
    </div>
  )
}