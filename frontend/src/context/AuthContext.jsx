import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import PropTypes from 'prop-types'
import { authService } from '../services/authService'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true) // true while we check for an existing session

  useEffect(() => {
    authService.me()
      .then((res) => setUser(res.data))
      .catch(() => setUser(null))
      .finally(() => setLoading(false))
  }, [])

  const login = useCallback(async (email, password) => {
    const res = await authService.login({ email, password })
    setUser(res.data)
    return res.data
  }, [])

  const register = useCallback(async (data) => {
    const res = await authService.register(data)
    setUser(res.data)
    return res.data
  }, [])

  const logout = useCallback(async () => {
    await authService.logout().catch(() => {}) // clear local state even if the request fails
    setUser(null)
  }, [])

  const updateUser = useCallback((updatedUser) => setUser(updatedUser), [])

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, updateUser, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  )
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}