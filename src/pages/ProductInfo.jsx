import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import * as milkService from '../api/milkService';
import * as brandService from '../api/brandService';
import '../css/productInfo.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

const ProductInfo = () => {
  const [product, setProduct] = useState({});
  const [brandName, setBrandName] = useState('');
  const [quantity, setQuantity] = useState(1); // State to manage product quantity
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        if (id) {
          const productData = await milkService.getProductsById(id);
          console.log('Fetched product:', productData);
          setProduct(productData);

          const brandData = await brandService.getBrandById(productData.brandId);
          console.log('Fetched brand:', brandData);
          setBrandName(brandData.brandName);
        }
      } catch (error) {
        console.error("There was an error fetching the product or brand data!", error);
      }
    };

    fetchProduct();
  }, [id]);

  const handleBuyNow = () => {
    const cart = JSON.parse(sessionStorage.getItem('cart')) || [];
    cart.push({ ...product, quantity });
    sessionStorage.setItem('cart', JSON.stringify(cart));
    navigate('/cart');
  };

  const handleAddToCart = () => {
    const cart = JSON.parse(sessionStorage.getItem('cart')) || [];
    cart.push({ ...product, quantity });
    sessionStorage.setItem('cart', JSON.stringify(cart));
    console.log("Product added to cart:", product);
  };

  const increaseQuantity = () => {
    setQuantity(prevQuantity => prevQuantity + 1);
  };

  const decreaseQuantity = () => {
    setQuantity(prevQuantity => (prevQuantity > 1 ? prevQuantity - 1 : 1));
  };

  return (
    <div>
      <main>
        <div className="col-md-12">
          <div className="row" style={{ paddingBottom: '7%' }}>
            <div className="col-md-2"></div>
            <div className="col-md-4">
              {product.milkPictures && product.milkPictures.length > 0 && (
                <img src={product.milkPictures[0].picture} alt={product.milkName} style={{ width: '100%', maxWidth: '500px', height: 'auto' }} />
              )}
            </div>

            <div className="col-md-4" style={{ paddingTop: '5%' }}>
              <h2>Thông tin sản phẩm</h2>
              <p><strong>{product.milkName}</strong></p>
              <p><i className="fas fa-glass-milk"></i> Dung tích {product.capacity}</p>
              <p><strong>Giá tiền: {product.price} ₫</strong></p>

              <div className="quantity-container">
                <button onClick={decreaseQuantity}>-</button>
                <span>{quantity}</span>
                <button onClick={increaseQuantity}>+</button>
              </div>

              <button className="buy-now-btn" onClick={handleBuyNow}>Mua ngay</button>
              <button className="buy-now-btn" onClick={handleAddToCart}>Thêm vào giỏ hàng</button>
            </div>
          </div>
        </div>

        <div className="col-mt-7">
          <div className="row" style={{ paddingLeft: '10%' }}>
            <div className="col-md-8 offset-md-1">
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th><h2>Chi tiết sản phẩm</h2></th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><h5>Tên sản phẩm:</h5></td>
                    <td>{product.milkName}</td>
                  </tr>
                  <tr>
                    <td><h5>Thương hiệu:</h5></td>
                    <td>{brandName}</td>
                  </tr>
                  <tr>
                    <td><h5>Độ tuổi phù hợp:</h5></td>
                    <td>{product.appropriateAge}</td>
                  </tr>
                  <tr>
                    <td><h5>Dung Tích:</h5></td>
                    <td>{product.capacity}</td>
                  </tr>
                  <tr>
                    <td><h5>Hướng dẫn bảo quản:</h5></td>
                    <td>{product.storageInstructions}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="col-md-11" style={{ paddingLeft: '15%' }}>
          <h2>Sản phẩm tương tự</h2>
          {/* Similar products section */}
        </div>

        <div className="col-mt-12" style={{ paddingLeft: '15%', paddingTop: '5%' }}>
          <h2><label htmlFor="comment">Bình luận</label></h2>
          {/* Comments section */}
        </div>

        <div className="col-mt-12" style={{ paddingLeft: '15%' }}>
          <h2>Sản phẩm mới</h2>
          {/* New products section */}
        </div>
      </main>
    </div>
  );
};

export default ProductInfo;
