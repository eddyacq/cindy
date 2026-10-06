import { useState, useEffect } from 'react'
import { DollarSign, ShoppingBag, Package, Tags, Loader2 } from 'lucide-react'
import {
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  BarChart, Bar, Cell,
} from 'recharts'
import { AdminSidebar } from '../../components/admin/AdminSidebar'
import { adminService } from '../../services/adminService'
import { productService } from '../../services/productService'
import { categoryService } from '../../services/categoryService'
import { DELIVERY_STATUS_LABELS as STATUS_LABELS, DELIVERY_STATUS_COLORS as STATUS_COLORS } from '../../utils/orderStatus'

const DAY_LABEL = (iso) => new Date(iso).toLocaleDateString('en-GB', { weekday: 'short' })

export function AdminDashboardPage() {
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState(null)
  const [counts, setCounts] = useState({ products: 0, categories: 0 })

  useEffect(() => {
    Promise.all([
      adminService.getStats(),
      productService.list({ limit: 1 }),
      categoryService.list(),
    ]).then(([statsRes, productsRes, categoriesRes]) => {
      setStats(statsRes.data)
      setCounts({ products: productsRes.pagination.total, categories: categoriesRes.data.length })
    }).finally(() => setLoading(false))
  }, [])

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 grid lg:grid-cols-4 gap-6">
        <aside className="lg:col-span-1"><AdminSidebar /></aside>
        <div className="lg:col-span-3 flex items-center justify-center py-24 text-gray-400">
          <Loader2 size={28} className="animate-spin" />
        </div>
      </div>
    )
  }

  const revenueData = stats.revenueByDay.map(r => ({ ...r, label: DAY_LABEL(r.day) }))
  const statusData = stats.statusBreakdown.map(s => ({ ...s, label: STATUS_LABELS[s.status] || s.status }))

  const cards = [
    {
      label: 'Total Revenue',
      value: `GH₵ ${stats.totalRevenue.toLocaleString()}`,
      icon: DollarSign,
      gradient: 'from-primary-500 to-primary-700',
    },
    {
      label: 'Total Orders',
      value: stats.totalOrders.toLocaleString(),
      icon: ShoppingBag,
      gradient: 'from-accent-500 to-accent-700',
    },
    {
      label: 'Total Products',
      value: counts.products.toLocaleString(),
      icon: Package,
      gradient: 'from-emerald-500 to-emerald-700',
    },
    {
      label: 'Total Categories',
      value: counts.categories.toLocaleString(),
      icon: Tags,
      gradient: 'from-violet-500 to-violet-700',
    },
  ]

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Admin Dashboard</h1>
      <div className="grid lg:grid-cols-4 gap-6">
        <aside className="lg:col-span-1"><AdminSidebar /></aside>

        <div className="lg:col-span-3 space-y-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {cards.map(c => (
              <div key={c.label} className={`rounded-xl p-5 text-white bg-gradient-to-br ${c.gradient} shadow-sm`}>
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/20">
                  <c.icon size={20} />
                </div>
                <p className="text-2xl font-bold mt-3">{c.value}</p>
                <p className="text-sm text-white/80">{c.label}</p>
              </div>
            ))}
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            <div className="card p-5">
              <h2 className="font-semibold text-gray-900 mb-4">Revenue — Last 7 Days</h2>
              {revenueData.length === 0 ? (
                <p className="text-sm text-gray-400 py-12 text-center">No paid orders yet this week.</p>
              ) : (
                <ResponsiveContainer width="100%" height={240}>
                  <AreaChart data={revenueData}>
                    <defs>
                      <linearGradient id="revenueFill" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#0c8ee7" stopOpacity={0.35} />
                        <stop offset="100%" stopColor="#0c8ee7" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#eee" vertical={false} />
                    <XAxis dataKey="label" tick={{ fontSize: 12, fill: '#6b7280' }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fontSize: 12, fill: '#6b7280' }} axisLine={false} tickLine={false} width={40} />
                    <Tooltip formatter={(v) => [`GH₵ ${Number(v).toLocaleString()}`, 'Revenue']} />
                    <Area type="monotone" dataKey="revenue" stroke="#0c8ee7" strokeWidth={2} fill="url(#revenueFill)" />
                  </AreaChart>
                </ResponsiveContainer>
              )}
            </div>

            <div className="card p-5">
              <h2 className="font-semibold text-gray-900 mb-4">Orders by Status</h2>
              {statusData.length === 0 ? (
                <p className="text-sm text-gray-400 py-12 text-center">No orders yet.</p>
              ) : (
                <ResponsiveContainer width="100%" height={240}>
                  <BarChart data={statusData} layout="vertical" margin={{ left: 16 }}>
                    <XAxis type="number" allowDecimals={false} tick={{ fontSize: 12, fill: '#6b7280' }} axisLine={false} tickLine={false} />
                    <YAxis type="category" dataKey="label" tick={{ fontSize: 12, fill: '#374151' }} axisLine={false} tickLine={false} width={120} />
                    <Tooltip formatter={(v) => [v, 'Orders']} />
                    <Bar dataKey="count" radius={[0, 6, 6, 0]}>
                      {statusData.map((entry) => (
                        <Cell key={entry.status} fill={STATUS_COLORS[entry.status] || '#94a3b8'} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
