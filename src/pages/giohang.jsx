import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/giohang.css';
import * as orderDetailService from '../api/orderDetailService';
import * as milkService from '../api/milkService';
import * as voucherService from '../api/voucherService';
import * as userService from '../api/userService';
import * as orderService from '../api/orderService';
import { Modal, Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';


const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const [milks, setMilks] = useState([]);
  const [vouchers, setVouchers] = useState([]);
  const [selectedVoucher, setSelectedVoucher] = useState(null);
  const [showVoucherModal, setShowVoucherModal] = useState(false);
  const [user, setUser] = useState(null);
  const [member, setMember] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserAndMemberData = async () => {
      const storedUser = JSON.parse(sessionStorage.getItem('user'));
      if (storedUser && storedUser.length > 0) {
        const currentUser = storedUser[0];
        setUser(currentUser);

        try {
          const memberData = await userService.getMemberByUserId(currentUser.userId);
          setMember(memberData[0]);
        } catch (error) {
          console.error('Error fetching member data:', error);
        }
      }
    };

    fetchUserAndMemberData();
  }, []);

  useEffect(() => {
    // Retrieve cart items from session storage
    const storedCart = JSON.parse(sessionStorage.getItem('cart')) || [];
    setCartItems(storedCart);
  }, []);

  useEffect(() => {
    // Fetch milks from API
    milkService.getAllProducts()
      .then(response => setMilks(response))
      .catch(error => console.error('Error fetching milks:', error));
  }, []);

  useEffect(() => {
    // Fetch vouchers from API
    voucherService.getAllVouchers()
      .then(response => setVouchers(response))
      .catch(error => console.error('Error fetching vouchers:', error));
  }, []);

  useEffect(() => {
    updateTotals();
  }, [cartItems, selectedVoucher]);

  const getDiscountAmount = (voucher) => {
    if (!voucher) return 0;
    return subtotal * voucher.discount;
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

  const handleSubmitClick = async (e) => {
    e.preventDefault();
    if (!user || !user.userId) {
      console.error('User not found or userId is undefined');
      return;
    }

    try {
      const orderData = {
        memberId: member.memberId,
        orderStatus: 'Chưa Thanh Toán',
      };

      console.log("Creating order with data:", orderData); // Log order data

      const order = await orderService.createOrder(orderData);
      console.log("Order created:", order); // Log created order

      for (let index = 0; index < cartItems.length; index++) {
        const item = cartItems[index];
        const orderDetail = {
          orderId: order.orderId,
          milkId: item.milkId,
          quantity: item.quantity,
        };
        await orderDetailService.createOrderDetail(orderDetail);
      }
      navigate(`/pay?orderId=${order.orderId}&userId=${user.userId}`);
    } catch (error) {
      console.error('Error creating order or order details:', error);
    }
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
              <button className="button-uudai" onClick={() => setShowVoucherModal(true)}>Voucher ưu đãi</button>
            </div>
            <p>Tiền phụ: <span>{subtotal} ₫</span></p>
            {selectedVoucher && (
              <p>Voucher ưu đãi: <span>{selectedVoucher.discount * 100}%</span></p>
            )}
            <p className="total">Thành Tiền: <span>{result} ₫</span></p>
            <button className="button-uudai" onClick={handleSubmitClick}>Xác nhận giỏ hàng</button>
          </div>
        </div>
      </div>

      <Modal show={showVoucherModal} onHide={() => setShowVoucherModal(false)} size="md">
        <Modal.Header closeButton>
          <Modal.Title>Chọn Voucher</Modal.Title>
        </Modal.Header>
        <Modal.Body className="modal-body-scrollable">
          <div class="d-block w-100">
            <ul className="voucher-list">
              {vouchers.map(voucher => (
                <li key={voucher.voucherId} onClick={() => handleVoucherClick(voucher)}>
                  <div className="d-flex justify-content-between">
                    {/* Column 1 */}
                    <div className="col-3 TenGiamGia">
                      <span className="FontTenGiamGia">{voucher.title}</span>
                    </div>

                    {/* Column 2 */}
                    <div className="col-7 detail">
                      <div className="TatCa">Tất cả sản phẩm </div>
                      <div className="TuNgay">HSD: {voucher.startDate} - {voucher.endDate}</div>
                      <div className="SoLuong">Số lượng: <span className="SoLuong2"> {voucher.quantity}</span></div>
                    </div>

                    {/* Column 3 */}
                    <div className="col-2 tickcheck">
                      <Form.Check
                        type="radio"
                        name="voucher"
                        checked={selectedVoucher && selectedVoucher.voucherId === voucher.voucherId}
                        onChange={() => handleVoucherClick(voucher)}
                      />
                    </div>
                  </div>

                </li>
              ))}
            </ul>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button className="delete" onClick={() => setShowVoucherModal(false)}>
            <div className='button-cancel'>Trở lại</div>
          </Button>
          <Button className="delete" onClick={() => setShowVoucherModal(false)}>
            <div className="button-OK">OK</div>
          </Button>
        </Modal.Footer>

      </Modal>
    </>
  );
};

export default Cart;
