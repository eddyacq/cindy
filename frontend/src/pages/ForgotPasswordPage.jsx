import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Mail, CheckCircle2, Loader2 } from 'lucide-react'
import { useToast } from '../context/ToastContext'

export function ForgotPasswordPage() {
  const { showToast } = useToast()
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!email) return
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setSent(true)
      showToast('Reset link sent to your email')
    }, 800)
  }

  return (
    <div className="max-w-md mx-auto px-4 py-12">
      <div className="card p-8 text-center">
        {sent ? (
          <div className="py-4">
            <div className="flex h-16 w-16 mx-auto items-center justify-center rounded-full bg-green-100">
              <CheckCircle2 size={32} className="text-green-600" />
            </div>
            <h1 className="text-xl font-bold text-gray-900 mt-4">Check Your Email</h1>
            <p className="text-sm text-gray-500 mt-2">We've sent a password reset link to <span className="font-medium text-gray-900">{email}</span></p>
            <Link to="/login" className="btn-primary mt-6">Back to Login</Link>
          </div>
        ) : (
          <>
            <h1 className="text-2xl font-bold text-gray-900">Forgot your password?</h1>
            <p className="text-sm text-gray-500 mt-2">Enter your email and we'll help you reset your password.</p>
            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <div className="relative">
                <Mail size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" className="input pl-11" required />
              </div>
              <button type="submit" disabled={loading} className="btn-primary w-full py-3 text-base">
                {loading ? <><Loader2 size={18} className="animate-spin" /> Sending...</> : 'Send Reset Link'}
              </button>
            </form>
            <Link to="/login" className="block text-sm text-primary-600 font-medium mt-4 hover:text-primary-700">Back to Login</Link>
          </>
        )}
      </div>
    </div>
  )
}
