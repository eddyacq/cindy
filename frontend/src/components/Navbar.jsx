import { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { ShoppingCart, Heart, User, Menu, X, Search, Home, LayoutGrid, ChevronDown } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { useWishlist } from '../context/WishlistContext'
import { useAuth } from '../context/AuthContext'
import { categories } from '../data/mockData'

export function Navbar() {
  const { totalItems } = useCart()
  const { count } = useWishlist()
  const { isAuthenticated } = useAuth()
  const navigate = useNavigate()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [catOpen, setCatOpen] = useState(false)

  const navLinkClass = ({ isActive }) =>
    `text-sm font-medium transition ${isActive ? 'text-primary-600' : 'text-gray-700 hover:text-primary-600'}`

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary-600 text-white font-bold text-lg">S</div>
            <span className="text-xl font-bold text-gray-900 hidden sm:block">ShopHub</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-6">
            <NavLink to="/" className={navLinkClass} end>Home</NavLink>
            <NavLink to="/shop" className={navLinkClass}>Shop</NavLink>
            <div className="relative group">
              <button className="flex items-center gap-1 text-sm font-medium text-gray-700 hover:text-primary-600 transition">
                Categories <ChevronDown size={15} />
              </button>
              <div className="absolute top-full left-0 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <div className="w-52 bg-white rounded-xl shadow-lg border border-gray-200 p-2">
                  {categories.map(c => (
                    <Link
                      key={c.id}
                      to={`/category/${c.id}`}
                      className="block px-3 py-2 text-sm text-gray-700 hover:bg-primary-50 hover:text-primary-600 rounded-lg transition"
                    >
                      {c.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </nav>

          {/* Search (desktop) */}
          <form
            onSubmit={(e) => { e.preventDefault(); const q = e.target.search.value; if (q) navigate(`/search?q=${encodeURIComponent(q)}`) }}
            className="hidden md:flex flex-1 max-w-md"
          >
            <div className="relative w-full">
              <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
              <input name="search" type="text" placeholder="Search products..." className="input pl-11" />
            </div>
          </form>

          {/* Icons */}
          <div className="flex items-center gap-1 sm:gap-2 shrink-0">
            <button onClick={() => setSearchOpen(s => !s)} className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition">
              <Search size={20} />
            </button>
            <Link to="/wishlist" className="relative p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition">
              <Heart size={22} />
              {count > 0 && <span className="absolute -top-0.5 -right-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 text-white text-xs font-semibold px-1">{count}</span>}
            </Link>
            <Link to="/cart" className="relative p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition">
              <ShoppingCart size={22} />
              {totalItems > 0 && <span className="absolute -top-0.5 -right-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-primary-600 text-white text-xs font-semibold px-1">{totalItems}</span>}
            </Link>
            <Link to={isAuthenticated ? '/account' : '/login'} className="p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition">
              <User size={22} />
            </Link>
            <button onClick={() => setMobileOpen(o => !o)} className="lg:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition">
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile search */}
        {searchOpen && (
          <form
            onSubmit={(e) => { e.preventDefault(); const q = e.target.search.value; if (q) { navigate(`/search?q=${encodeURIComponent(q)}`); setSearchOpen(false) } }}
            className="pb-3 md:hidden"
          >
            <div className="relative">
              <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
              <input name="search" type="text" placeholder="Search products..." className="input pl-11" autoFocus />
            </div>
          </form>
        )}
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-gray-200 bg-white animate-fade-in">
          <nav className="max-w-7xl mx-auto px-4 py-3 flex flex-col gap-1">
            <Link to="/" onClick={() => setMobileOpen(false)} className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-700 hover:bg-gray-100 transition">
              <Home size={18} /> Home
            </Link>
            <Link to="/shop" onClick={() => setMobileOpen(false)} className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-700 hover:bg-gray-100 transition">
              <LayoutGrid size={18} /> Shop
            </Link>
            <div className="px-3 pt-2 pb-1 text-xs font-semibold uppercase text-gray-400">Categories</div>
            {categories.map(c => (
              <Link key={c.id} to={`/category/${c.id}`} onClick={() => setMobileOpen(false)} className="px-3 py-2.5 pl-10 rounded-lg text-gray-700 hover:bg-gray-100 capitalize transition">
                {c.name}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  )
}
