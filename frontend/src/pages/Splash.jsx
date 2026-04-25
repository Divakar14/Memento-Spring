import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from 'react-oidc-context'

export const Splash = () => {
  const [animate, setAnimate] = useState(false)
  const auth = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    setAnimate(true)
    
    const timer = setTimeout(() => {
      if (auth.isAuthenticated) {
        navigate('/dashboard')
      } else {
        navigate('/signin')
      }
    }, 10000)

    return () => clearTimeout(timer)
  }, [auth.isAuthenticated, navigate])

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center overflow-hidden relative" style={{ backgroundColor: '#2D1B2E' }}>
      {/* Ambient glow blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className={`absolute top-1/4 right-1/4 w-80 h-80 rounded-full blur-3xl transition-all duration-1000 ${animate ? 'opacity-20 translate-y-0' : 'opacity-0 translate-y-20'}`}
          style={{ backgroundColor: '#F76C6C' }}
        />
        <div
          className={`absolute bottom-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl transition-all duration-1000 ${animate ? 'opacity-15 translate-y-0' : 'opacity-0 -translate-y-20'}`}
          style={{ backgroundColor: '#FFC93C' }}
        />
      </div>

      {/* Content */}
      <div className={`relative z-10 text-center transition-all duration-1000 ${animate ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
        {/* Logo */}
        <div className="w-60 h-60 mx-auto rounded-2xl flex items-center justify-center mb-6">
            <img src="././dist/assets/memento-logo.png" alt="Memento Logo"/>
          {/* <div
            className="w-24 h-24 mx-auto rounded-2xl flex items-center justify-center shadow-2xl"
            style={{ backgroundColor: '#F5EDE5' }}
          >
            <span className="text-5xl font-black" style={{ color: '#2D1B2E' }}>M</span>
          </div> */}
          {/* Dusty Yellow glow ring
          <div
            className="w-28 h-1 mx-auto mt-3 rounded-full blur-sm opacity-70"
            style={{ backgroundColor: '#FFC93C' }}
          /> */}
        </div>

        {/* Title
        <h1 className="text-6xl font-black mb-3 drop-shadow-lg" style={{ color: '#F5EDE5' }}>
          Memento
        </h1> */}

        {/* Subtitle */}
        <p className="text-lg mb-12 font-light tracking-widest uppercase" style={{ color: '#C3BABA' }}>
          Capture · Organize · Remember
        </p>

        {/* Loading dots — Coral Rose */}
        <div className="flex justify-center gap-3">
          <div className="w-2.5 h-2.5 rounded-full animate-bounce" style={{ backgroundColor: '#F76C6C', animationDelay: '0s' }} />
          <div className="w-2.5 h-2.5 rounded-full animate-bounce" style={{ backgroundColor: '#F76C6C', animationDelay: '0.2s' }} />
          <div className="w-2.5 h-2.5 rounded-full animate-bounce" style={{ backgroundColor: '#F76C6C', animationDelay: '0.4s' }} />
        </div>
      </div>

      {/* Bottom caption */}
      <div className="absolute bottom-8 text-center text-sm font-light" style={{ color: '#888888' }}>
        <p>Crafted with care for your memories</p>
      </div>
    </div>
  )
}
