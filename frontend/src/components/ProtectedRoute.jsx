import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useAuth()
  const location = useLocation()

  if (loading) return null // or a spinner, once we add one in Step 30
  if (!isAuthenticated) return <Navigate to="/login" state={{ from: location }} replace />
  return children
}