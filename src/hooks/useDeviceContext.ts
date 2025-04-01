import { useState, useEffect } from 'react';

type DeviceType = 'desktop' | 'tablet' | 'mobile' | 'smartwatch';

export function useDeviceContext() {
  const [deviceType, setDeviceType] = useState<DeviceType>('desktop');

  useEffect(() => {
    const updateDeviceType = () => {
      const width = window.innerWidth;
      if (width <= 280) {
        setDeviceType('smartwatch');
      } else if (width <= 640) {
        setDeviceType('mobile');
      } else if (width <= 768) {
        setDeviceType('tablet');
      } else {
        setDeviceType('desktop');
      }
    };

    updateDeviceType();
    window.addEventListener('resize', updateDeviceType);
    return () => window.removeEventListener('resize', updateDeviceType);
  }, []);

  return deviceType;
}