import { useState, useEffect, useCallback } from 'react'
import { Loader2, Plus, Pencil, Trash2, ImageOff } from 'lucide-react'
import PropTypes from 'prop-types'
import { AdminSidebar } from '../../components/admin/AdminSidebar'
import { Modal } from '../../components/ui/Modal'
import { adminService } from '../../services/adminService'
import { productService } from '../../services/productService'
import { categoryService } from '../../services/categoryService'
import { useToast } from '../../context/ToastContext'

const EMPTY_FORM = {
  name: '', description: '', categoryId: '', price: '', oldPrice: '',
  sku: '', stockQuantity: '', imageUrl: '', status: 'active', featured: false, newArrival: false,
}

function toFormValues(product) {
  return {
    name: product.name,
    description: product.description || '',
    categoryId: String(product.category.id),
    price: String(product.price),
    oldPrice: product.oldPrice === null ? '' : String(product.oldPrice),
    sku: product.sku,
    stockQuantity: String(product.stock),
    imageUrl: product.image || '',
    status: product.status,
    featured: product.featured,
    newArrival: product.newArrival,
  }
}

function toPayload(form) {
  return {
    name: form.name.trim(),
    description: form.description.trim() || undefined,
    categoryId: Number(form.categoryId),
    price: Number(form.price),
    oldPrice: form.oldPrice === '' ? undefined : Number(form.oldPrice),
    sku: form.sku.trim(),
    stockQuantity: Number(form.stockQuantity),
    imageUrl: form.imageUrl.trim() || undefined,
    status: form.status,
    featured: form.featured,
    newArrival: form.newArrival,
  }
}

