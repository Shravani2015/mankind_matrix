// src/App.js
import React, { useState } from 'react';
import Header from './layouts/Header';
import Footer from './layouts/Footer';
import SidebarFilters from './layouts/SidebarFilters';
import ProductGrid from './features/products/ProductGrid';
import HighlightedProductsCarousel from './layouts/HighlightedProductsCarousel';
import './styles/global.css'; 
import './styles/variables.css';

const App = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  return (
    <div>
      <Header onSearch={setSearchQuery}/>
      <HighlightedProductsCarousel />
      <div className="main-content">
        <SidebarFilters onFilterChange={setSelectedCategory} />
        <ProductGrid searchQuery={searchQuery} category={selectedCategory} />
      </div>
      <Footer />
    </div>
  );
};

export default App;