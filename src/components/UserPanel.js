import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UserPanel = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(5);
  const [userName, setUserName] = useState('');

  useEffect(() => {
    // Fetch user details
    const fetchUserDetails = async () => {
      const response = await axios.get(`http://localhost:4000/api/v1/auth/me`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      console.log(response)
      setUserName(response.data.user.name);
    };

    // Fetch products
    const fetchProducts = async () => {
      const response = await axios.get('http://localhost:4000/api/v1/product/', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setProducts(response.data.products);
    };

    fetchUserDetails();
    fetchProducts();
  }, []);

  // Pagination logic
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.filter(product =>
    product.name.toLowerCase().includes(search.toLowerCase())
  ).slice(indexOfFirstProduct, indexOfLastProduct);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <div style={{ textAlign: 'right', padding: '10px' }}>
        <strong>Welcome, {userName}!</strong>
      </div>
      <h2>User Panel</h2>
      <input
        type="text"
        placeholder="Search Products"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <ul>
        {currentProducts.map(product => (
          <li key={product._id}>{product.name} - ${product.price}</li>
        ))}
      </ul>
      <nav>
        <ul style={{ display: 'flex', listStyle: 'none' }}>
          {Array.from({ length: Math.ceil(products.length / productsPerPage) }, (_, index) => (
            <li key={index} onClick={() => paginate(index + 1)} style={{ margin: '0 5px', cursor: 'pointer' }}>
              {index + 1}
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default UserPanel;
