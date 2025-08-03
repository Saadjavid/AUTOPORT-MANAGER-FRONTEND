import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Car, ArrowLeft, Shield, Lock, Eye, Database, Users, FileText } from 'lucide-react';

const PrivacyPolicy = () => {
  const navigate = useNavigate();

  const sections = [
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Information We Collect",
      content: [
        "Personal information (name, email, phone number)",
        "Business information (company name, address)",
        "Usage data and analytics",
        "Device and browser information",
        "Cookies and tracking technologies"
      ]
    },
    {
      icon: <Database className="w-6 h-6" />,
      title: "How We Use Your Information",
      content: [
        "Provide and maintain our services",
        "Process transactions and payments",
        "Send notifications and updates",
        "Improve our platform and user experience",
        "Comply with legal obligations"
      ]
    },
    {
      icon: <Lock className="w-6 h-6" />,
      title: "Data Security",
      content: [
        "Encryption of sensitive data",
        "Regular security audits",
        "Access controls and authentication",
        "Secure data transmission (HTTPS)",
        "Backup and disaster recovery"
      ]
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Data Sharing",
      content: [
        "We do not sell your personal information",
        "Limited sharing with service providers",
        "Legal compliance requirements",
        "Business transfers and mergers",
        "With your explicit consent"
      ]
    },
    {
      icon: <Eye className="w-6 h-6" />,
      title: "Your Rights",
      content: [
        "Access your personal data",
        "Request data correction",
        "Delete your account",
        "Opt-out of communications",
        "Data portability"
      ]
    },
    {
      icon: <FileText className="w-6 h-6" />,
      title: "Contact Information",
      content: [
        "Email: privacy@autoportmanager.com",
        "Phone: +923420794632",
        "Address: Blue Area, Islamabad, Pakistan",
        "Response time: Within 48 hours"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <button
                onClick={() => navigate('/')}
                className="p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div className="w-8 h-8 bg-gradient-to-r from-primary-600 to-teal-600 rounded-lg flex items-center justify-center">
                <Car className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">AutoPort Manager</span>
            </div>
            <button
              onClick={() => navigate('/login')}
              className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors text-sm font-semibold"
            >
              Get Started
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="w-16 h-16 bg-gradient-to-r from-primary-100 to-teal-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Shield className="w-8 h-8 text-primary-600" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Privacy Policy
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Your privacy is important to us. This policy explains how we collect, use, and protect your information.
          </p>
          <div className="mt-6 text-sm text-gray-500">
            Last updated: {new Date().toLocaleDateString()}
          </div>
        </div>

        {/* Policy Sections */}
        <div className="space-y-8">
          {sections.map((section, index) => (
            <div key={index} className="bg-white rounded-2xl p-8 shadow-soft border border-gray-100">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-primary-100 to-teal-100 rounded-xl flex items-center justify-center">
                  {section.icon}
                </div>
                <h2 className="text-2xl font-bold text-gray-900">{section.title}</h2>
              </div>
              <ul className="space-y-3">
                {section.content.map((item, idx) => (
                  <li key={idx} className="flex items-start space-x-3 text-gray-700">
                    <div className="w-2 h-2 bg-primary-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Additional Information */}
        <div className="mt-12 bg-gradient-to-r from-primary-50 to-teal-50 rounded-2xl p-8 border border-primary-100">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Questions About Privacy?</h3>
          <p className="text-gray-700 mb-6">
            If you have any questions about this Privacy Policy or our data practices, 
            please don't hesitate to contact us. We're committed to transparency and 
            protecting your privacy.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => navigate('/contact')}
              className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-semibold"
            >
              Contact Us
            </button>
            <button
              onClick={() => navigate('/terms')}
              className="px-6 py-3 border-2 border-primary-600 text-primary-600 rounded-lg hover:bg-primary-50 transition-colors font-semibold"
            >
              View Terms of Service
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy; 