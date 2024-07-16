import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../css/orderhistory.css';

const OrderHistory = () => {
    const [orders, setOrders] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axios.get('https://localhost:7188/api/orders/1');
                console.log(response.data); // Kiểm tra dữ liệu trả về từ API
                setOrders(Array.isArray(response.data) ? response.data : []);
            } catch (error) {
                setError(error.message);
                console.error('Error fetching orders:', error);
            }
        };

        fetchOrders();
    }, []);

    return (
        <div>
            <h2>Lịch sử mua hàng</h2>
            {error && <p className="error">Lỗi: {error}</p>}
            <table>
                <thead>
                    <tr>
                        <th>Mã đơn hàng</th>
                        <th>Tên sản phẩm</th>
                        <th>Trạng thái</th>
                        <th>Giá trị</th>
                        <th>Ngày ghi nhận</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map((order) => (
                        <tr key={order.orderId}>
                            <td>{order.productName}</td>
                            <td>{order.status}</td>
                            <td>{order.paymentMethod}</td>
                            <td>{order.amount}</td>
                            <td>{order.dateCreate}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default OrderHistory;
