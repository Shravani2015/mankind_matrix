import React, { useState } from 'react';
import HighlightedProductsCarousel from './HighlightedProductsCarousel';
import Header from './Header';
import SidebarFilters from './SidebarFilters';
import ProductGrid from '../features/products/ProductGrid';
import Footer from './Footer';

const LandingPage = () => {
    
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  return (
     <div>
      <Header onSearch={setSearchQuery}/>
      <HighlightedProductsCarousel />
      <div className="main-content">
        <div className="filters-and-grid">
          <SidebarFilters onFilterChange={setSelectedCategory} />
          <ProductGrid searchQuery={searchQuery} category={selectedCategory} />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default LandingPage;
