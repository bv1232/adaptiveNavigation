import { useState, useEffect } from 'react';

type DeviceType = 'desktop' | 'tablet' | 'mobile' | 'smartwatch';

interface DeviceCapabilities {
  hasTouch: boolean;
  hasMouse: boolean;
  hasKeyboard: boolean;
  hasHover: boolean;
  screenSize: {
    width: number;
    height: number;
  };
  pixelRatio: number;
  isLandscape: boolean;
}

export function useDeviceContext() {
  const [deviceType, setDeviceType] = useState<DeviceType>('desktop');
  const [capabilities, setCapabilities] = useState<DeviceCapabilities>({
    hasTouch: false,
    hasMouse: false,
    hasKeyboard: false,
    hasHover: false,
    screenSize: { width: 0, height: 0 },
    pixelRatio: 1,
    isLandscape: false,
  });

  useEffect(() => {
    const updateDeviceType = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const pixelRatio = window.devicePixelRatio;
      const isLandscape = width > height;
      
      // Check for touch capabilities
      const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      
      // Check for mouse capabilities
      const hasMouse = window.matchMedia('(pointer: fine)').matches;
      
      // Check for hover capabilities
      const hasHover = window.matchMedia('(hover: hover)').matches;
      
      // Check for keyboard capabilities
      const hasKeyboard = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

      setCapabilities({
        hasTouch,
        hasMouse,
        hasKeyboard,
        hasHover,
        screenSize: { width, height },
        pixelRatio,
        isLandscape,
      });

      // Determine device type based on multiple factors
      if (width <= 280 || (width <= 320 && hasTouch && !hasMouse)) {
        setDeviceType('smartwatch');
      } else if (
        (width <= 640 && hasTouch) || 
        (width <= 768 && hasTouch && !hasMouse) ||
        (width <= 640 && !hasHover)
      ) {
        setDeviceType('mobile');
      } else if (
        (width <= 1024 && hasTouch) ||
        (width <= 1024 && !hasMouse) ||
        (width <= 1024 && !hasHover)
      ) {
        setDeviceType('tablet');
      } else {
        setDeviceType('desktop');
      }
    };

    updateDeviceType();
    window.addEventListener('resize', updateDeviceType);
    window.addEventListener('orientationchange', updateDeviceType);

    return () => {
      window.removeEventListener('resize', updateDeviceType);
      window.removeEventListener('orientationchange', updateDeviceType);
    };
  }, []);

  return { deviceType, capabilities };
}