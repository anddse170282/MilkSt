import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/homepage.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

const HomePage = () => {
  const [data, setData] = useState([]);
  const [currentProduct, setCurrentProduct] = useState(0);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('https://localhost:7188/api/milks');
        setData(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchProducts();
  }, []);

  const moveToPreviousProduct = () => {
    setCurrentProduct((prevProduct) => (prevProduct === 0 ? data.length - 1 : prevProduct - 1));
  };

  const moveToNextProduct = () => {
    setCurrentProduct((prevProduct) => (prevProduct === data.length - 1 ? 0 : prevProduct + 1));
  };

  return (
    <>
      <main>
        <div className="container">
          <div className="main-image">
            <img src="1.png" width="800" height="295" alt="1" />
          </div>
          <div className="side-images">
            <div className="side-image">
              <img src="2.png" width="500" height="150" alt="1" />
            </div>
            <div className="side-image">
              <img src="3.png" width="500" height="150" alt="1" />
            </div>
          </div>
        </div>

        <div className="hercontainer">
          <h2>Sản phẩm mới</h2>
          <div className="product-section">
            <button className="prev-button" onClick={moveToPreviousProduct}>&lt;</button>
            <button className="next-button" onClick={moveToNextProduct}>&gt;</button>
            <div className="product-grid-container">
              <div className="product-grid new-product-grid" style={{ transform: `translateX(-${currentProduct * 100}%)` }}>
                {data.map((product => (
                  <div className='product-item' key={product.milkId}>
                    {product.milkPictures && product.milkPictures.length > 0 && (
                      <a href='/' key={product.milkPictures[0].milkPictureId}>
                        <img src={product.milkPictures[0].picture} alt={product.milkName} className="product-image" />
                      </a>
                    )}
                    <p className="product-name">{product.milkName}</p>
                  </div>
                )))}
              </div>
            </div>
          </div>
          <h2>Sản phẩm ưu đãi</h2>
          <div className="product-section">
            <button className="prev-button" onClick={moveToPreviousProduct}>&lt;</button>
            <button className="next-button" onClick={moveToNextProduct}>&gt;</button>
            <div className="product-grid-container">
              <div className="product-grid new-product-grid" style={{ transform: `translateX(-${currentProduct * 100}%)` }}>
                {data.map((product => (
                  <div className='product-item' key={product.milkId}>
                    {product.milkPictures && product.milkPictures.length > 0 && (
                      <a href='/' key={product.milkPictures[0].milkPictureId}>
                        <img src={product.milkPictures[0].picture} alt={product.milkName} className="product-image" />
                      </a>
                    )}
                    <p className="product-name">{product.milkName}</p>
                  </div>
                )))}
              </div>
            </div>
          </div>
          <h2>Sản phẩm khác</h2>
          <div className="product-section">
            <button className="prev-button" onClick={moveToPreviousProduct}>&lt;</button>
            <button className="next-button" onClick={moveToNextProduct}>&gt;</button>
            <div className="product-grid-container">
              <div className="product-grid new-product-grid" style={{ transform: `translateX(-${currentProduct * 100}%)` }}>
                {data.map((product => (
                  <div className='product-item' key={product.milkId}>
                    {product.milkPictures && product.milkPictures.length > 0 && (
                      <a href='/' key={product.milkPictures[0].milkPictureId}>
                        <img src={product.milkPictures[0].picture} alt={product.milkName} className="product-image" />
                      </a>
                    )}
                    <p className="product-name">{product.milkName}</p>
                  </div>
                )))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default HomePage;
