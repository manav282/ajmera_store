import React, { useState, useEffect } from 'react';
import ProductDetail from './ProductDetail';
import './ProductList.css';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://fakestoreapi.com/products/')
      .then(response => response.json())
      .then(data => {
        setProducts(data);
        setLoading(false);
      });
  }, []);

  const handleProductClick = (product) => {
    setSelectedProduct(product);
  };

  return (
    <div className="product-list-container">
      <div className="product-list">
        <h1 className="page-heading">Product List</h1>
        {loading && <p>Loading products...</p>}
        {!loading && products.length === 0 && <p>No products available.</p>}
        {!loading &&
          products.map(product => (
            <div key={product.id} className={`product-item ${selectedProduct && selectedProduct.id === product.id ? 'selected' : ''}`} onClick={() => handleProductClick(product)}>
              <h3>{product.title}</h3>
              
              <h4>Price : ${product.price}</h4>
              <p>Category : {product.category}</p>
            </div>
          ))}
      </div>

      <div className="product-detail">
        {selectedProduct ? (
          <ProductDetail product={selectedProduct} />
        ) : (
          <p className="empty-state-message">Select a product to view details.</p>
        )}
      </div>
    </div>
  );
};

export default ProductList;
