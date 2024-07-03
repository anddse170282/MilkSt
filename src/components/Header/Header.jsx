// src/components/Header.jsx
import React from 'react';
import './Header.css'; // Create this file for the specific CSS of the header

const Header = () => {
  return (
    <header className="header">
      <div className="logo-container">
          <a href="/">
            <img src="https://firebasestorage.googleapis.com/v0/b/imageuploadv3.appspot.com/o/Logo%20Footer%2Fdep2.png?alt=media&token=08b080e1-c883-4c89-ba4f-76f8f0a57b00" width="150" height="150" alt="Logo" />
          </a>
        </div>
        <div className="header-content">
          <div className="contact-info">
            <div className="phone"><span>Điện thoại: 0986777514</span></div>
            <div className="address"><span>Địa Chỉ: D5 .......</span></div>
            <div className="email"><span>Email: hanafpt@gmail.com</span></div>
            <a href="/login">
              <img src="taikhoan.jpg" alt="Tài khoản" width="50" height="50" />
            </a>
          </div>
          <div className="header-content-row2">
            <div className="search-bar-container">
              <input type="text" placeholder="Tìm kiếm..." />
              <button type="submit">
                <img src="search.png"  width="19" height="19" />
              </button>
            </div>
            <div className="user-cart-container">
              <a href="giohang.html">
                <img src="giohang.jpg" width="30" height="30" alt="Giỏ hàng" />
              </a>
            </div>
            <div className="notification-container">
              <a href="#">
                <img src="bell.png" width="30" height="30" alt="Thông báo" />
              </a>
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
  );
};

export default Header;
