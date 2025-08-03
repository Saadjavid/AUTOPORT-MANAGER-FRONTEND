import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Car, ArrowLeft, FileText, CheckCircle, AlertTriangle, Scale, Clock, Users } from 'lucide-react';

const TermsOfService = () => {
  const navigate = useNavigate();

  const sections = [
    {
      icon: <FileText className="w-6 h-6" />,
      title: "Acceptance of Terms",
      content: [
        "By accessing and using AutoPort Manager, you accept and agree to be bound by these terms",
        "These terms apply to all users of the service, including without limitation users who are browsers, vendors, customers, merchants, and/or contributors of content",
        "If you do not agree to these terms, you should not use our service",
        "We reserve the right to update, change or replace any part of these terms by posting updates and/or changes to our website"
      ]
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "User Accounts",
      content: [
        "You must be at least 18 years old to create an account",
        "You are responsible for maintaining the confidentiality of your account credentials",
        "You agree to accept responsibility for all activities that occur under your account",
        "You must notify us immediately of any unauthorized use of your account",
        "We reserve the right to terminate accounts that violate these terms"
      ]
    },
    {
      icon: <CheckCircle className="w-6 h-6" />,
      title: "Permitted Use",
      content: [
        "Use the service for lawful business purposes only",
        "Comply with all applicable laws and regulations",
        "Maintain accurate and up-to-date information",
        "Respect intellectual property rights",
        "Use the service in accordance with our guidelines"
      ]
    },
    {
      icon: <AlertTriangle className="w-6 h-6" />,
      title: "Prohibited Activities",
      content: [
        "Violating any applicable laws or regulations",
        "Attempting to gain unauthorized access to our systems",
        "Interfering with the service or other users",
        "Uploading malicious code or content",
        "Using the service for illegal or fraudulent activities",
        "Sharing account credentials with unauthorized users"
      ]
    },
    {
      icon: <Scale className="w-6 h-6" />,
      title: "Intellectual Property",
      content: [
        "All content and materials on AutoPort Manager are owned by us",
        "You retain ownership of your business data and content",
        "You grant us a license to use your content to provide the service",
        "You may not copy, modify, or distribute our proprietary materials",
        "Trademarks and service marks are protected by law"
      ]
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Service Availability",
      content: [
        "We strive to maintain 99.9% uptime but cannot guarantee uninterrupted service",
        "Scheduled maintenance will be announced in advance",
        "We are not liable for service interruptions or data loss",
        "You should maintain regular backups of your data",
        "Service may be temporarily unavailable due to technical issues"
      ]
    },
    {
      icon: <AlertTriangle className="w-6 h-6" />,
      title: "Limitation of Liability",
      content: [
        "We provide the service 'as is' without warranties",
        "We are not liable for indirect, incidental, or consequential damages",
        "Our total liability is limited to the amount you paid for the service",
        "You use the service at your own risk",
        "We are not responsible for third-party services or integrations"
      ]
    },
    {
      icon: <FileText className="w-6 h-6" />,
      title: "Termination",
      content: [
        "You may cancel your account at any time",
        "We may terminate accounts that violate these terms",
        "Upon termination, your access to the service will cease",
        "We may retain your data for legal or regulatory purposes",
        "Refunds are subject to our refund policy"
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
            <FileText className="w-8 h-8 text-primary-600" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Terms of Service
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Please read these terms carefully before using AutoPort Manager. By using our service, you agree to these terms.
          </p>
          <div className="mt-6 text-sm text-gray-500">
            Last updated: {new Date().toLocaleDateString()}
          </div>
        </div>

        {/* Terms Sections */}
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

        {/* Contact Section */}
        <div className="mt-12 bg-gradient-to-r from-primary-50 to-teal-50 rounded-2xl p-8 border border-primary-100">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Questions About These Terms?</h3>
          <p className="text-gray-700 mb-6">
            If you have any questions about these Terms of Service, please contact us. 
            We're here to help clarify any concerns you may have.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => navigate('/contact')}
              className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-semibold"
            >
              Contact Us
            </button>
            <button
              onClick={() => navigate('/privacy')}
              className="px-6 py-3 border-2 border-primary-600 text-primary-600 rounded-lg hover:bg-primary-50 transition-colors font-semibold"
            >
              Privacy Policy
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService; 