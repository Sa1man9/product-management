import React from 'react'
import { Link } from 'react-router-dom'

const UserLanding = () => {
  return (
    <div>
      <h1>Welcome to the Product Store</h1>
      <Link to="/register">Register</Link>
      <Link to="/login">Login</Link>
    </div>
  )
}

export default UserLanding

