import React, { useState } from 'react';
import HighlightedProductsCarousel from './HighlightedProductsCarousel';
import SidebarFilters from './SidebarFilters';
import ProductGrid from '../features/products/ProductGrid';
import MainLayout from './MainLayout';

const LandingPage = () => {
    
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  return (
     <MainLayout>
      <HighlightedProductsCarousel />
      <div className="main-content">
        <SidebarFilters onFilterChange={setSelectedCategory} />
        <ProductGrid searchQuery={searchQuery} category={selectedCategory} />
      </div>
    </MainLayout>
  );
};

export default LandingPage;
