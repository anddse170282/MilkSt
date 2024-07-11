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

const getUserByFilter = async (phone) => {
    const response = await axios.get(`${API_URL}/users?phone=${phone}`);
    return response.data;
}

const updateUser = async (user) => {
    const response = await axios.put(`${API_URL}/users/${user.userId}`, user);
    return response.data;
}

const addUser = async (userData) => {
    try {
        const response = await axios.post(`${API_URL}/users`, userData);
        return response.data;
      } catch (error) {
        console.error('Error creating user:', error);
        throw error;
      }
}

const getMemberByUserId = async (userId) => {
    try{
        const response = await axios.get(`${API_URL}/members?userId=${userId}`);
        return response.data;
    } catch (error)
    {
        console.error('Error fetch user:', error);
    }
};

const addMember = async (memberData) => {
    try{
        const response = await axios.post(`${API_URL}/members`, memberData);
        return response.data;
    } catch (error) {
        console.error('Error creating member:', error);
        throw error;
    }
}
export {
    getUserByUserId,
    getMemberbyMemberId,
    updateUser,
    getUserByFilter,
    addUser,
    getMemberByUserId,
    addMember
}