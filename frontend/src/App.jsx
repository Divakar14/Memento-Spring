import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from 'react-oidc-context'
import { AuthProvider as CustomAuthProvider } from './context/AuthContext'
import { ProtectedRoute } from './components/ProtectedRoute'
import { Splash } from './pages/Splash'
import { SignIn } from './pages/SignIn'
import { SignUp } from './pages/SignUp'
import { Dashboard } from './pages/Dashboard'

const App = () => {
  const oidcConfig = {
    authority: `${import.meta.env.VITE_KEYCLOAK_URL}/realms/${import.meta.env.VITE_KEYCLOAK_REALM}`,
    client_id: import.meta.env.VITE_KEYCLOAK_CLIENT_ID,
    redirect_uri: window.location.origin + '/signin',
    response_type: 'code',
    scope: 'openid profile email',
    response_mode: 'query',
    onSigninCallback: () => {
      // Optional: redirect to dashboard after sign in
      window.history.replaceState(
        {},
        document.title,
        window.location.pathname
      )
    },
  }

  return (
    <AuthProvider {...oidcConfig}>
      <CustomAuthProvider>
        <Router>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Splash />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />

            {/* Protected Routes */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />

            {/* Catch all */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Router>
      </CustomAuthProvider>
    </AuthProvider>
  )
}

export default App
