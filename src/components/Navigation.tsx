import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDeviceContext } from '../hooks/useDeviceContext';
import { useTheme } from '../context/ThemeContext';
import { Menu, X, Sun, Moon, ChevronDown, Minus, Plus, ChevronRight } from 'lucide-react';

interface NavItem {
  title: string;
  href: string;
  description?: string;
  submenu?: NavItem[];
}

const navItems: NavItem[] = [
  {
    title: 'Home',
    href: '/',
  },
  {
    title: 'Products',
    href: '/products',
    submenu: [
      { 
        title: 'Featured Products',
        href: '/products/featured',
        description: 'Discover our most popular and trending items.'
      },
      { 
        title: 'New Arrivals',
        href: '/products/new',
        description: 'Check out our latest additions to the catalog.'
      },
      { 
        title: 'Best Sellers',
        href: '/products/best-sellers',
        description: 'Shop from our top-rated and most loved items.'
      },
    ],
  },
  {
    title: 'About',
    href: '/about',
    submenu: [
      { 
        title: 'Our Story',
        href: '/about/story',
        description: 'Learn about our journey and mission.'
      },
      { 
        title: 'Team',
        href: '/about/team',
        description: 'Meet the people behind our success.'
      },
      { 
        title: 'Careers',
        href: '/about/careers',
        description: 'Join our team and grow with us.'
      },
    ],
  },
  {
    title: 'Contact',
    href: '/contact',
  },
];

export function Navigation() {
  const deviceType = useDeviceContext();
  const { isDarkMode, toggleDarkMode, fontSize, setFontSize } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleNavigation = (href: string) => {
    navigate(href);
    setIsOpen(false);
    setActiveSubmenu(null);
  };

  const renderDesktopNav = () => (
    <nav className="flex items-center space-x-1">
      {navItems.map((item) => (
        <div key={item.title} className="relative group">
          <button
            className={`flex items-center justify-between px-4 py-2 text-sm rounded-md transition-colors hover:bg-gray-100 dark:hover:bg-gray-800 ${
              activeSubmenu === item.title ? 'bg-gray-100 dark:bg-gray-800' : ''
            }`}
            onClick={() => item.submenu ? setActiveSubmenu(activeSubmenu === item.title ? null : item.title) : handleNavigation(item.href)}
          >
            <span>{item.title}</span>
            {item.submenu && (
              <ChevronDown
                size={16}
                className={`ml-2 transition-transform duration-200 ${
                  activeSubmenu === item.title ? 'rotate-180' : ''
                }`}
              />
            )}
          </button>
          {item.submenu && (
            <div 
              className={`absolute top-full left-0 w-[275px] p-2 mt-2 bg-white dark:bg-gray-900 rounded-lg shadow-lg border border-gray-200 dark:border-gray-800 transition-opacity duration-150 ${
                activeSubmenu === item.title ? 'opacity-100 visible' : 'opacity-0 invisible'
              }`}
            >
              <div className="grid gap-1">
                {item.submenu.map((subItem) => (
                  <button
                    key={subItem.title}
                    onClick={() => handleNavigation(subItem.href)}
                    className="flex flex-col gap-1 p-3 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors w-full text-left"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{subItem.title}</span>
                      <ChevronRight size={16} className="text-gray-400" />
                    </div>
                    {subItem.description && (
                      <span className="text-sm text-gray-500 dark:text-gray-400 line-clamp-1">
                        {subItem.description}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      ))}
    </nav>
  );

  const renderMobileNav = () => (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors"
        aria-label="Toggle menu"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>
      {isOpen && (
        <div className="fixed inset-x-4 top-16 bg-white dark:bg-gray-900 rounded-lg shadow-lg py-2 mt-2 max-h-[calc(100vh-5rem)] overflow-y-auto z-50 border border-gray-200 dark:border-gray-800">
          {navItems.map((item) => (
            <div key={item.title}>
              <button
                className={`w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors flex items-center justify-between ${
                  activeSubmenu === item.title ? 'bg-gray-100 dark:bg-gray-800' : ''
                }`}
                onClick={() => item.submenu ? setActiveSubmenu(activeSubmenu === item.title ? null : item.title) : handleNavigation(item.href)}
              >
                <span>{item.title}</span>
                {item.submenu && (
                  <ChevronDown
                    size={16}
                    className={`transform transition-transform duration-200 ${
                      activeSubmenu === item.title ? 'rotate-180' : ''
                    }`}
                  />
                )}
              </button>
              {item.submenu && activeSubmenu === item.title && (
                <div className="px-2 py-1 space-y-1">
                  {item.submenu.map((subItem) => (
                    <button
                      key={subItem.title}
                      onClick={() => handleNavigation(subItem.href)}
                      className="w-full text-left block p-3 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                    >
                      <div className="font-medium">{subItem.title}</div>
                      {subItem.description && (
                        <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                          {subItem.description}
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );

  const renderSmartwatchNav = () => (
    <div className="flex items-center justify-between w-full">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors"
        aria-label="Toggle menu"
      >
        {isOpen ? <X size={16} /> : <Menu size={16} />}
      </button>
      <button
        onClick={toggleDarkMode}
        className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors"
        aria-label="Toggle dark mode"
      >
        {isDarkMode ? <Sun size={16} /> : <Moon size={16} />}
      </button>
      {isOpen && (
        <div className="fixed inset-x-1 top-10 bg-white dark:bg-gray-900 rounded-lg shadow-lg py-1 mt-1 max-h-[calc(100vh-3rem)] overflow-y-auto z-50 border border-gray-200 dark:border-gray-800">
          {navItems.map((item) => (
            <button
              key={item.title}
              onClick={() => handleNavigation(item.href)}
              className="w-full text-left block px-3 py-1.5 text-xs hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              {item.title}
            </button>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <header className="fixed w-full top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm shadow-sm">
      <div className={`max-w-7xl mx-auto px-2 ${deviceType === 'smartwatch' ? 'py-1.5' : 'px-4 py-4'}`}>
        <div className="flex items-center justify-between">
          <Link to="/" className={`font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent ${deviceType === 'smartwatch' ? 'text-base' : 'text-2xl'}`}>
            Logo
          </Link>

          {deviceType === 'desktop' && renderDesktopNav()}
          {(deviceType === 'mobile' || deviceType === 'tablet') && renderMobileNav()}
          {deviceType === 'smartwatch' && renderSmartwatchNav()}

          {deviceType !== 'smartwatch' && (
            <div className="flex items-center space-x-2">
              <button
                onClick={toggleDarkMode}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors"
                aria-label="Toggle dark mode"
              >
                {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
              </button>
              <div className="flex items-center border border-gray-200 dark:border-gray-700 rounded-md">
                <button
                  onClick={() => setFontSize(Math.max(12, fontSize - 1))}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-l-md transition-colors"
                  aria-label="Decrease font size"
                >
                  <Minus size={16} />
                </button>
                <button
                  onClick={() => setFontSize(Math.min(24, fontSize + 1))}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-r-md transition-colors"
                  aria-label="Increase font size"
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}