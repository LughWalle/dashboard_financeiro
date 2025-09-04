'use client'
import { useState, useEffect } from 'react'
import axios from 'axios'

export function useAuth() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const userData = await axios.get('/api/auth/check')
        setUser(userData.data.user)
      } catch (error) {
        setUser(null)
      } finally {
        setLoading(false)
      }
    }

    checkAuth()
  }, [])

  return { user, loading, isAuthenticated: !!user }
}