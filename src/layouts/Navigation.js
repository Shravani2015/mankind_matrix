import React from 'react';

function Navigation({ onSearch }) {
  return (
    <nav className="navigation">
      <div className="logo"> Mankind Matrix</div>
      <input
        type="text"
        placeholder="Search products..."
        onChange={e => onSearch(e.target.value)}
      />
    </nav>
  );
}

export default Navigation;
