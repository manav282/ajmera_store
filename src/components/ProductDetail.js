import React, { useEffect, useState } from 'react';
import './ProductDetail.css';

const ProductDetail = ({ product }) => {
  const [detailedProduct, setDetailedProduct] = useState(null);

  useEffect(() => {
    if (product) {
      fetch(`https://fakestoreapi.com/products/${product.id}`)
        .then(response => response.json())
        .then(data => setDetailedProduct(data));
    }
  }, [product]);

  return (
    <div className="product-detail-container">
      <div className="product-detail-content">
        {detailedProduct ? (
          <>
            <h2>{detailedProduct.title}</h2>
            <img src={detailedProduct.image} alt={detailedProduct.title} className="product-detail-image" />
            <p>{detailedProduct.description}</p>
            <p>Price: ${detailedProduct.price}</p>
            <p>Category: {detailedProduct.category}</p>
            <div className="rating">
              <p>Rating: {detailedProduct.rating.rate}
              {Array.from({ length: Math.round(detailedProduct.rating.rate) }, (_, index) => (
                <span key={index} className="star">&#9733;</span>
              ))} ({detailedProduct.rating.count} reviews)</p>
              
            </div>
          </>
        ) : (
          <p className="loading-message">Loading product details...</p>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;