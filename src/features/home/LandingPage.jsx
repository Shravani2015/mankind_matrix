import React, { useState } from 'react';
import './LandingPage.css';
import HighlightedProductsCarousel from '../products/HighlightedProductsCarousel';
import SidebarFilters from '../products/Filters/SidebarFilters';
import ProductGrid from '../products/ProductGrid';
import withLayout from '../../layouts/HOC/withLayout';
import { ToastContainer, toast } from 'react-toastify';

const LandingPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  
  return (
    <>
    <>
      <HighlightedProductsCarousel />

      <div>
        <button onClick={() => showToaster('success')}>Success</button>
        <button onClick={() => showToaster('error')}>Error</button>
        <ToastContainer />
      </div>

      <div className="main-content">
        <section className="products-section">
          {/* Products header */}
          <div className="products-header">
            <h2 className="products-title">Our Products</h2>
            <SidebarFilters onFilterChange={setSelectedCategory} />
          </div>
          
          {/* Product grid */}
          <div className="product-grid-container">
            <ProductGrid 
              searchQuery={searchQuery} 
              category={selectedCategory} 
            />
          </div>
        </section>
      </div>
    </>
  );
};

export default withLayout(LandingPage);