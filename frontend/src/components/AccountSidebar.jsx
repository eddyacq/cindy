import { Link, useLocation } from 'react-router-dom'
import { LayoutDashboard, Package, ShoppingBag, Heart, MapPin, User, LogOut } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { useToast } from '../context/ToastContext'
import { useNavigate } from 'react-router-dom'

export function AccountSidebar() {
  const { logout, user } = useAuth()
  const { showToast } = useToast()
  const location = useLocation()
  const navigate = useNavigate()

  const links = [
    { to: '/account', label: 'Overview', icon: LayoutDashboard, end: true },
    { to: '/account/orders', label: 'My Orders', icon: ShoppingBag },
    { to: '/account/items', label: 'My Items', icon: Package },
    { to: '/wishlist', label: 'Wishlist', icon: Heart },
    { to: '/account/addresses', label: 'Addresses', icon: MapPin },
    { to: '/account/profile', label: 'Profile', icon: User },
  ]

  const handleLogout = () => {
    logout()
    showToast('Logged out successfully.')
    navigate('/')
  }

  return (
    <div className="card p-5">
      <div className="flex items-center gap-3 pb-4 mb-4 border-b border-gray-200">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-100 text-primary-700 font-semibold text-lg">
          {user?.firstName?.[0] || 'U'}{user?.lastName?.[0] || ''}
        </div>
        <div>
          <p className="font-semibold text-gray-900 text-sm">{user?.firstName} {user?.lastName}</p>
          <p className="text-xs text-gray-500">{user?.email}</p>
        </div>
      </div>
      <nav className="flex flex-col gap-1">
        {links.map(link => {
          const active = link.end ? location.pathname === link.to : location.pathname.startsWith(link.to)
          return (
            <Link
              key={link.to}
              to={link.to}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition ${
                active ? 'bg-primary-50 text-primary-700' : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <link.icon size={18} /> {link.label}
            </Link>
          )
        })}
        <button onClick={handleLogout} className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition text-left">
          <LogOut size={18} /> Logout
        </button>
      </nav>
    </div>
  )
}
