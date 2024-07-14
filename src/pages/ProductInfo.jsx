import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import * as milkService from '../api/milkService';
import * as brandService from '../api/brandService';
import * as commentService from '../api/commentService';
import '../css/productInfo.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const ProductInfo = () => {
  const [product, setProduct] = useState({});
  const [brandName, setBrandName] = useState('');
  const [quantity, setQuantity] = useState(1); // State to manage product quantity
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [showCommentForm, setShowCommentForm] = useState(false); // State to control comment form visibility
  const [reviews, setReviews] = useState([]);
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

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = () => {
    try {
      const response = getComments(id);
      setReviews(response);
    } catch (error) {
      console.error('Error fetching reviews:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('API_URL_TO_POST_REVIEW', { rating, comment }); // Thay thế bằng URL API để gửi đánh giá
      setReviews([response.data, ...reviews]);
      setRating(0);
      setComment('');
      setShowCommentForm(false); // Hide the comment form after submission
    } catch (error) {
      console.error('Error submitting review:', error);
    }
  };

  const increaseQuantity = () => {
    setQuantity(prevQuantity => prevQuantity + 1);
  };

  const decreaseQuantity = () => {
    setQuantity(prevQuantity => (prevQuantity > 1 ? prevQuantity - 1 : 1));
  };

  const formatPrice = (price) => {
    if (typeof price !== 'number') {
      return 'Invalid price';
    }
    return price.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  return (
    <div className="product-info">
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
              <p><strong>Giá tiền: {formatPrice(product.price)} ₫</strong></p>

              <div className="quantity-wrapper">
                <h2>Số lượng</h2>
                <button className="quantity-container" onClick={decreaseQuantity}>-</button>
                <span>{quantity}</span>
                <button className="quantity-container" onClick={increaseQuantity}>+</button>
              </div>

              <button className="buy-now-btn" onClick={handleBuyNow}> Mua ngay</button>
              <button className="buy-now-btn" onClick={handleAddToCart}> Thêm vào giỏ hàng</button>
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

        <div className="container my-5">
          <div className="text-center mb-4">
            <h2>Đánh giá</h2>
            <div className="h4">0.0/5.0</div>
            <div className="text-muted">Có 20 lượt đánh giá</div>
          </div>
          <div className="d-flex justify-content-center mb-4">
            <button className="btn btn-outline-primary mr-2">Mới nhất</button>
            <button className="btn btn-outline-secondary">Cũ nhất</button>
          </div>
          <div className="row">
            <div className="col-12 mb-4">
              <div className="list-group d-flex flex-wrap">
                {reviews.map((review, index) => (
                  <div className="list-group-item col-md-6" key={index}>
                    <div className="d-flex w-100 justify-content-between">
                      <h5 className="mb-1">{review.reviewerName}</h5>
                      <small>{review.date}</small>
                    </div>
                    <div className="mb-1">
                      {[...Array(review.rating)].map((_, i) => (
                        <span key={i} className="text-warning">⭐</span>
                      ))}
                    </div>
                    <p className="mb-1">{review.comment}</p>
                    <div className="d-flex">
                      {review.images.map((img, idx) => (
                        <img src={img} alt={`Review ${index} image ${idx}`} key={idx} className="img-thumbnail mr-2" />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="text-center mt-4">
            <button className="btn btn-primary" onClick={() => setShowCommentForm(true)}>
              Viết đánh giá
            </button>
          </div>

          {showCommentForm && (
            <div className="modal fade show d-block" tabIndex="-1" role="dialog" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
              <div className="modal-dialog" role="document">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title">Bình luận</h5>
                    <button type="button" className="close" onClick={() => setShowCommentForm(false)} aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div className="modal-body">
                    <form onSubmit={handleSubmit}>
                      <div className="form-group text-center">
                        <label htmlFor="rating">Đánh giá:</label>
                        <div>
                          {[5, 4, 3, 2, 1].map((star) => (
                            <button
                              type="button"
                              key={star}
                              className={`btn ${rating >= star ? 'btn-warning' : 'btn-outline-secondary'}`}
                              onClick={() => setRating(star)}
                            >
                              {star} ⭐
                            </button>
                          ))}
                        </div>
                      </div>
                      <div className="form-group">
                        <label htmlFor="comment">Bình luận:</label>
                        <textarea
                          id="comment"
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                          className="form-control"
                          required
                        ></textarea>
                      </div>
                      <button type="submit" className="btn btn-success">Đăng</button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          )}
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
