import React from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { ChevronLeft, Star, ShoppingCart, Heart, TrendingUp, Clock, Award } from 'lucide-react';
import { useDeviceContext } from '../hooks/useDeviceContext';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  types: string[];
  rating: number;
  reviews: number;
  isNew?: boolean;
  isFeatured?: boolean;
  isBestSeller?: boolean;
  features?: string[];
  specifications?: Record<string, string>;
  stock: number;
  brand: string;
  colors?: string[];
  sizes?: string[];
}

const products: Product[] = [
  {
    id: '1',
    name: 'Premium Laptop',
    description: 'High-performance laptop with stunning display and long battery life.',
    price: 1299.99,
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=800&q=80',
    types: ['Electronics', 'Computers', 'Featured'],
    rating: 4.8,
    reviews: 156,
    isFeatured: true,
    stock: 15,
    brand: 'TechPro',
    features: ['16GB RAM', '1TB SSD', '4K Display', '12-hour battery'],
    specifications: {
      'Processor': 'Intel Core i7',
      'Graphics': 'NVIDIA RTX 3060',
      'Weight': '1.8 kg',
      'OS': 'Windows 11 Pro'
    },
    colors: ['Space Gray', 'Silver', 'Black']
  },
  {
    id: '2',
    name: 'Smartwatch Pro',
    description: 'Advanced smartwatch with health monitoring and fitness tracking.',
    price: 299.99,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80',
    types: ['Electronics', 'Wearables', 'New'],
    rating: 4.6,
    reviews: 89,
    isNew: true,
    stock: 25,
    brand: 'FitTech',
    features: ['Heart rate monitor', 'GPS', 'Water resistant', '7-day battery'],
    specifications: {
      'Display': '1.4" AMOLED',
      'Battery': '300mAh',
      'Water Resistance': '5ATM',
      'Compatibility': 'iOS & Android'
    },
    colors: ['Black', 'White', 'Blue']
  },
  {
    id: '3',
    name: 'Wireless Earbuds',
    description: 'Premium wireless earbuds with active noise cancellation.',
    price: 199.99,
    image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=800&q=80',
    types: ['Electronics', 'Audio', 'Best Seller'],
    rating: 4.7,
    reviews: 234,
    isBestSeller: true,
    stock: 50,
    brand: 'SoundWave',
    features: ['ANC', '24h battery', 'Touch controls', 'IPX4 water resistant'],
    specifications: {
      'Driver': '10mm dynamic',
      'Battery': '60mAh (each)',
      'Charging': 'USB-C & wireless',
      'Bluetooth': '5.2'
    },
    colors: ['Black', 'White']
  },
  {
    id: '4',
    name: 'Smart Home Hub',
    description: 'Central control for all your smart home devices.',
    price: 149.99,
    image: 'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=800&q=80',
    types: ['Electronics', 'Smart Home', 'New'],
    rating: 4.5,
    reviews: 67,
    isNew: true,
    stock: 30,
    brand: 'HomeTech',
    features: ['Voice control', 'Multiple protocols', 'Automation', 'Remote access'],
    specifications: {
      'Connectivity': 'WiFi, Zigbee, Z-Wave',
      'Voice Assistant': 'Built-in',
      'Power': 'USB-C',
      'Compatibility': '1000+ devices'
    },
    colors: ['White', 'Black']
  },
  {
    id: '5',
    name: 'Gaming Monitor',
    description: 'Ultra-fast gaming monitor with HDR support.',
    price: 499.99,
    image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=800&q=80',
    types: ['Electronics', 'Gaming', 'Featured'],
    rating: 4.9,
    reviews: 112,
    isFeatured: true,
    stock: 20,
    brand: 'GameTech',
    features: ['240Hz refresh', '1ms response', 'HDR400', 'G-Sync'],
    specifications: {
      'Size': '27"',
      'Resolution': '2560x1440',
      'Panel': 'IPS',
      'Ports': 'HDMI 2.1, DisplayPort 1.4'
    },
    colors: ['Black']
  },
  {
    id: '6',
    name: 'Fitness Tracker',
    description: 'Advanced fitness tracker with comprehensive health metrics.',
    price: 149.99,
    image: 'https://images.unsplash.com/photo-1510017803434-a899398421b3?auto=format&fit=crop&w=800&q=80',
    types: ['Electronics', 'Wearables', 'Fitness'],
    rating: 4.4,
    reviews: 78,
    stock: 40,
    brand: 'FitTech',
    features: ['Heart rate', 'Sleep tracking', 'GPS', 'Water resistant'],
    specifications: {
      'Battery': '7 days',
      'Display': '1.1" AMOLED',
      'Sensors': 'Heart rate, SpO2, GPS',
      'Water Resistance': '5ATM'
    },
    colors: ['Black', 'Pink', 'Blue']
  },
  {
    id: '7',
    name: 'Mechanical Keyboard',
    description: 'Premium mechanical keyboard with customizable RGB lighting.',
    price: 129.99,
    image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=800&q=80',
    types: ['Electronics', 'Gaming', 'Best Seller'],
    rating: 4.7,
    reviews: 95,
    isBestSeller: true,
    stock: 35,
    brand: 'GameTech',
    features: ['RGB lighting', 'Hot-swappable', 'PBT keycaps', 'USB-C'],
    specifications: {
      'Switch Type': 'Mechanical',
      'Layout': 'TKL',
      'Backlight': 'RGB',
      'Polling Rate': '1000Hz'
    },
    colors: ['Black', 'White']
  },
  {
    id: '8',
    name: 'Smart Speaker',
    description: 'High-quality smart speaker with voice assistant integration.',
    price: 199.99,
    image: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=800&q=80',
    types: ['Electronics', 'Audio', 'Smart Home'],
    rating: 4.6,
    reviews: 143,
    isNew: true,
    stock: 25,
    brand: 'SoundWave',
    features: ['Voice control', '360° sound', 'Multi-room', 'Smart home hub'],
    specifications: {
      'Drivers': '2x 2.5" woofers, 2x tweeters',
      'Connectivity': 'WiFi, Bluetooth',
      'Voice Assistant': 'Built-in',
      'Power': 'AC'
    },
    colors: ['Black', 'White']
  },
  {
    id: '9',
    name: 'Gaming Mouse',
    description: 'Precision gaming mouse with customizable buttons and RGB lighting.',
    price: 79.99,
    image: 'https://images.unsplash.com/photo-1527814050087-3793815479db?auto=format&fit=crop&w=800&q=80',
    types: ['Electronics', 'Gaming', 'Featured'],
    rating: 4.8,
    reviews: 201,
    isFeatured: true,
    stock: 45,
    brand: 'GameTech',
    features: ['16000 DPI', 'RGB lighting', 'Programmable buttons', 'Ergonomic design'],
    specifications: {
      'Sensor': 'Optical',
      'Buttons': '8 programmable',
      'Polling Rate': '1000Hz',
      'Weight': '95g'
    },
    colors: ['Black', 'White']
  }
];

