'use client'
import React from 'react'
import Link from 'next/link'
import { useAuth } from '@/hooks/useAuth'
import axios from 'axios'
import { usePathname, useRouter } from 'next/navigation'

export default function Header() {
  const { user, isAuthenticated } = useAuth()
  const router = useRouter()
  const pathname = usePathname()
  console.log(pathname)

  const logout = async () => {
    try {
      await axios.delete('/api/auth/logout')
      router.push('/login')
    } catch (error) {
      console.error('Logout failed:', error)
    }
  }

  return (
    <header style={{
      backgroundColor: '#333',
      color: 'white',
      padding: '1rem',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }}>
      <div>
        <h1 style={{ fontSize: '1.5rem' }}>
          <Link href="/" style={{ color: 'white' }}>
            Dashboard Financeiro
          </Link>
        </h1>
      </div>
      
      {isAuthenticated ? (
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <span>Olá, {user?.name || 'Usuário'}</span>
          <button
            onClick={logout}
            style={{
              backgroundColor: '#e74c3c',
              color: 'white',
              border: 'none',
              padding: '0.5rem 1rem',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Logout
          </button>
        </div>
      ) : (
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          {!['/login', '/register'].includes(pathname) && (
            <>
              <Link href="/login" style={{ color: 'white' }}>Login</Link>
              <Link href="/register" style={{ color: 'white' }}>Register</Link>
            </>
            )}
        </div>
      )}
    </header>
  )
}