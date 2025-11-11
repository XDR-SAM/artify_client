import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
const api = axios.create({
  baseURL: API_BASE_URL,
});

// auth token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Artworks api
export const artworksAPI = {
  // Get all public artworks only for now fix later
  getAll: (params = {}) => api.get('/api/artworks', { params }),
  
  // Get featured artworks (6 most recent) fix later
  getFeatured: () => api.get('/api/artworks/featured'),
}