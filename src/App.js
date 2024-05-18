import logo from './logo.svg';
import './App.css';
import { Router } from 'react-router-dom';

import { BrowserRouter,Route,Routes } from 'react-router-dom';

import AdminLogin from './components/AdminLogin';
import AdminDashboard from './components/AdminDashboard';
import ProductList from './components/ProductList';
import AddProduct from './components/AddProduct';
import UserLanding from './components/UserLanding';
import UserRegister from './components/UserRegister';
import UserLogin from './components/UserLogin';
import UserPanel from './components/UserPanel';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/admin/login" Component={AdminLogin} />
        <Route path="/admin/dashboard" Component={AdminDashboard} />
        <Route path="/admin/products" Component={ProductList} />
        <Route path="/admin/add-product" Component={AddProduct} />
        <Route path="/register" Component={UserRegister} />
        <Route path="/login" Component={UserLogin} />
        <Route path="/user/panel" Component={UserPanel} />
        <Route path="/" Component={UserLanding} />
    </Routes>
    </BrowserRouter>
  );
}

export default App;
