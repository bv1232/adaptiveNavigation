import React from 'react';
import { useDeviceContext } from '../hooks/useDeviceContext';
import { Mail, Phone, MapPin } from 'lucide-react';

export function Contact() {
  const deviceType = useDeviceContext();

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

      <div className="grid gap-8 md:grid-cols-2">
        <div className="space-y-6">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
            <h2 className={`${deviceType === 'smartwatch' ? 'text-lg' : 'text-2xl'} font-semibold mb-4`}>
              Contact Information
            </h2>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Mail className="text-blue-600 dark:text-blue-400" size={20} />
                <span className={`${deviceType === 'smartwatch' ? 'text-xs' : 'text-base'}`}>
                  contact@example.com
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="text-blue-600 dark:text-blue-400" size={20} />
                <span className={`${deviceType === 'smartwatch' ? 'text-xs' : 'text-base'}`}>
                  +1 (555) 123-4567
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="text-blue-600 dark:text-blue-400" size={20} />
                <span className={`${deviceType === 'smartwatch' ? 'text-xs' : 'text-base'}`}>
                  123 Tech Street, Silicon Valley, CA
                </span>
              </div>
            </div>
          </div>
        </div>

        <form className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm space-y-4">
          <div>
            <label className={`block ${deviceType === 'smartwatch' ? 'text-sm' : 'text-base'} font-medium mb-1`}>
              Name
            </label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-transparent"
              placeholder="Your name"
            />
          </div>
          <div>
            <label className={`block ${deviceType === 'smartwatch' ? 'text-sm' : 'text-base'} font-medium mb-1`}>
              Email
            </label>
            <input
              type="email"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-transparent"
              placeholder="your@email.com"
            />
          </div>
          <div>
            <label className={`block ${deviceType === 'smartwatch' ? 'text-sm' : 'text-base'} font-medium mb-1`}>
              Message
            </label>
            <textarea
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-transparent"
              rows={4}
              placeholder="Your message"
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
}