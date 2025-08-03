import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../App';
import { 
  LogOut, 
  User, 
  Menu, 
  X, 
  Home, 
  Car, 
  Package, 
  Truck, 
  BarChart3, 
  Settings, 
  Users, 
  FileText, 
  Globe,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Calendar,
  MapPin,
  Activity,
  PieChart,
  LineChart,
  Edit,
  Save,
  Mail,
  Phone,
  AlertCircle,
  CheckCircle
} from 'lucide-react';
import DashboardCard from '../components/DashboardCard';
import SearchBar from '../components/SearchBar';
import CarTable from '../components/CarTable';
import ChangePassword from '../components/ChangePassword';
import EmailPreferences from '../components/EmailPreferences';
import SystemPreferences from '../components/SystemPreferences';
import { carsAPI, dashboardAPI, usersAPI, authAPI, accountSettingsAPI, handleAPIError } from '../utils/apiService';

const Dashboard = () => {
  const [cars, setCars] = useState([]);
  const [stats, setStats] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [loading, setLoading] = useState(true);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [isSavingProfile, setIsSavingProfile] = useState(false);
  const [profileMessage, setProfileMessage] = useState({ type: '', text: '' });
  const [userProfile, setUserProfile] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    role: '',
    company: ''
  });
  const [recentActivities, setRecentActivities] = useState([]);
  
  // Account Settings Modal States
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [showEmailPreferences, setShowEmailPreferences] = useState(false);
  const [showSystemPreferences, setShowSystemPreferences] = useState(false);
  
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  useEffect(() => {
    loadData();
    loadUserProfile();
    loadRecentActivities();
  }, []);

  // Refresh stats when switching to overview tab
  useEffect(() => {
    if (activeTab === 'overview') {
      refreshStats();
    }
  }, [activeTab]);

  // Check for refresh flag from other components
  useEffect(() => {
    const refreshFlag = localStorage.getItem('refresh_dashboard');
    if (refreshFlag === 'true') {
      // Clear the flag
      localStorage.removeItem('refresh_dashboard');
      // Refresh cars, stats, and activities
      refreshCars();
      refreshStats();
      loadRecentActivities();
    }
  });

  const loadData = async () => {
    setLoading(true);
    try {
      // Load cars
      const carsResponse = await carsAPI.getAllCars();
      if (carsResponse.success) {
        // Ensure cars is always an array and has proper structure
        const carsData = carsResponse.cars || [];
        const processedCars = carsData.map(car => ({
          id: car.id,
          model: car.model || 'N/A',
          year: car.year || 'N/A',
          quantity: car.quantity || 0,
          price: car.price || 0,
          status: car.status || 'N/A',
          country: car.country || 'N/A',
          image: car.image || '',
          totalValue: car.totalValue || 0,
          user: car.user || 'N/A',
          created_at: car.created_at || '',
          updated_at: car.updated_at || '',
          formatted_price: car.formatted_price || '$0',
          formatted_total_value: car.formatted_total_value || '$0'
        }));
        setCars(processedCars);
      }

      // Load dashboard stats
      const statsResponse = await dashboardAPI.getStats();
      if (statsResponse.success) {
        setStats(statsResponse.data || {});
      }
    } catch (error) {
      console.error('Error loading data:', error);
      const errorMessage = handleAPIError(error);
      // You can show a toast notification here
    } finally {
      setLoading(false);
    }
  };

  // Function to refresh only stats (for real-time updates)
  const refreshStats = async () => {
    try {
      const statsResponse = await dashboardAPI.getStats();
      if (statsResponse.success) {
        setStats(statsResponse.data || {});
      }
    } catch (error) {
      console.error('Error refreshing stats:', error);
    }
  };

  // Function to refresh cars data
  const refreshCars = async () => {
    try {
      const carsResponse = await carsAPI.getAllCars();
      if (carsResponse.success) {
        const carsData = carsResponse.cars || [];
        const processedCars = carsData.map(car => ({
          id: car.id,
          model: car.model || 'N/A',
          year: car.year || 'N/A',
          quantity: car.quantity || 0,
          price: car.price || 0,
          status: car.status || 'N/A',
          country: car.country || 'N/A',
          image: car.image || '',
          totalValue: car.totalValue || 0,
          user: car.user || 'N/A',
          created_at: car.created_at || '',
          updated_at: car.updated_at || '',
          formatted_price: car.formatted_price || '$0',
          formatted_total_value: car.formatted_total_value || '$0'
        }));
        setCars(processedCars);
      }
    } catch (error) {
      console.error('Error refreshing cars:', error);
    }
  };

  const loadUserProfile = async () => {
    try {
      const response = await usersAPI.getProfile();
      if (response.success) {
        setUserProfile(response.user);
      }
    } catch (error) {
      console.error('Error loading user profile:', error);
    }
  };

  const loadRecentActivities = async () => {
    try {
      const response = await carsAPI.getRecentActivities(10);
      if (response.success) {
        setRecentActivities(response.activities);
      }
    } catch (error) {
      console.error('Error loading recent activities:', error);
    }
  };

  const handleDelete = async (carId) => {
    try {
      await carsAPI.deleteCar(carId);
      // Refresh both cars and stats after deletion
      await Promise.all([refreshCars(), refreshStats()]);
    } catch (error) {
      console.error('Error deleting car:', error);
      const errorMessage = handleAPIError(error);
      // You can show a toast notification here
    }
  };

  const handleLogout = async () => {
    try {
      await authAPI.logout();
    } catch (error) {
      console.error('Error during logout:', error);
    } finally {
      logout();
      navigate('/login');
    }
  };

  const handleSaveProfile = async () => {
    setIsSavingProfile(true);
    setProfileMessage({ type: '', text: '' });
    
    try {
      const response = await usersAPI.updateProfile({
        first_name: userProfile.first_name,
        last_name: userProfile.last_name,
        company: userProfile.company,
        phone: userProfile.phone
      });
      
      if (response.success) {
        setProfileMessage({ type: 'success', text: 'Profile updated successfully!' });
        setIsEditingProfile(false);
        
        // Clear success message after 3 seconds
        setTimeout(() => {
          setProfileMessage({ type: '', text: '' });
        }, 3000);
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      const errorMessage = handleAPIError(error);
      setProfileMessage({ type: 'error', text: errorMessage });
    } finally {
      setIsSavingProfile(false);
    }
  };

  const handleCancelEdit = () => {
    setIsEditingProfile(false);
    setProfileMessage({ type: '', text: '' });
    // Reload the original profile data
    loadUserProfile();
  };

  const getActivityIcon = (action) => {
    switch (action) {
      case 'car_created':
        return <Car className="w-3 h-3 text-green-500" />;
      case 'car_updated':
        return <Edit className="w-3 h-3 text-blue-500" />;
      case 'car_deleted':
        return <X className="w-3 h-3 text-red-500" />;
      case 'car_status_changed':
        return <Activity className="w-3 h-3 text-yellow-500" />;
      case 'export_created':
        return <Package className="w-3 h-3 text-purple-500" />;
      case 'export_completed':
        return <CheckCircle className="w-3 h-3 text-green-500" />;
      case 'user_registered':
        return <Users className="w-3 h-3 text-indigo-500" />;
      case 'profile_updated':
        return <User className="w-3 h-3 text-teal-500" />;
      default:
        return <Activity className="w-3 h-3 text-gray-500" />;
    }
  };

  // Simplified sidebar navigation items - only relevant ones
  const sidebarItems = [
    { id: 'overview', label: 'Overview', icon: <Home className="w-5 h-5" /> },
    { id: 'inventory', label: 'Inventory', icon: <Car className="w-5 h-5" /> },
    { id: 'settings', label: 'Settings', icon: <Settings className="w-5 h-5" /> },
  ];

  // Calculate real-time stats from cars array using useMemo
  const realTimeStats = useMemo(() => {
    const totalCars = cars.length;
    const imported = cars.filter(car => car.status === 'Imported').length;
    const inTransit = cars.filter(car => car.status === 'In Transit').length;
    const readyForExport = cars.filter(car => car.status === 'Ready for Export').length;
    
    const totalValue = cars.reduce((sum, car) => sum + (car.totalValue || 0), 0);
    const averagePrice = totalCars > 0 ? totalValue / totalCars : 0;
    
    const uniqueModels = new Set(cars.map(car => car.model)).size;
    
    return {
      totalCars,
      imported,
      inTransit,
      readyForExport,
      totalValue,
      averagePrice,
      uniqueModels
    };
  }, [cars]);

  // Mock chart data for graphical overview - moved after realTimeStats
  const chartData = useMemo(() => ({
    monthlySales: [65, 78, 90, 81, 56, 55, 40, 45, 60, 75, 85, 95],
    inventoryStatus: [
      { name: 'Imported', value: realTimeStats.imported || 0, color: '#10B981' },
      { name: 'In Transit', value: realTimeStats.inTransit || 0, color: '#F59E0B' },
      { name: 'Ready for Export', value: realTimeStats.readyForExport || 0, color: '#3B82F6' }
    ],
    topModels: [
      { name: 'Toyota Camry', count: 45, percentage: 25 },
      { name: 'Honda Civic', count: 38, percentage: 21 },
      { name: 'BMW X5', count: 32, percentage: 18 },
      { name: 'Mercedes C-Class', count: 28, percentage: 16 },
      { name: 'Audi A4', count: 22, percentage: 12 }
    ]
  }), [realTimeStats]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex">
      {/* Modern Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-2xl transform transition-transform duration-300 ease-in-out ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 lg:static lg:inset-0`}>
        <div className="flex flex-col h-full">
          {/* Sidebar Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <button 
              onClick={() => navigate('/')}
              className="flex items-center space-x-3 hover:bg-gray-50 rounded-lg p-2 transition-all duration-200 group"
            >
              <div className="w-8 h-8 bg-gradient-to-r from-primary-600 to-teal-600 rounded-lg flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
                <Car className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-base font-bold text-gray-900 group-hover:text-primary-600 transition-colors">AutoPort</h2>
                <p className="text-xs text-gray-500 group-hover:text-primary-500 transition-colors">Manager</p>
              </div>
            </button>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-1 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* User Profile */}
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-primary-500 to-teal-500 rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-900 truncate">{user?.name || 'User'}</p>
                <p className="text-xs text-gray-500 truncate">{user?.email}</p>
              </div>
            </div>
          </div>

          {/* Navigation Menu */}
          <nav className="flex-1 p-3 space-y-1">
            {sidebarItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-all duration-200 ${
                  activeTab === item.id
                    ? 'bg-gradient-to-r from-primary-50 to-teal-50 text-primary-700 border border-primary-200 shadow-sm'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <div className={`${activeTab === item.id ? 'text-primary-600' : 'text-gray-400'}`}>
                  {item.icon}
                </div>
                <span className="font-medium text-sm">{item.label}</span>
              </button>
            ))}
          </nav>

          {/* Sidebar Footer */}
          <div className="p-3 border-t border-gray-200">
            {/* Footer content removed */}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 lg:ml-0">
        {/* Top Header */}
        <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
          <div className="flex items-center justify-between px-4 py-3">
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100"
              >
                <Menu className="h-5 w-5" />
              </button>
              <div>
                <h1 className="text-xl font-bold text-gray-900 capitalize">{activeTab}</h1>
                <p className="text-xs text-gray-500">Welcome back, {user?.name || 'Manager'}!</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="hidden sm:flex items-center space-x-2 text-xs text-gray-600">
                <Calendar className="w-3 h-3" />
                <span>{new Date().toLocaleDateString()}</span>
              </div>
              <div className="w-7 h-7 bg-primary-100 rounded-full flex items-center justify-center">
                <User className="h-3 w-3 text-primary-600" />
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="p-4">
          {activeTab === 'overview' && (
            <div className="space-y-4">
              {/* Quick Stats Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <DashboardCard
                  title="Total Cars"
                  value={realTimeStats.totalCars || 0}
                  icon="car"
                  color="blue"
                  subtitle={`${realTimeStats.uniqueModels || 0} unique models`}
                  trend="+12%"
                  trendUp={true}
                />
                <DashboardCard
                  title="Ready for Export"
                  value={realTimeStats.readyForExport || 0}
                  icon="package"
                  color="green"
                  subtitle="Ready to ship"
                  trend="+8%"
                  trendUp={true}
                />
                <DashboardCard
                  title="In Transit"
                  value={realTimeStats.inTransit || 0}
                  icon="truck"
                  color="yellow"
                  subtitle="On the way"
                  trend="+15%"
                  trendUp={true}
                />
                <DashboardCard
                  title="Total Value"
                  value={`$${(realTimeStats.totalValue || 0).toLocaleString()}`}
                  icon="dollar"
                  color="teal"
                  subtitle={`Avg: $${(realTimeStats.averagePrice || 0).toLocaleString()}`}
                  trend="+23%"
                  trendUp={true}
                />
              </div>

              {/* Graphical Overview */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {/* Sales Trend Chart */}
                <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-base font-semibold text-gray-900">Monthly Sales Trend</h3>
                    <TrendingUp className="w-4 h-4 text-green-500" />
                  </div>
                  <div className="h-48 flex items-end justify-between space-x-1">
                    {chartData.monthlySales.map((value, index) => (
                      <div key={index} className="flex-1 flex flex-col items-center">
                        <div 
                          className="w-full bg-gradient-to-t from-primary-500 to-primary-300 rounded-t-lg transition-all duration-300 hover:from-primary-600 hover:to-primary-400"
                          style={{ height: `${(value / 100) * 150}px` }}
                        ></div>
                        <span className="text-xs text-gray-500 mt-1">{index + 1}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-3 text-center">
                    <p className="text-xs text-gray-600">Sales performance over the last 12 months</p>
                  </div>
                </div>

                {/* Inventory Status Chart */}
                <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-base font-semibold text-gray-900">Inventory Status</h3>
                    <PieChart className="w-4 h-4 text-blue-500" />
                  </div>
                  <div className="space-y-3">
                    {chartData.inventoryStatus.map((item, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <div 
                            className="w-3 h-3 rounded-full"
                            style={{ backgroundColor: item.color }}
                          ></div>
                          <span className="text-sm font-medium text-gray-700">{item.name}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="w-20 bg-gray-200 rounded-full h-1.5">
                            <div 
                              className="h-1.5 rounded-full transition-all duration-300"
                              style={{ 
                                width: `${(item.value / (realTimeStats.totalCars || 1)) * 100}%`,
                                backgroundColor: item.color 
                              }}
                            ></div>
                          </div>
                          <span className="text-sm font-semibold text-gray-900">{item.value}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Top Models & Recent Activity */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {/* Top Models */}
                <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
                  <h3 className="text-base font-semibold text-gray-900 mb-4">Top Car Models</h3>
                  <div className="space-y-3">
                    {chartData.topModels.map((model, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <div className="w-6 h-6 bg-primary-100 rounded-md flex items-center justify-center">
                            <span className="text-xs font-bold text-primary-600">{index + 1}</span>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-900">{model.name}</p>
                            <p className="text-xs text-gray-500">{model.count} units</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-semibold text-gray-900">{model.percentage}%</p>
                          <div className="w-12 bg-gray-200 rounded-full h-1 mt-1">
                            <div 
                              className="h-1 bg-primary-500 rounded-full"
                              style={{ width: `${model.percentage}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recent Activity */}
                <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
                  <h3 className="text-base font-semibold text-gray-900 mb-4">Recent Activity</h3>
                  <div className="space-y-3">
                    {recentActivities.length > 0 ? (
                      recentActivities.map((activity, index) => (
                        <div key={activity.id} className="flex items-center space-x-2">
                          <div className="flex-shrink-0">
                            {getActivityIcon(activity.action)}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900">{activity.description}</p>
                            <p className="text-xs text-gray-500">{activity.action_display}</p>
                          </div>
                          <span className="text-xs text-gray-400">{activity.time_ago}</span>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-4">
                        <Activity className="w-8 h-8 text-gray-300 mx-auto mb-2" />
                        <p className="text-sm text-gray-500">No recent activity</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'inventory' && (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <h2 className="text-xl font-bold text-gray-900">Car Inventory</h2>
                <button
                  onClick={() => navigate('/add-car')}
                  className="btn-primary w-full sm:w-auto"
                >
                  Add New Car
                </button>
              </div>
              
              <SearchBar
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                statusFilter={statusFilter}
                setStatusFilter={setStatusFilter}
              />

              <div className="bg-white rounded-xl shadow-soft overflow-hidden">
                <CarTable
                  cars={cars}
                  onDelete={handleDelete}
                  searchTerm={searchTerm}
                  statusFilter={statusFilter}
                />
              </div>
            </div>
          )}

          {activeTab === 'exports' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900">Export Management</h2>
                <button className="btn-primary">
                  New Export
                </button>
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <div className="text-center">
                  <Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Export Management</h3>
                  <p className="text-gray-500">Manage your car exports and documentation</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'analytics' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900">Analytics & Reports</h2>
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <div className="text-center">
                  <BarChart3 className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Advanced Analytics</h3>
                  <p className="text-gray-500">Detailed reports and business insights</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900">Settings</h2>
              </div>
              
              {/* User Profile Section */}
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">User Profile</h3>
                  {!isEditingProfile && (
                    <button
                      onClick={() => setIsEditingProfile(true)}
                      className="flex items-center space-x-2 px-3 py-2 bg-primary-50 text-primary-600 rounded-lg hover:bg-primary-100 transition-colors"
                    >
                      <Edit className="w-4 h-4" />
                      <span className="text-sm font-medium">Edit Profile</span>
                    </button>
                  )}
                </div>

                {/* Profile Message */}
                {profileMessage.text && (
                  <div className={`mb-6 p-4 rounded-lg flex items-center space-x-3 ${
                    profileMessage.type === 'success' 
                      ? 'bg-success-50 text-success-700 border border-success-200' 
                      : 'bg-danger-50 text-danger-700 border border-danger-200'
                  }`}>
                    {profileMessage.type === 'success' ? (
                      <CheckCircle className="w-5 h-5" />
                    ) : (
                      <AlertCircle className="w-5 h-5" />
                    )}
                    <span className="text-sm font-medium">{profileMessage.text}</span>
                  </div>
                )}

                <div className="space-y-4">
                  {/* Profile Picture */}
                  <div className="flex items-center space-x-4">
                    <div className="w-20 h-20 bg-gradient-to-r from-primary-500 to-teal-500 rounded-full flex items-center justify-center">
                      <User className="w-10 h-10 text-white" />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900">{userProfile.first_name} {userProfile.last_name}</h4>
                      <p className="text-gray-500">{userProfile.role} • {userProfile.company}</p>
                    </div>
                  </div>

                  {/* Profile Form */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                      {isEditingProfile ? (
                        <input
                          type="text"
                          value={userProfile.first_name || ''}
                          onChange={(e) => setUserProfile({...userProfile, first_name: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                          placeholder="Enter first name"
                        />
                      ) : (
                        <p className="text-gray-900">{userProfile.first_name || 'Not provided'}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                      {isEditingProfile ? (
                        <input
                          type="text"
                          value={userProfile.last_name || ''}
                          onChange={(e) => setUserProfile({...userProfile, last_name: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                          placeholder="Enter last name"
                        />
                      ) : (
                        <p className="text-gray-900">{userProfile.last_name || 'Not provided'}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                      <p className="text-gray-900">{userProfile.email || 'Not provided'}</p>
                      <p className="text-xs text-gray-500 mt-1">Email cannot be changed</p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                      {isEditingProfile ? (
                        <input
                          type="tel"
                          value={userProfile.phone || ''}
                          onChange={(e) => setUserProfile({...userProfile, phone: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                          placeholder="Enter phone number"
                        />
                      ) : (
                        <p className="text-gray-900">{userProfile.phone || 'Not provided'}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Company</label>
                      {isEditingProfile ? (
                        <input
                          type="text"
                          value={userProfile.company || ''}
                          onChange={(e) => setUserProfile({...userProfile, company: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                          placeholder="Enter company name"
                        />
                      ) : (
                        <p className="text-gray-900">{userProfile.company || 'Not provided'}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Role</label>
                      <p className="text-gray-900">{userProfile.role || 'Not provided'}</p>
                      <p className="text-xs text-gray-500 mt-1">Role cannot be changed</p>
                    </div>
                  </div>

                  {isEditingProfile && (
                    <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
                      <button
                        onClick={handleCancelEdit}
                        disabled={isSavingProfile}
                        className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleSaveProfile}
                        disabled={isSavingProfile}
                        className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                      >
                        {isSavingProfile ? (
                          <>
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                            <span>Saving...</span>
                          </>
                        ) : (
                          <>
                            <Save className="w-4 h-4" />
                            <span>Save Changes</span>
                          </>
                        )}
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Account Settings */}
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Account Settings</h3>
                <div className="space-y-3">
                  <button 
                    onClick={() => setShowChangePassword(true)}
                    className="w-full text-left px-4 py-3 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                          <User className="w-4 h-4 text-blue-600" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">Change Password</p>
                          <p className="text-sm text-gray-500">Update your account password</p>
                        </div>
                      </div>
                    </div>
                  </button>




                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Account Settings Modals */}
      {showChangePassword && (
        <ChangePassword onClose={() => setShowChangePassword(false)} />
      )}
      
      {showEmailPreferences && (
        <EmailPreferences onClose={() => setShowEmailPreferences(false)} />
      )}
      
      {showSystemPreferences && (
        <SystemPreferences onClose={() => setShowSystemPreferences(false)} />
      )}

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}
    </div>
  );
};

export default Dashboard; 