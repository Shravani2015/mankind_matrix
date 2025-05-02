import React, { useState } from 'react';

const SidebarFilters = ({ onFilterChange }) => {
  const [selectedCategory, setSelectedCategory] = useState('');

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
    onFilterChange(e.target.value);
  };

  return (
    <div className="sidebar-filters">
      <h4>Filter by Category</h4>
      <select onChange={handleCategoryChange} value={selectedCategory}>
        <option value="">All Products</option>
        <option value="GPUs">GPUs</option>
        <option value="AI Hardware">AI Hardware</option>
        <option value="Data Center">Data Center</option>
        <option value="Automotive">Automotive</option>
        <option value="Networking">Networking</option>
        <option value="Semiconductors">Semiconductors</option>
        <option value="AI Software">AI Software</option>
      </select>
    </div>
  );
};

export default SidebarFilters;