import React from 'react';
import { useDeviceContext } from '../hooks/useDeviceContext';

interface TeamMember {
  name: string;
  role: string;
  image: string;
}

const team: TeamMember[] = [
  {
    name: 'Sarah Johnson',
    role: 'Lead Designer',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'Michael Chen',
    role: 'Senior Developer',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'Emily Rodriguez',
    role: 'Product Manager',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=800&q=80',
  },
];

export function About() {
  const deviceType = useDeviceContext();

  return (
    <div className="space-y-12">
      <section className="text-center">
        <h1 className={`${deviceType === 'smartwatch' ? 'text-xl' : 'text-4xl'} font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent`}>
          About Us
        </h1>
        <p className={`${deviceType === 'smartwatch' ? 'text-sm' : 'text-lg'} text-gray-600 dark:text-gray-400 max-w-2xl mx-auto`}>
          We're passionate about creating adaptive experiences that work seamlessly across all devices.
        </p>
      </section>

      <section className="space-y-6">
        <h2 className={`${deviceType === 'smartwatch' ? 'text-lg' : 'text-2xl'} font-semibold`}>Our Story</h2>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
          <p className={`${deviceType === 'smartwatch' ? 'text-xs' : 'text-base'} text-gray-600 dark:text-gray-400`}>
            Founded in 2024, we set out to revolutionize how users interact with web applications across different devices. Our mission is to create intuitive and accessible interfaces that adapt seamlessly to any screen size.
          </p>
        </div>
      </section>

      <section className="space-y-6">
        <h2 className={`${deviceType === 'smartwatch' ? 'text-lg' : 'text-2xl'} font-semibold`}>Our Team</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {team.map((member) => (
            <div key={member.name} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
              <img 
                src={member.image} 
                alt={member.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className={`${deviceType === 'smartwatch' ? 'text-base' : 'text-xl'} font-semibold`}>
                  {member.name}
                </h3>
                <p className={`${deviceType === 'smartwatch' ? 'text-xs' : 'text-sm'} text-gray-600 dark:text-gray-400`}>
                  {member.role}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}