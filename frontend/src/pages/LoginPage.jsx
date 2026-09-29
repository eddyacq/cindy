import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Mail, Lock, Loader2 } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { useToast } from '../context/ToastContext'

export function LoginPage() {
  const { login } = useAuth()
  const { showToast } = useToast()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    const errs = {}
    if (!email) errs.email = 'Email is required'
    else if (!/\S+@\S+\.\S+/.test(email)) errs.email = 'Enter a valid email'
    if (!password) errs.password = 'Password is required'
    setErrors(errs)
    if (Object.keys(errs).length > 0) return

    setLoading(true)
    setTimeout(() => {
      login(email)
      setLoading(false)
      showToast('Welcome back!')
      navigate('/account')
    }, 800)
  }

  return (
    <div className="max-w-md mx-auto px-4 py-12">
      <div className="card p-8">
        <h1 className="text-2xl font-bold text-gray-900 text-center">Welcome Back</h1>
        <p className="text-sm text-gray-500 text-center mt-1">Sign in to your account</p>
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Email</label>
            <div className="relative">
              <Mail size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" className={`input pl-11 ${errors.email ? 'border-red-400' : ''}`} />
            </div>
            {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Password</label>
            <div className="relative">
              <Lock size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
              <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" className={`input pl-11 ${errors.password ? 'border-red-400' : ''}`} />
            </div>
            {errors.password && <p className="text-xs text-red-500 mt-1">{errors.password}</p>}
          </div>
          <button type="submit" disabled={loading} className="btn-primary w-full py-3 text-base">
            {loading ? <><Loader2 size={18} className="animate-spin" /> Signing in...</> : 'Login'}
          </button>
        </form>
        <div className="flex items-center justify-between mt-4 text-sm">
          <Link to="/forgot-password" className="text-primary-600 hover:text-primary-700 font-medium">Forgot Password?</Link>
          <Link to="/register" className="text-primary-600 hover:text-primary-700 font-medium">Create Account</Link>
        </div>
      </div>
    </div>
  )
}
