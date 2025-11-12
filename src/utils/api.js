import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL;

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
  // Get single artwork fix later
  getById: (id) => api.get(`/api/artworks/${id}`),
  
  // Get user's artworks
  getMyArtworks: () => api.get('/api/my-artworks'),
  
  // Add artwork
  create: (data) => api.post('/api/artworks', data),
  // Update artwork
  update: (id, data) => api.put(`/api/artworks/${id}`, data),
  // Delete artwork
  delete: (id) => api.delete(`/api/artworks/${id}`),
  // Like/Unlike artwork
  like: (id, action) => api.patch(`/api/artworks/${id}/like`, { action }),
};
// Favorites API
export const favoritesAPI = {
  // Get user's favorites
  getAll: () => api.get('/api/favorites'),
  // Add to favorites
  add: (artworkId) => api.post('/api/favorites', { artworkId }),
  // Remove from favorites
  remove: (artworkId) => api.delete(`/api/favorites/${artworkId}`),
};
// Artists api
export const artistsAPI = {
  // Get artist info
  getByEmail: (email) => api.get(`/api/artists/${email}`),
};

export default api;

