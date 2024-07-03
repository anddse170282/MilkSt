import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/thanhtoan.css';

const Invoice = () => {
    const [parentName, setParentName] = useState('Nguyễn A');
    const [address, setAddress] = useState('D1, ......');
    const [phone, setPhone] = useState('0123456789');
    const [total, setTotal] = useState(97000);
    const [isEditing, setIsEditing] = useState(false);
  
    useEffect(() => {
      // Example API call using Axios
      axios.get('https://api.example.com/user')
        .then(response => {
          const { parentName, address, phone } = response.data;
          setParentName(parentName);
          setAddress(address);
          setPhone(phone);
        })
        .catch(error => {
          console.error('There was an error fetching the data!', error);
        });
    }, []);
  
    const enableEditing = () => {
      setIsEditing(true);
    };
  
    const confirmEditing = () => {
      setIsEditing(false);
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      // Handle form submission logic here
      console.log('Form submitted');
    };
  
    return (
      <div>
        <header className="header">
          <div className="logo-container">
            <a href="HomePage.html"><img src="Hanalogo.jpg" width="150" height="150" alt="Logo" /></a>
          </div>
          <div className="header-content">
            <div className="contact-info">
              <div className="phone"><span>Điện thoại: 0986777514</span></div>
              <div className="address"><span>Địa Chỉ: D5 .......</span></div>
              <div className="email"><span>Email: hanafpt@gmail.com</span></div>
              <a href="#"><img src="taikhoan.jpg" alt="Tài khoản" width="50" height="50" /></a>
            </div>
            <div className="header-content-row2">
              <div className="search-bar-container">
                <input type="text" placeholder="Tìm kiếm..." />
                <button type="submit"><img src="search.png" alt="Tìm Kiếm" width="19" height="19" /></button>
              </div>
              <div className="user-cart-container">
                <a href="giohang.html"><img src="giohang.jpg" width="30" height="30" alt="Giỏ hàng" /></a>
              </div>
              <div className="notification-container">
                <a href="#"><img src="bell.png" width="30" height="30" alt="Thông báo" /></a>
              </div>
            </div>
            <nav className="navigation-menu">
              <ul>
                <li><a href="HomePage.html">Trang chủ</a></li>
                <li><a href="#">Sữa bột</a></li>
                <li><a href="#">Sữa tươi</a></li>
                <li><a href="#">Sữa chua</a></li>
                <li><a href="#">Sữa hạt dinh dưỡng</a></li>
              </ul>
            </nav>
          </div>
        </header>
        <div className="invoice-container">
          <h1>Hóa Đơn</h1>
          <h2>Xác Nhận Thông Tin</h2>
          <form id="invoice-form" onSubmit={handleSubmit}>
            <div className="info">
              <div className="info-row">
                <label htmlFor="parent-name">Ba/Mẹ</label>
                <input type="text" id="parent-name" name="parent-name" value={parentName} disabled={!isEditing} onChange={(e) => setParentName(e.target.value)} />
              </div>
              <div className="info-row">
                <label htmlFor="address">Địa chỉ</label>
                <input type="text" id="address" name="address" value={address} disabled={!isEditing} onChange={(e) => setAddress(e.target.value)} />
              </div>
              <div className="info-row">
                <label htmlFor="phone">Số điện thoại</label>
                <input type="text" id="phone" name="phone" value={phone} disabled={!isEditing} onChange={(e) => setPhone(e.target.value)} />
              </div>
            </div>
            {isEditing ? (
              <button type="button" className="confirm-button" onClick={confirmEditing}>Xác nhận thông tin</button>
            ) : (
              <button type="button" className="edit-button" onClick={enableEditing}>Sửa thông tin</button>
            )}
            <hr />
            <div className="total">
              <span>Thành Tiền</span>
              <span className="price">{total} ₫</span>
            </div>
            <button type="submit" className="pay-button">Thanh toán</button>
          </form>
        </div>
      </div>
    );
  };

export default InvoiceComponent;