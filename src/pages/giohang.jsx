import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '../css/giohang.css';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [voucherListVisible, setVoucherListVisible] = useState(false);

  useEffect(() => {
    // Get cart items from sessionStorage
    const storedCart = JSON.parse(sessionStorage.getItem('cart')) || [];
    setCartItems(storedCart);
  }, []);

  useEffect(() => {
    updateTotals();
  }, [cartItems]);

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
    sessionStorage.setItem('cart', JSON.stringify(newCartItems));
    updateTotals();
  };

  const handleDeleteItem = (index) => {
    const newCartItems = [...cartItems];
    newCartItems.splice(index, 1);
    setCartItems(newCartItems);
    sessionStorage.setItem('cart', JSON.stringify(newCartItems));
    updateTotals();
  };

  const result = subtotal - discount;

  return (
    <div className="cart-container">
      <div className='container'>
        <div className='col-md-10 cart-table-container'>
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
                  />ALL
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
                  <td>
                    {item.milkPictures && item.milkPictures.length > 0 && (
                      <img src={item.milkPictures[0].picture} alt={item.milkName} width="50" />
                    )}
                    {item.milkName}
                  </td>
                  <td>
                    <input
                      type="number"
                      value={item.quantity}
                      onChange={(e) => handleItemChange(index, 'quantity', parseInt(e.target.value))}
                      min="1"
                    />
                  </td>
                  <td>{item.price} ₫</td>
                  <td>
                    <button className="delete-btn" onClick={() => handleDeleteItem(index)}>Xoá</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="cart-summary col-md-2">
          <div className='col'><button onClick={toggleVoucherList}>Voucher ưu đãi</button></div>
          <div className='col'>
            {voucherListVisible && (
              <div className="voucher-list">
                <ul>
                  <li onClick={() => applyDiscount('Voucher giảm 10%')}>Voucher giảm 10%</li>
                  <li onClick={() => applyDiscount('Voucher giảm 20.000 ₫')}>Voucher giảm 20.000 ₫</li>
                  <li onClick={() => applyDiscount('Voucher giảm 50.000 ₫')}>Voucher giảm 50.000 ₫</li>
                </ul>
              </div>
            )}
          </div>
          <p>Tiền phụ: <span>{subtotal} ₫</span></p>
          <p>Voucher ưu đãi: <span>{discount} ₫</span></p>
          <p className="total">Thành Tiền: <span>{result} ₫</span></p>
          <a href="/pay"><button>Xác nhận giỏ hàng</button></a>
        </div>
      </div>
    </div>
  );
};

export default Cart;
