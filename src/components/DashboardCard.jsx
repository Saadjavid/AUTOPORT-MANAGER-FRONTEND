import React from 'react';
import { Car, Truck, Package, DollarSign, TrendingUp, TrendingDown } from 'lucide-react';

const DashboardCard = ({ title, value, icon, color, trend, trendUp, subtitle }) => {
  const getIcon = () => {
    switch (icon) {
      case 'car':
        return <Car className="w-6 h-6" />;
      case 'truck':
        return <Truck className="w-6 h-6" />;
      case 'package':
        return <Package className="w-6 h-6" />;
      case 'dollar':
        return <DollarSign className="w-6 h-6" />;
      default:
        return <Car className="w-6 h-6" />;
    }
  };

  const getColorClasses = () => {
    switch (color) {
      case 'blue':
        return {
          bg: 'bg-primary-50',
          icon: 'bg-primary-100 text-primary-600',
          text: 'text-primary-600'
        };
      case 'green':
        return {
          bg: 'bg-success-50',
          icon: 'bg-success-100 text-success-600',
          text: 'text-success-600'
        };
      case 'yellow':
        return {
          bg: 'bg-warning-50',
          icon: 'bg-warning-100 text-warning-600',
          text: 'text-warning-600'
        };
      case 'teal':
        return {
          bg: 'bg-teal-50',
          icon: 'bg-teal-100 text-teal-600',
          text: 'text-teal-600'
        };
      default:
        return {
          bg: 'bg-primary-50',
          icon: 'bg-primary-100 text-primary-600',
          text: 'text-primary-600'
        };
    }
  };

  const colors = getColorClasses();

  return (
    <div className={`dashboard-card ${colors.bg} group hover:scale-105 transition-all duration-300`}>
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <div className="flex items-center space-x-3 mb-2">
            <div className={`p-2 rounded-lg ${colors.icon} group-hover:scale-110 transition-transform duration-200`}>
              {getIcon()}
            </div>
            <h3 className="text-sm font-medium text-gray-600">{title}</h3>
          </div>
          
          <div className="space-y-1">
            <p className="text-2xl font-bold text-gray-900">
              {typeof value === 'number' && value >= 1000 
                ? `$${(value / 1000).toFixed(1)}K` 
                : value}
            </p>
            {subtitle && (
              <p className="text-sm text-gray-500">{subtitle}</p>
            )}
          </div>
        </div>

        {trend && (
          <div className={`text-right ${trendUp ? 'text-green-600' : 'text-red-600'}`}>
            <div className="flex items-center space-x-1">
              <span className="text-xs font-medium">
                {trend}
              </span>
              {trendUp ? (
                <TrendingUp className="w-4 h-4" />
              ) : (
                <TrendingDown className="w-4 h-4" />
              )}
            </div>
            <p className="text-xs text-gray-500">vs last month</p>
          </div>
        )}
      </div>

      {/* Decorative gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
    </div>
  );
};

export default DashboardCard; 