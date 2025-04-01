import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navigation } from './components/Navigation';
import { useDeviceContext } from './hooks/useDeviceContext';
import { Home } from './pages/Home';
import { Products } from './pages/Products';
import { About } from './pages/About';
import { Contact } from './pages/Contact';
import { ThemeProvider } from './context/ThemeContext';

function App() {
  const deviceType = useDeviceContext();

  const getLayoutClasses = () => {
    switch (deviceType) {
      case 'smartwatch':
        return 'mt-12 px-1 py-2';
      case 'mobile':
        return 'mt-16 px-4 py-6';
      case 'tablet':
        return 'mt-20 px-6 py-8';
      default:
        return 'mt-20 px-8 py-10';
    }
  };

  return (
    <Router>
      <ThemeProvider>
        <div className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100">
          <Navigation />
          <main className={`max-w-7xl mx-auto ${getLayoutClasses()}`}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/products/*" element={<Products />} />
              <Route path="/about/*" element={<About />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </Router>
  );
}

export default App;