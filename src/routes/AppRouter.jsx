import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from '../features/home/LandingPage.jsx';
import Product from '../features/products/Products.jsx';
import Login from '../features/auth/login.jsx';
import CartPage from '../features/cart/CartPage.jsx';
import ProductPage from '../features/products/ProductPage.jsx';

const AppRouter = () => {
    
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path='products' element={<Product></Product>}></Route>
        <Route path='login' element={<Login></Login>}></Route>
        <Route path='cart' element={<CartPage></CartPage>}></Route>
        <Route path="AI" element={<CartPage></CartPage>}></Route>
        <Route path='product/:id' element={<ProductPage></ProductPage>}></Route>
      </Routes>
    </Router>
  );
};

export default AppRouter;
