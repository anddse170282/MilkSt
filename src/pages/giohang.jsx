import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '../css/giohang.css';

const Cart = () => {
    const [cartItems, setCartItems] = useState([]);
    const [subtotal, setSubtotal] = useState(0);
    const [discount, setDiscount] = useState(0);
    const [voucherListVisible, setVoucherListVisible] = useState(false);
  
    useEffect(() => {
      // Fetch cart items from API
      axios.get('/api/cart-items')
        .then(response => setCartItems(response.data))
        .catch(error => console.error('Error fetching cart items:', error));
    }, []);
  
    const applyDiscount = (discountType) => {
      let discountAmount = 0;
      if (discountType.includes('%')) {
        const percentage = parseInt(discountType.replace('Voucher giảm ', '').replace('%', ''));
        discountAmount = subtotal * (percentage / 100);
      } else {
        discountAmount = parseInt(discountType.replace('Voucher giảm ', '').replace(' ₫', ''));
      }
      setDiscount(discountAmount);
    };
  
    const updateTotals = () => {
      let newSubtotal = 0;
      cartItems.forEach(item => {
        if (item.selected) {
          newSubtotal += item.quantity * item.price;
        }
      });
      setSubtotal(newSubtotal);
    };
  
    const toggleVoucherList = () => {
      setVoucherListVisible(!voucherListVisible);
    };
  
    const handleItemChange = (index, field, value) => {
      const newCartItems = [...cartItems];
      newCartItems[index][field] = value;
      setCartItems(newCartItems);
      updateTotals();
    };
  
    const handleDeleteItem = (index) => {
      const newCartItems = [...cartItems];
      newCartItems.splice(index, 1);
      setCartItems(newCartItems);
      updateTotals();
    };
  
    const total = subtotal - discount;
  
    return (
      <div className="cart-container">
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
        <table className="cart-table">
          <thead>
            <tr>
              <th>
                <input
                  type="checkbox"
                  onChange={(e) => {
                    const selected = e.target.checked;
                    const newCartItems = cartItems.map(item => ({ ...item, selected }));
                    setCartItems(newCartItems);
                    updateTotals();
                  }}
                /> CHỌN TẤT CẢ
              </th>
              <th>Tên sản phẩm</th>
              <th>Số lượng</th>
              <th>Giá tiền</th>
              <th>Xoá</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((item, index) => (
              <tr key={index}>
                <td>
                  <input
                    type="checkbox"
                    checked={item.selected || false}
                    onChange={(e) => handleItemChange(index, 'selected', e.target.checked)}
                  />
                </td>
                <td><img src="sua.jpg" alt="IMG" width="50" /></td>
                <td>
                  <input
                    type="number"
                    value={item.quantity}
                    onChange={(e) => handleItemChange(index, 'quantity', parseInt(e.target.value))}
                    min="1"
                  />
                </td>
                <td>
                  <input
                    type="number"
                    value={item.price}
                    onChange={(e) => handleItemChange(index, 'price', parseInt(e.target.value))}
                    min="0"
                  /> ₫
                </td>
                <td>
                  <button className="delete-btn" onClick={() => handleDeleteItem(index)}>Xoá</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="cart-summary">
          <button onClick={toggleVoucherList}>Voucher ưu đãi</button>
          {voucherListVisible && (
            <div className="voucher-list">
              <ul>
                <li onClick={() => applyDiscount('Voucher giảm 10%')}>Voucher giảm 10%</li>
                <li onClick={() => applyDiscount('Voucher giảm 20.000 ₫')}>Voucher giảm 20.000 ₫</li>
                <li onClick={() => applyDiscount('Voucher giảm 50.000 ₫')}>Voucher giảm 50.000 ₫</li>
              </ul>
            </div>
          )}
          <p>Tiền phụ: <span>{subtotal} ₫</span></p>
          <p>Voucher ưu đãi: <span>{discount} ₫</span></p>
          <p className="total">Thành Tiền: <span>{total} ₫</span></p>
          <a href="thanhtoan.html"><button>Xác nhận giỏ hàng</button></a>
        </div>
      </div>
    );
  };

export default CartComponent;