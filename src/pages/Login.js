import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../App';
import { Car, Truck, Package, Eye, EyeOff, AlertCircle, CheckCircle } from 'lucide-react';
import { authAPI, handleAPIError } from '../utils/apiService';

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const navigate = useNavigate();
  const { login } = useAuth();



  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    password_confirm: '',
    company: '',
    phone: ''
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!isLogin) {
      if (!formData.first_name || formData.first_name.trim() === '') {
        newErrors.first_name = 'First name is required';
      }
      if (!formData.last_name || formData.last_name.trim() === '') {
        newErrors.last_name = 'Last name is required';
      }
      if (formData.password !== formData.password_confirm) {
        newErrors.password_confirm = 'Passwords do not match';
      }
    }

    if (!formData.email || formData.email.trim() === '') {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.password || formData.password.trim() === '') {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      if (isLogin) {
        // Login
        const response = await authAPI.login({
          email: formData.email,
          password: formData.password
        });

        if (response.success) {
          const userData = {
            ...response.user,
            token: response.token
          };
          login(userData);
          setMessage({ type: 'success', text: 'Login successful!' });
          
          setTimeout(() => {
            navigate('/dashboard');
          }, 1000);
        }
      } else {
        // Register
        const response = await authAPI.register({
          email: formData.email,
          first_name: formData.first_name,
          last_name: formData.last_name,
          password: formData.password,
          password_confirm: formData.password_confirm,
          company: formData.company,
          phone: formData.phone
        });

        if (response.success) {
          const userData = {
            ...response.user,
            token: response.token
          };
          login(userData);
          setMessage({ type: 'success', text: 'Account created successfully!' });
          
          setTimeout(() => {
            navigate('/dashboard');
          }, 1000);
        }
      }
    } catch (error) {
      console.error('Auth error:', error);
      
      // Handle specific backend error responses
      if (error.response && error.response.data) {
        const responseData = error.response.data;
        
        if (responseData.error && responseData.error.details) {
          // Handle field-specific validation errors
          const fieldErrors = [];
          const details = responseData.error.details;
          
          if (details.email) fieldErrors.push(`Email: ${details.email.join(', ')}`);
          if (details.password) fieldErrors.push(`Password: ${details.password.join(', ')}`);
          if (details.password_confirm) fieldErrors.push(`Password Confirm: ${details.password_confirm.join(', ')}`);
          if (details.first_name) fieldErrors.push(`First Name: ${details.first_name.join(', ')}`);
          if (details.last_name) fieldErrors.push(`Last Name: ${details.last_name.join(', ')}`);
          if (details.phone) fieldErrors.push(`Phone: ${details.phone.join(', ')}`);
          if (details.company) fieldErrors.push(`Company: ${details.company.join(', ')}`);
          
          if (fieldErrors.length > 0) {
            setMessage({ 
              type: 'error', 
              text: `Please fix the following errors:\n${fieldErrors.join('\n')}` 
            });
          } else {
            setMessage({ 
              type: 'error', 
              text: responseData.error.message || 'Registration failed. Please try again.' 
            });
          }
        } else if (responseData.error && responseData.error.message) {
          setMessage({ 
            type: 'error', 
            text: responseData.error.message 
          });
        } else {
          const errorMessage = handleAPIError(error);
          setMessage({ type: 'error', text: errorMessage });
        }
      } else if (error.message) {
        // Handle errors that have a message but no response structure
        setMessage({ 
          type: 'error', 
          text: error.message 
        });
      } else {
        const errorMessage = handleAPIError(error);
        setMessage({ type: 'error', text: errorMessage });
      }
      
      // Ensure loading state is reset even if there's an error
      setLoading(false);
    }
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setFormData({ 
      first_name: '', 
      last_name: '', 
      email: '', 
      password: '', 
      password_confirm: '',
      company: '',
      phone: ''
    });
    setErrors({});
    setMessage({ type: '', text: '' });
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 via-white to-teal-50 p-4">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-teal-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="relative w-full max-w-md">
        {/* Logo and Title */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-primary-600 to-teal-600 rounded-2xl mb-4 shadow-large">
            <Car className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gradient mb-2">AutoPort Manager</h1>
          <p className="text-gray-600">Professional Car Inventory Management</p>
        </div>

        {/* Auth Card */}
        <div className="card p-8 shadow-large">
          {/* Mode Toggle */}
          <div className="flex bg-gray-100 rounded-lg p-1 mb-6">
            <button
              type="button"
              onClick={() => !isLogin && toggleMode()}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all duration-200 ${
                isLogin 
                  ? 'bg-white text-primary-600 shadow-sm' 
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              Login
            </button>
            <button
              type="button"
              onClick={() => isLogin && toggleMode()}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all duration-200 ${
                !isLogin 
                  ? 'bg-white text-primary-600 shadow-sm' 
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              Sign Up
            </button>
          </div>

          {/* Message Alert */}
          {message.text && (
            <div className={`mb-6 p-4 rounded-lg ${
              message.type === 'success' 
                ? 'bg-success-50 text-success-700 border border-success-200' 
                : 'bg-danger-50 text-danger-700 border border-danger-200'
            }`}>
              <div className="flex items-start space-x-3">
                {message.type === 'success' ? (
                  <CheckCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />
                ) : (
                  <AlertCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />
                )}
                <div className="flex-1">
                  <span className="text-sm font-medium block">
                    {message.type === 'success' ? 'Success!' : 'Error'}
                  </span>
                  <div className="text-sm mt-1 whitespace-pre-line">
                    {message.text}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Field (Signup only) */}
            {!isLogin && (
              <>
                <div>
                  <label htmlFor="first_name" className="block text-sm font-medium text-gray-700 mb-2">
                    First Name
                  </label>
                  <input
                    type="text"
                    id="first_name"
                    name="first_name"
                    value={formData.first_name}
                    onChange={handleInputChange}
                    className={`input-field ${errors.first_name ? 'border-danger-300 focus:ring-danger-500' : ''}`}
                    placeholder="Enter your first name"
                  />
                  {errors.first_name && (
                    <p className="mt-1 text-sm text-danger-600 flex items-center">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {errors.first_name}
                    </p>
                  )}
                </div>
                <div>
                  <label htmlFor="last_name" className="block text-sm font-medium text-gray-700 mb-2">
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="last_name"
                    name="last_name"
                    value={formData.last_name}
                    onChange={handleInputChange}
                    className={`input-field ${errors.last_name ? 'border-danger-300 focus:ring-danger-500' : ''}`}
                    placeholder="Enter your last name"
                  />
                  {errors.last_name && (
                    <p className="mt-1 text-sm text-danger-600 flex items-center">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {errors.last_name}
                    </p>
                  )}
                </div>
              </>
            )}

            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={`input-field ${errors.email ? 'border-danger-300 focus:ring-danger-500' : ''}`}
                placeholder="Enter your email"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-danger-600 flex items-center">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.email}
                </p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className={`input-field pr-10 ${errors.password ? 'border-danger-300 focus:ring-danger-500' : ''}`}
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-sm text-danger-600 flex items-center">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.password}
                </p>
              )}
            </div>

            {/* Password Confirm Field (Signup only) */}
            {!isLogin && (
              <div>
                <label htmlFor="password_confirm" className="block text-sm font-medium text-gray-700 mb-2">
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password_confirm"
                    name="password_confirm"
                    value={formData.password_confirm}
                    onChange={handleInputChange}
                    className={`input-field pr-10 ${errors.password_confirm ? 'border-danger-300 focus:ring-danger-500' : ''}`}
                    placeholder="Confirm your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {errors.password_confirm && (
                  <p className="mt-1 text-sm text-danger-600 flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {errors.password_confirm}
                  </p>
                )}
              </div>
            )}

            {/* Company Field (Signup only) */}
            {!isLogin && (
              <div>
                <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">
                  Company
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleInputChange}
                  className={`input-field ${errors.company ? 'border-danger-300 focus:ring-danger-500' : ''}`}
                  placeholder="Enter your company name"
                />
                {errors.company && (
                  <p className="mt-1 text-sm text-danger-600 flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {errors.company}
                  </p>
                )}
              </div>
            )}

            {/* Phone Field (Signup only) */}
            {!isLogin && (
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className={`input-field ${errors.phone ? 'border-danger-300 focus:ring-danger-500' : ''}`}
                  placeholder="Enter your phone number"
                />
                {errors.phone && (
                  <p className="mt-1 text-sm text-danger-600 flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {errors.phone}
                  </p>
                )}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full btn-primary py-3 text-base font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  {isLogin ? 'Signing in...' : 'Creating account...'}
                </div>
              ) : (
                isLogin ? 'Sign In' : 'Create Account'
              )}
            </button>
          </form>

          
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-sm text-gray-500">
            © 2025 AutoPort Manager. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login; 