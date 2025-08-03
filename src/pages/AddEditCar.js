import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Save, X, Upload, Car, AlertCircle, CheckCircle } from 'lucide-react';
import { carsAPI, uploadAPI, handleAPIError } from '../utils/apiService';

const AddEditCar = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditing = !!id;

  const [formData, setFormData] = useState({
    model: '',
    year: new Date().getFullYear(),
    quantity: 1,
    price: 0,
    status: 'Imported',
    country: '',
    image: ''
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [totalValue, setTotalValue] = useState(0);

  useEffect(() => {
    if (isEditing) {
      loadCarData();
    }
  }, [id]);

  useEffect(() => {
    // Auto-calculate total value
    setTotalValue(formData.quantity * formData.price);
  }, [formData.quantity, formData.price]);

  const loadCarData = async () => {
    try {
      const response = await carsAPI.getCar(id);
      if (response.success) {
        setFormData(response.car);
      } else {
        setMessage({ type: 'error', text: 'Car not found!' });
        setTimeout(() => navigate('/dashboard'), 2000);
      }
    } catch (error) {
      console.error('Error loading car:', error);
      const errorMessage = handleAPIError(error);
      setMessage({ type: 'error', text: errorMessage });
      setTimeout(() => navigate('/dashboard'), 2000);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const newValue = name === 'year' || name === 'quantity' || name === 'price' 
      ? parseInt(value) || 0 
      : value;
    
    setFormData(prev => ({
      ...prev,
      [name]: newValue
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        setLoading(true);
        const response = await uploadAPI.uploadImage(file);
        if (response.success) {
          setFormData(prev => ({
            ...prev,
            image: response.file.file_url
          }));
        }
      } catch (error) {
        console.error('Error uploading image:', error);
        const errorMessage = handleAPIError(error);
        setMessage({ type: 'error', text: errorMessage });
      } finally {
        setLoading(false);
      }
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.model || formData.model.trim() === '') {
      newErrors.model = 'Model is required';
    }

    if (!formData.year || formData.year < 1900 || formData.year > 2030) {
      newErrors.year = 'Year must be between 1900 and 2030';
    }

    if (!formData.quantity || formData.quantity < 1) {
      newErrors.quantity = 'Quantity must be at least 1';
    }

    if (!formData.price || formData.price <= 0) {
      newErrors.price = 'Price must be greater than 0';
    }

    if (!formData.country || formData.country.trim() === '') {
      newErrors.country = 'Country is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      if (isEditing) {
        const response = await carsAPI.updateCar(id, formData);
        if (response.success) {
          setMessage({ type: 'success', text: 'Car updated successfully!' });
          // Set flag to refresh dashboard
          localStorage.setItem('refresh_dashboard', 'true');
          setTimeout(() => navigate('/dashboard'), 1500);
        }
      } else {
        const response = await carsAPI.createCar(formData);
        if (response.success) {
          setMessage({ type: 'success', text: 'Car added successfully!' });
          // Set flag to refresh dashboard
          localStorage.setItem('refresh_dashboard', 'true');
          setTimeout(() => navigate('/dashboard'), 1500);
        }
      }
    } catch (error) {
      console.error('Error saving car:', error);
      const errorMessage = handleAPIError(error);
      setMessage({ type: 'error', text: errorMessage });
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    if (Object.keys(formData).some(key => formData[key] !== '')) {
      if (window.confirm('Are you sure you want to cancel? All changes will be lost.')) {
        navigate('/dashboard');
      }
    } else {
      navigate('/dashboard');
    }
  };

  const statusOptions = [
    { value: 'Imported', label: 'Imported' },
    { value: 'In Transit', label: 'In Transit' },
    { value: 'Ready for Export', label: 'Ready for Export' }
  ];

  const countryOptions = [
    'Japan', 'Germany', 'South Korea', 'United States', 'United Kingdom', 
    'France', 'Italy', 'Spain', 'Canada', 'Australia', 'China', 'India'
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-4 mb-4">
            <button
              onClick={handleCancel}
              className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {isEditing ? 'Edit Car' : 'Add New Car'}
              </h1>
              <p className="text-gray-600">
                {isEditing ? 'Update car information' : 'Add a new car to your inventory'}
              </p>
            </div>
          </div>
        </div>

        {/* Message Alert */}
        {message.text && (
          <div className={`mb-6 p-4 rounded-lg flex items-center space-x-3 ${
            message.type === 'success' 
              ? 'bg-success-50 text-success-700 border border-success-200' 
              : 'bg-danger-50 text-danger-700 border border-danger-200'
          }`}>
            {message.type === 'success' ? (
              <CheckCircle className="w-5 h-5" />
            ) : (
              <AlertCircle className="w-5 h-5" />
            )}
            <span className="text-sm font-medium">{message.text}</span>
          </div>
        )}

        {/* Form */}
        <div className="card p-8">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Car Image Section */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-4">
                Car Image
              </label>
              <div className="flex items-center space-x-6">
                <div className="flex-shrink-0">
                  <img
                    src={formData.image}
                    alt="Car preview"
                    className="h-32 w-48 object-cover rounded-lg shadow-sm border border-gray-200"
                    onError={(e) => {
                      e.target.src = 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=400&h=300&fit=crop';
                    }}
                  />
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-4">
                    <label className="btn-secondary cursor-pointer flex items-center space-x-2">
                      <Upload className="h-4 w-4" />
                      <span>Upload Image</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="hidden"
                      />
                    </label>
                    <button
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, image: '' }))}
                      className="btn-secondary flex items-center space-x-2"
                    >
                      <X className="h-4 w-4" />
                      <span>Remove</span>
                    </button>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    Upload a high-quality image of the car (JPG, PNG, GIF)
                  </p>
                </div>
              </div>
            </div>

            {/* Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="model" className="block text-sm font-medium text-gray-700 mb-2">
                  Car Model *
                </label>
                <input
                  type="text"
                  id="model"
                  name="model"
                  value={formData.model}
                  onChange={handleInputChange}
                  className={`input-field ${errors.model ? 'border-danger-300 focus:ring-danger-500' : ''}`}
                  placeholder="e.g., Toyota Camry"
                />
                {errors.model && (
                  <p className="mt-1 text-sm text-danger-600 flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {errors.model}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="year" className="block text-sm font-medium text-gray-700 mb-2">
                  Year *
                </label>
                <input
                  type="number"
                  id="year"
                  name="year"
                  value={formData.year}
                  onChange={handleInputChange}
                  min="1900"
                  max={new Date().getFullYear() + 1}
                  className={`input-field ${errors.year ? 'border-danger-300 focus:ring-danger-500' : ''}`}
                  placeholder="2023"
                />
                {errors.year && (
                  <p className="mt-1 text-sm text-danger-600 flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {errors.year}
                  </p>
                )}
              </div>
            </div>

            {/* Status and Country */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-2">
                  Status *
                </label>
                <select
                  id="status"
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  className={`input-field ${errors.status ? 'border-danger-300 focus:ring-danger-500' : ''}`}
                >
                  {statusOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                {errors.status && (
                  <p className="mt-1 text-sm text-danger-600 flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {errors.status}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-2">
                  Country *
                </label>
                <select
                  id="country"
                  name="country"
                  value={formData.country}
                  onChange={handleInputChange}
                  className={`input-field ${errors.country ? 'border-danger-300 focus:ring-danger-500' : ''}`}
                >
                  <option value="">Select Country</option>
                  {countryOptions.map(country => (
                    <option key={country} value={country}>
                      {country}
                    </option>
                  ))}
                </select>
                {errors.country && (
                  <p className="mt-1 text-sm text-danger-600 flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {errors.country}
                  </p>
                )}
              </div>
            </div>

            {/* Quantity and Price */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-2">
                  Quantity *
                </label>
                <input
                  type="number"
                  id="quantity"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleInputChange}
                  min="1"
                  className={`input-field ${errors.quantity ? 'border-danger-300 focus:ring-danger-500' : ''}`}
                  placeholder="1"
                />
                {errors.quantity && (
                  <p className="mt-1 text-sm text-danger-600 flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {errors.quantity}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-2">
                  Price per Unit ($) *
                </label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  min="0"
                  step="0.01"
                  className={`input-field ${errors.price ? 'border-danger-300 focus:ring-danger-500' : ''}`}
                  placeholder="25000"
                />
                {errors.price && (
                  <p className="mt-1 text-sm text-danger-600 flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {errors.price}
                  </p>
                )}
              </div>
            </div>

            {/* Total Value Display */}
            <div className="bg-gray-50 rounded-lg p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                    <Car className="h-5 w-5 text-primary-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Total Value</h3>
                    <p className="text-sm text-gray-600">
                      {formData.quantity} × ${formData.price.toLocaleString()} = ${totalValue.toLocaleString()}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-primary-600">
                    ${totalValue.toLocaleString()}
                  </p>
                </div>
              </div>
            </div>

            {/* Form Actions */}
            <div className="flex items-center justify-end space-x-4 pt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={handleCancel}
                className="btn-secondary"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="btn-primary flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    <span>{isEditing ? 'Updating...' : 'Adding...'}</span>
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4" />
                    <span>{isEditing ? 'Update Car' : 'Add Car'}</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddEditCar; 