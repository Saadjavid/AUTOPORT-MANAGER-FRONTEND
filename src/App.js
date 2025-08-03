import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import AddEditCar from './pages/AddEditCar';
import LandingPage from './pages/LandingPage';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import { authAPI } from './utils/apiService';
import './index.css';

// Authentication Context
const AuthContext = React.createContext();

export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check if user is logged in from localStorage
    const savedUser = localStorage.getItem('autoport_user');
    if (savedUser) {
      const userData = JSON.parse(savedUser);
      setUser(userData);
      setIsAuthenticated(true);
    }
  }, []);

  const login = (userData) => {
    setUser(userData);
    setIsAuthenticated(true);
    localStorage.setItem('autoport_user', JSON.stringify(userData));
  };

  const logout = async () => {
    try {
      // Call backend logout API
      await authAPI.logout();
    } catch (error) {
      console.error('Error during logout:', error);
    } finally {
      // Clear local state regardless of API call success
      setUser(null);
      setIsAuthenticated(false);
      localStorage.removeItem('autoport_user');
    }
  };

  const authValue = {
    isAuthenticated,
    user,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={authValue}>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Routes>
            <Route 
              path="/login" 
              element={
                isAuthenticated ? <Navigate to="/dashboard" replace /> : <Login />
              } 
            />
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/add-car" 
              element={
                <ProtectedRoute>
                  <AddEditCar />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/edit-car/:id" 
              element={
                <ProtectedRoute>
                  <AddEditCar />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/" 
              element={<LandingPage />} 
            />
            <Route 
              path="/privacy" 
              element={<PrivacyPolicy />} 
            />
            <Route 
              path="/terms" 
              element={<TermsOfService />} 
            />
          </Routes>
        </div>
      </Router>
    </AuthContext.Provider>
  );
}

export default App; 