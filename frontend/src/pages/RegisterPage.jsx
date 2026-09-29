import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Loader2 } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { useToast } from '../context/ToastContext'
import { ApiError } from '../services/api'

export function RegisterPage() {
  const { register } = useAuth()
  const { showToast } = useToast()
  const navigate = useNavigate()
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', phone: '', password: '', confirmPassword: '' })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    const errs = {}
    if (!form.firstName) errs.firstName = 'Required'
    if (!form.lastName) errs.lastName = 'Required'
    if (!form.email) errs.email = 'Required'
    else if (!/\S+@\S+\.\S+/.test(form.email)) errs.email = 'Invalid email'
    if (!form.phone) errs.phone = 'Required'
    if (!form.password) errs.password = 'Required'
    else if (form.password.length < 8) errs.password = 'At least 8 characters' // matches backend's minimum
    if (form.confirmPassword !== form.password) errs.confirmPassword = 'Passwords do not match'
    setErrors(errs)
    if (Object.keys(errs).length > 0) return

    setLoading(true)
    try {
      await register(form)
      showToast('Account created successfully!')
      navigate('/account')
    } catch (err) {
      // 409 = email already registered, 400 = backend validation caught something the frontend missed
      const message = err instanceof ApiError ? err.message : 'Something went wrong. Please try again.'
      setErrors({ form: message })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-md mx-auto px-4 py-12">
      <div className="card p-8">
        <h1 className="text-2xl font-bold text-gray-900 text-center">Create Account</h1>
        <p className="text-sm text-gray-500 text-center mt-1">Join ShopHub today</p>
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          {errors.form && (
            <div className="rounded-lg bg-red-50 border border-red-200 px-4 py-2.5 text-sm text-red-600">
              {errors.form}
            </div>
          )}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">First Name</label>
              <input name="firstName" value={form.firstName} onChange={handleChange} className={`input ${errors.firstName ? 'border-red-400' : ''}`} />
              {errors.firstName && <p className="text-xs text-red-500 mt-1">{errors.firstName}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Last Name</label>
              <input name="lastName" value={form.lastName} onChange={handleChange} className={`input ${errors.lastName ? 'border-red-400' : ''}`} />
              {errors.lastName && <p className="text-xs text-red-500 mt-1">{errors.lastName}</p>}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Email</label>
            <input type="email" name="email" value={form.email} onChange={handleChange} className={`input ${errors.email ? 'border-red-400' : ''}`} />
            {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Phone</label>
            <input type="tel" name="phone" value={form.phone} onChange={handleChange} className={`input ${errors.phone ? 'border-red-400' : ''}`} />
            {errors.phone && <p className="text-xs text-red-500 mt-1">{errors.phone}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Password</label>
            <input type="password" name="password" value={form.password} onChange={handleChange} className={`input ${errors.password ? 'border-red-400' : ''}`} />
            {errors.password && <p className="text-xs text-red-500 mt-1">{errors.password}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Confirm Password</label>
            <input type="password" name="confirmPassword" value={form.confirmPassword} onChange={handleChange} className={`input ${errors.confirmPassword ? 'border-red-400' : ''}`} />
            {errors.confirmPassword && <p className="text-xs text-red-500 mt-1">{errors.confirmPassword}</p>}
          </div>
          <button type="submit" disabled={loading} className="btn-primary w-full py-3 text-base">
            {loading ? <><Loader2 size={18} className="animate-spin" /> Creating account...</> : 'Create Account'}
          </button>
        </form>
        <p className="text-center text-sm text-gray-500 mt-4">
          Already have an account? <Link to="/login" className="text-primary-600 font-medium hover:text-primary-700">Sign in</Link>
        </p>
      </div>
    </div>
  )
}