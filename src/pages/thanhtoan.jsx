import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/thanhtoan.css';
import {Link, useLocation } from 'react-router-dom';
import {getUserByUserId} from '../api/userService';
import {getOrdersById} from '../api/orderService';

const Invoice = () => {
  const location = useLocation();
  const [orderId, setOrderId] = useState(0);
  const [userId, setUserId] = useState(0);
  const [data, setData] = useState({});
  const [dataOrder, setDataOrder] = useState({});
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const orderFromQuery = queryParams.get('orderId');
    const userFromQuery = queryParams.get('userId');
    if (orderFromQuery && userFromQuery) {
      setOrderId(orderFromQuery);
      setUserId(userFromQuery);
    }
  }, [location.search]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getUserByUserId(userId);
        setData(response);
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getOrdersById(orderId);
        setDataOrder(response);
      } catch (error) {
        console.error('Error fetching order:', error);
      }
    };
    fetchData();
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
      <div className="invoice-container">
        <h1>Hóa Đơn</h1>
        <h2>Xác Nhận Thông Tin</h2>
        <form id="invoice-form" onSubmit={handleSubmit} key={data.userId}>
          <div className="info">
            <div className="info-row">
              <label htmlFor="parent-name">Ba/Mẹ</label>
              <input type="text" id="parent-name" name="parent-name" value={data.userName || ''} disabled={!isEditing} />
            </div>
            <div className="info-row">
              <label htmlFor="address">Địa chỉ</label>
              <input type="text" id="address" name="address" value={data.address || ''} disabled={!isEditing} />
            </div>
            <div className="info-row">
              <label htmlFor="phone">Số điện thoại</label>
              <input type="text" id="phone" name="phone" value={data.phone || ''} disabled={!isEditing} />
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
            <span className="price">{dataOrder.amount || 0} ₫</span>
          </div>

          <div className="user-cart-container">
            <Link to={`/momo-payment/${dataOrder.amount}`}>
              <button type="button" className="pay-button">Thanh toán</button>
            </Link>
          </div>
          </form>
      </div>
    </div>
  );
};

export default Invoice;