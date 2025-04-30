import React, { useState } from 'react';
import HighlightedProductsCarousel from './HighlightedProductsCarousel';
import SidebarFilters from './SidebarFilters';
import ProductGrid from '../features/products/ProductGrid';
import withLayout from '../HOC/withLayout';

const LandingPage = () => {
    
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  return (
     <>
      <HighlightedProductsCarousel />
      <div className="main-content">
        <div className="filters-and-grid">
          <SidebarFilters onFilterChange={setSelectedCategory} />
          <ProductGrid searchQuery={searchQuery} category={selectedCategory} />
        </div>
      </div>
    </>
  );
};

export default withLayout(LandingPage);
