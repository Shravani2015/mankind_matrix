// src/App.js
import React, { useState } from 'react';
import Header from './layouts/Header';
import Navigation from './layouts/Navigation';
import SidebarFilters from './layouts/SidebarFilters';
import ProductGrid from './features/products/ProductGrid';
import FeaturedCarousel from './layouts/FeaturedCarousel';
import './styles/global.css'; 
import './styles/variables.css';

const App = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  return (
    <div>
      <Header />
      <Navigation onSearch={setSearchQuery} />
      <FeaturedCarousel />
      <div className="main-content">
        <SidebarFilters onFilterChange={setSelectedCategory} />
        <ProductGrid searchQuery={searchQuery} category={selectedCategory} />
      </div>
    </div>
  );
};

export default App;