// Modified AuthContext.js with additional debugging
import React, { createContext, useState, useEffect, useContext } from 'react';
import { authService } from '../services/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [debugLogs, setDebugLogs] = useState([]);

  const addDebugLog = (message, data) => {
    console.log(`[Auth Debug] ${message}`, data);
    setDebugLogs(prev => [...prev, { timestamp: new Date().toISOString(), message, data }]);
  };

  useEffect(() => {
    // Check if user is logged in on component mount
    const token = localStorage.getItem('token');
    if (token) {
      fetchCurrentUser();
    } else {
      setLoading(false);
    }
  }, []);

  const fetchCurrentUser = async () => {
    try {
      addDebugLog('Fetching current user');
      const response = await authService.getCurrentUser();
      addDebugLog('Current user fetched', response.data);
      setCurrentUser(response.data);
    } catch (error) {
      addDebugLog('Error fetching current user', error);
      localStorage.removeItem('token');
    } finally {
      setLoading(false);
    }
  };

  const login = async (credentials) => {
    setError('');
    try {
      addDebugLog('Login attempt', credentials);
      const response = await authService.login(credentials);
      addDebugLog('Login success', response.data);
      localStorage.setItem('token', response.data.token);
      setCurrentUser(response.data.user);
      return true;
    } catch (error) {
      addDebugLog('Login error', error);
      const errorMessage = error.response?.data?.error || 'Failed to login';
      setError(errorMessage);
      return false;
    }
  };

  const register = async (userData) => {
    setError('');
    try {
      addDebugLog('Register attempt', userData);
      const response = await authService.register(userData);
      addDebugLog('Register success', response.data);
      localStorage.setItem('token', response.data.token);
      setCurrentUser(response.data.user);
      return true;
    } catch (error) {
      addDebugLog('Register error', error);
      const detailedError = {
        message: error.message,
        data: error.response?.data,
        status: error.response?.status
      };
      setError(JSON.stringify(detailedError));
      return false;
    }
  };

  const logout = async () => {
    try {
      addDebugLog('Logout attempt');
      await authService.logout();
      addDebugLog('Logout success');
    } catch (error) {
      addDebugLog('Logout error', error);
    } finally {
      localStorage.removeItem('token');
      setCurrentUser(null);
    }
  };

  const updateProfile = async (userData) => {
    setError('');
    try {
      addDebugLog('Update profile attempt', userData);
      const response = await authService.updateProfile(userData);
      addDebugLog('Update profile success', response.data);
      setCurrentUser(response.data);
      return true;
    } catch (error) {
      addDebugLog('Update profile error', error);
      setError(error.response?.data?.error || 'Failed to update profile');
      return false;
    }
  };

  const value = {
    currentUser,
    loading,
    error,
    login,
    register,
    logout,
    updateProfile,
    debugLogs,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === null) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};