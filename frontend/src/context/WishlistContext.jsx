import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import PropTypes from 'prop-types'
import { useAuth } from './AuthContext'

const WishlistContext = createContext(null)

export function WishlistProvider({ children }) {
  const { user } = useAuth()
  const storageKey = user ? `wishlist_${user.id}` : 'wishlist_guest'

  const [items, setItems] = useState([])
  const [ready, setReady] = useState(false)

  useEffect(() => {
    try {
      const saved = localStorage.getItem(storageKey)
      setItems(saved ? JSON.parse(saved) : [])
    } catch {
      setItems([])
    }
    setReady(true)
  }, [storageKey])

  useEffect(() => {
    if (!ready) return
    localStorage.setItem(storageKey, JSON.stringify(items))
  }, [items, storageKey, ready])

  const toggleItem = useCallback((product) => {
    setItems(prev => {
      const exists = prev.find(i => i.id === product.id)
      if (exists) return prev.filter(i => i.id !== product.id)
      return [...prev, { id: product.id, name: product.name, price: product.price, image: product.image, category: product.category, rating: product.rating, oldPrice: product.oldPrice }]
    })
  }, [])

  const removeItem = useCallback((id) => {
    setItems(prev => prev.filter(i => i.id !== id))
  }, [])

  const hasItem = useCallback((id) => items.some(i => i.id === id), [items])

  return (
    <WishlistContext.Provider value={{ items, toggleItem, removeItem, hasItem, count: items.length }}>
      {children}
    </WishlistContext.Provider>
  )
}

WishlistProvider.propTypes = {
  children: PropTypes.node.isRequired,
}

export function useWishlist() {
  const ctx = useContext(WishlistContext)
  if (!ctx) throw new Error('useWishlist must be used within WishlistProvider')
  return ctx
}