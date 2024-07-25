import React, { useState, useEffect } from 'react';
import '../css/thanhtoan.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { getUserByUserId, updateUser } from '../api/userService';
import { getOrdersById, deleteOrder } from '../api/orderService';
import { deleteOrderDetail, getOrderDetailsByOrderId } from '../api/orderDetailService';

const Invoice = () => {
  const location = useLocation();
  const [data, setData] = useState({});
  const [dataOrder, setDataOrder] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();

  const getQueryParams = () => {
    return new URLSearchParams(location.search);
  };

  useEffect(() => {
    const queryParams = getQueryParams();
    const userId = queryParams.get('userId');

    const fetchData = async () => {
      try {
        if (userId) {
          const response = await getUserByUserId(userId);
          console.log('Fetched User:', response);
          setData(response);
        }
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };
    if (userId) {
      fetchData();
    }
  }, [location.search]);

  useEffect(() => {
    const queryParams = getQueryParams();
    const orderId = queryParams.get('orderId');

    const fetchData = async () => {
      try {
        if (orderId) {
          const response = await getOrdersById(orderId);
          setDataOrder(response);
        }
      } catch (error) {
        console.error('Error fetching order:', error);
      }
    };
    if (orderId) {
      fetchData();
    }
  }, [location.search]);

  const enableEditing = () => {
    setIsEditing(true);
  };

  const confirmEditing = async () => {
    try {
      const formattedDateOfBirth = new Date(data.dateOfBirth).toISOString();

      const updatedData = {
        userName: data.userName,
        phone: data.phone,
        address: data.address,
        dateOfBirth: formattedDateOfBirth,
        gender: data.gender,
        profilePicture: data.profilePicture,
      };

      updateUser(data.userId, updatedData);
      const newUser = await getUserByUserId(data.userId);
      console.log("New user: ", newUser);
      setData(newUser);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted');
  };

  const handleClick = (e) => {
    e.preventDefault();
    let orders = JSON.parse(sessionStorage.getItem('orders'));
    if (!Array.isArray(orders)) {
      orders = [];
    }
    orders.push(dataOrder);
    sessionStorage.setItem('orders', JSON.stringify(orders));
    navigate(`/momo-payment/${dataOrder.amount}`);
  };

  const handleCancel = async (e) => {
    e.preventDefault();

    try {
      const resOrderDetail = await getOrderDetailsByOrderId(dataOrder.orderId);
      for (let orderDetail of resOrderDetail) {
        await deleteOrderDetail(orderDetail.orderDetailId);
      }

      await deleteOrder(dataOrder.orderId);

      navigate("/cart");
    } catch (error) {
      console.error("Error canceling the order:", error);
    }
  };


  const formatPrice = (amount) => {
    const formatted = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
    return formatted.replace(/\./g, ' ');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
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
              <input
                type="text"
                id="parent-name"
                name="userName"
                value={data.userName || ''}
                disabled={!isEditing}
                onChange={handleChange}
              />
            </div>
            <div className="info-row">
              <label htmlFor="address">Địa chỉ</label>
              <input
                type="text"
                id="address"
                name="address"
                value={data.address || ''}
                disabled={!isEditing}
                onChange={handleChange}
              />
            </div>
            <div className="info-row">
              <label htmlFor="phone">Số điện thoại</label>
              <input
                type="text"
                id="phone"
                name="phone"
                value={data.phone || ''}
                disabled={true}
              />
            </div>
          </div>
          {isEditing ? (
            <button type="button" className="confirm-button" onClick={confirmEditing}>
              Xác nhận thông tin
            </button>
          ) : (
            <button type="button" className="edit-button" onClick={enableEditing}>
              Sửa thông tin
            </button>
          )}
          <hr />
          <div className="total">
            <span className="ThanhTien">Thành Tiền :</span>
            <span className="price">{formatPrice(dataOrder.amount) || 0}</span>
          </div>
          <div className="user-cart-container">
            <button type="button" className="pay-button" onClick={handleClick}>
              Thanh toán
            </button>
            <button type="button" className="pay-button" onClick={handleCancel}>
              Hủy
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Invoice;
