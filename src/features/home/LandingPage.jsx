import React, { useState } from 'react';
import HighlightedProductsCarousel from '../products/HighlightedProductsCarousel';
import SidebarFilters from '../products/Filters/SidebarFilters';
import ProductGrid from '../products/ProductGrid/index';
import withLayout from '../../layouts/HOC/withLayout';

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
