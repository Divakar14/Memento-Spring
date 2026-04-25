import React, { createContext, useContext, useEffect, useState } from 'react'
import { useAuth } from 'react-oidc-context'

const AuthContext = createContext()

export const useAuthContext = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuthContext must be used within AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const auth = useAuth()
  const [userProfile, setUserProfile] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (auth.isLoading) {
      setLoading(true)
      return
    }

    if (auth.error) {
      console.error('Auth error:', auth.error)
      setError(auth.error?.message || 'Authentication error occurred')
      setLoading(false)
      return
    }

    if (auth.isAuthenticated && auth.user) {
      fetchUserProfile()
    } else {
      setUserProfile(null)
      setLoading(false)
    }
  }, [auth.isAuthenticated, auth.user, auth.isLoading, auth.error])

  const fetchUserProfile = async () => {
    try {
      const userServiceUrl = import.meta.env.VITE_USER_SERVICE_URL
      const response = await fetch(`${userServiceUrl}/users/profile`, {
        headers: {
          'Authorization': `Bearer ${auth.access_token}`
        }
      })

      if (response.status === 401) {
        // Token expired, refresh will happen automatically
        return
      }

      if (!response.ok) {
        throw new Error(`Failed to fetch profile: ${response.statusText}`)
      }

      const profile = await response.json()
      setUserProfile(profile)
      setError(null)
    } catch (err) {
      console.error('Profile fetch error:', err)
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const logout = () => {
    auth.removeUser()
    setUserProfile(null)
  }

  const value = {
    ...auth,
    userProfile,
    loading,
    error,
    logout,
    refreshProfile: fetchUserProfile,
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}
