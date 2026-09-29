import { createContext, useContext, useState, useEffect, useCallback } from 'react'

const ToastContext = createContext(null)

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([])

  const showToast = useCallback((message, type = 'success') => {
    const id = Date.now() + Math.random()
    setToasts(prev => [...prev, { id, message, type }])
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id))
    }, 3000)
  }, [])

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="fixed bottom-6 right-6 z-[100] flex flex-col gap-2">
        {toasts.map(t => (
          <div
            key={t.id}
            className={`animate-slide-in flex items-center gap-3 rounded-lg px-4 py-3 shadow-lg text-sm font-medium text-white ${
              t.type === 'success' ? 'bg-green-600' :
              t.type === 'error' ? 'bg-red-600' :
              t.type === 'warning' ? 'bg-amber-500' : 'bg-gray-800'
            }`}
          >
            {t.type === 'success' && <span className="text-lg">✓</span>}
            {t.type === 'error' && <span className="text-lg">✕</span>}
            {t.type === 'warning' && <span className="text-lg">⚠</span>}
            {t.message}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  )
}

export function useToast() {
  const ctx = useContext(ToastContext)
  if (!ctx) throw new Error('useToast must be used within ToastProvider')
  return ctx
}
