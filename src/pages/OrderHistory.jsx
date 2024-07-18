import React, { useEffect, useState } from 'react';
import * as userService from '../api/userService';
import * as orderService from '../api/orderService';
import * as orderDetailService from '../api/orderDetailService';
import * as milkService from '../api/milkService';
import '../css/orderhistory.css';

const OrderHistory = () => {
    const [orders, setOrders] = useState([]);
    const [error, setError] = useState(null);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [selectedOrderId, setSelectedOrderId] = useState(null);
    const [milkDetails, setMilkDetails] = useState({});
    const [checkUser, setCheckUser] = useState(true);

    useEffect(() => {
        const fetchOrder = async () => {
            const storedUser = JSON.parse(sessionStorage.getItem('user'));
            if (storedUser && storedUser.length > 0) {
                const currentUser = storedUser[0];
                try {
                    const memberData = await userService.getMemberByUserId(currentUser.userId);
                    const response = await orderService.getOrderByMemberId(memberData[0].memberId);
                    setOrders(Array.isArray(response) ? response : []);
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
        if (!checkUser) {
            window.location.href = '/login'; // Chuyển hướng đến trang đăng nhập
        }
    }, [checkUser]);

    const handleRowClick = async (orderId) => {
        if (selectedOrderId === orderId) {
            setSelectedOrder(null);
            setSelectedOrderId(null);
        } else {
            try {
                const response = await orderDetailService.getOrderDetailsByOrderId(orderId);
                console.log("Order Detail: ", response);
                setSelectedOrder(response);
                setSelectedOrderId(orderId);

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

    const formatPrice = (price) => {
        if (typeof price !== 'number') {
            return 'Invalid price';
        }
        return price.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    };

    return (
        <div className='order-history'>
            <h2>Lịch sử mua hàng</h2>
            {error && <p className="error">Lỗi: {error}</p>}
            {checkUser && (
                <>
                    <table>
                        <thead>
                            <tr>
                                <th>Mã đơn hàng</th>
                                <th>Mã voucher</th>
                                <th>Ngày tạo đơn</th>
                                <th>Giá tiền</th>
                                <th>Trạng thái</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((order) => (
                                <tr key={order.orderId} onClick={() => handleRowClick(order.orderId)}>
                                    <td>{order.orderId}</td>
                                    <td>{order.voucherId ? order.voucherId : "Không sử dụng"}</td>
                                    <td>{order.dateCreate}</td>
                                    <td>{formatPrice(order.amount)} đ</td>
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
                                            <td>{formatPrice(item.total)} đ</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default OrderHistory;
