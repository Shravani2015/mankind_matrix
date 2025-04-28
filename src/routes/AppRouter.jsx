import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from '../layouts/landingPage.jsx';
import Product from '../features/products/Products.jsx';

const AppRouter = () => {
    
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path='products' element={<Product></Product>}></Route>
      </Routes>
    </Router>
  );
};

export default AppRouter;
