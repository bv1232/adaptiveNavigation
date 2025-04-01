import React from 'react';
import { useDeviceContext } from '../hooks/useDeviceContext';

export function Home() {
  const deviceType = useDeviceContext();

  return (
    <div className="space-y-8">
      <section className="text-center">
        <h1 className={`${deviceType === 'smartwatch' ? 'text-xl' : 'text-4xl'} font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent`}>
          Welcome to Adaptive Navigation
        </h1>
        <p className={`${deviceType === 'smartwatch' ? 'text-sm' : 'text-lg'} text-gray-600 dark:text-gray-400 max-w-2xl mx-auto`}>
          Experience seamless navigation across all your devices with our adaptive interface design.
        </p>
      </section>

      <section className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
          <h2 className={`${deviceType === 'smartwatch' ? 'text-lg' : 'text-2xl'} font-semibold mb-4`}>
            Responsive Design
          </h2>
          <p className={`${deviceType === 'smartwatch' ? 'text-xs' : 'text-base'} text-gray-600 dark:text-gray-400`}>
            Automatically adapts to any screen size, from smartwatches to desktop monitors.
          </p>
        </div>
        
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
          <h2 className={`${deviceType === 'smartwatch' ? 'text-lg' : 'text-2xl'} font-semibold mb-4`}>
            Accessibility
          </h2>
          <p className={`${deviceType === 'smartwatch' ? 'text-xs' : 'text-base'} text-gray-600 dark:text-gray-400`}>
            Built with accessibility in mind, including dark mode and adjustable font sizes.
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
          <h2 className={`${deviceType === 'smartwatch' ? 'text-lg' : 'text-2xl'} font-semibold mb-4`}>
            Smart Navigation
          </h2>
          <p className={`${deviceType === 'smartwatch' ? 'text-xs' : 'text-base'} text-gray-600 dark:text-gray-400`}>
            Context-aware menus that provide the best navigation experience for each device.
          </p>
        </div>
      </section>
    </div>
  );
}