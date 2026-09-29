import { useCart } from '../context/CartContext'

export function OrderSummary({ deliveryFee = 30, discount = 0 }) {
  const { subtotal } = useCart()
  const total = subtotal + deliveryFee - discount

  return (
    <div className="card p-5">
      <h3 className="text-base font-semibold text-gray-900 mb-4">Order Summary</h3>
      <div className="space-y-2.5 text-sm">
        <div className="flex justify-between text-gray-600">
          <span>Subtotal</span>
          <span className="font-medium text-gray-900">GH₵ {subtotal.toLocaleString()}</span>
        </div>
        <div className="flex justify-between text-gray-600">
          <span>Delivery</span>
          <span className="font-medium text-gray-900">GH₵ {deliveryFee.toLocaleString()}</span>
        </div>
        {discount > 0 && (
          <div className="flex justify-between text-green-600">
            <span>Discount</span>
            <span className="font-medium">-GH₵ {discount.toLocaleString()}</span>
          </div>
        )}
        <div className="border-t border-gray-200 pt-2.5 mt-2.5 flex justify-between">
          <span className="font-semibold text-gray-900">Total</span>
          <span className="font-bold text-lg text-gray-900">GH₵ {total.toLocaleString()}</span>
        </div>
      </div>
    </div>
  )
}
