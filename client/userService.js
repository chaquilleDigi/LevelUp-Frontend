import api from '../utils/api';

const userService = {
  getProfile: async (token) => {
    return await api.get('/users/profile', token);
  },

  updateProfile: async (data, token) => {
    return await api.put('/users/profile', data, token);
  }
};

export default userService;
