import React from 'react'

function Register() {
  return (
    <>
      <h1>Register</h1>
      <form>
        <input type="email" placeholder="Email" />
        <input type="password" placeholder="Password" />
        <button type="submit">Register</button>
      </form>
    <p>Already have an account? <a href="/login">Login</a></p>
    <p>Forgot your password? <a href="/forgot">Forgot Password</a></p>
    </>
  )
}

export default Register