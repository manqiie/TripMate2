// Modified services/api.js with improved error handling
import axios from 'axios';

const API_URL = 'http://localhost:8000/api';

// Create axios instance with base URL
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor to include token in requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Token ${token}`;
    }
    return config;
  },
  (error) => {
    console.error('Request interceptor error:', error);
    return Promise.reject(error);
  }
);

// Add response interceptor for better error handling
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error('API Error:', error);
    
    // Enhanced error logging
    if (error.response) {
      console.error('Response data:', error.response.data);
      console.error('Response status:', error.response.status);
      console.error('Response headers:', error.response.headers);
    } else if (error.request) {
      console.error('No response received:', error.request);
    } else {
      console.error('Error message:', error.message);
    }
    
    return Promise.reject(error);
  }
);

// Auth services
export const authService = {
  register: async (userData) => {
    console.log('Registering user with data:', userData);
    try {
      const response = await api.post('/accounts/register/', userData);
      console.log('Registration response:', response.data);
      return response;
    } catch (error) {
      console.error('Registration error in service:', error);
      throw error;
    }
  },
  
  login: async (credentials) => {
    console.log('Logging in with credentials:', credentials);
    try {
      const response = await api.post('/accounts/login/', credentials);
      console.log('Login response:', response.data);
      return response;
    } catch (error) {
      console.error('Login error in service:', error);
      throw error;
    }
  },
  
  logout: () => {
    return api.post('/accounts/logout/');
  },
  
  getCurrentUser: () => {
    return api.get('/accounts/profile/');
  },
  
  updateProfile: (userData) => {
    return api.put('/accounts/profile/', userData);
  },
  
  changePassword: (passwordData) => {
    return api.put('/accounts/change-password/', passwordData);
  },
  
  resetPasswordRequest: (email) => {
    return api.post('/accounts/reset-password-request/', { email });
  },
};

export default api;