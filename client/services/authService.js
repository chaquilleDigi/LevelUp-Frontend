import api from '../utils/api';

const authService = {
  login: async (email, password) => {
    return await api.post('/auth/login', { email, password });
  },

  register: async (name, email, password) => {
    return await api.post('/auth/register', { name, email, password });
  }
};

export default authService;
