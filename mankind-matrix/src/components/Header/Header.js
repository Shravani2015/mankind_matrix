import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

function Header({ onSearch }) {
  return (
    <div className="header">
      <div className="logo">Mankind Matrix</div>

      <div className="header-right">
        <nav className="nav-links">
          <Link to='/products'>Products</Link>
          <Link to='/blog'>Blog</Link>
          <Link to='/about'>About</Link>
          <Link to='/contact'>Contact</Link>
          <Link to='/account'>Account</Link>
          
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