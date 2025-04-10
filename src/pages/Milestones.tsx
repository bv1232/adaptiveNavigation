import React from 'react';
import { useDeviceContext } from '../hooks/useDeviceContext';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Award } from 'lucide-react';

interface Milestone {
  id: string;
  title: string;
  year: string;
  description: string;
}

const milestones: Milestone[] = [
  {
    id: '1',
    title: 'Company Founded',
    year: '2020',
    description: 'AdaptiveNav was established with a vision to revolutionize responsive design.'
  },
  {
    id: '2',
    title: 'First Product Launch',
    year: '2021',
    description: 'Released our initial device detection and responsive navigation solution.'
  },
  {
    id: '3',
    title: 'Global Expansion',
    year: '2022',
    description: 'Expanded operations to serve clients in over 50 countries worldwide.'
  },
  {
    id: '4',
    title: 'Innovation Award',
    year: '2023',
    description: 'Recognized for groundbreaking work in cross-device navigation.'
  }
];

export function Milestones() {
  const { deviceType } = useDeviceContext();
  const navigate = useNavigate();

  const getGridCols = () => {
    switch (deviceType) {
      case 'smartwatch':
        return 'grid-cols-1';
      case 'mobile':
        return 'grid-cols-1';
      case 'tablet':
        return 'grid-cols-2';
      default:
        return 'grid-cols-2';
    }
  };

  return (
    <div className="space-y-8">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
      >
        <ChevronLeft size={20} />
        <span>Back</span>
      </button>

      <h1 className={`${deviceType === 'smartwatch' ? 'text-xl' : 'text-4xl'} font-bold mb-8`}>
        Our Milestones
      </h1>

      <div className={`grid ${getGridCols()} gap-6`}>
        {milestones.map((milestone) => (
          <div
            key={milestone.id}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start space-x-4">
              <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-full">
                <Award className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h2 className={`${deviceType === 'smartwatch' ? 'text-lg' : 'text-2xl'} font-semibold mb-2`}>
                  {milestone.title}
                </h2>
                <p className="text-blue-600 dark:text-blue-400 font-medium mb-2">
                  {milestone.year}
                </p>
                <p className={`${deviceType === 'smartwatch' ? 'text-xs' : 'text-base'} text-gray-600 dark:text-gray-400`}>
                  {milestone.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 