import React from 'react';
import { Search, Filter, X } from 'lucide-react';

const SearchBar = ({ searchTerm, setSearchTerm, statusFilter, setStatusFilter }) => {
  const statusOptions = [
    { value: '', label: 'All Status' },
    { value: 'Imported', label: 'Imported' },
    { value: 'In Transit', label: 'In Transit' },
    { value: 'Ready for Export', label: 'Ready for Export' }
  ];

  const clearFilters = () => {
    setSearchTerm('');
    setStatusFilter('');
  };

  const hasActiveFilters = searchTerm || statusFilter;

  return (
    <div className="bg-white rounded-xl shadow-soft p-4 sm:p-6 mb-6">
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Search Input */}
        <div className="flex-1 relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input-field pl-10 pr-10"
            placeholder="Search by car model or country..."
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
            >
              <X className="h-5 w-5" />
            </button>
          )}
        </div>

        {/* Status Filter */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Filter className="h-5 w-5 text-gray-400" />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="input-field pl-10 pr-8 appearance-none cursor-pointer"
          >
            {statusOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </div>
        </div>

        {/* Clear Filters Button */}
        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="btn-secondary flex items-center justify-center space-x-2 px-4 py-2 w-full sm:w-auto"
          >
            <X className="h-4 w-4" />
            <span>Clear Filters</span>
          </button>
        )}
      </div>

      {/* Active Filters Display */}
      {hasActiveFilters && (
        <div className="mt-4 flex flex-wrap gap-2">
          {searchTerm && (
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-primary-100 text-primary-700">
              Search: "{searchTerm}"
              <button
                onClick={() => setSearchTerm('')}
                className="ml-2 text-primary-500 hover:text-primary-700"
              >
                <X className="h-3 w-3" />
              </button>
            </span>
          )}
          {statusFilter && (
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-teal-100 text-teal-700">
              Status: {statusFilter}
              <button
                onClick={() => setStatusFilter('')}
                className="ml-2 text-teal-500 hover:text-teal-700"
              >
                <X className="h-3 w-3" />
              </button>
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar; 