import React from 'react';
import { useDeviceContext } from '../hooks/useDeviceContext';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
}

const products: Product[] = [
  {
    id: '1',
    name: 'Premium Laptop',
    description: 'High-performance laptop for professionals',
    price: 1299.99,
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: '2',
    name: 'Smartwatch Pro',
    description: 'Advanced fitness and health tracking',
    price: 299.99,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: '3',
    name: 'Wireless Earbuds',
    description: 'Crystal clear audio with noise cancellation',
    price: 159.99,
    image: 'https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?auto=format&fit=crop&w=800&q=80',
  },
];

export function Products() {
  const deviceType = useDeviceContext();

  return (
    <div className="space-y-8">
      <section className="text-center">
        <h1 className={`${deviceType === 'smartwatch' ? 'text-xl' : 'text-4xl'} font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent`}>
          Our Products
        </h1>
        <p className={`${deviceType === 'smartwatch' ? 'text-sm' : 'text-lg'} text-gray-600 dark:text-gray-400 max-w-2xl mx-auto`}>
          Discover our latest collection of premium tech products.
        </p>
      </section>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <div key={product.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
            <img 
              src={product.image} 
              alt={product.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h2 className={`${deviceType === 'smartwatch' ? 'text-lg' : 'text-2xl'} font-semibold mb-2`}>
                {product.name}
              </h2>
              <p className={`${deviceType === 'smartwatch' ? 'text-xs' : 'text-base'} text-gray-600 dark:text-gray-400 mb-4`}>
                {product.description}
              </p>
              <div className="flex items-center justify-between">
                <span className="font-bold text-lg">${product.price}</span>
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors">
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}