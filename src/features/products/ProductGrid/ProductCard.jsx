// src/components/ProductCard.js
import React from 'react';

const ProductCard = ({ product }) => {
  const viewProductDetails = (id) => {
    window.location.href = `/products/${id}`;
  };

  const addToCart = (id) => {
    console.log(`Product ${id} added to cart`);
  };

  return (
    <div className="product-card">
      {/*<img src={product.imageUrl} alt={product.name} />*/}
      <h3>{product.name}</h3>
      <p>{product.shortDescription}</p>
      <ul>
        <li><strong>Price:</strong> {product.price}</li>
        <li><strong>Category:</strong> {product.category}</li>
      </ul>
      <div className="actions">
        <button onClick={() => viewProductDetails(product.id)}>View Details</button>
        <button onClick={() => addToCart(product.id)}>Add to Cart</button>
      </div>
    </div>
  );
};

export default ProductCard;