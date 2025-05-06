import { useState } from 'react';
import HighlightedProductsCarousel from '../products/HighlightedProductsCarousel';
import SidebarFilters from '../products/Filters/SidebarFilters';
import ProductGrid from '../products/ProductGrid';
import withLayout from '../../layouts/HOC/withLayout';
import { ToastContainer, toast } from 'react-toastify';

const LandingPage = () => {

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const showToaster = (type) => {
    if (type === "success") {
      toast.success("Success message !!", {
        position: 'bottom-center'
      });

    }
    else if (type === "error") {
      toast.error("Error message !!", {
        position: 'bottom-center'
      });
    }
  }


  return (
    <>
      <HighlightedProductsCarousel />

      <div>
        <button onClick={() => showToaster('success')}>Success</button>
        <button onClick={() => showToaster('error')}>Error</button>
        <ToastContainer />
      </div>

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
