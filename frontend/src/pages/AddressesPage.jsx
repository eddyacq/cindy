import { useState, useEffect } from 'react'
import { Plus, Pencil, Trash2, Star } from 'lucide-react'
import { AccountSidebar } from '../components/AccountSidebar'
import { Modal } from '../components/ui/Modal'
import { useToast } from '../context/ToastContext'
import { addressService } from '../services/addressService'
import { ApiError } from '../services/api'

const emptyForm = { fullName: '', phone: '', region: '', city: '', area: '', address: '', directions: '', isDefault: false }

export function AddressesPage() {
  const { showToast } = useToast()
  const [addresses, setAddresses] = useState([])
  const [loading, setLoading] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [form, setForm] = useState(emptyForm)
  const [saving, setSaving] = useState(false)
  const [formError, setFormError] = useState('')

  useEffect(() => { fetchAddresses() }, [])

  function fetchAddresses() {
    setLoading(true)
    addressService.list()
      .then((res) => setAddresses(res.data))
      .catch(() => showToast('Unable to load addresses', 'error'))
      .finally(() => setLoading(false))
  }

  const openAdd = () => { setEditingId(null); setForm(emptyForm); setFormError(''); setModalOpen(true) }
  const openEdit = (addr) => { setEditingId(addr.id); setForm({ ...addr }); setFormError(''); setModalOpen(true) }

  const handleSave = async (e) => {
    e.preventDefault()
    setSaving(true)
    setFormError('')
    try {
      if (editingId) {
        await addressService.update(editingId, form)
        showToast('Address updated')
      } else {
        await addressService.create(form)
        showToast('Address added')
      }
      setModalOpen(false)
      fetchAddresses()
    } catch (err) {
      setFormError(err instanceof ApiError ? err.message : 'Something went wrong')
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this address?')) return
    try {
      await addressService.remove(id)
      showToast('Address deleted', 'info')
      setAddresses(prev => prev.filter(a => a.id !== id))
    } catch {
      showToast('Unable to delete address', 'error')
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">My Addresses</h1>
      <div className="grid lg:grid-cols-4 gap-6">
        <aside className="lg:col-span-1"><AccountSidebar /></aside>
        <div className="lg:col-span-3">
          <button onClick={openAdd} className="btn-primary mb-4">
            <Plus size={18} /> Add New Address
          </button>

          {loading ? (
            <div className="grid sm:grid-cols-2 gap-4">
              {[1, 2].map(i => <div key={i} className="card p-5 h-40 bg-gray-100 animate-pulse" />)}
            </div>
          ) : addresses.length === 0 ? (
            <div className="card p-8 text-center text-gray-500">No addresses yet. Add one above.</div>
          ) : (
            <div className="grid sm:grid-cols-2 gap-4">
              {addresses.map(addr => (
                <div key={addr.id} className="card p-5">
                  <div className="flex items-center justify-between mb-3">
                    {addr.isDefault ? (
                      <span className="badge bg-primary-50 text-primary-700 flex items-center gap-1">
                        <Star size={12} className="fill-primary-700" /> Default
                      </span>
                    ) : <span />}
                    <div className="flex gap-1">
                      <button onClick={() => openEdit(addr)} className="p-1.5 rounded-lg text-gray-400 hover:bg-gray-100 hover:text-primary-600 transition">
                        <Pencil size={16} />
                      </button>
                      <button onClick={() => handleDelete(addr.id)} className="p-1.5 rounded-lg text-gray-400 hover:bg-gray-100 hover:text-red-500 transition">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                  <p className="font-medium text-gray-900 text-sm">{addr.fullName}</p>
                  <p className="text-sm text-gray-500 mt-1">{addr.address}{addr.area ? `, ${addr.area}` : ''}</p>
                  <p className="text-sm text-gray-500">{addr.city}, {addr.region}</p>
                  <p className="text-sm text-gray-500 mt-1">{addr.phone}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={editingId ? 'Edit Address' : 'Add New Address'}>
        <form onSubmit={handleSave} className="space-y-3">
          {formError && <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">{formError}</p>}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Full Name</label>
            <input value={form.fullName} onChange={e => setForm(f => ({ ...f, fullName: e.target.value }))} className="input" required />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Phone</label>
            <input value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} className="input" required />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Region</label>
              <input value={form.region} onChange={e => setForm(f => ({ ...f, region: e.target.value }))} className="input" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">City</label>
              <input value={form.city} onChange={e => setForm(f => ({ ...f, city: e.target.value }))} className="input" required />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Area</label>
            <input value={form.area} onChange={e => setForm(f => ({ ...f, area: e.target.value }))} className="input" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Address</label>
            <input value={form.address} onChange={e => setForm(f => ({ ...f, address: e.target.value }))} className="input" required />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Additional Directions</label>
            <textarea rows={2} value={form.directions || ''} onChange={e => setForm(f => ({ ...f, directions: e.target.value }))} className="input resize-none" />
          </div>
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" checked={form.isDefault} onChange={e => setForm(f => ({ ...f, isDefault: e.target.checked }))} className="h-4 w-4 rounded border-gray-300 text-primary-600" />
            <span className="text-sm text-gray-600">Set as default address</span>
          </label>
          <button type="submit" disabled={saving} className="btn-primary w-full">
            {saving ? 'Saving...' : editingId ? 'Update Address' : 'Save Address'}
          </button>
        </form>
      </Modal>
    </div>
  )
}