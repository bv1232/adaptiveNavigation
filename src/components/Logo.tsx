import { useDeviceContext } from '../hooks/useDeviceContext';

export function Logo() {
  const { deviceType, capabilities } = useDeviceContext();

  const getLogoSize = () => {
    switch (deviceType) {
      case 'smartwatch':
        return 'w-6 h-6';
      case 'mobile':
        return 'w-8 h-8';
      case 'tablet':
        return 'w-10 h-10';
      default:
        return 'w-12 h-12';
    }
  };

  const getTextSize = () => {
    switch (deviceType) {
      case 'smartwatch':
        return 'hidden';
      case 'mobile':
        return 'text-lg';
      case 'tablet':
        return 'text-xl';
      default:
        return 'text-2xl';
    }
  };

  return (
    <div className="flex items-center space-x-2">
      <div className={`${getLogoSize()} bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 rounded-lg flex items-center justify-center`}>
        <svg
          className="w-1/2 h-1/2 text-white"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 2L2 7L12 12L22 7L12 2Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M2 17L12 22L22 17"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M2 12L12 17L22 12"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <span className={`${getTextSize()} font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent`}>
        AdaptiveNav
      </span>
    </div>
  );
} 