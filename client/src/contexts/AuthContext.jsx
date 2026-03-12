// src/context/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { loginUser, logoutUser, getCurrentUser } from '../services/authService';


// export const AuthContext = createContext(undefined);

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  // const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

//   

// On app load, check if user already logged in
  useEffect(() => {
    const savedUser = getCurrentUser();
    if (savedUser) setUser(savedUser);
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      const data = await loginUser({ email, password });
      // Save token and user info
      localStorage.setItem('token', data.access_token);
      localStorage.setItem('user', JSON.stringify(data.user));
      setUser(data.user);
      return { success: true, user: data.user };
    } catch (error) {
      const message = error.response?.data?.detail || 'Login failed';
      return { success: false, message };
    }
  };

  const logout = () => {
    logoutUser();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);