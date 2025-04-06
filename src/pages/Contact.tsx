import React from 'react';
import { useDeviceContext } from '../hooks/useDeviceContext';
import { Mail, Phone, MapPin, MessageSquare } from 'lucide-react';

export function Contact() {
  const deviceType = useDeviceContext();

  const handleContactAction = (type: 'phone' | 'email' | 'map') => {
    switch (type) {
      case 'phone':
        window.location.href = 'tel:+15551234567';
        break;
      case 'email':
        window.location.href = 'mailto:contact@example.com';
        break;
      case 'map':
        window.open('https://maps.google.com/?q=123+Tech+Street,+Silicon+Valley,+CA', '_blank');
        break;
    }
  };

  const getIconSize = () => {
    switch (deviceType) {
      case 'smartwatch':
        return 16;
      case 'mobile':
        return 20;
      default:
        return 24;
    }
  };

  const getTextSize = () => {
    switch (deviceType) {
      case 'smartwatch':
        return 'text-xs';
      case 'mobile':
        return 'text-sm';
      default:
        return 'text-base';
    }
  };

  const getButtonSize = () => {
    switch (deviceType) {
      case 'smartwatch':
        return 'p-2 text-xs';
      case 'mobile':
        return 'p-3 text-sm';
      default:
        return 'p-4 text-base';
    }
  };

  return (
    <div className="space-y-8">
      <section className="text-center">
        <h1 className={`${deviceType === 'smartwatch' ? 'text-xl' : 'text-4xl'} font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent`}>
          Contact Us
        </h1>
        <p className={`${deviceType === 'smartwatch' ? 'text-sm' : 'text-lg'} text-gray-600 dark:text-gray-400 max-w-2xl mx-auto`}>
          Get in touch with us. We'd love to hear from you.
        </p>
      </section>

      <div className={`grid gap-8 ${deviceType === 'smartwatch' ? 'grid-cols-1' : 'md:grid-cols-2'}`}>
        <div className="space-y-6">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
            <h2 className={`${deviceType === 'smartwatch' ? 'text-lg' : 'text-2xl'} font-semibold mb-4`}>
              Contact Information
            </h2>
            <div className="space-y-4">
              <button
                onClick={() => handleContactAction('email')}
                className={`flex items-center space-x-3 w-full p-3 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${getTextSize()}`}
              >
                <Mail className="text-blue-600 dark:text-blue-400" size={getIconSize()} />
                <span>contact@example.com</span>
              </button>
              <button
                onClick={() => handleContactAction('phone')}
                className={`flex items-center space-x-3 w-full p-3 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${getTextSize()}`}
              >
                <Phone className="text-blue-600 dark:text-blue-400" size={getIconSize()} />
                <span>+1 (555) 123-4567</span>
              </button>
              <button
                onClick={() => handleContactAction('map')}
                className={`flex items-center space-x-3 w-full p-3 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${getTextSize()}`}
              >
                <MapPin className="text-blue-600 dark:text-blue-400" size={getIconSize()} />
                <span>123 Tech Street, Silicon Valley, CA</span>
              </button>
            </div>
          </div>
        </div>

        <form className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm space-y-4">
          <div>
            <label className={`block ${getTextSize()} font-medium mb-1`}>
              Name
            </label>
            <input
              type="text"
              className={`w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-transparent ${getTextSize()}`}
              placeholder="Your name"
            />
          </div>
          <div>
            <label className={`block ${getTextSize()} font-medium mb-1`}>
              Email
            </label>
            <input
              type="email"
              className={`w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-transparent ${getTextSize()}`}
              placeholder="your@email.com"
            />
          </div>
          <div>
            <label className={`block ${getTextSize()} font-medium mb-1`}>
              Message
            </label>
            <textarea
              className={`w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-transparent ${getTextSize()}`}
              rows={deviceType === 'smartwatch' ? 2 : 4}
              placeholder="Your message"
            ></textarea>
          </div>
          <div className="flex items-center space-x-2">
            <button
              type="submit"
              className={`bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors ${getButtonSize()}`}
            >
              Send Message
            </button>
            <button
              type="button"
              onClick={() => handleContactAction('phone')}
              className={`bg-green-600 hover:bg-green-700 text-white rounded-md transition-colors ${getButtonSize()} flex items-center space-x-2`}
            >
              <Phone size={getIconSize()} />
              <span>Call Now</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}