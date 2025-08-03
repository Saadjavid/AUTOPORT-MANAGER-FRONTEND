// API Service for AutoPort Manager
const API_BASE_URL = 'https://saad.waqarulwahab.me/api';

// Helper function to get auth token
const getAuthToken = () => {
  const user = localStorage.getItem('autoport_user');
  return user ? JSON.parse(user).token : null;
};

// Helper function to make API requests
const apiRequest = async (endpoint, options = {}) => {
  const token = getAuthToken();
  
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...(token && { 'Authorization': `Token ${token}` }),
      ...options.headers,
    },
    ...options,
  };

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error?.message || 'API request failed');
    }
    
    return data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

// Authentication APIs
export const authAPI = {
  // Login
  login: async (credentials) => {
    const response = await apiRequest('/auth/login/', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
    return response;
  },

  // Register
  register: async (userData) => {
    const response = await apiRequest('/auth/register/', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
    return response;
  },

  // Logout
  logout: async () => {
    const response = await apiRequest('/auth/logout/', {
      method: 'POST',
    });
    return response;
  },
};

// Cars APIs
export const carsAPI = {
  // Get all cars
  getAllCars: async (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    const endpoint = queryString ? `/cars/?${queryString}` : '/cars/';
    const response = await apiRequest(endpoint);
    return response;
  },

  // Get single car
  getCar: async (id) => {
    const response = await apiRequest(`/cars/${id}/`);
    return response;
  },

  // Create car
  createCar: async (carData) => {
    const response = await apiRequest('/cars/create/', {
      method: 'POST',
      body: JSON.stringify(carData),
    });
    return response;
  },

  // Update car
  updateCar: async (id, carData) => {
    const response = await apiRequest(`/cars/${id}/update/`, {
      method: 'PUT',
      body: JSON.stringify(carData),
    });
    return response;
  },

  // Delete car
  deleteCar: async (id) => {
    const response = await apiRequest(`/cars/${id}/delete/`, {
      method: 'DELETE',
    });
    return response;
  },

  // Get recent activities
  getRecentActivities: async (limit = 10) => {
    const response = await apiRequest(`/cars/activities/?limit=${limit}`);
    return response;
  },
};

// Exports APIs
export const exportsAPI = {
  // Get all exports
  getAllExports: async () => {
    const response = await apiRequest('/exports/');
    return response;
  },

  // Get single export
  getExport: async (id) => {
    const response = await apiRequest(`/exports/${id}/`);
    return response;
  },

  // Create export
  createExport: async (exportData) => {
    const response = await apiRequest('/exports/create/', {
      method: 'POST',
      body: JSON.stringify(exportData),
    });
    return response;
  },

  // Update export
  updateExport: async (id, exportData) => {
    const response = await apiRequest(`/exports/${id}/update/`, {
      method: 'PUT',
      body: JSON.stringify(exportData),
    });
    return response;
  },

  // Update export status
  updateExportStatus: async (id, statusData) => {
    const response = await apiRequest(`/exports/${id}/status/`, {
      method: 'PUT',
      body: JSON.stringify(statusData),
    });
    return response;
  },

  // Delete export
  deleteExport: async (id) => {
    const response = await apiRequest(`/exports/${id}/delete/`, {
      method: 'DELETE',
    });
    return response;
  },
};

// Dashboard APIs
export const dashboardAPI = {
  // Get dashboard stats
  getStats: async () => {
    const response = await apiRequest('/dashboard/stats/');
    return response;
  },

  // Get analytics
  getAnalytics: async () => {
    const response = await apiRequest('/dashboard/analytics/');
    return response;
  },

  // Search
  search: async (query) => {
    const response = await apiRequest(`/dashboard/search/?q=${encodeURIComponent(query)}`);
    return response;
  },
};

// Users APIs
export const usersAPI = {
  // Get user profile
  getProfile: async () => {
    const response = await apiRequest('/users/profile/');
    return response;
  },

  // Update user profile
  updateProfile: async (profileData) => {
    const response = await apiRequest('/users/profile/update/', {
      method: 'PUT',
      body: JSON.stringify(profileData),
    });
    return response;
  },
};

// Upload APIs
export const uploadAPI = {
  // Upload image
  uploadImage: async (file) => {
    const token = getAuthToken();
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch(`${API_BASE_URL}/upload/image/`, {
      method: 'POST',
      headers: {
        'Authorization': `Token ${token}`,
      },
      body: formData,
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error?.message || 'Upload failed');
    }
    
    return data;
  },
};

// Account Settings APIs
export const accountSettingsAPI = {
  // Change password
  changePassword: async (passwordData) => {
    const response = await apiRequest('/account-settings/password/change/', {
      method: 'POST',
      body: JSON.stringify(passwordData),
    });
    return response;
  },

  // Get email preferences
  getEmailPreferences: async () => {
    const response = await apiRequest('/account-settings/email-preferences/');
    return response;
  },

  // Update email preferences
  updateEmailPreferences: async (preferencesData) => {
    const response = await apiRequest('/account-settings/email-preferences/', {
      method: 'PUT',
      body: JSON.stringify(preferencesData),
    });
    return response;
  },

  // Get system preferences
  getSystemPreferences: async () => {
    const response = await apiRequest('/account-settings/system-preferences/');
    return response;
  },

  // Update system preferences
  updateSystemPreferences: async (preferencesData) => {
    const response = await apiRequest('/account-settings/system-preferences/', {
      method: 'PUT',
      body: JSON.stringify(preferencesData),
    });
    return response;
  },

  // Get account settings summary
  getAccountSettingsSummary: async () => {
    const response = await apiRequest('/account-settings/summary/');
    return response;
  },
};

// Error handling utility
export const handleAPIError = (error) => {
  // Handle authentication errors
  if (error.message.includes('Authentication credentials were not provided')) {
    // Redirect to login if token is invalid
    localStorage.removeItem('autoport_user');
    window.location.href = '/login';
    return 'Please login again';
  }

  // Handle registration-specific errors
  if (error.message.includes('UserManager.create_user() missing 1 required positional argument: \'username\'')) {
    return 'Registration failed: Username is required';
  }

  if (error.message.includes('type object \'Token\' has no attribute \'objects\'')) {
    return 'Registration failed: System configuration error. Please try again.';
  }

  if (error.message.includes('JSON parse error')) {
    return 'Registration failed: Invalid data format. Please check your information.';
  }

  if (error.message.includes('User with this email already exists')) {
    return 'Registration failed: An account with this email already exists. Please use a different email or try logging in.';
  }

  if (error.message.includes('This password is too common')) {
    return 'Registration failed: Please choose a stronger password.';
  }

  if (error.message.includes('This password is too short')) {
    return 'Registration failed: Password must be at least 8 characters long.';
  }

  if (error.message.includes('This password is entirely numeric')) {
    return 'Registration failed: Password cannot be entirely numeric.';
  }

  // Handle validation errors from backend
  if (error.response && error.response.data && error.response.data.error) {
    const backendError = error.response.data.error;
    
    // Handle specific field validation errors
    if (backendError.details) {
      const fieldErrors = [];
      
      // Check for email errors
      if (backendError.details.email) {
        fieldErrors.push(`Email: ${backendError.details.email.join(', ')}`);
      }
      
      // Check for password errors
      if (backendError.details.password) {
        fieldErrors.push(`Password: ${backendError.details.password.join(', ')}`);
      }
      
      // Check for first_name errors
      if (backendError.details.first_name) {
        fieldErrors.push(`First Name: ${backendError.details.first_name.join(', ')}`);
      }
      
      // Check for last_name errors
      if (backendError.details.last_name) {
        fieldErrors.push(`Last Name: ${backendError.details.last_name.join(', ')}`);
      }
      
      // Check for phone errors
      if (backendError.details.phone) {
        fieldErrors.push(`Phone: ${backendError.details.phone.join(', ')}`);
      }
      
      // Check for company errors
      if (backendError.details.company) {
        fieldErrors.push(`Company: ${backendError.details.company.join(', ')}`);
      }
      
      if (fieldErrors.length > 0) {
        return `Registration failed:\n${fieldErrors.join('\n')}`;
      }
    }
    
    // Handle general backend error messages
    if (backendError.message) {
      return `Registration failed: ${backendError.message}`;
    }
  }

  // Handle network errors
  if (error.message.includes('Failed to fetch') || error.message.includes('NetworkError')) {
    return 'Registration failed: Network error. Please check your internet connection and try again.';
  }

  // Handle server errors
  if (error.message.includes('500') || error.message.includes('Internal Server Error')) {
    return 'Registration failed: Server error. Please try again later.';
  }

  // Handle profile update errors
  if (error.message.includes('Profile update failed')) {
    return 'Profile update failed: Please check your information and try again.';
  }

  if (error.message.includes('You can only update your own profile')) {
    return 'Profile update failed: You can only update your own profile.';
  }

  // Handle account settings errors
  if (error.message.includes('Password change failed')) {
    return 'Password change failed: Please check your information and try again.';
  }

  if (error.message.includes('Current password is incorrect')) {
    return 'Password change failed: Current password is incorrect.';
  }

  if (error.message.includes('New passwords do not match')) {
    return 'Password change failed: New passwords do not match.';
  }

  if (error.message.includes('Email preferences update failed')) {
    return 'Email preferences update failed: Please check your settings and try again.';
  }

  if (error.message.includes('System preferences update failed')) {
    return 'System preferences update failed: Please check your settings and try again.';
  }

  // Default error message
  return error.message || 'Registration failed: An unexpected error occurred. Please try again.';
};

export default {
  auth: authAPI,
  cars: carsAPI,
  exports: exportsAPI,
  dashboard: dashboardAPI,
  users: usersAPI,
  upload: uploadAPI,
  accountSettings: accountSettingsAPI,
}; 