function ProductList({ type, showFeatured = false, showNew = false, showBestSellers = false }: { 
  type?: string; 
  showFeatured?: boolean; 
  showNew?: boolean;
  showBestSellers?: boolean;
}) {
  const { deviceType } = useDeviceContext();
  const navigate = useNavigate();
  const location = useLocation();

  const filteredProducts = products.filter(product => {
    if (type && !product.types.includes(type)) return false;
    if (showFeatured && !product.isFeatured) return false;
    if (showNew && !product.isNew) return false;
    if (showBestSellers && !product.isBestSeller) return false;
    return true;
  });

  const getGridCols = () => {
    switch (deviceType) {
      case 'smartwatch':
        return 'grid-cols-1';
      case 'mobile':
        return 'grid-cols-1';
      case 'tablet':
        return 'grid-cols-2';
      default:
        return 'grid-cols-3';
    }
  };

  const isSubPage = location.pathname !== '/products';

  return (
    <div className="space-y-8">
      {isSubPage && (
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
        >
          <ChevronLeft size={20} />
          <span>Back</span>
        </button>
      )}

      <div className={`grid gap-6 ${getGridCols()}`}>
        {filteredProducts.map((product) => (
          <div 
            key={product.id} 
            className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow"
            onClick={() => navigate(`/products/${product.id}`)}
          >
            <div className="relative">
            <img 
              src={product.image} 
              alt={product.name}
              className="w-full h-48 object-cover"
            />
              <div className="absolute top-2 right-2 flex flex-col gap-2">
                {product.isNew && (
                  <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                    New
                  </span>
                )}
                {product.isFeatured && (
                  <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
                    Featured
                  </span>
                )}
                {product.isBestSeller && (
                  <span className="bg-yellow-500 text-white text-xs px-2 py-1 rounded-full">
                    Best Seller
                  </span>
                )}
              </div>
            </div>
            <div className="p-6">
              <h2 className={`${deviceType === 'smartwatch' ? 'text-lg' : 'text-2xl'} font-semibold mb-2`}>
                {product.name}
              </h2>
              <p className={`${deviceType === 'smartwatch' ? 'text-xs' : 'text-base'} text-gray-600 dark:text-gray-400 mb-2`}>
                {product.description}
              </p>
              <div className="flex items-center justify-between">
                <span className="text-xl font-bold text-blue-600 dark:text-blue-400">
                  ${product.price.toFixed(2)}
                </span>
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {product.rating} ({product.reviews})
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ProductDetail({ productId }: { productId: string }) {
  const { deviceType } = useDeviceContext();
  const navigate = useNavigate();
  const product = products.find(p => p.id === productId);

  if (!product) {
    return (
      <div className="text-center py-8">
        <h1 className="text-2xl font-bold text-gray-600 dark:text-gray-400">
          Product not found
        </h1>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
      >
        <ChevronLeft size={20} />
        <span>Back</span>
      </button>

      <div className="grid gap-8 md:grid-cols-2">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden self-start">
          <img 
            src={product.image} 
            alt={product.name}
            className="w-full h-auto object-contain"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = 'https://via.placeholder.com/800x600?text=Image+Not+Available';
            }}
          />
        </div>
        <div className="space-y-6">
          <div>
            <h1 className={`${deviceType === 'smartwatch' ? 'text-xl' : 'text-4xl'} font-bold mb-2`}>
              {product.name}
            </h1>
            <div className="flex items-center space-x-4 mb-4">
              <div className="flex items-center space-x-1">
                <Star className="w-5 h-5 text-yellow-400 fill-current" />
                <span className="text-lg font-medium">
                  {product.rating}
                </span>
                <span className="text-gray-500">
                  ({product.reviews} reviews)
                </span>
              </div>
              <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                ${product.price.toFixed(2)}
              </span>
            </div>
            <p className={`${deviceType === 'smartwatch' ? 'text-sm' : 'text-lg'} text-gray-600 dark:text-gray-400`}>
              {product.description}
            </p>
          </div>

          {product.features && (
            <div>
              <h2 className={`${deviceType === 'smartwatch' ? 'text-lg' : 'text-2xl'} font-semibold mb-4`}>
                Key Features
              </h2>
              <ul className="grid gap-2">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-center space-x-2">
                    <div className="w-1.5 h-1.5 bg-blue-600 dark:bg-blue-400 rounded-full" />
                    <span className={`${deviceType === 'smartwatch' ? 'text-xs' : 'text-base'} text-gray-600 dark:text-gray-400`}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {product.specifications && (
            <div>
              <h2 className={`${deviceType === 'smartwatch' ? 'text-lg' : 'text-2xl'} font-semibold mb-4`}>
                Specifications
              </h2>
              <div className="grid gap-2">
                {Object.entries(product.specifications).map(([key, value]) => (
                  <div key={key} className="flex justify-between">
                    <span className={`${deviceType === 'smartwatch' ? 'text-xs' : 'text-base'} text-gray-500`}>
                      {key}
                    </span>
                    <span className={`${deviceType === 'smartwatch' ? 'text-xs' : 'text-base'} text-gray-600 dark:text-gray-400`}>
                      {value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {product.colors && (
            <div>
              <h2 className={`${deviceType === 'smartwatch' ? 'text-lg' : 'text-2xl'} font-semibold mb-4`}>
                Available Colors
              </h2>
              <div className="flex space-x-2">
                {product.colors.map((color) => (
                  <div
                    key={color}
                    className="w-8 h-8 rounded-full border border-gray-300"
                    style={{ backgroundColor: color.toLowerCase() }}
                    title={color}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export function Products() {
  const location = useLocation();
  const { deviceType } = useDeviceContext();

  const getPageTitle = () => {
    if (location.pathname.includes('/featured')) return 'Featured Products';
    if (location.pathname.includes('/new')) return 'New Arrivals';
    if (location.pathname.includes('/best-sellers')) return 'Best Sellers';
    if (location.pathname.includes('/electronics')) return 'Electronics';
    if (location.pathname.includes('/gaming')) return 'Gaming Products';
    if (location.pathname.includes('/wearables')) return 'Wearables';
    if (location.pathname.includes('/audio')) return 'Audio Products';
    if (location.pathname.includes('/smart-home')) return 'Smart Home';
    return 'All Products';
  };

  return (
    <div className="space-y-8">
      <section className="text-center">
        <h1 className={`${deviceType === 'smartwatch' ? 'text-xl' : 'text-4xl'} font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent`}>
          {getPageTitle()}
        </h1>
        <p className={`${deviceType === 'smartwatch' ? 'text-xs' : 'text-lg'} text-gray-600 dark:text-gray-400 max-w-2xl mx-auto`}>
          Discover our range of high-quality products designed for every need.
        </p>
      </section>

      <Routes>
        <Route path="/" element={<ProductList />} />
        <Route path="/featured" element={<ProductList showFeatured={true} />} />
        <Route path="/new" element={<ProductList showNew={true} />} />
        <Route path="/best-sellers" element={<ProductList showBestSellers={true} />} />
        <Route path="/electronics" element={<ProductList type="Electronics" />} />
        <Route path="/gaming" element={<ProductList type="Gaming" />} />
        <Route path="/wearables" element={<ProductList type="Wearables" />} />
        <Route path="/audio" element={<ProductList type="Audio" />} />
        <Route path="/smart-home" element={<ProductList type="Smart Home" />} />
        <Route path="/:productId" element={<ProductDetail productId={location.pathname.split('/').pop() || ''} />} />
      </Routes>
    </div>
  );
}