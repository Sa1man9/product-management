import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [productForm, setProductForm] = useState({
    name: '',
    image: '',
    price: ''
  });

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await axios.get('http://localhost:4000/api/v1/product/', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setProducts(response.data.products);
    };
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:4000/api/v1/product/${id}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });
    setProducts(products.filter(product => product._id !== id));
  };

  const handleEdit = (product) => {
    setCurrentProduct(product);
    setProductForm({ name: product.name, image: product.image, price: product.price });
    setShowModal(true);
  };

  const handleUpdate = async () => {
    const response = await axios.put(`http://localhost:4000/api/v1/product/${currentProduct._id}`, productForm, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });
    setProducts(products.map(product => (product._id === response.data.product._id ? response.data.product : product)));
    setShowModal(false);
    setCurrentProduct(null);
  };

  return (
    <div>
      <h1>Product List</h1>
      <Link to="/admin/add-product">Add New Product</Link>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Image</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map(product => (
            <tr key={product._id}>
              <td>{product.name}</td>
              <td><img src={product.image} alt={product.name} width="50" /></td>
              <td>{product.price}</td>
              <td>
                <button onClick={() => handleEdit(product)}>Edit</button>
                <button onClick={() => handleDelete(product._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>Edit Product</h2>
            <label>
              Product Name:
              <input
                type="text"
                value={productForm.name}
                onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
              />
            </label>
            <label>
              Product Image:
              <input
                type="text"
                value={productForm.image}
                onChange={(e) => setProductForm({ ...productForm, image: e.target.value })}
              />
            </label>
            <label>
              Product Price:
              <input
                type="number"
                value={productForm.price}
                onChange={(e) => setProductForm({ ...productForm, price: e.target.value })}
              />
            </label>
            <button onClick={handleUpdate}>Update</button>
            <button onClick={() => setShowModal(false)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductList;
