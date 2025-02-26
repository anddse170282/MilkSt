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
  const [selectedCartItems, setSelectedCartItems] = useState([]);
  const [groupedCartItems, setGroupedCartItems] = useState([]);
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
    const storedCart = JSON.parse(sessionStorage.getItem('cart')) || [];
    const storedSelectedCart = JSON.parse(sessionStorage.getItem('selectCart')) || [];
    setCartItems(storedCart);
    setSelectedCartItems(storedSelectedCart);
  }, []);

  useEffect(() => {
    milkService.getAllProducts()
      .then(response => setMilks(response))
      .catch(error => console.error('Error fetching milks:', error));
  }, []);

  const isVoucherUsable = (voucher) => {
    const currentDate = new Date();
    const endDate = new Date(voucher.endDate);
    return currentDate <= endDate && voucher.quantity > 0;
  };

  useEffect(() => {
    voucherService.getAllVouchers()
      .then(response => {
        const validVouchers = response.filter(voucher => isVoucherUsable(voucher));
        setVouchers(validVouchers);
      })
      .catch(error => console.error('Error fetching vouchers:', error));
  }, []);

  useEffect(() => {
    updateGroupedItems();
  }, [cartItems]);

  useEffect(() => {
    updateTotals();
  }, [selectedCartItems, selectedCartItems, selectedVoucher]);

  const updateGroupedItems = () => {
    const grouped = [...cartItems, ...selectedCartItems].reduce((acc, item) => {
      const key = item.milkId;
      if (!acc[key]) {
        acc[key] = { ...item, quantity: 0, selected: false };
      }
      acc[key].quantity += item.quantity;
      return acc;
    }, {});

    setGroupedCartItems(Object.values(grouped));
  };

  const getDiscountAmount = (voucher) => {
    if (!voucher) return 0;
    return subtotal * voucher.discount;
  };

  const updateTotals = () => {
    let newSubtotal = 0;
    selectedCartItems.forEach(item => {
      const product = getProductById(item.milkId);
      if (product) {
        newSubtotal += item.quantity * product.price;
      }
    });
    setSubtotal(newSubtotal);
  };

  const handleItemChange = (index, field, value) => {
    const maxQuantity = 50;
    const newValue = field === 'quantity' ? Math.min(value, maxQuantity) : value;

    const newCartItems = [...cartItems];
    const groupedIndex = cartItems.findIndex(item => item.milkId === groupedCartItems[index].milkId);
    newCartItems[groupedIndex][field] = newValue;

    setCartItems(newCartItems);
    sessionStorage.setItem('cart', JSON.stringify(newCartItems));
    updateGroupedItems();
    updateTotals();
  };

  const handleDeleteItem = (index) => {
    const productToDelete = groupedCartItems[index];
    const newCartItems = cartItems.filter(item => item.milkId !== productToDelete.milkId);
    const newSelectedCartItems = selectedCartItems.filter(item => item.milkId !== productToDelete.milkId);

    setCartItems(newCartItems);
    setSelectedCartItems(newSelectedCartItems);

    sessionStorage.setItem('cart', JSON.stringify(newCartItems));
    sessionStorage.setItem('selectCart', JSON.stringify(newSelectedCartItems));

    updateGroupedItems();
    updateTotals();
  };

  const getProductById = (id) => {
    return milks.find(milk => milk.milkId === id);
  };

  const handleVoucherClick = (voucher) => {
    if (isVoucherUsable(voucher)) {
      setSelectedVoucher(voucher);
      setShowVoucherModal(false);
    }
  };

  const handleDeleteVoucher = (voucherTitle) => {
    if (selectedVoucher && selectedVoucher.title === voucherTitle) {
      setSelectedVoucher(null);
    }
  };

  const handleItemSelect = (index, selected) => {
    const item = groupedCartItems[index];
    if (selected) {
      const newSelectedCartItems = [...selectedCartItems, item];
      setSelectedCartItems(newSelectedCartItems);
      sessionStorage.setItem('selectCart', JSON.stringify(newSelectedCartItems));
    } else {
      const newSelectedCartItems = selectedCartItems.filter(selectedItem => selectedItem.milkId !== item.milkId);
      setSelectedCartItems(newSelectedCartItems);
      sessionStorage.setItem('selectCart', JSON.stringify(newSelectedCartItems));
    }
    updateTotals();
  };


  const handleSubmitClick = async (e) => {
    e.preventDefault();
    if (!user || !user.userId) {
      navigate('/login');
      console.error('User not found or userId is undefined');
      return;
    }

    try {
      const orderData = {
        memberId: member.memberId,
        voucherId: selectedVoucher ? selectedVoucher.voucherId : null,
        statusId: 4,
      };

      const order = await orderService.createOrder(orderData);

      for (let index = 0; index < selectedCartItems.length; index++) {
        const item = selectedCartItems[index];
        const orderDetail = {
          orderId: order.orderId,
          milkId: item.milkId,
          quantity: item.quantity,
        };
        await orderDetailService.createOrderDetail(orderDetail);
      }

      // Clear only the selected items from cart
      const newCartItems = cartItems.filter(item => !selectedCartItems.some(selectedItem => selectedItem.milkId === item.milkId));
      setCartItems(newCartItems);
      sessionStorage.setItem('cart', JSON.stringify(newCartItems));

      sessionStorage.removeItem('selectCart');
      setSelectedCartItems([]);
      navigate(`/pay?orderId=${order.orderId}&userId=${user.userId}`);
    } catch (error) {
      console.error('Error creating order or order details:', error);
    }
  };


  const formatPrice = (amount) => {
    const formatted = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
    return formatted.replace(/\./g, ' ');
  };

  const formatDiscount = (discount) => {
    return `${discount * 100}% -`;
  };

  const discount = selectedVoucher ? getDiscountAmount(selectedVoucher) : 0;
  const result = subtotal - discount;

  return (
    <>
      <div className="cart-container">
        <div className='container'>
          <div className='col-md-10 cart-table-container'>
            <table className="table table-striped table-hover">
              <table className="cart-table">
                <thead>
                  <tr>
                    <th className="bogocAll">
                      <input
                        type="checkbox"
                        onChange={(e) => {
                          const selected = e.target.checked;
                          const newSelectedCartItems = selected ? [...groupedCartItems] : [];
                          setSelectedCartItems(newSelectedCartItems);
                          sessionStorage.setItem('selectCart', JSON.stringify(newSelectedCartItems));
                          updateTotals();
                        }}
                      />
                    </th>
                    <th>Tên sản phẩm</th>
                    <th>Số lượng</th>
                    <th>Giá tiền</th>
                    <th className="bogocAll2">Xoá</th>
                  </tr>
                </thead>
                <tbody>
                  {groupedCartItems.map((item, index) => {
                    const product = getProductById(item.milkId);
                    return (
                      <tr key={index}>
                        <td>
                          <input
                            type="checkbox"
                            checked={selectedCartItems.some(selectedItem => selectedItem.milkId === item.milkId)}
                            onChange={(e) => handleItemSelect(index, e.target.checked)}
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
                            min="1"
                            max="50"
                            onChange={(e) => handleItemChange(index, 'quantity', parseInt(e.target.value))}
                          />
                        </td>
                        <td>
                          {product ? formatPrice(product.price) : 'Không xác định'}
                        </td>
                        <td>
                          <button className="delete-btn" onClick={() => handleDeleteItem(index)}><i className="bi bi-trash"></i></button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </table>
          </div>
          <div className="cart-summary col-md-2">
            <div className='col'>
              <button className="button-uudai" onClick={() => setShowVoucherModal(true)}>Voucher ưu đãi</button>
            </div>
            <p>Tiền phụ: <span>{formatPrice(subtotal)}</span></p>
            {selectedVoucher && (
              <p>Voucher ưu đãi: <span>{formatDiscount(selectedVoucher.discount)} </span><button className="icon-delete-voucher" onClick={() => handleDeleteVoucher(selectedVoucher.title)}>X</button></p>
            )}
            <p className="total">Thành Tiền: <span>{formatPrice(result)}</span></p>
            <button className="button-uudai" onClick={handleSubmitClick}>Xác nhận giỏ hàng</button>
          </div>
        </div>
      </div>

      <Modal show={showVoucherModal} onHide={() => setShowVoucherModal(false)} size="md">
        <Modal.Header closeButton>
          <Modal.Title>Chọn Voucher</Modal.Title>
        </Modal.Header>
        <Modal.Body className="modal-body-scrollable">
          <div className="d-block w-100">
            <ul className="voucher-list">
              {vouchers.map(voucher => (
                <li key={voucher.voucherId} onClick={() => isVoucherUsable(voucher) && handleVoucherClick(voucher)}>
                  <div className={`d-flex justify-content-between ${isVoucherUsable(voucher) ? '' : 'expired'}`}>
                    <div className="col-3 TenGiamGia">
                      <span className="FontTenGiamGia">{voucher.title}</span>
                    </div>
                    <div className="col-7 detail">
                      <div className="TatCa">Tất cả sản phẩm</div>
                      <div className="TuNgay">HSD: {voucher.startDate} - {voucher.endDate}</div>
                      <div className="SoLuong">Số lượng: <span className="SoLuong2"> {voucher.quantity}</span></div>
                    </div>
                    <div className="col-2 tickcheck">
                      <Form.Check
                        type="radio"
                        name="voucher"
                        checked={selectedVoucher && selectedVoucher.voucherId === voucher.voucherId}
                        onChange={() => handleVoucherClick(voucher)}
                        disabled={!isVoucherUsable(voucher)}
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
