import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import PropTypes from 'prop-types'
import { useAuth } from './AuthContext'

const CartContext = createContext(null)

export function CartProvider({ children }) {
  const { user } = useAuth()
  const storageKey = user ? `cart_${user.id}` : 'cart_guest' // separates each account's cart, and guests from everyone

  const [items, setItems] = useState([])
  const [ready, setReady] = useState(false)

  // reload from storage whenever the logged-in identity changes (login, logout, switching accounts)
  useEffect(() => {
    try {
      const saved = localStorage.getItem(storageKey)
      setItems(saved ? JSON.parse(saved) : [])
    } catch {
      setItems([])
    }
    setReady(true)
  }, [storageKey])

  // only persist once we've loaded for the CURRENT key, so we never overwrite it with a stale empty array mid-switch
  useEffect(() => {
    if (!ready) return
    localStorage.setItem(storageKey, JSON.stringify(items))
  }, [items, storageKey, ready])

  const addItem = useCallback((product, quantity = 1) => {
    setItems(prev => {
      const existing = prev.find(i => i.id === product.id)
      if (existing) {
        return prev.map(i => i.id === product.id ? { ...i, quantity: i.quantity + quantity } : i)
      }
      return [...prev, { id: product.id, name: product.name, price: product.price, image: product.image, quantity }]
    })
  }, [])

  const removeItem = useCallback((id) => {
    setItems(prev => prev.filter(i => i.id !== id))
  }, [])

  const updateQuantity = useCallback((id, quantity) => {
    if (quantity < 1) return
    setItems(prev => prev.map(i => i.id === id ? { ...i, quantity } : i))
  }, [])

  const clearCart = useCallback(() => setItems([]), [])

  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0)
  const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0)

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, updateQuantity, clearCart, totalItems, subtotal }}>
      {children}
    </CartContext.Provider>
  )
}

CartProvider.propTypes = {
  children: PropTypes.node.isRequired,
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}