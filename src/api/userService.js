import axios from 'axios';

const API_URL = 'https://localhost:7188/api';

const getUserByUserId = async (userId) => {
    const response = await axios.get(`${API_URL}/users/${userId}`);
    return response.data;
}

const getMemberbyMemberId = async (memberId) => {  
    const response = await axios.get(`${API_URL}/members/${memberId}`);
    return response.data;
}

const updateUser = async (user) => {
    const response = await axios.put(`${API_URL}/users/${user.userId}`, user);
    return response.data;
}
export {
    getUserByUserId,
    getMemberbyMemberId,
    updateUser
}