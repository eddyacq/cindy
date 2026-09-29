import { Check } from 'lucide-react'

export function CheckoutSteps({ current = 0 }) {
  const steps = ['Information', 'Delivery', 'Payment']
  return (
    <div className="flex items-center justify-center mb-8">
      {steps.map((step, i) => (
        <div key={step} className="flex items-center">
          <div className={`flex items-center gap-2 ${i <= current ? 'text-primary-600' : 'text-gray-400'}`}>
            <div className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold transition ${
              i < current ? 'bg-primary-600 text-white' :
              i === current ? 'bg-primary-100 text-primary-700 border-2 border-primary-600' :
              'bg-gray-100 text-gray-400 border-2 border-gray-200'
            }`}>
              {i < current ? <Check size={16} /> : i + 1}
            </div>
            <span className="text-sm font-medium hidden sm:block">{step}</span>
          </div>
          {i < steps.length - 1 && <div className={`w-8 sm:w-16 h-0.5 mx-2 ${i < current ? 'bg-primary-600' : 'bg-gray-200'}`} />}
        </div>
      ))}
    </div>
  )
}
