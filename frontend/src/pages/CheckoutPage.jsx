import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Loader2, CreditCard, Smartphone, Wallet } from 'lucide-react'
import { CheckoutSteps } from '../components/CheckoutSteps'
import { OrderSummary } from '../components/OrderSummary'
import { useCart } from '../context/CartContext'
import { useToast } from '../context/ToastContext'

export function CheckoutPage() {
  const { items, subtotal, clearCart } = useCart()
  const { showToast } = useToast()
  const navigate = useNavigate()
  const [step, setStep] = useState(0)
  const [loading, setLoading] = useState(false)
  const [info, setInfo] = useState({ name: '', email: '', phone: '' })
  const [delivery, setDelivery] = useState({ region: '', city: '', area: '', address: '', directions: '', method: 'standard' })
  const [payment, setPayment] = useState('momo')

  const deliveryFee = delivery.method === 'express' ? 60 : 30
  const total = subtotal + deliveryFee

  if (items.length === 0 && !loading) {
    return (
      <div className="max-w-md mx-auto px-4 py-16 text-center">
        <h1 className="text-xl font-bold text-gray-900">Your cart is empty</h1>
        <button onClick={() => navigate('/shop')} className="btn-primary mt-4">Start Shopping</button>
      </div>
    )
  }

  const handleInfoSubmit = (e) => { e.preventDefault(); setStep(1) }
  const handleDeliverySubmit = (e) => { e.preventDefault(); setStep(2) }

  const handlePay = () => {
    setLoading(true)
    setTimeout(() => {
      clearCart()
      setLoading(false)
      showToast('Order placed successfully!')
      navigate('/order-success')
    }, 1200)
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Checkout</h1>
      <CheckoutSteps current={step} />

      {step === 0 && (
        <div className="grid lg:grid-cols-3 gap-6">
          <form onSubmit={handleInfoSubmit} className="lg:col-span-2 card p-6 space-y-4">
            <h2 className="text-lg font-semibold text-gray-900">Information</h2>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Full Name</label>
              <input value={info.name} onChange={e => setInfo(d => ({ ...d, name: e.target.value }))} className="input" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Email</label>
              <input type="email" value={info.email} onChange={e => setInfo(d => ({ ...d, email: e.target.value }))} className="input" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Phone</label>
              <input type="tel" value={info.phone} onChange={e => setInfo(d => ({ ...d, phone: e.target.value }))} className="input" required />
            </div>
            <button type="submit" className="btn-primary w-full">Continue</button>
          </form>
          <div className="lg:col-span-1"><OrderSummary deliveryFee={deliveryFee} /></div>
        </div>
      )}

      {step === 1 && (
        <div className="grid lg:grid-cols-3 gap-6">
          <form onSubmit={handleDeliverySubmit} className="lg:col-span-2 card p-6 space-y-4">
            <h2 className="text-lg font-semibold text-gray-900">Delivery</h2>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Region</label>
                <input value={delivery.region} onChange={e => setDelivery(d => ({ ...d, region: e.target.value }))} className="input" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">City</label>
                <input value={delivery.city} onChange={e => setDelivery(d => ({ ...d, city: e.target.value }))} className="input" required />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Area</label>
              <input value={delivery.area} onChange={e => setDelivery(d => ({ ...d, area: e.target.value }))} className="input" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Address</label>
              <input value={delivery.address} onChange={e => setDelivery(d => ({ ...d, address: e.target.value }))} className="input" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Additional Directions</label>
              <textarea rows={2} value={delivery.directions} onChange={e => setDelivery(d => ({ ...d, directions: e.target.value }))} className="input resize-none" />
            </div>
            <div className="space-y-3 pt-2">
              <label className="block text-sm font-semibold text-gray-900">Delivery Options</label>
              <label className={`flex items-center justify-between p-4 rounded-lg border-2 cursor-pointer transition ${delivery.method === 'standard' ? 'border-primary-600 bg-primary-50' : 'border-gray-200'}`}>
                <div className="flex items-center gap-3">
                  <input type="radio" name="delivery" value="standard" checked={delivery.method === 'standard'} onChange={e => setDelivery(d => ({ ...d, method: e.target.value }))} className="h-4 w-4 text-primary-600" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Standard Delivery</p>
                    <p className="text-xs text-gray-500">2-4 days</p>
                  </div>
                </div>
                <span className="font-semibold text-gray-900">GH₵ 30</span>
              </label>
              <label className={`flex items-center justify-between p-4 rounded-lg border-2 cursor-pointer transition ${delivery.method === 'express' ? 'border-primary-600 bg-primary-50' : 'border-gray-200'}`}>
                <div className="flex items-center gap-3">
                  <input type="radio" name="delivery" value="express" checked={delivery.method === 'express'} onChange={e => setDelivery(d => ({ ...d, method: e.target.value }))} className="h-4 w-4 text-primary-600" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Express Delivery</p>
                    <p className="text-xs text-gray-500">1-2 days</p>
                  </div>
                </div>
                <span className="font-semibold text-gray-900">GH₵ 60</span>
              </label>
            </div>
            <div className="flex gap-3">
              <button type="button" onClick={() => setStep(0)} className="btn-outline">Back</button>
              <button type="submit" className="btn-primary flex-1">Continue to Payment</button>
            </div>
          </form>
          <div className="lg:col-span-1"><OrderSummary deliveryFee={deliveryFee} /></div>
        </div>
      )}

      {step === 2 && (
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 card p-6 space-y-4">
            <h2 className="text-lg font-semibold text-gray-900">Payment Method</h2>
            <div className="space-y-3">
              {[
                { id: 'momo', label: 'Mobile Money', icon: Smartphone, desc: 'MTN, Vodafone, AirtelTigo' },
                { id: 'card', label: 'Visa / Mastercard', icon: CreditCard, desc: 'Credit or debit card' },
                { id: 'other', label: 'Other', icon: Wallet, desc: 'Bank transfer, cash on delivery' },
              ].map(opt => (
                <label key={opt.id} className={`flex items-center gap-3 p-4 rounded-lg border-2 cursor-pointer transition ${payment === opt.id ? 'border-primary-600 bg-primary-50' : 'border-gray-200'}`}>
                  <input type="radio" name="payment" value={opt.id} checked={payment === opt.id} onChange={e => setPayment(e.target.value)} className="h-4 w-4 text-primary-600" />
                  <opt.icon size={22} className="text-gray-600" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">{opt.label}</p>
                    <p className="text-xs text-gray-500">{opt.desc}</p>
                  </div>
                </label>
              ))}
            </div>
            <div className="flex gap-3 pt-2">
              <button onClick={() => setStep(1)} className="btn-outline">Back</button>
              <button onClick={handlePay} disabled={loading} className="btn-primary flex-1 py-3 text-base">
                {loading ? <><Loader2 size={18} className="animate-spin" /> Processing...</> : `Pay GH₵ ${total.toLocaleString()}`}
              </button>
            </div>
          </div>
          <div className="lg:col-span-1"><OrderSummary deliveryFee={deliveryFee} /></div>
        </div>
      )}
    </div>
  )
}
