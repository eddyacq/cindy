import { useState } from 'react'
import { Plus, Pencil, Trash2, MapPin } from 'lucide-react'
import { AccountSidebar } from '../components/AccountSidebar'
import { Modal } from '../components/ui/Modal'
import { useToast } from '../context/ToastContext'
import { userAddresses as initialAddresses } from '../data/mockData'

export function AddressesPage() {
  const { showToast } = useToast()
  const [addresses, setAddresses] = useState(initialAddresses)
  const [modalOpen, setModalOpen] = useState(false)
  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState({ label: '', name: '', street: '', city: '', region: '', phone: '' })

  const openAdd = () => { setEditing(null); setForm({ label: '', name: '', street: '', city: '', region: '', phone: '' }); setModalOpen(true) }
  const openEdit = (addr) => { setEditing(addr.id); setForm(addr); setModalOpen(true) }

  const handleSave = (e) => {
    e.preventDefault()
    if (editing) {
      setAddresses(prev => prev.map(a => a.id === editing ? { ...a, ...form } : a))
      showToast('Address updated')
    } else {
      setAddresses(prev => [...prev, { ...form, id: Date.now() }])
      showToast('Address added')
    }
    setModalOpen(false)
  }

  const handleDelete = (id) => {
    setAddresses(prev => prev.filter(a => a.id !== id))
    showToast('Address deleted', 'info')
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
          <div className="grid sm:grid-cols-2 gap-4">
            {addresses.map(addr => (
              <div key={addr.id} className="card p-5">
                <div className="flex items-center justify-between mb-3">
                  <span className="badge bg-primary-50 text-primary-700">{addr.label}</span>
                  <div className="flex gap-1">
                    <button onClick={() => openEdit(addr)} className="p-1.5 rounded-lg text-gray-400 hover:bg-gray-100 hover:text-primary-600 transition">
                      <Pencil size={16} />
                    </button>
                    <button onClick={() => handleDelete(addr.id)} className="p-1.5 rounded-lg text-gray-400 hover:bg-gray-100 hover:text-red-500 transition">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
                <p className="font-medium text-gray-900 text-sm">{addr.name}</p>
                <p className="text-sm text-gray-500 mt-1">{addr.street}</p>
                <p className="text-sm text-gray-500">{addr.city}, {addr.region}</p>
                <p className="text-sm text-gray-500 mt-1">{addr.phone}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={editing ? 'Edit Address' : 'Add New Address'}>
        <form onSubmit={handleSave} className="space-y-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Label</label>
            <input value={form.label} onChange={e => setForm(f => ({ ...f, label: e.target.value }))} placeholder="Home, Work..." className="input" required />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Full Name</label>
            <input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} className="input" required />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Street Address</label>
            <input value={form.street} onChange={e => setForm(f => ({ ...f, street: e.target.value }))} className="input" required />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">City</label>
              <input value={form.city} onChange={e => setForm(f => ({ ...f, city: e.target.value }))} className="input" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Region</label>
              <input value={form.region} onChange={e => setForm(f => ({ ...f, region: e.target.value }))} className="input" required />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Phone</label>
            <input value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} className="input" required />
          </div>
          <button type="submit" className="btn-primary w-full">{editing ? 'Update Address' : 'Save Address'}</button>
        </form>
      </Modal>
    </div>
  )
}
