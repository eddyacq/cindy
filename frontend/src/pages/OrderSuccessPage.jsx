import { Link } from 'react-router-dom'
import { CheckCircle2, Truck, ShoppingBag } from 'lucide-react'

export function OrderSuccessPage() {
  return (
    <div className="max-w-md mx-auto px-4 py-16 text-center">
      <div className="flex h-20 w-20 mx-auto items-center justify-center rounded-full bg-green-100 animate-scale-in">
        <CheckCircle2 size={48} className="text-green-600" />
      </div>
      <h1 className="text-2xl font-bold text-gray-900 mt-6">Order Confirmed!</h1>
      <p className="text-gray-500 mt-2">Thank you for your purchase.</p>
      <div className="card p-6 mt-6 text-left">
        <div className="space-y-3 text-sm">
          <div className="flex justify-between"><span className="text-gray-500">Order Number</span><span className="font-semibold text-gray-900">#ORD-10245</span></div>
          <div className="flex justify-between"><span className="text-gray-500">Total</span><span className="font-semibold text-gray-900">GH₵ 750</span></div>
          <div className="flex justify-between"><span className="text-gray-500">Estimated Delivery</span><span className="font-semibold text-gray-900">September 28, 2026</span></div>
        </div>
      </div>
      <div className="flex gap-3 mt-6">
        <Link to="/track-order/ORD-10245" className="btn-outline flex-1">
          <Truck size={18} /> Track Order
        </Link>
        <Link to="/shop" className="btn-primary flex-1">
          <ShoppingBag size={18} /> Continue Shopping
        </Link>
      </div>
    </div>
  )
}
