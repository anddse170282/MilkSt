import axios from 'axios';

const API_URL = 'https://localhost:7188/api';

const getAllVouchers = async () => {
    
        const response = await axios.get(`${API_URL}/vouchers`);
        return response.data;
    };

const getVouchersById = async (voucherId) => {
    const response = await axios.get(`${API_URL}/vouchers/${voucherId}`);
    return response.data;
}

const updateVoucher = async (voucher) => {
        const response = await axios.get(`${API_URL}/vouchers/${voucher.voucherId}`, voucher);
        return response.data;
}

export {
    getAllVouchers,
    updateVoucher
};