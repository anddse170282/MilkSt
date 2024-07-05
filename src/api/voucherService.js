import axios from 'axios';

const API_URL = 'https://localhost:7188/api';

const getAllVouchers = async () => {
    
        const response = await axios.get(`${API_URL}/vouchers`);
        return response.data;
    };

export {
    getAllVouchers
};