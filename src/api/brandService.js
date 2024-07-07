import axios from 'axios';

const API_URL = 'https://localhost:7188/api';

const getAllBrands = async () => {
    
        const response = await axios.get(`${API_URL}/brands`);
        return response.data;
    };
const getBrandById = async (brandId) => {
        const response = await axios.get(`${API_URL}/brands/${brandId}`);
        return response.data;
    }
export {
    getAllBrands,
    getBrandById
};