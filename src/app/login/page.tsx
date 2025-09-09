'use client'
import React from 'react'
import { useState } from 'react'
import axios from 'axios'

export default function Login() {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    
    try {
      const response = await axios.post('/api/auth/login', { email, password })

      if (response.status === 200) {
        window.location.href = '/dashboard'
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required/>
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required/>
            <button type="submit" disabled={loading}>{loading ? 'Loading...' : 'Login'}</button>
        </form>
        {error && <p style={{color: 'red'}}>{error}</p>}
        <p>Don&apos;t have an account? <a href="/register">Register</a></p>
    </>
  )
}
