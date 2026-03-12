import api from './api';

// Register new user
export const registerUser = async (userData) => {
  const response = await api.post('/api/auth/register', userData);
  return response.data;
};



// Login user - gets JWT token back
export const loginUser = async (credentials) => {
  const response = await api.post('/api/auth/login', {
    email: credentials.email,        
    password: credentials.password   
  });
  return response.data;
};


// Logout - clear token
export const logoutUser = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};

// Check if user is logged in
export const isAuthenticated = () => {
  return !!localStorage.getItem('token');
};

// Get current user info
export const getCurrentUser = () => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};