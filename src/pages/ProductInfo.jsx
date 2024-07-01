// src/components/ProductInfo.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/productInfo.css'; // Make sure this path is correct
import 'bootstrap-icons/font/bootstrap-icons.css';
const ProductInfo = () => {
  const [product, setProduct] = useState({});
  const [similarProducts, setSimilarProducts] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [newProducts, setNewProducts] = useState([]);

  useEffect(() => {
    axios.get('https://api.example.com/product/1') // Thay URL này bằng URL của API thực tế
      .then(response => {
        setProduct(response.data.product);
        setSimilarProducts(response.data.similarProducts);
        setReviews(response.data.reviews);
        setNewProducts(response.data.newProducts);
      })
      .catch(error => {
        console.error("There was an error fetching the product data!", error);
      });
  }, []);

  return (
    <div>
      <header className="header">
        <div className="logo-container">
          <a href="/"><img src="Hanalogo.jpg" width="150" height="150" alt="Logo" /></a>
        </div>
        <div className="header-content">
          <div className="contact-info">
            <div className="phone"><span>Điện thoại: 0986777514</span></div>
            <div className="address"><span>Địa Chỉ: D5 .......</span></div>
            <div className="email"><span>Email: hanafpt@gmail.com</span></div>
            <a href="/account"><img src="taikhoan.jpg" alt="Tài khoản" width="50" height="50" /></a>
          </div>
          <div className="header-content-row2">
            <div className="search-bar-container">
              <input type="text" placeholder="Tìm kiếm..." />
              <button type="submit"><img src="search.png" alt="Tìm Kiếm" width="19" height="19" /></button>
            </div>
            <div className="user-cart-container">
              <a href="/cart"><img src="giohang.jpg" width="30" height="30" alt="Giỏ hàng" /></a>
            </div>
            <div className="notification-container">
              <a href="#"><img src="bell.png" width="30" height="30" alt="Thông báo" /></a>
            </div>
          </div>
          <nav className="navigation-menu">
            <ul>
              <li><a href="/">Trang chủ</a></li>
              <li><a href="#">Sữa bột</a></li>
              <li><a href="#">Sữa tươi</a></li>
              <li><a href="#">Sữa chua</a></li>
              <li><a href="#">Sữa hạt dinh dưỡng</a></li>
            </ul>
          </nav>
        </div>
      </header>
      <main>
        <div className="col-md-12">
          <div className="row" style={{ paddingBottom: '7%' }}>
            <div className="col-md-2"></div>
            <div className="col-md-4">
              <img src={product.imageUrl} alt="Product" style={{ width: '100%', maxWidth: '500px', height: 'auto' }} />
            </div>
            <div className="col-md-4" style={{ paddingTop: '5%' }}>
              <h2>Thông tin sản phẩm</h2>
              <p><strong>{product.name}</strong></p>
              <p><i className="fas fa-glass-milk"></i> Dung tích {product.volume}</p>
              <p><strong>Giá tiền: {product.price} ₫</strong></p>
              <button className="buy-now-btn">Mua ngay</button>
              <button className="buy-now-btn">Thêm vào giỏ hàng</button>
            </div>
          </div>
        </div>

        <div className="col-mt-7">
          <div className="row" style={{ paddingLeft: '10%' }}>
            <div className="col-md-8 offset-md-1">
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <h2>Chi tiết sản phẩm</h2>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><h5>Tên sản phẩm:</h5></td>
                    <td>{product.detail.name}</td>
                  </tr>
                  <tr>
                    <td><h5>Thương hiệu:</h5></td>
                    <td>{product.detail.brand}</td>
                  </tr>
                  <tr>
                    <td><h5>Độ tuổi phù hợp:</h5></td>
                    <td>{product.detail.age}</td>
                  </tr>
                  <tr>
                    <td><h5>Dung Tích:</h5></td>
                    <td>{product.detail.volume}</td>
                  </tr>
                  <tr>
                    <td><h5>Hướng dẫn bảo quản:</h5></td>
                    <td>{product.detail.storageInstructions}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="col-md-11" style={{ paddingLeft: '15%' }}>
          <h2>Sản tương tự</h2>
          <div className="product-section">
            <button className="prev-button">&lt;</button>
            <button className="next-button">&gt;</button>
            <div className="product-grid-container">
              <div className="product-grid new-product-grid">
                {similarProducts.map((product, index) => (
                  <div className="product-item" key={index}>
                    <a href={`/product/${product.id}`}><img src={product.imageUrl} alt={`Product ${index + 1}`} className="product-image" /></a>
                    <p className="product-name">{product.name}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="col-mt-12" style={{ paddingLeft: '15%' }}>
          <h2>Lượt đánh giá</h2>
          <span>0.0/5.0</span>
          <button type="button" className="btn btn-link">Mới nhất</button>
          <button type="button" className="btn btn-link">Cũ nhất</button>
          <br className="danh-gia-sao" />
          <div id="rating">
            <h5><span> Đánh giá</span></h5>
            {[...Array(5)].map((_, i) => (
              <React.Fragment key={i}>
                <input type="radio" id={`star${5 - i}`} name="rating" value={5 - i} />
                <label className="full" htmlFor={`star${5 - i}`} title={`${5 - i} stars`}></label>
                <input type="radio" id={`star${5 - i}half`} name="rating" value={`${5 - i}.5`} />
                <label className="half" htmlFor={`star${5 - i}half`} title={`${5 - i}.5 stars`}></label>
              </React.Fragment>
            ))}
          </div>

          <div className="form-group">
            <textarea className="form-control" id="comment" rows="3" placeholder="Chia sẻ, đánh giá về sản phẩm của HANA Milk Store"></textarea>
            <input type="file" onChange={readURL} />
            <img id="selectedImage" width="10%" height="10%" alt="Selected" />
          </div>
          <button type="button" className="btn btn-primary">Đăng</button>
        </div>

        <div className="col-mt-12" style={{ paddingLeft: '15%', paddingTop: '5%' }}>
          <h2><label htmlFor="comment">Bình luận</label></h2>
          {reviews.map((review, index) => (
            <div className="row md-2" key={index}>
              <div className="col-md-2">
                <img src={review.avatarUrl} alt="Ảnh khách" width="50%" height="90%" className="rounded-circle border" />
              </div>
              <div className="col-md-5">
                <h5>{review.name}</h5>
                <span className="star-rating">{'★'.repeat(review.rating)}</span>
                <p>{review.date}</p>
              </div>
              <div className="col-md-10">
                <textarea id="comment" rows="4" className="form-control" defaultValue={review.comment}></textarea>
              </div>
              <div className="row">
                <button type="button" className="btn btn-primary">Trả lời</button>
              </div>
            </div>
          ))}
        </div>

        <div className="col-mt-12" style={{ paddingLeft: '15%' }}>
          <h2>Sản phẩm mới</h2>
          <div className="product-section">
            <button className="prev-button">&lt;</button>
            <button className="next-button">&gt;</button>
            <div className="product-grid-container">
              <div className="product-grid new-product-grid">
                {newProducts.map((product, index) => (
                  <div className="product-item" key={index}>
                    <a href={`/product/${product.id}`}><img src={product.imageUrl} alt={`Product ${index + 1}`} className="product-image" /></a>
                    <p className="product-name">{product.name}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
      <footer className="footer">
        <h5 className="footer-content">Gọi ngay hotline để biết thêm thông tin về sản phẩm: 0986777514</h5>
        <div className="footer-content">
          <img src="Hanalogo.jpg" width="150" height="150" alt="Logo" />
          <h5>CÔNG TY SỮA HANA</h5>
          <p>Địa chỉ: D5 ...</p>
          <p>Email: hanafpt@gmail.com</p>
        </div>
      </footer>
    </div>
  );
};

export default ProductInfo;


