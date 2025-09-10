'use client'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { UserMock } from '@/lib/userMock'

export function useAuth() {
  const [user, setUser] = useState<UserMock | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const userData = await axios.get('/api/auth/check')
        if (!userData.data.user) {
          setUser(null)
          return
        }
        setUser(userData.data.user)
      } catch (error) {
        console.error('Erro ao verificar autenticação:', error)
        setUser(null)
      } finally {
        setLoading(false)
      }
    }

    checkAuth()
  }, [])

  return { user, loading, isAuthenticated: !!user }
}