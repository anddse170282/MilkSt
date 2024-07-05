// apiService.js
import axios from 'axios';

const API_URL = 'https://localhost:7188/api';

const getAllProducts = async () => {

    const response = await axios.get(`${API_URL}/milks`);
    return response.data;
};
const getProductsById = async (milkId) => {
    const response = await axios.get(`${API_URL}/milks/${milkId}`);
    return response.data;

}
const getAllProductsHasPagination = async (page, size) => {

    const response = await axios.get(`${API_URL}/milks?pageIndex=${page}&pageSize=${size}`);
    return response.data;
}
const getProductsByBrand = async (page, size, brandId) => {
    const response = await axios.get(`${API_URL}/milks?pageIndex=${page}&pageSize=${size}&brandId=${brandId}`);
    return response.data;
}
const getProductsByMilkType = async (page, size, milkTypeId) => {
    const response = await axios.get(`${API_URL}/milks?pageIndex=${page}&pageSize=${size}&milkTypeId=${milkTypeId}`);
    return response.data;

}
const getProductsByBrandAndMilkType = async (page, size, brandId, milkTypeId) => {
    const response = await axios.get(`${API_URL}/milks?pageIndex=${page}&pageSize=${size}&brandId=${brandId}&milkType=${milkTypeId}`);
    return response.data;
}
const getProductsAscending = async (page, size) => {
    const response = await axios.get(`${API_URL}/milks?IsDescending=false&pageIndex=${page}&pageSize=${size}`);
    return response.data;
}
const getProductsDescending = async (page, size) => {
    const response = await axios.get(`${API_URL}/milks?IsDescending=True&pageIndex=${page}&pageSize=${size}`);
    return response.data;
}
const getProductsAscendingByMilkType = async (page, size, milkTypeId) => {
    const response = await axios.get(`${API_URL}/milks?IsDescending=false&pageIndex=${page}&pageSize=${size}&milkTypeId=${milkTypeId}`);
    return response.data;
}
const getProductsDescendingByMilkType = async (page, size, milkTypeId) => {
    const response = await axios.get(`${API_URL}/milks?IsDescending=True&pageIndex=${page}&pageSize=${size}&milkTypeId=${milkTypeId}`);
    return response.data;
}
const getProductsAscendingByBrand = async (page, size, brandId) => {
    const response = await axios.get(`${API_URL}/milks?IsDescending=false&pageIndex=${page}&pageSize=${size}&brandId=${brandId}`);
    return response.data;
}
const getProductsDescendingByBrand = async (page, size, brandId) => {
    const response = await axios.get(`${API_URL}/milks?IsDescending=True&pageIndex=${page}&pageSize=${size}&brandId=${brandId}`);
    return response.data;
}
const getProductsAscendingByBrandAndMilkType = async (page, size, brandId, milkTypeId) => {
    const response = await axios.get(`${API_URL}/milks?IsDescending=false&pageIndex=${page}&pageSize=${size}&brandId=${brandId}&milkTypeId=${milkTypeId}`);
    return response.data;
}
const getProductsDescendingByBrandAndMilkType = async (page, size, brandId, milkTypeId) => {
    const response = await axios.get(`${API_URL}/milks?IsDescending=True&pageIndex=${page}&pageSize=${size}&brandId=${brandId}&milkTypeId=${milkTypeId}`);
    return response.data;
}
const getProductsBySearch = async (page, size, search) => {
    const response = await axios.get(`${API_URL}/milks?filter=${search}&pageIndex=${page}&pageSize=${size}`);
    return response.data;
}
export {
    getAllProducts,
    getAllProductsHasPagination,
    getProductsByBrand,
    getProductsByMilkType,
    getProductsByBrandAndMilkType,
    getProductsAscending,
    getProductsDescending,
    getProductsAscendingByMilkType,
    getProductsDescendingByMilkType,
    getProductsAscendingByBrand,
    getProductsDescendingByBrand,
    getProductsAscendingByBrandAndMilkType,
    getProductsDescendingByBrandAndMilkType,
    getProductsBySearch,
    getProductsById
};
