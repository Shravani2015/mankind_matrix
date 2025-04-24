import React from 'react';

function Header({ onSearch }) {
  return (
    <div className="header">
      <div className="logo">Mankind Matrix</div>

      <div className="header-right">
        <nav className="nav-links">
          <a href="#products">Products</a>
          <a href="#blog">Blog</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </nav>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search products..."
            onChange={e => onSearch(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}


export default Header;
