import React from 'react';
import './ProductHighlightCard.css';

const ProductHighlightCard = ({ product }) => {
  const { name, category, price, imageUrl, color } = product;
  
  // Default color if none provided
  const cardStyle = {
    backgroundColor: color || '#f5f5f5',
  };

  // Ensure consistent text lengths
  const truncateText = (text, maxLength) => {
    if (!text) return '';
    return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
  };
  
  return (
    <div className="product-highlight-card" style={cardStyle}>
      <div className="card-image-container">
        <img src={imageUrl} alt={name} className="card-image" />
      </div>
      <div className="card-content">
        <div className="card-info">
          <h2 className="card-name">{truncateText(name, 18)}</h2>
          <div className="card-category">{truncateText(category, 25)}</div>
          <div className="card-price">{price}</div>
        </div>
        <button>SHOP NOW</button>
      </div>
    </div>
  );
};

export default ProductHighlightCard;