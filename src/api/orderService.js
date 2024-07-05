import axios from 'axios';

const API_URL = 'https://localhost:7188/api';

const getAllOrders = async () => {
    const response = await axios.get(`${API_URL}/orders`);
    return response.data;
};
const getOrdersById = async (orderId) => {
    const response = await axios.get(`${API_URL}/orders/${orderId}`);
    return response.data;
}
const createOrder = async (order) => {
    const response = await axios.post(`${API_URL}/orders`, order);
    return response.data;
}
const updateOrder = async (order) => {
    const response = await axios.put(`${API_URL}/orders/${order.orderId}`, order);
    return response.data;
}
const deleteOrder = async (orderId) => {
    const response = await axios.delete(`${API_URL}/orders/${orderId}`);
    return response.data;
}
export {   
    getAllOrders,
    getOrdersById,
    createOrder,
    updateOrder,
    deleteOrder
};