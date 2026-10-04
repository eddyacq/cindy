import { useState, useEffect } from 'react'
import { Package, Tags } from 'lucide-react'
import { AdminSidebar } from '../../components/admin/AdminSidebar'
import { productService } from '../../services/productService'
import { categoryService } from '../../services/categoryService'

export function AdminDashboardPage() {
  const [stats, setStats] = useState({ products: null, categories: null })

  useEffect(() => {
    Promise.all([
      productService.list({ limit: 1 }), // we only need pagination.total, not the actual items
      categoryService.list(),
    ]).then(([productsRes, categoriesRes]) => {
      setStats({ products: productsRes.pagination.total, categories: categoriesRes.data.length })
    })
  }, [])

  const cards = [
    { label: 'Total Products', value: stats.products, icon: Package, color: 'bg-blue-50 text-blue-600' },
    { label: 'Total Categories', value: stats.categories, icon: Tags, color: 'bg-green-50 text-green-600' },
  ]

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Admin Dashboard</h1>
      <div className="grid lg:grid-cols-4 gap-6">
        <aside className="lg:col-span-1"><AdminSidebar /></aside>
        <div className="lg:col-span-3">
          <div className="grid grid-cols-2 gap-4">
            {cards.map(c => (
              <div key={c.label} className="card p-5">
                <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${c.color}`}>
                  <c.icon size={20} />
                </div>
                <p className="text-2xl font-bold text-gray-900 mt-3">{c.value ?? '–'}</p>
                <p className="text-sm text-gray-500">{c.label}</p>
              </div>
            ))}
          </div>
          <div className="card p-5 mt-4 text-sm text-gray-500">
            Order stats will appear here once the Orders admin page is wired up.
          </div>
        </div>
      </div>
    </div>
  )
}