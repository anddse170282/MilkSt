import React, { useEffect, useState } from 'react';
import * as userService from '../api/userService';
import * as orderService from '../api/orderService';
import * as orderDetailService from '../api/orderDetailService';
import * as milkService from '../api/milkService';
import * as voucherService from '../api/voucherService';
import '../css/orderhistory.css';

const OrderHistory = () => {
    const [orders, setOrders] = useState([]);
    const [filteredOrders, setFilteredOrders] = useState([]);
    const [error, setError] = useState(null);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [selectedOrderId, setSelectedOrderId] = useState(null);
    const [milkDetails, setMilkDetails] = useState({});
    const [checkUser, setCheckUser] = useState(true);
    const [showStatus, setShowStatus] = useState([]);
    const [voucher, setVoucher] = useState(null);
    const [initialAmount, setInitialAmount] = useState(0);
    const [payableAmount, setPayableAmount] = useState(0);
    const [status, setStatus] = useState(null);

    useEffect(() => {
        const fetchOrder = async () => {
            const storedUser = JSON.parse(sessionStorage.getItem('user'));
            if (storedUser && storedUser.length > 0) {
                const currentUser = storedUser[0];
                try {
                    const memberData = await userService.getMemberByUserId(currentUser.userId);
                    const response = await orderService.getOrderByMemberId(memberData[0].memberId);
                    setOrders(Array.isArray(response) ? response : []);
                    setFilteredOrders(Array.isArray(response) ? response : []);
                } catch (error) {
                    console.error('Error fetching member data:', error);
                }
            } else {
                setCheckUser(false);
            }
        };
        fetchOrder();
    }, []);

    useEffect(() => {
        const fetchStatus = async () => {
            const response = await orderService.getStatus();
            setShowStatus(response);
        };
        fetchStatus();
    }, []);

    useEffect(() => {
        if (!checkUser) {
            window.location.href = '/login';
        }
    }, [checkUser]);

    const handleRowClick = async (orderId, voucherId) => {
        if (selectedOrderId === orderId) {
            setSelectedOrder(null);
            setSelectedOrderId(null);
        } else {
            try {
                const response = await orderDetailService.getOrderDetailsByOrderId(orderId);
                if (!voucherId === null) {
                    const resVoucher = await voucherService.getVouchersById(voucherId);
                    setVoucher(resVoucher);
                }
                const status = await orderService.getOrdersById(orderId);
                setSelectedOrder(response);
                setSelectedOrderId(orderId);
                setStatus(status);

                const totalAmount = response.reduce((sum, item) => {
                    return sum + item.total;
                }, 0);
                setInitialAmount(totalAmount);
                const discountAmount = totalAmount * (voucher?.discount || 0);
                const payableAmount = totalAmount - discountAmount;
                setPayableAmount(payableAmount);

                const milkDetailsMap = {};
                await Promise.all(response.map(async (item) => {
                    if (item.milkId && !milkDetailsMap[item.milkId]) {
                        const responseMilkData = await milkService.getProductsById(item.milkId);
                        milkDetailsMap[item.milkId] = responseMilkData;
                    }
                }));
                setMilkDetails(milkDetailsMap);
            } catch (error) {
                setError(error.message);
                console.error('Error fetching order details:', error);
            }
        }
    };

    const formatPrice = (amount) => {
        const formatted = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
        return formatted;
    };

    const handleFilterChange = (status) => {
        if (status) {
            setFilteredOrders(orders.filter(order => order.statusId === status));
        } else {
            setFilteredOrders(orders);
        }
    };

    const handleCancelOrder = async () => {
        if (confirm('Bạn có chắc chắn muốn hủy đơn hàng này không?')) {
            const orderData = {
                voucherId: orders[0].voucherId,
                statusId: 2
            };
            await orderService.updateOrder(orderData, selectedOrder[0].orderId);
            alert('Đơn hàng đã được hủy.');

            // Fetch updated orders and set state
            try {
                const storedUser = JSON.parse(sessionStorage.getItem('user'));
                if (storedUser && storedUser.length > 0) {
                    const currentUser = storedUser[0];
                    const memberData = await userService.getMemberByUserId(currentUser.userId);
                    const response = await orderService.getOrderByMemberId(memberData[0].memberId);
                    setOrders(Array.isArray(response) ? response : []);
                    setFilteredOrders(Array.isArray(response) ? response : []);
                } else {
                    setCheckUser(false);
                }
            } catch (error) {
                setError(error.message);
                console.error('Error fetching updated orders:', error);
            }
        }
    };

    const orderStatus = (statusId) => {
        const orderStatus = showStatus.find((s) => s.statusId === statusId);
        return orderStatus ? orderStatus.status : 'Unknown Status';
    };

    return (
        <div className='order-history'>
            <h2>Lịch sử mua hàng</h2>
            {error && <p className="error">Lỗi: {error}</p>}
            {checkUser && (
                <>
                    <div className="filter-buttons">
                        <button onClick={() => handleFilterChange(1)}>Chờ xác nhận</button>
                        <button onClick={() => handleFilterChange(2)}>Đã hủy</button>
                        <button onClick={() => handleFilterChange(3)}>Thành công</button>
                    </div>
                    <table className="rounded-table">
                        <thead>
                            <tr>
                                <th className="order-id">Mã đơn hàng</th>
                                <th className="voucher-id">Mã voucher</th>
                                <th className="date-create">Ngày tạo đơn</th>
                                <th className="amount">Giá tiền</th>
                                <th className="status">Trạng thái</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredOrders.map((order) => (
                                <tr
                                    key={order.orderId}
                                    onClick={() => handleRowClick(order.orderId, order.voucherId)}
                                    className={selectedOrderId === order.orderId ? 'selected-row' : ''}
                                >
                                    <td>{order.orderId}</td>
                                    <td>{order.voucherId ? order.voucherId : "Không sử dụng"}</td>
                                    <td>{order.dateCreate}</td>
                                    <td>{formatPrice(order.amount)}</td>
                                    <td>{orderStatus(order.statusId)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {selectedOrder && (
                        <div className="order-details">
                            <h3>Chi tiết hóa đơn</h3>
                            <p>Mã đơn hàng: {selectedOrder[0].orderId}</p>
                            <p>Tiền ban đầu: {formatPrice(initialAmount)}</p>
                            <p>Voucher: {voucher?.title || 'Không sử dụng'}</p>
                            <p>Tiền phải trả: {formatPrice(payableAmount)}</p>
                            <h4>Chi tiết sản phẩm:</h4>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Hình ảnh</th>
                                        <th>Tên sản phẩm</th>
                                        <th>Số lượng</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {selectedOrder.map((item) => (
                                        <tr key={item.orderDetailId}>
                                            <td>
                                                <img
                                                    src={milkDetails[item.milkId]?.milkPictures[0]?.picture || 'path/to/default-image.png'}
                                                    alt={milkDetails[item.milkId]?.milkName || 'N/A'}
                                                    style={{ width: '100px', height: '100px' }}
                                                />
                                            </td>
                                            <td><a href={`/product-info/${item.milkId}`}>{milkDetails[item.milkId]?.milkName || "N/A"}</a></td>
                                            <td>{item.quantity}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            {status.statusId === 1 && (
                                <button className="cancel-order-button" onClick={handleCancelOrder}>
                                    Hủy đơn hàng
                                </button>
                            )}
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default OrderHistory;
