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
const getOrderByMemberId = async (memberId) => {
    const response = await axios.get(`${API_URL}/orders?memberId=${memberId}`);
    return response.data;
}

const getOrderByMemberIdAndStatus = async (memberId, status) => {
    const response = await axios.get(`${API_URL}/orders?memberId=${memberId}&orderStatus=${status}`);
    return response.data;
}

const createOrder = async (order) => {
    try {
      const response = await axios.post(`${API_URL}/orders`, order);
      return response.data;
    } catch (error) {
      console.error('Error in createOrder:', error.response ? error.response.data : error.message);
      throw error;
    }
  };
const updateOrder = async (order, orderId) => {
    const response = await axios.put(`${API_URL}/orders/${orderId}`, order);
    return response.data;
}
const deleteOrder = async (orderId) => {
    const response = await axios.delete(`${API_URL}/orders/${orderId}`);
    return response.data;
}

const getStatus = async () => {
    const response = await axios.get(`${API_URL}/status`);
    return response.data;
}

const getStatusById = async (statusId) => {
    const response = await axios.get(`${API_URL}/status/${statusId}`);
    return response.data;
}
export {   
    getAllOrders,
    getOrdersById,
    getOrderByMemberId,
    createOrder,
    updateOrder,
    deleteOrder,
    getOrderByMemberIdAndStatus,
    getStatus,
    getStatusById
};