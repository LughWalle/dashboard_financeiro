'use client'
import React, { useState, useEffect } from 'react'
import DashboardSidebar from '@/components/DashboardSidebar'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const check = () => {
      const mobile = window.innerWidth < 768
      setIsMobile(mobile)
      setSidebarOpen(!mobile)
    }
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <DashboardSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <main style={{ 
        flex: 1, 
        marginLeft: isMobile ? 0 : '280px', 
        padding: '2rem',
        backgroundColor: '#f8f9fa',
        overflowY: 'auto'
      }}>
        {/* Hamburger para mobile */}
        {isMobile && (
          <button
            aria-label="Abrir menu"
            onClick={() => setSidebarOpen(true)}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '40px',
              height: '40px',
              borderRadius: '8px',
              border: 'none',
              background: 'white',
              boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
              cursor: 'pointer',
              marginBottom: '1rem'
            }}
          >
            ☰
          </button>
        )}

        {children}
      </main>
    </div>
  )
}
