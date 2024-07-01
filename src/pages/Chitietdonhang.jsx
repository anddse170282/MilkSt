import React, { useState } from 'react';
import './donhang.css'; // Assuming CSS is adapted for React and renamed to ProductDetail.css

function donhang() {
    const [product, setProduct] = useState({
        name: "Combo 3 thùng Sữa GrowPLUS+",
        volume: "110ml (lốc 4 hộp)",
        price: 100000,
        details: {
            productName: "Sữa GrowPLUS+ ít đường 180ml lốc 4 hộp",
            brand: "GrowPLUS+",
            suitableAge: "Trên 1 tuổi",
            volume: "180ml",
            storage: "Sản phẩm được đặt trong hộp giấy tiệt trùng, bảo quản nơi khô ráo, thoáng mát, tránh ánh sáng trực tiếp để bảo quản chất lượng ban đầu."
        }
    });

    const handleBuyNow = () => {
        // Handle buy now action
        console.log('Buy now clicked');
    };

    const handleAddToCart = () => {
        // Handle add to cart action
        console.log('Add to cart clicked');
    };

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-6">
                    <img src="sua.jpg" alt="Product Image" width="500" height="500" />
                </div>
                <div className="col-md-6">
                    <h2>Thông tin sản phẩm</h2>
                    <p><strong>{product.name}</strong></p>
                    <p><i className="fas fa-glass-milk"></i> Dung tích {product.volume}</p>
                    <p><strong>Giá tiền: {product.price.toLocaleString()} ₫</strong></p>
                    <button className="buy-now-btn" onClick={handleBuyNow}>Mua ngay</button>
                    <button className="buy-now-btn" onClick={handleAddToCart}>Thêm vào giỏ hàng</button>
                </div>
            </div>
            <div className="row">
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
                                <td>{product.details.productName}</td>
                            </tr>
                            <tr>
                                <td><h5>Thương hiệu:</h5></td>
                                <td>{product.details.brand}</td>
                            </tr>
                            <tr>
                                <td><h5>Độ tuổi phù hợp:</h5></td>
                                <td>{product.details.suitableAge}</td>
                            </tr>
                            <tr>
                                <td><h5>Dung Tích:</h5></td>
                                <td>{product.details.volume}</td>
                            </tr>
                            <tr>
                                <td><h5>Hướng dẫn bảo quản:</h5></td>
                                <td>{product.details.storage}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        
    );
}

export default ProductDetailComponent;