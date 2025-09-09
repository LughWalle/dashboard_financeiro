'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Sidebar() {
  const pathname = usePathname()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }

  return (
    <>
      <button
        onClick={toggleSidebar}
        style={{
          position: 'fixed',
          top: '1rem',
          left: '1rem',
          backgroundColor: '#2c3e50',
          color: 'white',
          border: 'none',
          padding: '0.5rem',
          borderRadius: '4px',
          cursor: 'pointer',
          zIndex: 1001,
          fontSize: '1.2rem'
        }}
      >
        ☰ Menu
      </button>
      <div style={{
        position: 'fixed',
        top: 0,
        left: sidebarOpen ? '0' : '-300px',
        width: '300px',
        height: '100vh',
        backgroundColor: '#2c3e50',
        color: 'white',
        transition: 'left 0.3s ease',
        zIndex: 1000,
        padding: '2rem 1rem',
        boxShadow: '2px 0 5px rgba(0,0,0,0.1)'
      }}>
        <div style={{ marginBottom: '2rem' }}>
          <h2 style={{ margin: 0, fontSize: '1.2rem' }}>Menu</h2>
          <button
            onClick={toggleSidebar}
            style={{
              position: 'absolute',
              top: '1rem',
              right: '1rem',
              backgroundColor: 'transparent',
              border: 'none',
              color: 'white',
              fontSize: '1.5rem',
              cursor: 'pointer'
            }}
          >
            ×
          </button>
        </div>

        <nav>
          <ul style={{
            listStyle: 'none',
            padding: 0,
            margin: 0
          }}>
            <li style={{ marginBottom: '1rem' }}>
              <Link 
                href="/" 
                onClick={() => setSidebarOpen(false)}
                style={{ 
                  color: pathname === '/' ? '#4CAF50' : 'white',
                  textDecoration: 'none',
                  fontSize: '1.1rem',
                  display: 'block',
                  padding: '0.5rem',
                  borderRadius: '4px',
                  backgroundColor: pathname === '/' ? 'rgba(76, 175, 80, 0.1)' : 'transparent'
                }}
              >
                �� Home
              </Link>
            </li>
            <li style={{ marginBottom: '1rem' }}>
              <Link 
                href="/dashboard" 
                onClick={() => setSidebarOpen(false)}
                style={{ 
                  color: pathname === '/dashboard' ? '#4CAF50' : 'white',
                  textDecoration: 'none',
                  fontSize: '1.1rem',
                  display: 'block',
                  padding: '0.5rem',
                  borderRadius: '4px',
                  backgroundColor: pathname === '/dashboard' ? 'rgba(76, 175, 80, 0.1)' : 'transparent'
                }}
              >
                📊 Dashboard
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: 999
          }}
        />
      )}
    </>
  )
}