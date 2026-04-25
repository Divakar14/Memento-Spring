import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthContext } from '../context/AuthContext'

export const Dashboard = () => {
  const { userProfile, isAuthenticated, loading, logout } = useAuthContext()
  const navigate = useNavigate()

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      navigate('/signin', { replace: true })
    }
  }, [isAuthenticated, loading, navigate])

  if (loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center" style={{ backgroundColor: '#F5EDE5' }}>
        <div className="text-center">
          <div className="inline-block">
            <div className="w-16 h-16 border-4 border-t-transparent rounded-full animate-spin" style={{ borderColor: '#F76C6C', borderTopColor: 'transparent' }}></div>
          </div>
          <p className="mt-4 font-medium" style={{ color: '#888888' }}>Loading your dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full min-h-screen" style={{ backgroundColor: '#F5EDE5' }}>
      {/* Header */}
      <header className="shadow-sm" style={{ backgroundColor: '#2D1B2E' }}>
        <div className="container py-4 px-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              className="w-12 h-12 rounded-lg flex items-center justify-center"
              style={{ backgroundColor: '#F76C6C' }}
            >
              <span className="text-2xl font-black text-white">M</span>
            </div>
            <h1 className="text-2xl font-bold" style={{ color: '#F5EDE5' }}>Memento</h1>
          </div>
          <button
            onClick={logout}
            className="px-4 py-2 font-medium rounded-lg transition-colors"
            style={{ color: '#C3BABA', border: '1px solid #3d2540' }}
            onMouseOver={e => { e.currentTarget.style.color = '#F5EDE5'; e.currentTarget.style.borderColor = '#C3BABA' }}
            onMouseOut={e => { e.currentTarget.style.color = '#C3BABA'; e.currentTarget.style.borderColor = '#3d2540' }}
          >
            Sign Out
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="container py-12 px-6">
        <div className="max-w-4xl mx-auto">
          {/* Welcome Card */}
          <div className="bg-white rounded-xl p-8 mb-8 animate-slideUp" style={{ boxShadow: '0 4px 24px rgba(45,27,46,0.10)', border: '1px solid #CFCFCF' }}>
            <h2 className="text-3xl font-black mb-4" style={{ color: '#2D1B2E' }}>
              Welcome back, {userProfile?.displayName || userProfile?.firstName || 'User'}! 👋
            </h2>
            <p className="text-lg mb-6" style={{ color: '#888888' }}>
              Your authentication is working perfectly. The next phase will include:
            </p>
            <ul className="space-y-3">
              {[
                'Project management with full CRUD operations',
                'Task tracking with due dates and reminders',
                'Note-taking with AI-powered summarization',
                'Calendar view for deadline tracking',
                'Productivity dashboard with insights',
              ].map(item => (
                <li key={item} className="flex items-start gap-3">
                  <span className="font-bold mt-0.5" style={{ color: '#7FB77E' }}>✓</span>
                  <span style={{ color: '#2E2E2E' }}>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* User Profile Card */}
          {userProfile && (
            <div className="bg-white rounded-xl p-8 animate-slideUp" style={{ boxShadow: '0 4px 24px rgba(45,27,46,0.10)', border: '1px solid #CFCFCF', animationDelay: '0.2s' }}>
              <h3 className="text-2xl font-bold mb-6" style={{ color: '#2D1B2E' }}>Your Profile</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Avatar */}
                <div className="flex flex-col items-center">
                  {userProfile.avatarUrl ? (
                    <img
                      src={userProfile.avatarUrl}
                      alt={userProfile.displayName}
                      className="w-24 h-24 rounded-full shadow-md mb-4"
                      style={{ border: '4px solid #F5EDE5', outline: '2px solid #F76C6C' }}
                    />
                  ) : (
                    <div
                      className="w-24 h-24 rounded-full flex items-center justify-center text-white text-3xl font-bold shadow-md mb-4"
                      style={{ backgroundColor: '#2D1B2E', border: '4px solid #F5EDE5', outline: '2px solid #F76C6C' }}
                    >
                      <span style={{ color: '#FFC93C' }}>{(userProfile.firstName || 'U')[0].toUpperCase()}</span>
                    </div>
                  )}
                  <p className="text-sm" style={{ color: '#888888' }}>Avatar</p>
                </div>

                {/* Profile Info */}
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-semibold" style={{ color: '#888888' }}>Full Name</label>
                    <p className="text-lg font-medium" style={{ color: '#2E2E2E' }}>{userProfile.displayName}</p>
                  </div>
                  <div>
                    <label className="text-sm font-semibold" style={{ color: '#888888' }}>Email</label>
                    <p className="text-lg font-medium" style={{ color: '#2E2E2E' }}>{userProfile.email}</p>
                  </div>
                  <div>
                    <label className="text-sm font-semibold" style={{ color: '#888888' }}>Member Since</label>
                    <p className="text-lg font-medium" style={{ color: '#2E2E2E' }}>
                      {new Date(userProfile.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                </div>
              </div>

              {/* Edit Profile Button */}
              <div className="mt-8 pt-6" style={{ borderTop: '1px solid #CFCFCF' }}>
                <button className="btn-primary w-full md:w-auto">
                  Edit Profile
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
