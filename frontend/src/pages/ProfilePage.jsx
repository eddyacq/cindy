import { useState } from 'react'
import { Loader2 } from 'lucide-react'
import { AccountSidebar } from '../components/AccountSidebar'
import { useAuth } from '../context/AuthContext'
import { useToast } from '../context/ToastContext'

export function ProfilePage() {
  const { user, updateProfile } = useAuth()
  const { showToast } = useToast()
  const [form, setForm] = useState({
    firstName: user?.firstName || '', lastName: user?.lastName || '',
    email: user?.email || '', phone: user?.phone || '',
  })
  const [loading, setLoading] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      updateProfile(form)
      setLoading(false)
      showToast('Profile updated successfully')
    }, 600)
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">My Profile</h1>
      <div className="grid lg:grid-cols-4 gap-6">
        <aside className="lg:col-span-1"><AccountSidebar /></aside>
        <div className="lg:col-span-3">
          <div className="card p-6 max-w-lg">
            <div className="flex items-center gap-4 mb-6">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary-100 text-primary-700 font-bold text-xl">
                {form.firstName[0]}{form.lastName[0]}
              </div>
              <div>
                <p className="font-semibold text-gray-900">{form.firstName} {form.lastName}</p>
                <p className="text-sm text-gray-500">{form.email}</p>
              </div>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">First Name</label>
                  <input value={form.firstName} onChange={e => setForm(f => ({ ...f, firstName: e.target.value }))} className="input" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Last Name</label>
                  <input value={form.lastName} onChange={e => setForm(f => ({ ...f, lastName: e.target.value }))} className="input" required />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Email</label>
                <input type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} className="input" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Phone</label>
                <input type="tel" value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} className="input" required />
              </div>
              <button type="submit" disabled={loading} className="btn-primary w-full py-2.5">
                {loading ? <><Loader2 size={18} className="animate-spin" /> Saving...</> : 'Save Changes'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