function ProductFormModal({ isOpen, onClose, onSaved, categories, editingProduct }) {
  const { showToast } = useToast()
  const [form, setForm] = useState(EMPTY_FORM)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (isOpen) {
      setForm(editingProduct ? toFormValues(editingProduct) : EMPTY_FORM)
      setError('')
    }
  }, [isOpen, editingProduct])

  const handleChange = (e) => {
    const { name, type, checked, value } = e.target
    setForm((f) => ({ ...f, [name]: type === 'checkbox' ? checked : value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)
    setError('')
    try {
      const payload = toPayload(form)
      if (editingProduct) {
        await productService.update(editingProduct.id, payload)
        showToast('Product updated.')
      } else {
        await productService.create(payload)
        showToast('Product created.')
      }
      onSaved()
      onClose()
    } catch (err) {
      setError(err.message || 'Could not save product.')
    } finally {
      setSaving(false)
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={editingProduct ? 'Edit Product' : 'Add Product'} maxWidth="max-w-lg">
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && <p className="text-sm text-red-600 bg-red-50 rounded-lg px-3 py-2">{error}</p>}

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Name</label>
          <input name="name" value={form.name} onChange={handleChange} required className="input" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Description</label>
          <textarea name="description" value={form.description} onChange={handleChange} rows={2} className="input" />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Category</label>
            <select name="categoryId" value={form.categoryId} onChange={handleChange} required className="input">
              <option value="" disabled>Select...</option>
              {categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">SKU</label>
            <input name="sku" value={form.sku} onChange={handleChange} required className="input" />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Price (GH₵)</label>
            <input type="number" step="0.01" min="0" name="price" value={form.price} onChange={handleChange} required className="input" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Old Price</label>
            <input type="number" step="0.01" min="0" name="oldPrice" value={form.oldPrice} onChange={handleChange} className="input" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Stock</label>
            <input type="number" min="0" name="stockQuantity" value={form.stockQuantity} onChange={handleChange} required className="input" />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Image URL</label>
          <input name="imageUrl" value={form.imageUrl} onChange={handleChange} className="input" placeholder="https://..." />
        </div>

        <div className="grid grid-cols-3 gap-3 items-center">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Status</label>
            <select name="status" value={form.status} onChange={handleChange} className="input">
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
          <label className="flex items-center gap-2 text-sm text-gray-700 mt-6">
            <input type="checkbox" name="featured" checked={form.featured} onChange={handleChange} className="rounded border-gray-300" />
            Featured
          </label>
          <label className="flex items-center gap-2 text-sm text-gray-700 mt-6">
            <input type="checkbox" name="newArrival" checked={form.newArrival} onChange={handleChange} className="rounded border-gray-300" />
            New Arrival
          </label>
        </div>

        <div className="flex gap-3 pt-2">
          <button type="button" onClick={onClose} className="btn-outline flex-1">Cancel</button>
          <button type="submit" disabled={saving} className="btn-primary flex-1">
            {saving ? <Loader2 size={18} className="animate-spin" /> : editingProduct ? 'Save Changes' : 'Create Product'}
          </button>
        </div>
      </form>
    </Modal>
  )
}

ProductFormModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSaved: PropTypes.func.isRequired,
  categories: PropTypes.arrayOf(PropTypes.shape({ id: PropTypes.number, name: PropTypes.string })).isRequired,
  editingProduct: PropTypes.object,
}

export function AdminProductsPage() {
  const { showToast } = useToast()
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [pagination, setPagination] = useState({ page: 1, totalPages: 1 })
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [loading, setLoading] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)
  const [editingProduct, setEditingProduct] = useState(null)
  const [deletingId, setDeletingId] = useState(null)

  useEffect(() => { categoryService.list().then((res) => setCategories(res.data)) }, [])

  const fetchProducts = useCallback((page = 1) => {
    setLoading(true)
    adminService.listProducts({ search: search || undefined, status: statusFilter || undefined, page, limit: 12 })
      .then((res) => { setProducts(res.data); setPagination(res.pagination) })
      .finally(() => setLoading(false))
  }, [search, statusFilter])

  useEffect(() => { fetchProducts(1) }, [fetchProducts])

  const openCreate = () => { setEditingProduct(null); setModalOpen(true) }
  const openEdit = (product) => { setEditingProduct(product); setModalOpen(true) }

  const handleDelete = async (product) => {
    if (!window.confirm(`Delete "${product.name}"? This cannot be undone.`)) return
    setDeletingId(product.id)
    try {
      await productService.remove(product.id)
      showToast('Product deleted.')
      fetchProducts(pagination.page)
    } catch (err) {
      showToast(err.message || 'Could not delete product.', 'error')
    } finally {
      setDeletingId(null)
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Products</h1>
        <button onClick={openCreate} className="btn-primary">
          <Plus size={18} /> Add Product
        </button>
      </div>

      <div className="grid lg:grid-cols-4 gap-6">
        <aside className="lg:col-span-1"><AdminSidebar /></aside>

        <div className="lg:col-span-3 space-y-4">
          <div className="card p-4 flex flex-wrap items-center gap-3">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name or SKU..."
              className="input flex-1 min-w-[200px]"
            />
            <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="input w-auto">
              <option value="">All statuses</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-24 text-gray-400">
              <Loader2 size={28} className="animate-spin" />
            </div>
          ) : products.length === 0 ? (
            <div className="card p-10 text-center text-gray-400">No products found.</div>
          ) : (
            <div className="space-y-3">
              {products.map((product) => (
                <div key={product.id} className="card p-4 flex items-center gap-4">
                  <div className="h-14 w-14 rounded-lg bg-gray-100 flex items-center justify-center overflow-hidden shrink-0">
                    {product.image ? (
                      <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
                    ) : (
                      <ImageOff size={20} className="text-gray-400" />
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-gray-900 truncate">{product.name}</p>
                    <p className="text-xs text-gray-500">SKU {product.sku} &middot; {product.category.name}</p>
                  </div>

                  <div className="text-right shrink-0">
                    <p className="font-semibold text-gray-900">GH₵ {product.price.toLocaleString()}</p>
                    <p className="text-xs text-gray-500">{product.stock} in stock</p>
                  </div>

                  <span className={`badge capitalize shrink-0 ${product.status === 'active' ? 'text-green-600 bg-green-50' : 'text-gray-500 bg-gray-100'}`}>
                    {product.status}
                  </span>

                  <div className="flex items-center gap-1 shrink-0">
                    <button onClick={() => openEdit(product)} className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 hover:text-primary-600 transition">
                      <Pencil size={16} />
                    </button>
                    <button
                      onClick={() => handleDelete(product)}
                      disabled={deletingId === product.id}
                      className="p-2 rounded-lg text-gray-500 hover:bg-red-50 hover:text-red-600 transition"
                    >
                      {deletingId === product.id ? <Loader2 size={16} className="animate-spin" /> : <Trash2 size={16} />}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {pagination.totalPages > 1 && (
            <div className="flex justify-center gap-2 pt-2">
              {Array.from({ length: pagination.totalPages }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => fetchProducts(i + 1)}
                  className={`h-9 w-9 rounded-lg text-sm font-medium transition ${
                    pagination.page === i + 1 ? 'bg-primary-600 text-white' : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <ProductFormModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSaved={() => fetchProducts(pagination.page)}
        categories={categories}
        editingProduct={editingProduct}
      />
    </div>
  )
}
