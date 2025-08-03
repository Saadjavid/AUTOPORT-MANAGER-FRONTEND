import React from 'react';
import { Edit, Trash2, Eye } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const CarRow = ({ car, onDelete, onEdit }) => {
  const navigate = useNavigate();

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Imported':
        return 'status-badge status-imported';
      case 'In Transit':
        return 'status-badge status-transit';
      case 'Ready for Export':
        return 'status-badge status-exported';
      default:
        return 'status-badge bg-gray-100 text-gray-700';
    }
  };

  const formatPrice = (price) => {
    if (price === null || price === undefined) return '0';
    return typeof price === 'number' ? price.toLocaleString() : String(price);
  };

  const formatTotalValue = (totalValue) => {
    if (totalValue === null || totalValue === undefined) return '0';
    return typeof totalValue === 'number' ? totalValue.toLocaleString() : String(totalValue);
  };

  const handleEdit = () => {
    navigate(`/edit-car/${car.id}`);
  };

  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete ${car.model}?`)) {
      onDelete(car.id);
    }
  };

  return (
    <tr className="table-row border-b border-gray-100">
      {/* Car Image and Model */}
      <td className="px-6 py-4">
        <div className="flex items-center space-x-4">
          <div className="flex-shrink-0">
            <img
              className="h-12 w-16 object-cover rounded-lg shadow-sm"
              src={car.image || 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=400&h=300&fit=crop'}
              alt={car.model}
              onError={(e) => {
                e.target.src = 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=400&h=300&fit=crop';
              }}
            />
          </div>
          <div>
            <div className="text-sm font-medium text-gray-900">{car.model || 'N/A'}</div>
            <div className="text-sm text-gray-500">{car.year || 'N/A'}</div>
          </div>
        </div>
      </td>

      {/* Status */}
      <td className="px-6 py-4">
        <span className={getStatusBadge(car.status)}>
          {car.status || 'N/A'}
        </span>
      </td>

      {/* Country */}
      <td className="px-6 py-4">
        <div className="text-sm text-gray-900">{car.country || 'N/A'}</div>
      </td>

      {/* Quantity */}
      <td className="px-6 py-4">
        <div className="text-sm font-medium text-gray-900">{car.quantity || 0}</div>
      </td>

      {/* Price */}
      <td className="px-6 py-4">
        <div className="text-sm text-gray-900">${formatPrice(car.price)}</div>
      </td>

      {/* Total Value */}
      <td className="px-6 py-4">
        <div className="text-sm font-semibold text-gray-900">
          ${formatTotalValue(car.totalValue)}
        </div>
      </td>

      {/* Actions */}
      <td className="px-6 py-4">
        <div className="flex items-center space-x-2">
          <button
            onClick={handleEdit}
            className="p-2 text-primary-600 hover:text-primary-700 hover:bg-primary-50 rounded-lg transition-colors duration-200"
            title="Edit car"
          >
            <Edit className="h-4 w-4" />
          </button>
          <button
            onClick={handleDelete}
            className="p-2 text-danger-600 hover:text-danger-700 hover:bg-danger-50 rounded-lg transition-colors duration-200"
            title="Delete car"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </td>
    </tr>
  );
};

export default CarRow; 