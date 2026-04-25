import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from 'react-oidc-context'

export const ProtectedRoute = ({ children }) => {
  const auth = useAuth()

  if (auth.isLoading) {
    return (
      <div className="w-full h-screen flex items-center justify-center" style={{ backgroundColor: '#F5EDE5' }}>
        <div className="text-center">
          <div className="inline-block">
            <div
              className="w-16 h-16 border-4 rounded-full animate-spin"
              style={{ borderColor: '#F76C6C', borderTopColor: 'transparent' }}
            ></div>
          </div>
          <p className="mt-4 font-medium" style={{ color: '#888888' }}>Loading...</p>
        </div>
      </div>
    )
  }

  if (!auth.isAuthenticated) {
    return <Navigate to="/signin" replace />
  }

  return children
}
