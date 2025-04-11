// src/App.js
import React, { useState } from 'react';
import Header from './components/Header';
import Navigation from './components/Navigation';
import SidebarFilters from './components/SidebarFilters';
import ProductGrid from './components/ProductGrid';
import FeaturedCarousel from './components/FeaturedCarousel';
import './App.css'; 

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