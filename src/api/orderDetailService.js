import axios from 'axios';

const API_URL = 'https://localhost:7188/api';

const getOrderDetailsByOrderId = async (orderId) => {
    const response = await axios.get(`${API_URL}/order-details?orderId=${orderId}`);
    return response.data;
}
const createOrderDetail = async (orderDetail) => {
    try {
      const response = await axios.post(`${API_URL}/order-details`, orderDetail, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response ? error.response.data.message : error.message);
    }
  };
    
    const updateOrderDetail = async (orderDetail) => {
        try {
        const response = await axios.put(`${API_URL}/order-details/${orderDetail.orderDetailId}`, orderDetail, {
            headers: {
            'Content-Type': 'application/json',
            },
        });
        return response.data;
        } catch (error) {
        throw new Error(error.response ? error.response.data.message : error.message);
        }
    };
    const deleteOrderDetail = async (orderDetailId) => {
        try {
        const response = await axios.delete(`${API_URL}/order-details/${orderDetailId}`);
        return response.data;
        } catch (error) {
        throw new Error(error.response ? error.response.data.message : error.message);
        }
    }
export {
    getOrderDetailsByOrderId,
    createOrderDetail,
    updateOrderDetail,
    deleteOrderDetail
};