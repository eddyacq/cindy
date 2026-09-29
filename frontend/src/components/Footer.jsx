import { Link } from 'react-router-dom'
import { Share2, MessageCircle, Send, Music2 } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm">Shop</h3>
            <ul className="space-y-2.5 text-sm">
              <li><Link to="/shop" className="hover:text-white transition">All Products</Link></li>
              <li><Link to="/shop" className="hover:text-white transition">New Arrivals</Link></li>
              <li><Link to="/shop" className="hover:text-white transition">Best Sellers</Link></li>
              <li><Link to="/shop" className="hover:text-white transition">Categories</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm">Customer Service</h3>
            <ul className="space-y-2.5 text-sm">
              <li><a href="#" className="hover:text-white transition">Contact</a></li>
              <li><a href="#" className="hover:text-white transition">Shipping</a></li>
              <li><a href="#" className="hover:text-white transition">Returns</a></li>
              <li><a href="#" className="hover:text-white transition">FAQs</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm">Account</h3>
            <ul className="space-y-2.5 text-sm">
              <li><Link to="/login" className="hover:text-white transition">Login</Link></li>
              <li><Link to="/account/orders" className="hover:text-white transition">My Orders</Link></li>
              <li><Link to="/wishlist" className="hover:text-white transition">Wishlist</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm">Follow Us</h3>
            <div className="flex gap-3">
              <a href="#" className="flex h-9 w-9 items-center justify-center rounded-lg bg-gray-800 hover:bg-primary-600 hover:text-white transition">
                <Share2 size={18} />
              </a>
              <a href="#" className="flex h-9 w-9 items-center justify-center rounded-lg bg-gray-800 hover:bg-primary-600 hover:text-white transition">
                <MessageCircle size={18} />
              </a>
              <a href="#" className="flex h-9 w-9 items-center justify-center rounded-lg bg-gray-800 hover:bg-primary-600 hover:text-white transition">
                <Send size={18} />
              </a>
              <a href="#" className="flex h-9 w-9 items-center justify-center rounded-lg bg-gray-800 hover:bg-primary-600 hover:text-white transition">
                <Music2 size={18} />
              </a>
            </div>
          </div>
        </div>
        <div className="mt-10 pt-6 border-t border-gray-800 text-center text-sm">
          <p>&copy; 2026 ShopHub. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
