import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AdminLogin = () => {

    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('')
    const navigate=useNavigate();

    const handleSubmit= async (e) =>{
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:4000/api/v1/auth/login',{email,password, role:'admin'});
            console.log(response)
            localStorage.setItem('token',response.data.token)
            navigate('/admin/dashboard')
        } catch (error) {
            console.log("login failed",error)
        }
    }
  return (
    <div>
      <h2>Admin Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
            <label>Email:</label>
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            </div>
            <div>
            <label>Password:</label>
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            </div>
            <button type="submit">Login</button>
        </form>
    </div>
  )
}

export default AdminLogin
