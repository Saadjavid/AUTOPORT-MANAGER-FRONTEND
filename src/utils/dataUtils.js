// Sample car data with professional car images
export const sampleCars = [
  {
    id: 1,
    model: "Toyota Camry",
    year: 2023,
    quantity: 15,
    price: 25000,
    status: "Imported",
    country: "Japan",
    image: "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=400&h=300&fit=crop",
    totalValue: 375000
  },
  {
    id: 2,
    model: "Honda Civic",
    year: 2023,
    quantity: 12,
    price: 22000,
    status: "In Transit",
    country: "Japan",
    image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=400&h=300&fit=crop",
    totalValue: 264000
  },
  {
    id: 3,
    model: "BMW 3 Series",
    year: 2023,
    quantity: 8,
    price: 45000,
    status: "Ready for Export",
    country: "Germany",
    image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=400&h=300&fit=crop",
    totalValue: 360000
  },
  {
    id: 4,
    model: "Mercedes C-Class",
    year: 2023,
    quantity: 10,
    price: 48000,
    status: "Imported",
    country: "Germany",
    image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=400&h=300&fit=crop",
    totalValue: 480000
  },
  {
    id: 5,
    model: "Audi A4",
    year: 2023,
    quantity: 6,
    price: 42000,
    status: "In Transit",
    country: "Germany",
    image: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=400&h=300&fit=crop",
    totalValue: 252000
  },
  {
    id: 6,
    model: "Lexus ES",
    year: 2023,
    quantity: 9,
    price: 38000,
    status: "Ready for Export",
    country: "Japan",
    image: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=400&h=300&fit=crop",
    totalValue: 342000
  },
  {
    id: 7,
    model: "Volkswagen Golf",
    year: 2023,
    quantity: 20,
    price: 28000,
    status: "Imported",
    country: "Germany",
    image: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=400&h=300&fit=crop",
    totalValue: 560000
  },
  {
    id: 8,
    model: "Hyundai Sonata",
    year: 2023,
    quantity: 14,
    price: 24000,
    status: "In Transit",
    country: "South Korea",
    image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=400&h=300&fit=crop",
    totalValue: 336000
  }
];

// Local Storage Keys
const CARS_STORAGE_KEY = 'autoport_cars';

// Get all cars from localStorage
export const getCars = () => {
  try {
    const cars = localStorage.getItem(CARS_STORAGE_KEY);
    if (cars) {
      return JSON.parse(cars);
    }
    // Initialize with sample data if no data exists
    localStorage.setItem(CARS_STORAGE_KEY, JSON.stringify(sampleCars));
    return sampleCars;
  } catch (error) {
    console.error('Error getting cars:', error);
    return sampleCars;
  }
};

// Save cars to localStorage
export const saveCars = (cars) => {
  try {
    localStorage.setItem(CARS_STORAGE_KEY, JSON.stringify(cars));
  } catch (error) {
    console.error('Error saving cars:', error);
  }
};

// Add a new car
export const addCar = (car) => {
  const cars = getCars();
  const newCar = {
    ...car,
    id: Date.now(),
    totalValue: car.quantity * car.price
  };
  const updatedCars = [...cars, newCar];
  saveCars(updatedCars);
  return newCar;
};

// Update an existing car
export const updateCar = (id, updatedCar) => {
  const cars = getCars();
  const updatedCars = cars.map(car => 
    car.id === id 
      ? { ...updatedCar, id, totalValue: updatedCar.quantity * updatedCar.price }
      : car
  );
  saveCars(updatedCars);
  return updatedCars.find(car => car.id === id);
};

// Delete a car
export const deleteCar = (id) => {
  const cars = getCars();
  const updatedCars = cars.filter(car => car.id !== id);
  saveCars(updatedCars);
};

// Get car by ID
export const getCarById = (id) => {
  const cars = getCars();
  return cars.find(car => car.id === parseInt(id));
};

// Calculate dashboard statistics
export const getDashboardStats = () => {
  const cars = getCars();
  
  const totalCars = cars.reduce((sum, car) => sum + car.quantity, 0);
  const readyForExport = cars
    .filter(car => car.status === 'Ready for Export')
    .reduce((sum, car) => sum + car.quantity, 0);
  const inTransit = cars
    .filter(car => car.status === 'In Transit')
    .reduce((sum, car) => sum + car.quantity, 0);
  const imported = cars
    .filter(car => car.status === 'Imported')
    .reduce((sum, car) => sum + car.quantity, 0);
  const totalValue = cars.reduce((sum, car) => sum + car.totalValue, 0);
  const averagePrice = totalCars > 0 ? Math.round(totalValue / totalCars) : 0;
  const uniqueModels = new Set(cars.map(car => car.model)).size;
  const countries = new Set(cars.map(car => car.country)).size;

  return {
    totalCars,
    readyForExport,
    inTransit,
    imported,
    totalValue,
    averagePrice,
    uniqueModels,
    countries
  };
};

// Search and filter cars
export const searchCars = (cars, searchTerm, statusFilter) => {
  return cars.filter(car => {
    const matchesSearch = car.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         car.country.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = !statusFilter || car.status === statusFilter;
    return matchesSearch && matchesStatus;
  });
};

// Validate car data
export const validateCar = (car) => {
  const errors = {};
  
  if (!car.model || car.model.trim() === '') {
    errors.model = 'Car model is required';
  }
  
  if (!car.year || car.year < 1900 || car.year > new Date().getFullYear() + 1) {
    errors.year = 'Please enter a valid year';
  }
  
  if (!car.quantity || car.quantity <= 0) {
    errors.quantity = 'Quantity must be greater than 0';
  }
  
  if (!car.price || car.price <= 0) {
    errors.price = 'Price must be greater than 0';
  }
  
  if (!car.status) {
    errors.status = 'Status is required';
  }
  
  if (!car.country || car.country.trim() === '') {
    errors.country = 'Country is required';
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}; 