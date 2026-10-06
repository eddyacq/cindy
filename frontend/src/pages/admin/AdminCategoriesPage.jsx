import { useState, useEffect, useCallback } from 'react'
import { Loader2, Plus, Pencil, Trash2, ImageOff, Tags } from 'lucide-react'
import PropTypes from 'prop-types'
import { AdminSidebar } from '../../components/admin/AdminSidebar'
import { Modal } from '../../components/ui/Modal'
import { adminService } from '../../services/adminService'
import { categoryService } from '../../services/categoryService'
import { useToast } from '../../context/ToastContext'

const EMPTY_FORM = { name: '', description: '', imageUrl: '', status: 'active' }

function toFormValues(category) {
  return {
    name: category.name,
    description: category.description || '',
    imageUrl: category.image || '',
    status: category.status,
  }
}

function toPayload(form) {
  return {
    name: form.name.trim(),
    description: form.description.trim() || undefined,
    imageUrl: form.imageUrl.trim() || undefined,
    status: form.status,
  }
}

function CategoryFormModal({ isOpen, onClose, onSaved, editingCategory }) {
  const [form, setForm] = useState(EMPTY_FORM)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (isOpen) {
      setForm(editingCategory ? toFormValues(editingCategory) : EMPTY_FORM)
      setError('')
    }
  }, [isOpen, editingCategory])

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((f) => ({ ...f, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)
    setError('')
    try {
      const payload = toPayload(form)
      if (editingCategory) {
        await categoryService.update(editingCategory.id, payload)
      } else {
        await categoryService.create(payload)
      }
      onSaved()
      onClose()
    } catch (err) {
      setError(err.message || 'Could not save category.')
    } finally {
      setSaving(false)
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={editingCategory ? 'Edit Category' : 'Add Category'} maxWidth="max-w-md">
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

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Image URL</label>
          <input name="imageUrl" value={form.imageUrl} onChange={handleChange} className="input" placeholder="https://..." />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Status</label>
          <select name="status" value={form.status} onChange={handleChange} className="input">
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>

        <div className="flex gap-3 pt-2">
          <button type="button" onClick={onClose} className="btn-outline flex-1">Cancel</button>
          <button type="submit" disabled={saving} className="btn-primary flex-1">
            {saving ? <Loader2 size={18} className="animate-spin" /> : editingCategory ? 'Save Changes' : 'Create Category'}
          </button>
        </div>
      </form>
    </Modal>
  )
}

CategoryFormModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSaved: PropTypes.func.isRequired,
  editingCategory: PropTypes.object,
}

export function AdminCategoriesPage() {
  const { showToast } = useToast()
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)
  const [editingCategory, setEditingCategory] = useState(null)
  const [deletingId, setDeletingId] = useState(null)

  const fetchCategories = useCallback(() => {
    setLoading(true)
    adminService.listCategories()
      .then((res) => setCategories(res.data))
      .finally(() => setLoading(false))
  }, [])

  useEffect(() => { fetchCategories() }, [fetchCategories])

  const openCreate = () => { setEditingCategory(null); setModalOpen(true) }
  const openEdit = (category) => { setEditingCategory(category); setModalOpen(true) }

  const handleDelete = async (category) => {
    if (category.productCount > 0) {
      showToast(`Move or delete the ${category.productCount} product(s) in this category first.`, 'error')
      return
    }
    if (!window.confirm(`Delete "${category.name}"? This cannot be undone.`)) return
    setDeletingId(category.id)
    try {
      await categoryService.remove(category.id)
      showToast('Category deleted.')
      fetchCategories()
    } catch (err) {
      showToast(err.message || 'Could not delete category.', 'error')
    } finally {
      setDeletingId(null)
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Categories</h1>
        <button onClick={openCreate} className="btn-primary">
          <Plus size={18} /> Add Category
        </button>
      </div>

      <div className="grid lg:grid-cols-4 gap-6">
        <aside className="lg:col-span-1"><AdminSidebar /></aside>

        <div className="lg:col-span-3 space-y-3">
          {loading ? (
            <div className="flex items-center justify-center py-24 text-gray-400">
              <Loader2 size={28} className="animate-spin" />
            </div>
          ) : categories.length === 0 ? (
            <div className="card p-10 text-center text-gray-400">No categories yet.</div>
          ) : (
            categories.map((category) => (
              <div key={category.id} className="card p-4 flex items-center gap-4">
                <div className="h-14 w-14 rounded-lg bg-gray-100 flex items-center justify-center overflow-hidden shrink-0">
                  {category.image ? (
                    <img src={category.image} alt={category.name} className="h-full w-full object-cover" />
                  ) : (
                    <ImageOff size={20} className="text-gray-400" />
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-gray-900 truncate">{category.name}</p>
                  <p className="text-xs text-gray-500 truncate">{category.description || 'No description'}</p>
                </div>

                <div className="flex items-center gap-1.5 text-xs text-gray-500 shrink-0">
                  <Tags size={14} /> {category.productCount} product{category.productCount === 1 ? '' : 's'}
                </div>

                <span className={`badge capitalize shrink-0 ${category.status === 'active' ? 'text-green-600 bg-green-50' : 'text-gray-500 bg-gray-100'}`}>
                  {category.status}
                </span>

                <div className="flex items-center gap-1 shrink-0">
                  <button onClick={() => openEdit(category)} className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 hover:text-primary-600 transition">
                    <Pencil size={16} />
                  </button>
                  <button
                    onClick={() => handleDelete(category)}
                    disabled={deletingId === category.id}
                    className="p-2 rounded-lg text-gray-500 hover:bg-red-50 hover:text-red-600 transition disabled:opacity-50"
                    title={category.productCount > 0 ? 'Move or delete its products first' : 'Delete category'}
                  >
                    {deletingId === category.id ? <Loader2 size={16} className="animate-spin" /> : <Trash2 size={16} />}
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <CategoryFormModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSaved={fetchCategories}
        editingCategory={editingCategory}
      />
    </div>
  )
}
