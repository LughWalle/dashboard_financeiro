'use client'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import React from 'react'

export default function Dashboard() {
  const router = useRouter()

  const logout = async () => {
    try {
      axios.delete('/api/auth/logout').then((res) => {
        if (res.status === 200) {
          router.push('/login')
          }
        })
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <>
      <h1>Dashboard</h1>
      <button onClick={() => {
        logout()
      }}>Logout</button>
    </>
  )
}
