import React from 'react';
import './ProductHighlightCard.css';

const ProductHighlightCard = ({ product }) => {
  const { name, category, price, imageUrl } = product;
  
  // Ensure consistent text lengths
  const truncateText = (text, maxLength) => {
    if (!text) return '';
    return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
  };
  
  return (
    <div className="product-highlight-card">
      <div className="card-image-container">
        <img src={imageUrl} alt={name} className="card-image" />
      </div>
      <div className="card-content">
        <div className="card-info">
          <h3 className="card-name">{truncateText(name, 25)}</h3>
          <div className="card-category">{truncateText(category, 25)}</div>
          <div className="card-price">{price}</div>
        </div>
        <button className="shop-now-button">SHOP NOW</button>
      </div>
    </div>
  );
};

export default ProductHighlightCard;