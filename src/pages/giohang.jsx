import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/giohang.css';
import { getOrderDetailsByOrderId } from '../api/orderDetailService';
import { getAllProducts } from '../api/milkService';
import { getAllVouchers } from '../api/voucherService';
import { Modal, Button, Form } from 'react-bootstrap';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const [milks, setMilks] = useState([]);
  const [vouchers, setVouchers] = useState([]);
  const [selectedVoucher, setSelectedVoucher] = useState(null);
  const [showVoucherModal, setShowVoucherModal] = useState(false);

  useEffect(() => {
    // Get cart items from sessionStorage
    const storedCart = JSON.parse(sessionStorage.getItem('cart')) || [];
    setCartItems(storedCart);
  }, []);

  useEffect(() => {
    // Fetch cart items from API
    getOrderDetailsByOrderId(4)
      .then(response => {
        setCartItems(response);
      })
      .catch(error => console.error('Error fetching cart items:', error));
  }, []);

  useEffect(() => {
    // Fetch milks from API
    getAllProducts()
      .then(response => setMilks(response))
      .catch(error => console.error('Error fetching milks:', error));
  }, []);

  useEffect(() => {
    // Fetch vouchers from API
    getAllVouchers()
      .then(response => setVouchers(response))
      .catch(error => console.error('Error fetching vouchers:', error));
  }, []);

  useEffect(() => {
    updateTotals();
  }, [cartItems, selectedVoucher]);

  const getDiscountAmount = (voucher) => {
    if (!voucher) return 0;
    return subtotal * (voucher.discount / 100);
  };

  const updateTotals = () => {
    let newSubtotal = 0;
    cartItems.forEach(item => {
      if (item.selected) {
        const product = getProductById(item.milkId);
        if (product) {
          newSubtotal += item.quantity * product.price;
        }
      }
    });
    setSubtotal(newSubtotal);
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

  const getProductById = (id) => {
    return milks.find(milk => milk.milkId === id);
  };

  const handleVoucherClick = (voucher) => {
    setSelectedVoucher(voucher);
    setShowVoucherModal(false);
  };

  const discount = selectedVoucher ? getDiscountAmount(selectedVoucher) : 0;
  const result = subtotal - discount;

  return (
    <>
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
                {cartItems.map((item, index) => {
                  const product = getProductById(item.milkId);
                  return (
                    <tr key={index}>
                      <td>
                        <input
                          type="checkbox"
                          checked={item.selected || false}
                          onChange={(e) => handleItemChange(index, 'selected', e.target.checked)}
                        />
                      </td>
                      <td>
                        {product && product.milkPictures && product.milkPictures.length > 0 && (
                          <img src={product.milkPictures[0].picture} alt={product.milkName} width="50" />
                        )}
                        {product ? product.milkName : 'Không xác định'}
                      </td>
                      <td>
                        <input
                          type="number"
                          value={item.quantity}
                          onChange={(e) => handleItemChange(index, 'quantity', parseInt(e.target.value))}
                          min="1"
                        />
                      </td>
                      <td>
                        {product ? product.price : 'Không xác định'} ₫
                      </td>
                      <td>
                        <button className="delete-btn" onClick={() => handleDeleteItem(index)}>Xoá</button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="cart-summary col-md-2">
            <div className='col'>
              <button onClick={() => setShowVoucherModal(true)}>Voucher ưu đãi</button>
            </div>
            <p>Tiền phụ: <span>{subtotal} ₫</span></p>
            {selectedVoucher && (
              <p>Voucher ưu đãi: <span>{selectedVoucher.discount * 100}%</span></p>
            )}
            <p className="total">Thành Tiền: <span>{result} ₫</span></p>
            <a href="/pay"><button>Xác nhận giỏ hàng</button></a>
          </div>
        </div>
      </div>

      <Modal show={showVoucherModal} onHide={() => setShowVoucherModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Chọn Voucher</Modal.Title>
        </Modal.Header>
        <Modal.Body className="modal-body-scrollable">
          <div class="d-block w-100">
            <ul className="voucher-list">
              {vouchers.map(voucher => (
                <li key={voucher.voucherId} onClick={() => handleVoucherClick(voucher)}>
                  <div className="d-flex justify-content-between" >
                    <span>{voucher.title}</span>
                    <Form.Check
                      type="radio"
                      name="voucher"
                      checked={selectedVoucher && selectedVoucher.voucherId === voucher.voucherId}
                      onChange={() => handleVoucherClick(voucher)}
                    />
                  </div>
                  <div>Từ ngày: {voucher.startDate} đến hết ngày: {voucher.endDate} </div>
                  <div>Số lượng: {voucher.quantity}</div>
                </li>
              ))}
            </ul>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowVoucherModal(false)}>
            Trở lại
          </Button>
          <Button variant="primary" onClick={() => setShowVoucherModal(false)}>
            OK
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Cart;
