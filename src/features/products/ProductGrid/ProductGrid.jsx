import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import Pagination from './Pagination';
import { getAllProducts } from '../../../api/productService';
import './ProductGrid.css';

const ProductGrid = ({ searchQuery, category }) => {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage, setProductsPerPage] = useState(12);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalProducts, setTotalProducts] = useState(0);
  
  // Fetch products from API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        const pageIndex = currentPage - 1; // API uses 0-based indexing
        const response = await getAllProducts(pageIndex, productsPerPage);
        
        setProducts(response.content);
        setTotalProducts(response.totalElements);
        setIsLoading(false);
      } catch (err) {
        setError('Failed to load products');
        setIsLoading(false);
        console.error('Error fetching products:', err);
      }
    };
    
    fetchProducts();
  }, [currentPage, productsPerPage]);

  // Adjust products per page based on screen size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 576) {
        // 4 products (2 rows of 2)
        setProductsPerPage(4);
      } else if (window.innerWidth <= 992) {
        // 6 products (3 rows of 2)
        setProductsPerPage(6);
      } else {
        // 8 products (2 rows of 4)
        setProductsPerPage(8);
      }
    };

    // Set initial value and add event listener
    handleResize();
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Filter products based on search query and category
  useEffect(() => {
    let result = products;
    
    if (category) {
      result = result.filter(p => p.category === category);
    }
    
    if (searchQuery) {
      result = result.filter(p =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (p.shortDescription && p.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }
    
    setFiltered(result);
  }, [searchQuery, category, products]);

  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    // Scroll to top of product grid when changing pages
    window.scrollTo({
      top: document.querySelector('.product-grid-container').offsetTop - 100,
      behavior: 'smooth'
    });
  };

  // Pagination logic
  const totalPages = Math.ceil(totalProducts / productsPerPage);

  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading products...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <h2>Error Loading Products</h2>
        <p>{error}</p>
      </div>
    );
  }

  if (filtered.length === 0) {
    return (
      <div className="product-not-found">
        <h2>No Products Found</h2>
        <p>Try adjusting your search or filter criteria.</p>
      </div>
    );
  }

  return (
    <div className="product-grid-container">
      <div className="product-grid">
        {filtered.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      
      {totalPages > 1 && (
        <Pagination 
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
};

export default ProductGrid;