import { Check, Clock } from 'lucide-react'
import { trackingSteps } from '../data/mockData'

export function OrderTimeline({ steps = trackingSteps }) {
  return (
    <div className="relative">
      {steps.map((step, i) => (
        <div key={step.id} className="flex gap-4 pb-8 last:pb-0">
          <div className="flex flex-col items-center">
            <div className={`flex h-10 w-10 items-center justify-center rounded-full shrink-0 transition ${
              step.completed ? 'bg-primary-600 text-white' : 'bg-gray-100 text-gray-400 border-2 border-gray-200'
            }`}>
              {step.completed ? <Check size={18} /> : <Clock size={18} />}
            </div>
            {i < steps.length - 1 && (
              <div className={`w-0.5 h-full mt-2 -mb-8 ${step.completed ? 'bg-primary-600' : 'bg-gray-200'}`} />
            )}
          </div>
          <div className="pt-1.5">
            <p className={`font-semibold text-sm ${step.completed ? 'text-gray-900' : 'text-gray-400'}`}>{step.label}</p>
            <p className="text-sm text-gray-500 mt-0.5">{step.date}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
