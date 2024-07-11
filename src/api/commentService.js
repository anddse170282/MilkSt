import axios from 'axios';

const API_URL = 'https://localhost:7188/api';

const getComments = async (milkId) => {

    const response = await axios.get(`${API_URL}/comments?milkId=${milkId}`);
    return response.data;
};
const addComments = async (commentData) => {
    const response = await axios.post(`${API_URL}/comments`, commentData);
    return response.data;
};

const addCommentPictures = async (commentPictureData) => {
    const response = await axios.post(`${API_URL}/comment-pictures`, commentPictureData);
    return response.data;
};
export {
    getComments,
    addComments,
    addCommentPictures
};