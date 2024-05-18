import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
const AdminDashboard = () => {

    const [userCount,setUserCount]=useState(0);
    const [productCount,setProductCount]=useState(0)

    useEffect(()=>{
        const fetchCounts= async ()=>{
          console.log("inside fetch count")
          try{
            const users = await axios.get('http://localhost:4000/api/v1/auth/getAllUser',{
              headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            })
          console.log(users)
          setUserCount (users.data.users.length);
          }catch(error){
            console.log(error)
          }
            try{
            const products= await axios.get('http://localhost:4000/api/v1/product/', {
              headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            })
            console.log(products)
            setProductCount(products.data.products.length);
          }
            catch(error){
              console.log(error)
            }
        };
        fetchCounts();

    }, [])
  return (
<div>
      <h1>Admin Dashboard</h1>
      <div>
        <div>
          <h3>Users: {userCount}</h3>
        </div>
        <div>
          <h3>Products: {productCount}</h3>
        </div>
      </div>
      <Link to="/admin/products">Manage Products</Link>
    </div>
  )
}

export default AdminDashboard
