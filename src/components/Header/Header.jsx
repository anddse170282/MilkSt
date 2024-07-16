// src/components/Header.jsx
import React, { useState } from 'react';
import './Header.css'; // Create this file for the specific CSS of the header
import 'bootstrap-icons/font/bootstrap-icons.css';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const [string, setString] = useState('');
  const navigate = useNavigate();

  const handleSubmitClick = (event) => {
    event.preventDefault();
    navigate(`/search-page?search=${string}`);
  };

  return (
    <header className="header">
      <div className="logo-container">
        <a href="/">
          <img src="https://firebasestorage.googleapis.com/v0/b/imageuploadv3.appspot.com/o/Logo%20Footer%2Fdep2.png?alt=media&token=08b080e1-c883-4c89-ba4f-76f8f0a57b00" width="150" height="150" alt="Logo" />
        </a>
      </div>
      <div className="header-content">
        <div className="contact-info">
          <div className="phone"><span>Mua hàng và CSKH: <span className="phone-color">0986777514</span></span></div>
          <div className="cam-on"><span>Cảm ơn ba mẹ đã tin dùng HanaStore</span></div>
          <div className="email"><span>Email: <span className="email-color">nhanltse170178@fpt.edu.vn</span></span></div>
          <a href="/login">
            <img src="https://firebasestorage.googleapis.com/v0/b/imageuploadv3.appspot.com/o/myimages%2Favatar.jpg?alt=media&token=971f0312-16ec-4a0a-9646-41e51e00505f" alt="Tài khoản" width="25" height="25">

            </img>
          </a>
        </div>
        <div className="header-content-row2">
          <div className="search-bar-container">
            <input
              type="text"
              placeholder="Tìm kiếm..."
              name='string'
              value={string}
              onChange={(e) => setString(e.target.value)}
            />
            <button type="submit" onClick={handleSubmitClick}>
              <i className="bi-search icon-small"></i>
            </button>
          </div>
          <div className="user-cart-container">
            <a href="/cart">
              <i className="bi bi-cart icon-small"></i>
            </a>
          </div>
          <div className="notification-container">
            <a href="/orderhistory">
              <i className="bi bi-bell icon-small"></i>
            </a>
          </div>
        </div>
        <nav className="navigation-menu">
          <ul>
            <li><a href="/">Trang chủ</a></li>
            <li><a href="/">Sữa bột</a></li>
            <li><a href="/">Sữa tươi</a></li>
            <li><a href="/">Sữa chua</a></li>
            <li><a href="/">Sữa hạt dinh dưỡng</a></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
