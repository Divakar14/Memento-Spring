import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthContext } from '../context/AuthContext'

export const Dashboard = () => {
  const { userProfile, isAuthenticated, loading, logout } = useAuthContext()
  const navigate = useNavigate()
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'projects', label: 'Projects' },
    { id: 'tasks', label: 'Tasks' },
    { id: 'notes', label: 'Notes' },
    { id: 'calendar', label: 'Calendar' },
    { id: 'profile', label: 'Profile' },
  ]

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
    <div className="min-h-screen lg:flex" style={{ backgroundColor: '#F5EDE5' }}>
      {isSidebarOpen && (
        <button
          type="button"
          aria-label="Close navigation overlay"
          className="fixed inset-0 z-30 bg-black/40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-40 w-72 transform transition-transform duration-300 lg:static lg:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}
        style={{ backgroundColor: '#2D1B2E' }}
      >
        <div className="flex h-full flex-col px-5 py-6">
          <div className="flex items-center justify-between pb-6" style={{ borderBottom: '1px solid #3d2540' }}>
            <img src="/assets/memento-logo.png" alt="Memento" className="h-14 w-auto object-contain" />
            <button
              type="button"
              className="rounded-lg p-2 lg:hidden"
              style={{ color: '#F5EDE5' }}
              onClick={() => setIsSidebarOpen(false)}
            >
              <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="mt-6 rounded-2xl p-4" style={{ backgroundColor: '#3d2540' }}>
            <p className="text-xs uppercase tracking-[0.3em]" style={{ color: '#C3BABA' }}>Workspace</p>
            <p className="mt-2 text-xl font-bold" style={{ color: '#F5EDE5' }}>
              {userProfile?.displayName || userProfile?.firstName || 'Memento User'}
            </p>
            <p className="mt-1 text-sm" style={{ color: '#C3BABA' }}>Stay organized across projects, tasks, notes, and calendar.</p>
          </div>

          <nav className="mt-8 flex-1 space-y-2">
            {navItems.map((item, index) => {
              const isActive = item.id === 'home'

              return (
                <button
                  key={item.id}
                  type="button"
                  className="flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-left transition-all"
                  style={{
                    backgroundColor: isActive ? '#F76C6C' : 'transparent',
                    color: isActive ? '#F5EDE5' : '#C3BABA',
                    border: isActive ? 'none' : '1px solid transparent',
                  }}
                  onClick={() => setIsSidebarOpen(false)}
                >
                  <span
                    className="flex h-9 w-9 items-center justify-center rounded-xl text-sm font-bold"
                    style={{
                      backgroundColor: isActive ? 'rgba(245, 237, 229, 0.16)' : '#3d2540',
                      color: isActive ? '#F5EDE5' : '#FFC93C',
                    }}
                  >
                    {index + 1}
                  </span>
                  <span className="text-sm font-semibold tracking-wide">{item.label}</span>
                </button>
              )
            })}
          </nav>

          <button
            onClick={logout}
            className="mt-6 rounded-2xl px-4 py-3 text-sm font-semibold transition-colors"
            style={{ color: '#F5EDE5', border: '1px solid #C3BABA', backgroundColor: 'transparent' }}
          >
            Sign Out
          </button>
        </div>
      </aside>

      <div className="flex min-h-screen flex-1 flex-col lg:pl-0">
        {/* <header className="sticky top-0 z-20 px-4 py-4 sm:px-6 lg:px-10" style={{ backgroundColor: 'rgba(245, 237, 229, 0.9)', backdropFilter: 'blur(10px)' }}>
          <div className="flex items-center justify-between rounded-2xl bg-white px-4 py-3 shadow-sm" style={{ border: '1px solid #CFCFCF' }}>
            <div className="flex items-center gap-3">
              <button
                type="button"
                className="rounded-xl p-2 lg:hidden"
                style={{ backgroundColor: '#2D1B2E', color: '#F5EDE5' }}
                onClick={() => setIsSidebarOpen(true)}
                aria-label="Open navigation menu"
              >
                <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
              <img src="/assets/memento-logo-1.png" alt="Memento" className="h-10 w-auto object-contain" />
            </div>

            <div className="text-right">
              <p className="text-xs uppercase tracking-[0.3em]" style={{ color: '#888888' }}>Dashboard</p>
              <p className="text-sm font-semibold" style={{ color: '#2D1B2E' }}>
                {userProfile?.email || 'Signed in user'}
              </p>
            </div>
          </div>
        </header> */}

        <main className="px-4 py-8 sm:px-6 lg:px-10 lg:py-10">
          <div className="mx-auto max-w-5xl">
          {/* Welcome Card */}
          <div className="mb-8 rounded-xl bg-white p-8 animate-slideUp" style={{ boxShadow: '0 4px 24px rgba(45,27,46,0.10)', border: '1px solid #CFCFCF' }}>
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
            <div className="rounded-xl bg-white p-8 animate-slideUp" style={{ boxShadow: '0 4px 24px rgba(45,27,46,0.10)', border: '1px solid #CFCFCF', animationDelay: '0.2s' }}>
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
    </div>
  )
}
