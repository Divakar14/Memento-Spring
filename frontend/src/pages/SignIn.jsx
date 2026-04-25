import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from 'react-oidc-context'

export const SignIn = () => {
  const auth = useAuth()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleKeycloakLogin = async () => {
    try {
      setLoading(true)
      setError(null)
      await auth.signinRedirect()
    } catch (err) {
      console.error('Sign in error:', err)
      setError(err.message || 'Failed to sign in')
      setLoading(false)
    }
  }

  const handleGoogleLogin = async () => {
    try {
      setLoading(true)
      setError(null)
      // Redirect to Keycloak with Google IDP hint
      await auth.signinRedirect({
        login_hint: 'google',
      })
    } catch (err) {
      console.error('Google sign in error:', err)
      setError(err.message || 'Failed to sign in with Google')
      setLoading(false)
    }
  }

  return (
    <div className="w-full min-h-screen flex items-center justify-center px-4" style={{ backgroundColor: '#2D1B2E' }}>
      <div className="w-full max-w-md">
        {/* Logo Section */}
        <div className="text-center mb-12">
          <div className="w-60 h-60 mx-auto rounded-2xl flex items-center justify-center mb-6">
            <img src="././dist/assets/memento-logo.png" alt="Memento Logo"/>
          </div>
          {/* <div
            className="w-20 h-20 mx-auto rounded-2xl flex items-center justify-center shadow-lg mb-6"
            style={{ backgroundColor: '#2D1B2E' }}
          >
            <span className="text-4xl font-black" style={{ color: '#FFC93C' }}>M</span>
          </div>
          <h1 className="text-4xl font-black mb-2" style={{ color: '#2D1B2E' }}>Memento</h1> */}
          <p className="font-light" style={{ color: '#888888' }}>Welcome back! Sign in to continue.</p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 rounded-lg border" style={{ backgroundColor: '#fde8e8', borderColor: '#D9534F' }}>
            <p className="text-sm font-medium" style={{ color: '#D9534F' }}>{error}</p>
          </div>
        )}

        {/* Form Container */}
        <div className="space-y-4">
          <button
            onClick={handleKeycloakLogin}
            disabled={loading}
            className="btn-primary w-full"
          >
            {loading ? 'Signing in...' : 'Sign In with Email'}
          </button>

          {/* Divider */}
          <div className="flex items-center gap-4 my-6">
            <div className="flex-1 h-px" style={{ backgroundColor: '#CFCFCF' }}></div>
            <span className="text-sm font-medium" style={{ color: '#888888' }}>or</span>
            <div className="flex-1 h-px" style={{ backgroundColor: '#CFCFCF' }}></div>
          </div>

          <button
            onClick={handleGoogleLogin}
            disabled={loading}
            className="btn-google"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="#2E2E2E" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#2E2E2E" d="M12 23c2.97 0 5.48-.98 7.31-2.69l-3.57-2.77c-.98.66-2.23 1.06-3.74 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#2E2E2E" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#2E2E2E" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              <path fill="none" d="M1 1h22v22H1z"/>
            </svg>
            <span>{loading ? 'Signing in...' : 'Sign In with Google'}</span>
          </button>
        </div>

        {/* Sign Up Link */}
        <div className="mt-8 text-center">
          <p style={{ color: '#888888' }}>
            Don't have an account?{' '}
            <button
              onClick={() => navigate('/signup')}
              className="font-semibold transition-colors"
              style={{ color: '#F76C6C' }}
              onMouseOver={e => e.target.style.color = '#f55252'}
              onMouseOut={e => e.target.style.color = '#F76C6C'}
            >
              Sign up →
            </button>
          </p>
        </div>

        {/* Privacy Notice */}
        <div className="mt-8 pt-6 text-center" style={{ borderTop: '1px solid #CFCFCF' }}>
          <p className="text-xs" style={{ color: '#888888' }}>
            By signing in, you agree to our{' '}
            <a href="#" className="hover:underline" style={{ color: '#F76C6C' }}>Terms of Service</a>
            {' '}and{' '}
            <a href="#" className="hover:underline" style={{ color: '#F76C6C' }}>Privacy Policy</a>
          </p>
        </div>
      </div>
    </div>
  )
}
