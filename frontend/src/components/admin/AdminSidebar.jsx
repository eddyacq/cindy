import { NavLink, useNavigate } from 'react-router-dom'
import { LayoutDashboard, Package, Tags, ShoppingBag, LogOut } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import { useToast } from '../../context/ToastContext'

export function AdminSidebar() {
  const { logout, user } = useAuth()
  const { showToast } = useToast()
  const navigate = useNavigate()

  const links = [
    { to: '/admin', label: 'Dashboard', icon: LayoutDashboard, end: true },
    { to: '/admin/products', label: 'Products', icon: Package },
    { to: '/admin/categories', label: 'Categories', icon: Tags },
    { to: '/admin/orders', label: 'Orders', icon: ShoppingBag },
  ]

  const handleLogout = () => { logout(); showToast('Logged out successfully.'); navigate('/') }

  return (
    <div className="card p-5">
      <div className="flex items-center gap-3 pb-4 mb-4 border-b border-gray-200">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-100 text-primary-700 font-semibold text-lg">
          {user?.firstName?.[0] || 'A'}
        </div>
        <div>
          <p className="font-semibold text-gray-900 text-sm">{user?.firstName} {user?.lastName}</p>
          <p className="text-xs text-gray-500">Admin</p>
        </div>
      </div>
      <nav className="flex flex-col gap-1">
        {links.map(link => (
          <NavLink
            key={link.to}
            to={link.to}
            end={link.end}
            className={({ isActive }) => `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition ${isActive ? 'bg-primary-50 text-primary-700' : 'text-gray-700 hover:bg-gray-100'}`}
          >
            <link.icon size={18} /> {link.label}
          </NavLink>
        ))}
        <button onClick={handleLogout} className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition text-left">
          <LogOut size={18} /> Logout
        </button>
      </nav>
    </div>
  )
}