import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import * as milkService from '../api/milkService'; // Adjust the path as needed
import '../css/homepage.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

const HomePage = () => {
  const [data, setData] = useState([]);
  const [currentProductNew, setCurrentProductNew] = useState(0);
  const [currentProductPromo, setCurrentProductPromo] = useState(0);
  const [currentProductOther, setCurrentProductOther] = useState(0);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await milkService.getAllProducts();
        console.log('Fetched products:', response); // Kiểm tra phản hồi từ API
        setData(response);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchProducts();
  }, []);

  const moveToPreviousProductNew = () => {
    if (data) {
      setCurrentProductNew((prevProduct) => (prevProduct === 0 ? data.length - 1 : prevProduct - 1));
    }
  };

  const moveToNextProductNew = () => {
    if (data) {
      setCurrentProductNew((prevProduct) => (prevProduct === data.length - 1 ? 0 : prevProduct + 1));
    }
  };

  const moveToPreviousProductPromo = () => {
    if (data) {
      setCurrentProductPromo((prevProduct) => (prevProduct === 0 ? data.length - 1 : prevProduct - 1));
    }
  };

  const moveToNextProductPromo = () => {
    if (data) {
      setCurrentProductPromo((prevProduct) => (prevProduct === data.length - 1 ? 0 : prevProduct + 1));
    }
  };

  const moveToPreviousProductOther = () => {
    if (data) {
      setCurrentProductOther((prevProduct) => (prevProduct === 0 ? data.length - 1 : prevProduct - 1));
    }
  };

  const moveToNextProductOther = () => {
    if (data) {
      setCurrentProductOther((prevProduct) => (prevProduct === data.length - 1 ? 0 : prevProduct + 1));
    }
  };

  const renderProducts = (startIndex) => {
    if (!data || data.length === 0) {
      return null;
    }

    const productsToShow = data.slice(startIndex, startIndex + 3);
    return productsToShow.map((product) => (
      <div className='product-item' key={product.milkId}>
        {product.milkPictures && product.milkPictures.length > 0 && (
          <Link to={`/product-info/${product.milkId}`} key={product.milkPictures[0].milkPictureId}>
            <img src={product.milkPictures[0].picture} alt={product.milkName} className="product-image" />
          </Link>
        )}
        <p className="product-name">{product.milkName}</p>
      </div>
    ));
  };

  return (
    <>
      <main>
        <div className="container3">
          <div className="main-image">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/imageuploadv3.appspot.com/o/QuangCaoImage%2F1.png?alt=media&token=10232a94-2d87-4ead-8ca1-c89f4cc2755f"
              width="800"
              height="295"
              alt="1"
            />
          </div>
          <div className="side-images">
            <div className="side-image2">
              <img
                src="https://firebasestorage.googleapis.com/v0/b/imageuploadv3.appspot.com/o/QuangCaoImage%2F2.png?alt=media&token=0056189f-b73d-469b-aa75-fe5e39ff7f25"
                width="500"
                height="150"
                alt="1"
              />
            </div>
            <div className="side-image2">
              <img
                src="https://firebasestorage.googleapis.com/v0/b/imageuploadv3.appspot.com/o/QuangCaoImage%2F3.png?alt=media&token=72cd1903-7e22-40dc-ba65-1d458032d8f0"
                width="500"
                height="150"
                alt="1"
              />
            </div>
          </div>
        </div>


        <div className="hercontainer">
          <h2>Sản phẩm mới</h2>
          <div className="product-section">
            <button
              className="prev-button"
              onClick={moveToPreviousProductNew}
              disabled={currentProductNew === 0}
            >
              &lt;
            </button>
            <button
              className="next-button"
              onClick={moveToNextProductNew}
              disabled={currentProductNew >= data.length - 3}
            >
              &gt;
            </button>
            <div className="product-grid-container">
              <div className="product-grid new-product-grid">
                {renderProducts(currentProductNew)}
              </div>
            </div>
          </div>

          <h2>Sản phẩm ưu đãi</h2>
          <div className="product-section">
            <button
              className="prev-button"
              onClick={moveToPreviousProductPromo}
              disabled={currentProductPromo === 0}
            >
              &lt;
            </button>
            <button
              className="next-button"
              onClick={moveToNextProductPromo}
              disabled={currentProductPromo >= data.length - 3}
            >
              &gt;
            </button>
            <div className="product-grid-container">
              <div className="product-grid new-product-grid">
                {renderProducts(currentProductPromo)}
              </div>
            </div>
          </div>

          <h2>Sản phẩm khác</h2>
          <div className="product-section">
            <button
              className="prev-button"
              onClick={moveToPreviousProductOther}
              disabled={currentProductOther === 0}
            >
              &lt;
            </button>
            <button
              className="next-button"
              onClick={moveToNextProductOther}
              disabled={currentProductOther >= data.length - 3}
            >
              &gt;
            </button>
            <div className="product-grid-container">
              <div className="product-grid new-product-grid">
                {renderProducts(currentProductOther)}
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default HomePage;