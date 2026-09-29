import { Minus, Plus } from 'lucide-react'

export function QuantitySelector({ quantity, onChange, size = 'md' }) {
  const sizes = { sm: 'h-8 w-8', md: 'h-10 w-10' }
  return (
    <div className="inline-flex items-center rounded-lg border border-gray-300 overflow-hidden">
      <button
        onClick={() => onChange(quantity - 1)}
        disabled={quantity <= 1}
        className={`${sizes[size]} flex items-center justify-center text-gray-600 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition`}
      >
        <Minus size={16} />
      </button>
      <span className={`w-12 text-center text-sm font-semibold ${size === 'sm' ? 'py-1' : 'py-2.5'}`}>{quantity}</span>
      <button
        onClick={() => onChange(quantity + 1)}
        className={`${sizes[size]} flex items-center justify-center text-gray-600 hover:bg-gray-100 transition`}
      >
        <Plus size={16} />
      </button>
    </div>
  )
}
