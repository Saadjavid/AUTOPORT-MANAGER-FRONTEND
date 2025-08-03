import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Car, 
  Package, 
  Truck, 
  Globe, 
  BarChart3, 
  Shield, 
  Users, 
  Zap,
  ArrowRight,
  CheckCircle,
  Star,
  Play,
  Clock,
  DollarSign,
  TrendingUp,
  Award,
  Phone,
  Mail,
  MapPin,
  ChevronDown,
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Target,
  Rocket
} from 'lucide-react';

const LandingPage = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [animatedSections, setAnimatedSections] = useState(new Set());
  const navigate = useNavigate();

  // Hero Slider Data
  const heroSlides = [
    {
      title: "Professional",
      subtitle: "Car Inventory",
      description: "Management Platform",
      description_text: "Transform your car import/export business with intelligent inventory management and real-time analytics.",
      cta_primary: "Get Started",
      cta_secondary: "Learn More",
      background_gradient: "from-blue-600 via-purple-600 to-indigo-600",
      icon: <Car className="w-16 h-16" />,
      stats: { value: "10,000+", label: "Cars Managed" },
      animation: "slideInRight"
    },
    {
      title: "Global",
      subtitle: "Export Operations",
      description: "Made Simple",
      description_text: "Manage international car exports with automated documentation, customs compliance, and real-time tracking.",
      cta_primary: "Get Started",
      cta_secondary: "Learn More",
      background_gradient: "from-emerald-600 via-teal-600 to-cyan-600",
      icon: <Globe className="w-16 h-16" />,
      stats: { value: "50+", label: "Countries" },
      animation: "slideInLeft"
    },
    {
      title: "Smart",
      subtitle: "Analytics &",
      description: "Insights",
      description_text: "Get actionable insights with advanced analytics, performance metrics, and predictive forecasting.",
      cta_primary: "Get Started",
      cta_secondary: "Learn More",
      background_gradient: "from-orange-600 via-red-600 to-pink-600",
      icon: <BarChart3 className="w-16 h-16" />,
      stats: { value: "500+", label: "Happy Clients" },
      animation: "slideInUp"
    }
  ];

  useEffect(() => {
    setIsVisible(true);
    
    // Navbar scroll effect
    const handleScroll = () => {
      const navbar = document.getElementById('navbar');
      if (window.scrollY > 50) {
        navbar.classList.add('bg-white/90', 'border-gray-200');
        navbar.classList.remove('bg-transparent', 'border-white/20');
        // Change text colors to dark
        const navLinks = navbar.querySelectorAll('a, span');
        navLinks.forEach(link => {
          if (link.tagName === 'A') {
            link.classList.remove('text-white/90', 'hover:text-white');
            link.classList.add('text-gray-600', 'hover:text-primary-600');
          } else if (link.textContent === 'AutoPort Manager') {
            link.classList.remove('text-white');
            link.classList.add('text-gradient');
          }
        });
        // Change mobile menu button
        const mobileBtn = navbar.querySelector('button.md\\:hidden');
        if (mobileBtn) {
          mobileBtn.classList.remove('text-white/90', 'hover:text-white', 'hover:bg-white/10');
          mobileBtn.classList.add('text-gray-600', 'hover:text-gray-900', 'hover:bg-gray-100');
        }
      } else {
        navbar.classList.remove('bg-white/90', 'border-gray-200');
        navbar.classList.add('bg-transparent', 'border-white/20');
        // Change text colors back to white
        const navLinks = navbar.querySelectorAll('a, span');
        navLinks.forEach(link => {
          if (link.tagName === 'A') {
            link.classList.remove('text-gray-600', 'hover:text-primary-600');
            link.classList.add('text-white/90', 'hover:text-white');
          } else if (link.textContent === 'AutoPort Manager') {
            link.classList.remove('text-gradient');
            link.classList.add('text-white');
          }
        });
        // Change mobile menu button back
        const mobileBtn = navbar.querySelector('button.md\\:hidden');
        if (mobileBtn) {
          mobileBtn.classList.remove('text-gray-600', 'hover:text-gray-900', 'hover:bg-gray-100');
          mobileBtn.classList.add('text-white/90', 'hover:text-white', 'hover:bg-white/10');
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Intersection Observer for section animations
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.id;
          setAnimatedSections(prev => new Set([...prev, sectionId]));
        }
      });
    }, observerOptions);

    // Observe all sections
    const sections = document.querySelectorAll('section[id]');
    sections.forEach(section => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  // Auto-play slider
  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, heroSlides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const features = [
    {
      icon: <Car className="w-8 h-8" />,
      title: "Smart Inventory Management",
      description: "AI-powered inventory tracking with real-time updates, automated alerts, and intelligent forecasting.",
      benefits: ["Real-time tracking", "Automated alerts", "Smart forecasting"]
    },
    {
      icon: <Package className="w-8 h-8" />,
      title: "Export Documentation",
      description: "Streamlined export processes with automated documentation, customs forms, and compliance tracking.",
      benefits: ["Auto-generated docs", "Customs compliance", "Digital signatures"]
    },
    {
      icon: <Truck className="w-8 h-8" />,
      title: "Logistics Integration",
      description: "Seamless integration with shipping partners, real-time tracking, and delivery optimization.",
      benefits: ["Partner integration", "Route optimization", "Delivery tracking"]
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: "Global Operations",
      description: "Manage international operations with multi-currency support and local compliance.",
      benefits: ["Multi-currency", "Local compliance", "Global reach"]
    },
    {
      icon: <BarChart3 className="w-8 h-8" />,
      title: "Advanced Analytics",
      description: "Comprehensive reporting with custom dashboards, performance metrics, and business insights.",
      benefits: ["Custom dashboards", "Performance metrics", "Business insights"]
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Enterprise Security",
      description: "Bank-level security with encryption, backup protection, and compliance certifications.",
      benefits: ["Data encryption", "Backup protection", "Compliance certified"]
    }
  ];

  const testimonials = [
    {
      name: "ALI RAZA",
      role: "BRAND MANAGER",
      company: "INDUS MOTOR COMPANY",
      content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
      rating: 5,
      avatar: "AH"
    },
    {
      name: "WAQAR UL WAHAB",
      role: "HR MANAGER",
      company: "CHANGAN MOTORS",
      content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
      rating: 5,
      avatar: "SJ"
    },
    {
      name: "MUHAMMAD SAAD JAVID",
      role: "CEO",
      company: "KIA LUCKY MOTORS",
      content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
      rating: 5,
      avatar: "MA"
    }
  ];

  const stats = [
    { number: "10,000+", label: "Cars Managed", icon: <Car className="w-6 h-6" /> },
    { number: "500+", label: "Happy Clients", icon: <Users className="w-6 h-6" /> },
    { number: "50+", label: "Countries", icon: <Globe className="w-6 h-6" /> },
    { number: "99.9%", label: "Uptime", icon: <Shield className="w-6 h-6" /> }
  ];

  const pricingPlans = [
    {
      name: "Starter",
      price: "$99",
      period: "/month",
      description: "Perfect for small dealerships",
      features: [
        "Up to 100 cars",
        "Basic analytics",
        "Email support",
        "Mobile app access",
        "Export documentation"
      ],
      popular: false
    },
    {
      name: "Professional",
      price: "$299",
      period: "/month",
      description: "Ideal for growing businesses",
      features: [
        "Up to 1000 cars",
        "Advanced analytics",
        "Priority support",
        "API access",
        "Custom integrations",
        "Multi-user access"
      ],
      popular: true
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "",
      description: "For large operations",
      features: [
        "Unlimited cars",
        "Custom analytics",
        "24/7 support",
        "White-label solution",
        "Dedicated manager",
        "Custom development"
      ],
      popular: false
    }
  ];

  const contactInfo = [
    {
      icon: <Phone className="w-6 h-6" />,
      title: "Call Us",
      details: "+923420794632",
      description: "Available 24/7 for support"
    },
    {
      icon: <Mail className="w-6 h-6" />,
      title: "Email Us",
      details: "saadjavid0317@gmail.com",
      description: "Get response within 2 hours"
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: "Visit Us",
      details: "Blue Area",
      description: "Islamabad, Pakistan"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
             {/* Navigation */}
       <nav className="fixed top-0 w-full bg-transparent backdrop-blur-md border-b border-white/20 z-50 transition-all duration-300" id="navbar">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-primary-600 to-teal-600 rounded-xl flex items-center justify-center shadow-lg">
                <Car className="w-6 h-6 text-white" />
              </div>
                             <span className="text-2xl font-bold text-white">AutoPort Manager</span>
            </div>
            
                         {/* Desktop Menu */}
                           <div className="hidden md:flex items-center space-x-8">
                <a href="#features" className="text-white/90 hover:text-white transition-colors">Features</a>
                <a href="#testimonials" className="text-white/90 hover:text-white transition-colors">Testimonials</a>
                <a href="#contact" className="text-white/90 hover:text-white transition-colors">Contact</a>
               <button 
                 onClick={() => navigate('/login')}
                 className="btn-primary"
               >
                 Get Started
               </button>
             </div>

            {/* Mobile Menu Button */}
                         <button 
               onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
               className="md:hidden p-2 rounded-lg text-white/90 hover:text-white hover:bg-white/10"
             >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

                 {/* Mobile Menu */}
         {mobileMenuOpen && (
           <div className="md:hidden bg-white border-t border-gray-200">
             <div className="px-4 py-6 space-y-4">
               <a href="#features" className="block text-gray-600 hover:text-primary-600">Features</a>
               <a href="#testimonials" className="block text-gray-600 hover:text-primary-600">Testimonials</a>
               <a href="#contact" className="block text-gray-600 hover:text-primary-600">Contact</a>
               <button 
                 onClick={() => navigate('/login')}
                 className="w-full btn-primary"
               >
                 Get Started
               </button>
             </div>
           </div>
         )}
      </nav>

             {/* Modern Hero Section with Slider */}
       <section className="pt-16 min-h-screen relative overflow-hidden">
         {/* Background Elements */}
         <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900"></div>
         <div className="absolute inset-0 opacity-40" style={{
           backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
         }}></div>
         
                   {/* Enhanced Floating Elements */}
          <div className="absolute top-20 left-10 w-80 h-80 bg-gradient-to-r from-blue-500/30 to-purple-500/30 rounded-full mix-blend-multiply filter blur-3xl animate-float"></div>
          <div className="absolute top-40 right-10 w-80 h-80 bg-gradient-to-r from-purple-500/30 to-pink-500/30 rounded-full mix-blend-multiply filter blur-3xl animate-float" style={{animationDelay: '2s'}}></div>
          <div className="absolute bottom-20 left-1/4 w-96 h-96 bg-gradient-to-r from-cyan-500/30 to-blue-500/30 rounded-full mix-blend-multiply filter blur-3xl animate-float" style={{animationDelay: '4s'}}></div>
          
          {/* Background Car Images Slider */}
          <div className="absolute inset-0 overflow-hidden">
            {/* Slide 1 - Luxury Car */}
            <div className={`absolute inset-0 transition-all duration-3000 ${currentSlide === 0 ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
              <img 
                src="https://images.unsplash.com/photo-1555215695-3004980ad54e?w=1200&h=800&fit=crop&crop=center" 
                alt="Luxury Car" 
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/70"></div>
            </div>
            
            {/* Slide 2 - Sports Car */}
            <div className={`absolute inset-0 transition-all duration-3000 ${currentSlide === 1 ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
              <img 
                src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1200&h=800&fit=crop&crop=center" 
                alt="Sports Car" 
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/70"></div>
            </div>
            
            {/* Slide 3 - SUV */}
            <div className={`absolute inset-0 transition-all duration-3000 ${currentSlide === 2 ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
              <img 
                src="https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=1200&h=800&fit=crop&crop=center" 
                alt="SUV" 
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/70"></div>
            </div>
          </div>
          
          {/* Modern Grid Pattern */}
         <div className="absolute inset-0 opacity-20">
           <div className="absolute inset-0" style={{
             backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
             backgroundSize: '50px 50px'
           }}></div>
         </div>

        {/* Slider Container */}
        <div className="relative min-h-screen flex items-center pt-20 pb-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              
              {/* Left Content */}
              <div className="relative z-10 text-center lg:text-left">
                <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                  {/* Enhanced Trust Badge */}
                  <div className="inline-flex items-center px-3 sm:px-4 py-2 bg-gradient-to-r from-white/20 to-white/10 backdrop-blur-xl text-white rounded-full text-xs font-medium mb-6 sm:mb-8 border border-white/30 shadow-2xl">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full mr-2 animate-pulse"></div>
                    <Sparkles className="w-3 h-3 mr-2 text-yellow-400" />
                    <span className="font-semibold tracking-wide text-xs sm:text-sm">Trusted by 500+ car dealerships worldwide</span>
                  </div>
                  
                  {/* Enhanced Dynamic Title */}
                  <div className="mb-6 sm:mb-8">
                    <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6 leading-tight">
                      <span className="block tracking-tight drop-shadow-lg">{heroSlides[currentSlide].title}</span>
                      <span className="block bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent tracking-wide drop-shadow-lg">
                        {heroSlides[currentSlide].subtitle}
                      </span>
                      <span className="block tracking-tight drop-shadow-lg">{heroSlides[currentSlide].description}</span>
                    </h1>
                    <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start space-y-2 sm:space-y-0 sm:space-x-4 mt-4 sm:mt-6">
                      <div className="px-3 py-1.5 bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 rounded-full text-black font-bold text-xs shadow-xl backdrop-blur-sm">
                        {heroSlides[currentSlide].highlight}
                      </div>
                      <div className="flex items-center space-x-2 text-white/90">
                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                        <Target className="w-3 h-3" />
                        <span className="text-xs font-semibold tracking-wide">Industry Leading</span>
                      </div>
                    </div>
                  </div>

                  {/* Enhanced Description */}
                  <p className="text-sm sm:text-base text-gray-200 mb-8 sm:mb-10 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-light drop-shadow-lg">
                    {heroSlides[currentSlide].description_text}
                  </p>
                  
                  {/* Enhanced CTA Buttons */}
                  <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 mb-8 sm:mb-12 justify-center lg:justify-start">
                    <button 
                      onClick={() => navigate('/login')}
                      className="group relative px-4 sm:px-6 py-3 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white font-semibold rounded-xl overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl text-sm shadow-xl backdrop-blur-sm"
                    >
                      <span className="relative z-10 flex items-center justify-center space-x-2">
                        <span>{heroSlides[currentSlide].cta_primary}</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </span>
                      <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    </button>
                    <button className="group px-4 sm:px-6 py-3 border-2 border-white/40 text-white font-semibold rounded-xl hover:bg-white hover:text-gray-900 transition-all duration-300 flex items-center justify-center space-x-2 text-sm backdrop-blur-xl hover:shadow-xl">
                      <Play className="w-4 h-4" />
                      <span>{heroSlides[currentSlide].cta_secondary}</span>
                    </button>
                  </div>

                  
                </div>
              </div>

              {/* Right Content - Dynamic Visual */}
              <div className="relative z-10 hidden lg:block">
                <div className="relative">
                  {/* Enhanced Main Icon Container */}
                  <div className={`w-56 h-56 mx-auto bg-gradient-to-br ${heroSlides[currentSlide].background_gradient} rounded-full flex items-center justify-center shadow-2xl transition-all duration-1000 ${isVisible ? 'scale-100 opacity-100' : 'scale-75 opacity-0'} backdrop-blur-xl border border-white/20`}>
                    <div className="text-white drop-shadow-lg">
                      {heroSlides[currentSlide].icon}
                    </div>
                    
                    {/* Enhanced Floating Elements Around Icon */}
                    <div className="absolute -top-4 -right-4 w-14 h-14 bg-gradient-to-br from-white/30 to-white/10 rounded-full flex items-center justify-center backdrop-blur-xl border border-white/20 shadow-xl animate-pulse">
                      <TrendingUp className="w-7 h-7 text-white" />
                    </div>
                    <div className="absolute -bottom-4 -left-4 w-14 h-14 bg-gradient-to-br from-white/30 to-white/10 rounded-full flex items-center justify-center backdrop-blur-xl border border-white/20 shadow-xl animate-pulse" style={{animationDelay: '1s'}}>
                      <Rocket className="w-7 h-7 text-white" />
                    </div>
                    <div className="absolute top-1/2 -left-8 w-12 h-12 bg-gradient-to-br from-white/30 to-white/10 rounded-full flex items-center justify-center backdrop-blur-xl border border-white/20 shadow-xl animate-pulse" style={{animationDelay: '2s'}}>
                      <Shield className="w-6 h-6 text-white" />
                    </div>
                    <div className="absolute top-1/2 -right-8 w-12 h-12 bg-gradient-to-br from-white/30 to-white/10 rounded-full flex items-center justify-center backdrop-blur-xl border border-white/20 shadow-xl animate-pulse" style={{animationDelay: '3s'}}>
                      <Zap className="w-6 h-6 text-white" />
                    </div>
                  </div>

                  {/* Enhanced Stats Card */}
                  <div className="absolute -bottom-8 -left-8 bg-gradient-to-br from-white/20 to-white/10 backdrop-blur-xl rounded-3xl p-6 border border-white/30 shadow-2xl">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-white mb-2 drop-shadow-lg">
                        {heroSlides[currentSlide].stats.value}
                      </div>
                      <div className="text-gray-200 text-sm font-medium tracking-wide">
                        {heroSlides[currentSlide].stats.label}
                      </div>
                    </div>
                  </div>

                                    {/* Enhanced Progress Indicators */}
                  <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 flex space-x-4">
                    {heroSlides.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => goToSlide(index)}
                        className={`w-3 h-3 rounded-full transition-all duration-300 ${
                          index === currentSlide 
                            ? 'bg-white scale-150 shadow-lg' 
                            : 'bg-white/40 hover:bg-white/60 hover:scale-125'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Mobile Progress Indicators */}
            <div className="lg:hidden flex justify-center mt-8">
              <div className="flex space-x-3">
                {heroSlides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentSlide 
                        ? 'bg-white scale-150 shadow-lg' 
                        : 'bg-white/40 hover:bg-white/60 hover:scale-125'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Enhanced Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-2 sm:left-6 top-1/2 transform -translate-y-1/2 w-10 h-10 sm:w-14 sm:h-14 bg-gradient-to-r from-white/20 to-white/10 backdrop-blur-xl rounded-full flex items-center justify-center text-white hover:bg-white/30 hover:scale-110 transition-all duration-300 border border-white/30 shadow-xl"
          >
            <ChevronLeft className="w-5 h-5 sm:w-7 sm:h-7" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-2 sm:right-6 top-1/2 transform -translate-y-1/2 w-10 h-10 sm:w-14 sm:h-14 bg-gradient-to-r from-white/20 to-white/10 backdrop-blur-xl rounded-full flex items-center justify-center text-white hover:bg-white/30 hover:scale-110 transition-all duration-300 border border-white/30 shadow-xl"
          >
            <ChevronRight className="w-5 h-5 sm:w-7 sm:h-7" />
          </button>
        </div>
      </section>

             {/* Stats Section */}
       <section id="stats" className="py-16 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                     <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
             {stats.map((stat, index) => (
               <div 
                 key={index} 
                 className={`text-center group transition-all duration-1000 ${
                   animatedSections.has('stats') 
                     ? 'opacity-100 translate-y-0' 
                     : 'opacity-0 translate-y-10'
                 }`}
                 style={{ transitionDelay: `${index * 200}ms` }}
               >
                <div className="w-16 h-16 bg-gradient-to-r from-primary-100 to-teal-100 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <div className="text-primary-600">
                    {stat.icon}
                  </div>
                </div>
                <div className="text-3xl md:text-4xl font-bold text-primary-600 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                     <div className={`text-center mb-16 transition-all duration-1000 ${
             animatedSections.has('features') 
               ? 'opacity-100 translate-y-0' 
               : 'opacity-0 translate-y-10'
           }`}>
             <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
               Everything You Need to Succeed
             </h2>
             <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
               Powerful features designed specifically for car import/export businesses. 
               From inventory management to global operations, we've got you covered.
             </p>
           </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                         {features.map((feature, index) => (
               <div 
                 key={index}
                 className={`bg-white rounded-2xl p-8 shadow-soft hover:shadow-medium transition-all duration-1000 border border-gray-100 group hover:-translate-y-2 ${
                   animatedSections.has('features') 
                     ? 'opacity-100 translate-y-0' 
                     : 'opacity-0 translate-y-10'
                 }`}
                 style={{ transitionDelay: `${index * 150}ms` }}
               >
                <div className="w-16 h-16 bg-gradient-to-r from-primary-100 to-teal-100 rounded-2xl flex items-center justify-center text-primary-600 mb-6 group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {feature.description}
                </p>
                <ul className="space-y-2">
                  {feature.benefits.map((benefit, idx) => (
                    <li key={idx} className="flex items-center text-sm text-gray-600">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

             {/* How It Works Section */}
       <section id="how-it-works" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                     <div className={`text-center mb-16 transition-all duration-1000 ${
             animatedSections.has('how-it-works') 
               ? 'opacity-100 translate-y-0' 
               : 'opacity-0 translate-y-10'
           }`}>
             <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
               How AutoPort Manager Works
             </h2>
             <p className="text-xl text-gray-600 max-w-3xl mx-auto">
               Get started in minutes with our simple 3-step process
             </p>
           </div>
                     <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
             {[
               {
                 number: "1",
                 title: "Sign Up & Import",
                 description: "Create your account and import your existing car inventory with our easy-to-use tools."
               },
               {
                 number: "2", 
                 title: "Configure & Customize",
                 description: "Set up your workflows, customize dashboards, and integrate with your existing systems."
               },
               {
                 number: "3",
                 title: "Start Managing", 
                 description: "Begin managing your inventory, tracking shipments, and optimizing your operations."
               }
             ].map((step, index) => (
               <div 
                 key={index}
                 className={`text-center transition-all duration-1000 ${
                   animatedSections.has('how-it-works') 
                     ? 'opacity-100 translate-y-0' 
                     : 'opacity-0 translate-y-10'
                 }`}
                 style={{ transitionDelay: `${index * 300}ms` }}
               >
                 <div className="w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
                   <span className="text-2xl font-bold text-primary-600">{step.number}</span>
                 </div>
                 <h3 className="text-xl font-semibold text-gray-900 mb-4">{step.title}</h3>
                 <p className="text-gray-600">{step.description}</p>
               </div>
             ))}
           </div>
        </div>
      </section>


      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                     <div className={`text-center mb-16 transition-all duration-1000 ${
             animatedSections.has('testimonials') 
               ? 'opacity-100 translate-y-0' 
               : 'opacity-0 translate-y-10'
           }`}>
             <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
               Trusted by Industry Leaders
             </h2>
             <p className="text-xl text-gray-600 max-w-3xl mx-auto">
               See what our clients say about AutoPort Manager
             </p>
           </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                         {testimonials.map((testimonial, index) => (
               <div 
                 key={index} 
                 className={`bg-gray-50 rounded-2xl p-8 border border-gray-200 hover:shadow-medium transition-all duration-1000 ${
                   animatedSections.has('testimonials') 
                     ? 'opacity-100 translate-y-0' 
                     : 'opacity-0 translate-y-10'
                 }`}
                 style={{ transitionDelay: `${index * 200}ms` }}
               >
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 mb-6 italic leading-relaxed">
                  "{testimonial.content}"
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-primary-600 to-teal-600 rounded-full flex items-center justify-center text-white font-semibold mr-4">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-gray-600">{testimonial.role}</div>
                    <div className="text-sm text-primary-600 font-medium">{testimonial.company}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                     <div className={`text-center mb-16 transition-all duration-1000 ${
             animatedSections.has('contact') 
               ? 'opacity-100 translate-y-0' 
               : 'opacity-0 translate-y-10'
           }`}>
             <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
               Get in Touch
             </h2>
             <p className="text-xl text-gray-600 max-w-3xl mx-auto">
               Have questions? We're here to help you succeed.
             </p>
           </div>
                     <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
             {contactInfo.map((contact, index) => (
               <div 
                 key={index} 
                 className={`text-center transition-all duration-1000 ${
                   animatedSections.has('contact') 
                     ? 'opacity-100 translate-y-0' 
                     : 'opacity-0 translate-y-10'
                 }`}
                 style={{ transitionDelay: `${index * 200}ms` }}
               >
                <div className="w-16 h-16 bg-primary-100 rounded-2xl flex items-center justify-center text-primary-600 mx-auto mb-6">
                  {contact.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{contact.title}</h3>
                <p className="text-lg text-primary-600 font-medium mb-2">{contact.details}</p>
                <p className="text-gray-600">{contact.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

             {/* Footer */}
       <footer className="bg-gray-900 text-white py-8">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="flex flex-col md:flex-row justify-between items-center">
             {/* Company Info */}
             <div className="flex items-center space-x-3 mb-4 md:mb-0">
               <div className="w-8 h-8 bg-gradient-to-r from-primary-600 to-teal-600 rounded-lg flex items-center justify-center">
                 <Car className="w-5 h-5 text-white" />
               </div>
               <span className="text-lg font-bold">AutoPort Manager</span>
             </div>
             
             {/* Quick Links */}
             <div className="flex items-center space-x-6 text-sm text-gray-400">
               <a href="#features" className="hover:text-white transition-colors">Features</a>
               <a href="#contact" className="hover:text-white transition-colors">Contact</a>
               <button 
                 onClick={() => navigate('/login')}
                 className="hover:text-white transition-colors"
               >
                 Get Started
               </button>
             </div>
           </div>
           
           {/* Copyright */}
           <div className="border-t border-gray-800 pt-4 mt-4 flex flex-col md:flex-row justify-between items-center">
             <p className="text-gray-400 text-xs">&copy; 2024 AutoPort Manager. All rights reserved.</p>
             <div className="flex space-x-4 mt-2 md:mt-0 text-xs">
               <a href="/privacy" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a>
               <a href="/terms" className="text-gray-400 hover:text-white transition-colors">Terms of Service</a>
             </div>
           </div>
         </div>
       </footer>
    </div>
  );
};

export default LandingPage; 