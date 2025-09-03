'use client'
import React from 'react'
import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import axios from 'axios'

export default function Login() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const next = searchParams.get('next') || '/dashboard'

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    try {
      const response = await axios.post('/api/auth/login', { email, password }).then((res) => {
        if (res.status === 200) {
          router.push(next)
        }
      }).catch((err) => {
        setError(err.response.data.message)
      }).finally(() => {
        setLoading(false)
      })
    } catch (err) {
      setError('An error occurred')
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
        <p>Don't have an account? <a href="/register">Register</a></p>
        <p>Forgot your password? <a href="/forgot">Forgot Password</a></p>
    </>
  )
}
