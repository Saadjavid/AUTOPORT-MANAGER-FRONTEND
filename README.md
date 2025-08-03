# AutoPort Manager 🚗

A professional, modern car inventory management system designed specifically for car dealership owners, logistics managers, and automotive supply chain professionals.

## ✨ Features

### 🔐 Authentication
- **Secure Login/Signup** with form validation
- **JWT-based authentication** (simulated)
- **Protected routes** for authenticated users
- **User session management**

### 📊 Dashboard
- **Real-time statistics** with beautiful cards
- **Total cars, ready for export, in transit** counters
- **Portfolio value calculation**
- **Trend indicators** with visual feedback

### 🚗 Car Inventory Management
- **Add new cars** with comprehensive forms
- **Edit existing car entries** with pre-filled data
- **Delete cars** with confirmation
- **Auto price calculation** (Quantity × Price)
- **Image upload** and preview functionality

### 🔍 Search & Filter
- **Real-time search** by car model or country
- **Status filtering** (Imported, In Transit, Ready for Export)
- **Active filter indicators**
- **Clear filters** functionality

### 📋 Data Management
- **Local storage** for data persistence
- **CSV export** functionality
- **Form validation** with error messages
- **Responsive design** for all devices

## 🎨 Design System

### Color Palette
- **Primary**: Royal Blue (`#2563eb`)
- **Accent**: Charcoal Gray (`#1e293b`)
- **Success**: Emerald Green (`#10b981`)
- **Warning**: Amber (`#f59e0b`)
- **Danger**: Soft Red (`#ef4444`)
- **Secondary**: Steel Blue/Teal (`#14b8a6`)

### UI/UX Features
- **Modern glass-morphism** effects
- **Smooth animations** and transitions
- **Hover effects** and micro-interactions
- **Professional typography** with Inter font
- **Responsive grid layouts**
- **Beautiful card designs**

## 🛠 Technology Stack

- **React 18** - Modern React with hooks
- **Tailwind CSS** - Utility-first CSS framework
- **React Router** - Client-side routing
- **Lucide React** - Beautiful icons
- **Local Storage** - Data persistence

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd autoport-manager
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

### Demo Credentials
- **Email**: `demo@autoport.com`
- **Password**: `123456`

## 📱 Responsive Design

The application is fully responsive and optimized for:
- **Desktop** (1200px+)
- **Tablet** (768px - 1199px)
- **Mobile** (320px - 767px)

## 🎯 Target Audience

- **Car Dealership Owners**
- **Logistics & Freight Managers**
- **Warehouse/Yard Managers**
- **Sales & Operations Teams**
- **Import/Export Business Owners**
- **Auto Traders & Agents**
- **Vehicle Shipping Coordinators**
- **International Car Brokers**
- **Fleet Managers**
- **Automotive Supply Chain Managers**

## 🔧 Customization

### Adding New Car Images
1. Replace the default image URLs in `src/utils/dataUtils.js`
2. Use high-quality car images (400x300px recommended)
3. Ensure images are optimized for web

### Modifying Color Scheme
1. Update colors in `tailwind.config.js`
2. Modify CSS variables in `src/index.css`
3. Update component-specific color classes

### Adding New Fields
1. Update the car data structure in `dataUtils.js`
2. Modify form components in `AddEditCar.js`
3. Update validation logic
4. Add new columns to the table

## 📁 Project Structure

```
autoport-manager/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── DashboardCard.jsx
│   │   ├── SearchBar.jsx
│   │   ├── CarTable.jsx
│   │   └── CarRow.jsx
│   ├── pages/
│   │   ├── Login.js
│   │   ├── Dashboard.js
│   │   └── AddEditCar.js
│   ├── utils/
│   │   └── dataUtils.js
│   ├── App.js
│   ├── index.js
│   └── index.css
├── tailwind.config.js
├── postcss.config.js
├── package.json
└── README.md
```

## 🎨 Component Architecture

### Core Components
- **DashboardCard** - Statistics display cards
- **SearchBar** - Search and filter functionality
- **CarTable** - Main inventory table
- **CarRow** - Individual car row component

### Pages
- **Login** - Authentication page
- **Dashboard** - Main dashboard with overview
- **AddEditCar** - Car form for adding/editing

### Utilities
- **dataUtils** - Data management and validation
- **Auth Context** - Authentication state management

## 🔒 Security Features

- **Form validation** on client-side
- **Protected routes** for authenticated users
- **Input sanitization** and validation
- **Secure data handling**

## 📊 Performance Optimizations

- **Lazy loading** for images
- **Optimized re-renders** with React hooks
- **Efficient state management**
- **Minimal bundle size**

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Deploy to Netlify/Vercel
1. Connect your repository
2. Set build command: `npm run build`
3. Set publish directory: `build`
4. Deploy!

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Contact the development team
- Check the documentation

---

**AutoPort Manager** - Professional Car Inventory Management System 🚗✨ 