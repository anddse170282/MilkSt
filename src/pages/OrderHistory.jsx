import React, { useEffect, useState } from 'react';
import * as userService from '../api/userService';
import * as orderService from '../api/orderService';
import * as orderDetailService from '../api/orderDetailService';
import * as milkService from '../api/milkService';
import '../css/orderhistory.css';

const OrderHistory = () => {
    const [orders, setOrders] = useState([]);
    const [filteredOrders, setFilteredOrders] = useState([]);
    const [error, setError] = useState(null);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [selectedOrderId, setSelectedOrderId] = useState(null);
    const [milkDetails, setMilkDetails] = useState({});
    const [checkUser, setCheckUser] = useState(true);
    const [status, setStatus] = useState('');

    useEffect(() => {
        const fetchOrder = async () => {
            // const storedUser = JSON.parse(sessionStorage.getItem('user'));
            // if (storedUser && storedUser.length > 0) {
            // const currentUser = storedUser[0];
            try {
                // const memberData = await userService.getMemberByUserId(currentUser.userId);
                // const response = await orderService.getOrderByMemberId(memberData[0].memberId);
                const response = await orderService.getOrderByMemberId(10);
                setOrders(Array.isArray(response) ? response : []);
                setFilteredOrders(Array.isArray(response) ? response : []);
            } catch (error) {
                console.error('Error fetching member data:', error);
            }
            // } else {
            // setCheckUser(false);
            // }
        };
        fetchOrder();
    }, []);

    // useEffect(() => {
    //     if (!checkUser) {
    //         window.location.href = '/login';
    //     }
    // }, [checkUser]);

    const handleRowClick = async (orderId, status) => {
        if (selectedOrderId === orderId) {
            setSelectedOrder(null);
            setSelectedOrderId(null);
        } else {
            try {
                const response = await orderDetailService.getOrderDetailsByOrderId(orderId);
                setSelectedOrder(response);
                setSelectedOrderId(orderId);
                setStatus(status);
                
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
            setFilteredOrders(orders.filter(order => order.orderStatus === status));
        } else {
            setFilteredOrders(orders);
        }
    };

    const handleCancelOrder = async () => {
        if (confirm('Bạn có chắc chắn muốn hủy đơn hàng này không?')) {
            const orderData = {
                voucherId: orders[0].voucherId,
                orderStatus: "Đã hủy"
            };
            console.log("Data: ", orderData);
            console.log("Id", selectedOrder[0].orderId)
            const after = await orderService.updateOrder(orderData, selectedOrder[0].orderId);
            console.log(after);
            alert('Đơn hàng đã được hủy.');
            fetchOrder();
        }
    };

    return (
        <div className='order-history'>
            <h2>Lịch sử mua hàng</h2>
            {error && <p className="error">Lỗi: {error}</p>}
            {checkUser && (
                <>
                    <div className="filter-buttons">
                        <button onClick={() => handleFilterChange('')}>Tất cả</button>
                        <button onClick={() => handleFilterChange('Chờ xác nhận')}>Chờ xác nhận</button>
                        <button onClick={() => handleFilterChange('Đã hủy')}>Đã hủy</button>
                        <button onClick={() => handleFilterChange('Thành công')}>Thành công</button>
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
                                    onClick={() => handleRowClick(order.orderId, order.orderStatus)}
                                    className={selectedOrderId === order.orderId ? 'selected-row' : ''}
                                >
                                    <td>{order.orderId}</td>
                                    <td>{order.voucherId ? order.voucherId : "Không sử dụng"}</td>
                                    <td>{order.dateCreate}</td>
                                    <td>{formatPrice(order.amount)}</td>
                                    <td>{order.orderStatus}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {selectedOrder && (
                        <div className="order-details">
                            <h3>Chi tiết hóa đơn</h3>
                            <p>Mã đơn hàng: {selectedOrder[0].orderId}</p>
                            <h4>Chi tiết sản phẩm:</h4>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Tên sản phẩm</th>
                                        <th>Số lượng</th>
                                        <th>Giá</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {selectedOrder.map((item) => (
                                        <tr key={item.orderDetailId}>
                                            <td>{milkDetails[item.milkId]?.milkName || "N/A"}</td>
                                            <td>{item.quantity}</td>
                                            <td>{formatPrice(item.total)}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            {status === "Chờ xác nhận" && (
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
