import React from 'react'

export default function Forgot() {
  return (
    <>
      <h1>Forgot Password</h1>
      <form>
        <input type="email" placeholder="Email" />
        <button type="submit">Forgot Password</button>
      </form>
      <p>Don't have an account? <a href="/register">Register</a></p>
      <p>Already have an account? <a href="/login">Login</a></p>
    </>
  )
}
