import axios from 'axios';

const API_URL = 'http://localhost:5000/api'; // Change to your backend URL when deployed

const api = {
  get: async (endpoint, token) => {
    const config = token
      ? { headers: { Authorization: `Bearer ${token}` } }
      : {};
    const response = await axios.get(`${API_URL}${endpoint}`, config);
    return response.data;
  },

  post: async (endpoint, data, token) => {
    const config = token
      ? { headers: { Authorization: `Bearer ${token}` } }
      : {};
    const response = await axios.post(`${API_URL}${endpoint}`, data, config);
    return response.data;
  },

  put: async (endpoint, data, token) => {
    const config = token
      ? { headers: { Authorization: `Bearer ${token}` } }
      : {};
    const response = await axios.put(`${API_URL}${endpoint}`, data, config);
    return response.data;
  }
};

export default api;
