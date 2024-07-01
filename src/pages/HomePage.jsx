// HomePageComponent.js
import {useEffect} from "react";
import React from 'react';
import '../css/homepage.css'; // Make sure this path is correct

const fetchUsers = () => {
    // Where we're fetching data from
    return fetch("https://localhost:7188/api/milks")
    // We get the API response and receive data in JSON format
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch ((error) => console.error(error));
}
function HomePage() {
    return (
        <div>
            <header className="header">
                <div className="logo-container">
                    <a href="HomePage.html"><img src="img/Hanalogo.jpg" width="150" height="150" alt="Logo" /></a>
                </div>
                <div className="header-content">
                    <div className="contact-info">
                        <div className="phone"><span>Điện thoại: 0986777514</span></div>
                        <div className="address"><span>Địa Chỉ: D5 .......</span></div>
                        <div className="email"><span>Email: hanafpt@gmail.com</span></div>
                        <a href='login' type="button">Login</a>
                        <a href="Login.html"><img src="img/taikhoan.jpg" alt="Tài khoản" width="50" height="50" /></a>
                    </div>
                    <div className="header-content-row2">
                        <div className="search-bar-container">
                            <input type="text" placeholder="Tìm kiếm..." />
                            <button type="submit"><img src="img/search.png" alt="Tìm Kiếm" width="19" height="19" /></button>
                        </div>
                        <div className="user-cart-container">
                            <a href="giohang.html"><img src="img/giohang.jpg" width="30" height="30" alt="Giỏ hàng" /></a>
                        </div>
                        <div className="notification-container">
                            <a href="#"><img src="img/bell.png" width="30" height="30" alt="Thông báo" /></a>
                        </div>
                    </div>
                    <nav className="navigation-menu">
                        <ul>
                            <li><a href="#">Trang chủ</a></li>
                            <li><a href="#">Sữa bột</a></li>
                            <li><a href="#">Sữa tươi</a></li>
                            <li><a href="#">Sữa chua</a></li>
                            <li><a href="#">Sữa hạt dinh dưỡng</a></li>
                        </ul>
                    </nav>
                </div>
            </header>
            <main>
                <div className="container">
                    <div className="main-image">
                        <img src="img/1.png" width="800" height="295" alt="" />
                    </div>
                    <div className="side-images">
                        <div className="side-image">
                            <img src="img/2.png" width="500" height="150" alt="" />
                        </div>
                        <div className="side-image">
                            <img src="img/3.png" width="500" height="150" alt="" />
                        </div>
                    </div>
                </div>
                <div className="hercontainer">
                    <h2>Sản phẩm mới</h2>
                    <div className="product-section">
                        {/* Product items for new products */}
                    </div>
                </div>
                <div className="product-section">
                    <h2>Sản phẩm ưu đãi</h2>
                    {/* Product items for preferential products */}
                </div>
                <div className="product-section">
                    <h2>Sản phẩm khác</h2>
                    {/* Product items for other products */}
                </div>
            </main>
         <footer>
                <div className="footer-top">
                    <div className="container">
                        <div className="footer-column">
                            <h2>Về chúng tôi</h2>
                            <p>Website hoạt động dưới sự cho phép của:</p>
                            <p>Công ty TNHH Dịch Vụ Hana</p>
                            <p>Địa chỉ : 120 Trần Hưng Đạo, P. 1, Q. 10, Tp. HCM</p>
                            <p>Hana Store - NGƯỜI VIỆT SẢN PHẨM VIỆT</p>
                            <p>Hotline: 0359475331</p>
                            <p>Bán sỉ: 0819711117</p>
                        </div>
                        <div className="footer-column">
                            <h2>Chấp nhận thanh toán</h2>
                            <img
                                src="https://firebasestorage.googleapis.com/v0/b/imageuploadv3.appspot.com/o/Logo%20Footer%2Fmomo.png?alt=media&token=2dd2f91c-582c-4cf7-93b5-1026a1324667"
                                width="23%" alt="Momo" style={{ paddingLeft: '73px' }} />
                            <h2>Phương tiện vận chuyển</h2>
                            <div className="flex-container">
                                <img
                                    src="https://firebasestorage.googleapis.com/v0/b/imageuploadv3.appspot.com/o/Logo%20Footer%2F65fddafcf36551945213fe85_After_kime.jpg?alt=media&token=60a23ba7-35c7-4c95-bc94-5e8c9763860c"
                                    width="15%" alt=" GH TK" style={{ paddingLeft: '23px' }} />
                                <img
                                    src="https://firebasestorage.googleapis.com/v0/b/imageuploadv3.appspot.com/o/Logo%20Footer%2Fimagelogo3s.png?alt=media&token=a7ccdd8a-ff4d-4cee-afd9-008e2efb5249"
                                    width="15%" alt="Truck" />
                                <img
                                    src="https://firebasestorage.googleapis.com/v0/b/imageuploadv3.appspot.com/o/Logo%20Footer%2Fvn-11134207-7r98o-lkw7rpgp10ila2_tn.jpg?alt=media&token=e9dc4fbc-059a-4cc3-814b-bbc1e2326589"
                                    width="15%" alt=" Grab" />
                            </div>
                        </div>
                        <div className="footer-column">
                            <div className="flex-item">
                                <i className="bi bi-house-heart" style={{ paddingRight: '19px' }}></i>
                                <div>
                                    <h2> Bán lẻ, sỉ và đa kênh bán</h2>
                                    <p>Có bảng giá cho khách lẻ và khách sỉ riêng biệt đảm bảo quyền lợi cao nhất của khách hàng</p>
                                </div>
                            </div>
                            <div className="flex-item">
                                <i className="bi bi-hourglass" style={{ paddingRight: '19px' }}></i>
                                <div>
                                    <h2>Ship nhanh trong ngày TP.HCM</h2>
                                    <p>Ship nhanh ngay đến khách hàng ở nội thành TP.HCM</p>
                                </div>
                            </div>
                            <div className="flex-item">
                                <i className="bi bi-rocket-takeoff-fill" style={{ paddingRight: '19px' }}></i>
                                <div>
                                    <h2>Bán lẻ, sỉ và đa kênh bán</h2>
                                    <p>Có bảng giá cho khách lẻ và khách sỉ riêng biệt, đảm bảo quyền lợi cao nhất của khách hàng</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="footer-bottom">
                    <img
                        src="https://firebasestorage.googleapis.com/v0/b/imageuploadv3.appspot.com/o/Logo%20Footer%2Fdep2.png?alt=media&token=08b080e1-c883-4c89-ba4f-76f8f0a57b00"
                        width="2%" alt="Logo"
                    />
                    <p>Copyright © 2024 HanaVN Store. Powered by Group 4</p>
                </div>
            </footer>
        </div>



    );
}

export default HomePage;