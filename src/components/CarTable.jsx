import React from 'react';
import { Plus, Download, Filter, Edit, Trash2, Car } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import CarRow from './CarRow';

const CarTable = ({ cars, onDelete, searchTerm, statusFilter }) => {
  const navigate = useNavigate();

  const formatPrice = (price) => {
    if (price === null || price === undefined) return '0';
    return typeof price === 'number' ? price.toLocaleString() : String(price);
  };

  const formatTotalValue = (totalValue) => {
    if (totalValue === null || totalValue === undefined) return '0';
    return typeof totalValue === 'number' ? totalValue.toLocaleString() : String(totalValue);
  };

  const filteredCars = cars.filter(car => {
    const matchesSearch = (car.model || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (car.country || '').toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = !statusFilter || car.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const exportData = () => {
    const csvContent = [
      ['Model', 'Year', 'Status', 'Country', 'Quantity', 'Price', 'Total Value'],
      ...filteredCars.map(car => [
        car.model || 'N/A',
        car.year || 'N/A',
        car.status || 'N/A',
        car.country || 'N/A',
        car.quantity || 0,
        car.price || 0,
        car.totalValue || 0
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'autoport-inventory.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-white rounded-xl shadow-soft overflow-hidden">
      {/* Table Header */}
      <div className="px-4 sm:px-6 py-4 border-b border-gray-100 bg-gray-50">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Car Inventory</h3>
            <p className="text-sm text-gray-600">
              {filteredCars.length} of {cars.length} cars
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <button
              onClick={exportData}
              className="btn-secondary flex items-center justify-center space-x-2 w-full sm:w-auto"
            >
              <Download className="h-4 w-4" />
              <span>Export CSV</span>
            </button>
            
            <button
              onClick={() => navigate('/add-car')}
              className="btn-primary flex items-center justify-center space-x-2 w-full sm:w-auto"
            >
              <Plus className="h-4 w-4" />
              <span>Add Car</span>
            </button>
          </div>
        </div>
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Car Model
              </th>
              <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Country
              </th>
              <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Quantity
              </th>
              <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Price
              </th>
              <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Total Value
              </th>
              <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {filteredCars.length > 0 ? (
              filteredCars.map((car) => (
                <CarRow
                  key={car.id}
                  car={car}
                  onDelete={onDelete}
                />
              ))
            ) : (
              <tr>
                <td colSpan="7" className="px-6 py-12 text-center">
                  <div className="flex flex-col items-center space-y-4">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                      <Filter className="h-8 w-8 text-gray-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">No cars found</h3>
                      <p className="text-gray-500">
                        {searchTerm || statusFilter 
                          ? 'Try adjusting your search or filter criteria'
                          : 'Get started by adding your first car'
                        }
                      </p>
                    </div>
                    {!searchTerm && !statusFilter && (
                      <button
                        onClick={() => navigate('/add-car')}
                        className="btn-primary"
                      >
                        Add Your First Car
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden">
        {filteredCars.length > 0 ? (
          <div className="space-y-4 p-4">
            {filteredCars.map((car) => (
              <div key={car.id} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <img 
                        src={car.image || 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=400&h=300&fit=crop'} 
                        alt={car.model || 'Car'} 
                        className="w-12 h-12 rounded-lg object-cover"
                        onError={(e) => {
                          e.target.src = 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=400&h=300&fit=crop';
                        }}
                      />
                      <div>
                        <h4 className="font-semibold text-gray-900">{car.model || 'N/A'}</h4>
                        <p className="text-sm text-gray-500">{car.year || 'N/A'}</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <span className="text-gray-500">Status:</span>
                        <span className={`ml-1 px-2 py-1 rounded-full text-xs font-medium ${
                          car.status === 'Ready for Export' ? 'bg-green-100 text-green-800' :
                          car.status === 'In Transit' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-blue-100 text-blue-800'
                        }`}>
                          {car.status || 'N/A'}
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-500">Country:</span>
                        <span className="ml-1 font-medium">{car.country || 'N/A'}</span>
                      </div>
                      <div>
                        <span className="text-gray-500">Quantity:</span>
                        <span className="ml-1 font-medium">{car.quantity || 0}</span>
                      </div>
                      <div>
                        <span className="text-gray-500">Price:</span>
                        <span className="ml-1 font-medium">${formatPrice(car.price)}</span>
                      </div>
                    </div>
                    <div className="mt-3 pt-3 border-t border-gray-200">
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-gray-500 text-sm">Total Value:</span>
                          <span className="ml-1 font-semibold text-gray-900">${formatTotalValue(car.totalValue)}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => navigate(`/edit-car/${car.id}`)}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            title="Edit"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => onDelete(car.id)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="px-6 py-12 text-center text-gray-500">
            <div className="flex flex-col items-center space-y-2">
              <Car className="w-8 h-8 text-gray-300" />
              <p className="text-sm">No cars found</p>
              <p className="text-xs">Try adjusting your search or filters</p>
            </div>
          </div>
        )}
      </div>

      {/* Table Footer */}
      {filteredCars.length > 0 && (
        <div className="px-6 py-4 border-t border-gray-100 bg-gray-50">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-sm text-gray-600">
            <div>
              Showing {filteredCars.length} of {cars.length} cars
            </div>
            <div className="mt-2 sm:mt-0">
              Total Value: ${filteredCars.reduce((sum, car) => sum + car.totalValue, 0).toLocaleString()}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CarTable; 