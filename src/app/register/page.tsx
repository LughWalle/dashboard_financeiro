'use client'
import axios from 'axios'
import React, { useState } from 'react'

function Register() {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const response = await axios.post('/api/auth/register', { email, name, password })
      if (response.status === 201) {
        window.location.href = '/login'
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'An error occurred')
    } finally {
      setLoading(false)
    }
  }
  return (
    <>
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <input type="name" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button type="submit">Register</button>
      </form>
    <p>Already have an account? <a href="/login">Login</a></p>
    <p>Forgot your password? <a href="/forgot">Forgot Password</a></p>
    </>
  )
}

export default Register