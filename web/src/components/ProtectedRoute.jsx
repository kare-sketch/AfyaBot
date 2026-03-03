import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <img src="/logo.png" alt="AfyaBot" className="h-20 w-20 mx-auto mb-4 animate-pulse rounded-full" />
          <p className="text-gray-400 font-medium">Loading AfyaBot…</p>
        </div>
      </div>
    )
  }

  if (!user) return <Navigate to="/login" replace />

  return children
}
