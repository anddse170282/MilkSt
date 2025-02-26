import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import * as milkService from '../api/milkService';
import * as brandService from '../api/brandService';
import * as commentService from '../api/commentService';
import * as userService from '../api/userService';
import '../css/productInfo.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';


const ProductInfo = () => {
  const [data, setData] = useState([]);
  const [product, setProduct] = useState({});
  const [brandName, setBrandName] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [reviews, setReviews] = useState([]);
  const [user, setUser] = useState([]);
  const [currentProductPromo, setCurrentProductPromo] = useState(0);
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

          const response = await milkService.getProductsByBrand(0, 0, productData.brandId);
          setData(response);
        }
      } catch (error) {
        console.error("There was an error fetching the product or brand data!", error);
      }
    };
    fetchProduct();
  }, [id]);

  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem('user'));
    console.log("User: ", user);
    setUser(user);
  }, []);

  const handleBuyNow = async () => {
    const cart = JSON.parse(sessionStorage.getItem('cart')) || [];
    cart.push({ ...product, quantity });
    sessionStorage.setItem('cart', JSON.stringify(cart));
    navigate('/cart');
  };

  const handleAddToCart = async () => {
    const cart = JSON.parse(sessionStorage.getItem('cart')) || [];
    cart.push({ ...product, quantity });
    sessionStorage.setItem('cart', JSON.stringify(cart));
    console.log("Product added to cart:", product);
  };

  const fetchReviews = async () => {
    try {
      const response = await commentService.getComments(id);
      const userPromises = response.map(async (comment) => {
        const member = await userService.getMemberbyMemberId(comment.memberId);
        const user = await userService.getUserByUserId(member.userId);
        return {
          ...comment,
          userImage: user.profilePicture,
          userName: user.userName
        };
      });

      const reviewsWithUserImages = await Promise.all(userPromises);
      console.log("Review: ", reviewsWithUserImages);
      setReviews(reviewsWithUserImages);
    } catch (error) {
      console.error('Error fetching reviews:', error);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (user === null) {
      navigate("/login");
    }
    try {
      console.log("Sau setUser", user);
      const member = await userService.getMemberByUserId(user[0].userId);
      console.log("Member: ", member);

      const commentDetail = {
        memberId: member[0].memberId,
        content: comment,
        rate: rating,
        milkId: id
      };

      console.log("Comment Detail:", commentDetail);

      const response = await commentService.addComments(commentDetail);
      setReviews([response, ...reviews]);
      setRating(0);
      setComment('');
      fetchReviews();
    } catch (error) {
      console.error('Error submitting review:', error);
    }
  };

  const handleQuantityChange = (event) => {
    const value = parseInt(event.target.value, 10);
    if (value >= 1 && value <= 50) {
      setQuantity(value);
    }
  };

  const increaseQuantity = () => {
    if (quantity < 50) {
      setQuantity(quantity + 1);
    }
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const formatPrice = (price) => {
    if (typeof price !== 'number') {
      return 'Invalid price';
    }
    return price.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  const renderProducts = (startIndex) => {
    if (!data || data.length === 0) {
      return null;
    }
    console.log("Data: ", data);
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


  return (
    <div className="product-info">
      <main>
        <div className="col-md-12">
          <div className="row" style={{ paddingBottom: '2%' }}>
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
                <input
                  type="number"
                  value={quantity}
                  onChange={handleQuantityChange}
                  min="1"
                  max="50"
                  style={{
                    width: '50px',
                    textAlign: 'center',
                    appearance: 'none',
                    MozAppearance: 'textfield',
                    WebkitAppearance: 'none'
                  }}
                />
                <button className="quantity-container" onClick={increaseQuantity}>+</button>
              </div>
              {quantity === 50 && <p style={{ color: 'red', width: '100%', maxWidth: '500px', height: 'auto' }}>Bạn chỉ có thể mua tối đa 50 sản phẩm</p>}

              <button className="buy-now-btn" onClick={handleBuyNow}> Mua ngay</button>
              <button className="buy-now-btn" onClick={handleAddToCart}> Thêm vào giỏ hàng</button>
            </div>
          </div>
        </div>
        <div className="col-mt-7">

          <div className="row" style={{ paddingLeft: '10%' }}>
            <th><h4 className="chitietsanpham">Chi tiết sản phẩm</h4></th>

            <div className="col-md-8 offset-md-1">
              <table className="table table-bordered">
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

        <div className="hercontainer">
          <h2>Sản phẩm tương tự</h2>
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
        </div>

        <div className="container my-5">
          <div className="text-center mb-4">
            <div className="font-danhgia">Đánh giá</div>

            <div className="rating-00">0.0<p10 className="rating-05">/5.0</p10></div>

            <div className="text-muted">Có <p10 className="number-rating">20</p10> lượt đánh giá</div>
          </div>
          <div>
            <div className="d-flex justify-content-center mb-4">
              <button className="button-moinhat">Mới nhất</button>
              <button className="button-cunhat">Cũ nhất</button>
            </div>
            <div>

              <div className="row">
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
                    placeholder="Chia sẽ, đánh giá về sản phẩm cho cả nhà cùng biết nhé!..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="form-control"
                    required
                  ></textarea>
                </div>
                <div className="ratingdang">
                  <button type="submit" className="btn btn-success" onClick={handleSubmit}>Đăng</button>
                </div>

                <div className="col-12 mb-4">
                  <div className="list-group d-flex flex-wrap" style={{ paddingTop: '50px' }}>

                    {reviews.length > 0 ? (
                      reviews.map((review, index) => (
                        <div className="list-group-item col-md-10" key={index}>
                          <div className="d-flex w-100 justify-content-between align-items-center">
                            <div className="d-flex align-items-center">
                              <img src={review.userImage} alt={`Avatar của người dùng ${review.memberId}`} className="avatarnguoidung" />
                              <div className="ml-2">
                                <h5 className="mb-1">{review.userName}</h5>
                                <div className="d-flex align-items-center">
                                  <div className="stars">
                                    {[...Array(5)].map((_, i) => (
                                      <span key={i} className={i < review.rate ? "star-on" : "star-off"}>
                                        {i < review.rate ? '⭐' : <i className="custom-star bi2 bi-star"></i>}
                                      </span>
                                    ))}
                                  </div>
                                  <small className="ml-2 smalldate">{review.dateCreate}</small>
                                </div>
                              </div>
                            </div>
                          </div>
                          <p className="mb-1 fontbinhluan">{review.content}</p>
                          {review.commentImageUrl && (
                            <img src={review.commentImageUrl} alt="Hình ảnh bình luận" className="comment-image" />
                          )}
                        </div>
                      ))
                    )
                      : (
                        <div className="col-12">
                          <p>Chưa có đánh giá nào.</p>
                        </div>
                      )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProductInfo;