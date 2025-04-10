import { useDeviceContext } from '../hooks/useDeviceContext';
import { MessageSquare, Mail, Phone, MapPin, Clock } from 'lucide-react';

export function Contact() {
  const { deviceType } = useDeviceContext();

  const handleContactAction = (action: string) => {
    switch (action) {
      case 'email':
        window.location.href = 'mailto:contact@adaptivenav.com';
        break;
      case 'phone':
        window.location.href = 'tel:+15551234567';
        break;
      case 'map':
        window.open('https://maps.google.com?q=123+Main+St,+San+Francisco,+CA', '_blank');
        break;
      default:
        break;
    }
  };

  const getButtonSize = () => {
    switch (deviceType) {
      case 'smartwatch':
        return 'p-2';
      case 'mobile':
        return 'p-3';
      case 'tablet':
        return 'p-4';
      default:
        return 'p-4';
    }
  };

  const getTextSize = () => {
    switch (deviceType) {
      case 'smartwatch':
        return 'text-xs';
      case 'mobile':
        return 'text-sm';
      case 'tablet':
        return 'text-base';
      default:
        return 'text-base';
    }
  };

  const getIconSize = () => {
    switch (deviceType) {
      case 'smartwatch':
        return 16;
      case 'mobile':
        return 20;
      case 'tablet':
        return 24;
      default:
        return 24;
    }
  };

  return (
    <div className="space-y-8">
      <section className="text-center">
        <h1 className={`${deviceType === 'smartwatch' ? 'text-xl' : 'text-4xl'} font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent`}>
          Contact Us
        </h1>
        <p className={`${deviceType === 'smartwatch' ? 'text-xs' : 'text-lg'} text-gray-600 dark:text-gray-400 max-w-2xl mx-auto`}>
          Get in touch with our team for any questions or support.
        </p>
      </section>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
          <h2 className={`${deviceType === 'smartwatch' ? 'text-lg' : 'text-2xl'} font-semibold mb-4`}>
            Contact Information
          </h2>
          <div className="space-y-4">
            <button
              onClick={() => handleContactAction('email')}
              className={`flex items-center space-x-3 w-full ${getButtonSize()} rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors`}
            >
              <Mail size={getIconSize()} className="text-blue-600 dark:text-blue-400" />
              <span className={`${getTextSize()} text-gray-600 dark:text-gray-400`}>
                contact@adaptivenav.com
              </span>
            </button>
            <button
              onClick={() => handleContactAction('phone')}
              className={`flex items-center space-x-3 w-full ${getButtonSize()} rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors`}
            >
              <Phone size={getIconSize()} className="text-blue-600 dark:text-blue-400" />
              <span className={`${getTextSize()} text-gray-600 dark:text-gray-400`}>
                +1 (555) 123-4567
              </span>
            </button>
            <button
              onClick={() => handleContactAction('map')}
              className={`flex items-center space-x-3 w-full ${getButtonSize()} rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors`}
            >
              <MapPin size={getIconSize()} className="text-blue-600 dark:text-blue-400" />
              <span className={`${getTextSize()} text-gray-600 dark:text-gray-400`}>
                123 Main St, San Francisco, CA
              </span>
            </button>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
          <h2 className={`${deviceType === 'smartwatch' ? 'text-lg' : 'text-2xl'} font-semibold mb-4`}>
            Business Hours
          </h2>
          <div className="space-y-4">
            <div className={`flex items-center space-x-3 ${getButtonSize()}`}>
              <Clock size={getIconSize()} className="text-blue-600 dark:text-blue-400" />
              <div>
                <p className={`${getTextSize()} text-gray-600 dark:text-gray-400`}>
                  Monday - Friday: 9:00 AM - 6:00 PM
                </p>
                <p className={`${getTextSize()} text-gray-600 dark:text-gray-400`}>
                  Saturday - Sunday: Closed
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}