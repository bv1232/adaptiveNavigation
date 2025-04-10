import React from 'react';
import { useDeviceContext } from '../hooks/useDeviceContext';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { ChevronLeft, Users, Award, Heart, Clock, Building, Briefcase } from 'lucide-react';
import { Milestones } from './Milestones';

interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  image: string;
  department?: string;
  isLeadership?: boolean;
}

interface JobPosition {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  description: string;
  requirements: string[];
}

interface Benefit {
  id: string;
  title: string;
  description: string;
  icon: string;
}

interface Milestone {
  year: number;
  title: string;
  description: string;
  icon: string;
}

interface Department {
  id: string;
  name: string;
  description: string;
  icon: string;
  teamSize: number;
  keyProjects: string[];
}

interface Award {
  id: string;
  title: string;
  year: string;
  description: string;
}

const teamMembers: TeamMember[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    role: 'CEO & Founder',
    bio: 'With over 15 years of experience in tech leadership, Sarah founded AdaptiveNav to revolutionize responsive design.',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80',
    isLeadership: true
  },
  {
    id: '2',
    name: 'Michael Chen',
    role: 'Lead Developer',
    bio: 'Michael specializes in creating responsive and accessible web applications that work seamlessly across all devices.',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=800&q=80',
    department: 'Engineering',
    isLeadership: true
  },
  {
    id: '3',
    name: 'Emma Rodriguez',
    role: 'UX Designer',
    bio: 'Emma brings a user-centric approach to design, ensuring our products are intuitive and enjoyable to use.',
    image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=800&q=80',
    department: 'Design'
  },
  {
    id: '4',
    name: 'David Kim',
    role: 'Product Manager',
    bio: 'David leads our product development with a focus on user needs and market trends.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80',
    department: 'Product',
    isLeadership: true
  },
  {
    id: '5',
    name: 'Lisa Wong',
    role: 'Marketing Director',
    bio: 'Lisa drives our marketing strategy and brand development.',
    image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=800&q=80',
    department: 'Marketing',
    isLeadership: true
  }
];

const jobPositions: JobPosition[] = [
  {
    id: '1',
    title: 'Senior Frontend Developer',
    department: 'Engineering',
    location: 'Remote',
    type: 'Full-time',
    description: 'Join our team to build responsive and accessible web applications.',
    requirements: [
      '5+ years of experience in frontend development',
      'Strong knowledge of React and TypeScript',
      'Experience with responsive design',
      'Understanding of accessibility standards'
    ]
  },
  {
    id: '2',
    title: 'UX Designer',
    department: 'Design',
    location: 'San Francisco',
    type: 'Full-time',
    description: 'Create intuitive and beautiful user experiences across all devices.',
    requirements: [
      '3+ years of UX design experience',
      'Portfolio demonstrating responsive design work',
      'Experience with Figma or similar tools',
      'Understanding of user research methods'
    ]
  }
];

const benefits: Benefit[] = [
  {
    id: '1',
    title: 'Health & Wellness',
    description: 'Comprehensive health insurance and wellness programs',
    icon: 'heart'
  },
  {
    id: '2',
    title: 'Learning & Development',
    description: 'Continuous learning opportunities and professional growth',
    icon: 'book'
  },
  {
    id: '3',
    title: 'Work-Life Balance',
    description: 'Flexible work arrangements and generous time off',
    icon: 'clock'
  }
];

const milestones: Milestone[] = [
  {
    year: 2020,
    title: 'Company Founded',
    description: 'AdaptiveNav was established with a vision to revolutionize responsive design.',
    icon: 'rocket'
  },
  {
    year: 2021,
    title: 'First Product Launch',
    description: 'Released our initial device detection and responsive navigation solution.',
    icon: 'package'
  },
  {
    year: 2022,
    title: 'Global Expansion',
    description: 'Expanded operations to serve clients in over 50 countries worldwide.',
    icon: 'globe'
  },
  {
    year: 2023,
    title: 'Innovation Award',
    description: 'Recognized for groundbreaking work in cross-device navigation.',
    icon: 'award'
  }
];

const departments: Department[] = [
  {
    id: '1',
    name: 'Engineering',
    description: 'Building innovative solutions for responsive design challenges.',
    icon: 'code',
    teamSize: 25,
    keyProjects: ['Device Detection System', 'Responsive Framework', 'Performance Optimization']
  },
  {
    id: '2',
    name: 'Design',
    description: 'Creating beautiful and intuitive user experiences.',
    icon: 'palette',
    teamSize: 15,
    keyProjects: ['UI Component Library', 'Design System', 'User Research']
  },
  {
    id: '3',
    name: 'Product',
    description: 'Driving product strategy and development.',
    icon: 'box',
    teamSize: 10,
    keyProjects: ['Product Roadmap', 'Feature Development', 'Market Analysis']
  },
  {
    id: '4',
    name: 'Marketing',
    description: 'Promoting our solutions and building brand awareness.',
    icon: 'megaphone',
    teamSize: 12,
    keyProjects: ['Brand Campaign', 'Content Strategy', 'Community Building']
  }
];

const awards: Award[] = [
  {
    id: '1',
    title: 'Best Tech Company 2023',
    year: '2023',
    description: 'Awarded for innovation and customer satisfaction'
  },
];

function TeamList({ showLeadership = false, department }: { showLeadership?: boolean; department?: string }) {
  const { deviceType } = useDeviceContext();
  const navigate = useNavigate();
  const location = useLocation();

  const filteredMembers = teamMembers.filter(member => {
    if (showLeadership && !member.isLeadership) return false;
    if (department && member.department !== department) return false;
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

  const isSubPage = location.pathname.includes('/leadership') || location.pathname.includes('/departments');

  return (
    <div className="space-y-8">
      {isSubPage && (
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
        >
          <ChevronLeft size={20} />
          <span>Back to Team</span>
        </button>
      )}
      <div className={`grid gap-6 ${getGridCols()}`}>
        {filteredMembers.map((member) => (
          <div key={member.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
              <img 
                src={member.image} 
                alt={member.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
              <h2 className={`${deviceType === 'smartwatch' ? 'text-lg' : 'text-2xl'} font-semibold mb-2`}>
                  {member.name}
              </h2>
              <p className="text-blue-600 dark:text-blue-400 font-medium mb-2">
                {member.role}
              </p>
              {member.department && (
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                  {member.department}
                </p>
              )}
              <p className={`${deviceType === 'smartwatch' ? 'text-xs' : 'text-base'} text-gray-600 dark:text-gray-400`}>
                {member.bio}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function TeamDetail({ memberId }: { memberId: string }) {
  const navigate = useNavigate();
  const member = teamMembers.find(m => m.id === memberId);

  if (!member) {
    return <div>Team member not found</div>;
  }

  return (
    <div className="max-w-4xl mx-auto">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center text-blue-500 hover:text-blue-600 mb-4"
      >
        <ChevronLeft className="w-5 h-5" />
        <span>Back</span>
      </button>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
        <img
          src={member.image}
          alt={member.name}
          className="w-full h-96 object-cover"
        />
        <div className="p-6">
          <h1 className="text-2xl font-bold">{member.name}</h1>
          <p className="text-gray-600 dark:text-gray-300 mt-2">
            {member.role}
          </p>
          <p className="mt-4">{member.bio}</p>
        </div>
      </div>
    </div>
  );
}

function Careers() {
  const { deviceType } = useDeviceContext();
  const navigate = useNavigate();
  const location = useLocation();

  const isSubPage = location.pathname.includes('/positions') || location.pathname.includes('/benefits');

  return (
    <div className="space-y-8">
      {isSubPage && (
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
        >
          <ChevronLeft size={20} />
          <span>Back to Careers</span>
        </button>
      )}

      <Routes>
        <Route path="/" element={
          <div className="space-y-8">
            <section className="text-center">
              <h1 className={`${deviceType === 'smartwatch' ? 'text-xl' : 'text-4xl'} font-bold mb-4`}>
                Join Our Team
              </h1>
              <p className={`${deviceType === 'smartwatch' ? 'text-sm' : 'text-lg'} text-gray-600 dark:text-gray-400 max-w-2xl mx-auto`}>
                We're looking for talented individuals to help us build the future of responsive design.
              </p>
            </section>

            <div className="grid gap-6 md:grid-cols-2">
              <button
                onClick={() => navigate('/about/careers/positions')}
                className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-center space-x-4">
                  <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-full">
                    <Briefcase className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <h2 className={`${deviceType === 'smartwatch' ? 'text-lg' : 'text-2xl'} font-semibold mb-2`}>
                      Open Positions
                    </h2>
                    <p className={`${deviceType === 'smartwatch' ? 'text-xs' : 'text-base'} text-gray-600 dark:text-gray-400`}>
                      Explore our current job opportunities
                    </p>
                  </div>
                </div>
              </button>

              <button
                onClick={() => navigate('/about/careers/benefits')}
                className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-center space-x-4">
                  <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-full">
                    <Heart className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <h2 className={`${deviceType === 'smartwatch' ? 'text-lg' : 'text-2xl'} font-semibold mb-2`}>
                      Benefits
                    </h2>
                    <p className={`${deviceType === 'smartwatch' ? 'text-xs' : 'text-base'} text-gray-600 dark:text-gray-400`}>
                      Discover our employee perks and advantages
                    </p>
                  </div>
                </div>
              </button>
            </div>
          </div>
        } />
        <Route path="/positions" element={
          <div className="space-y-8">
            <h1 className={`${deviceType === 'smartwatch' ? 'text-xl' : 'text-4xl'} font-bold mb-8`}>
              Open Positions
            </h1>
            <div className="grid gap-6">
              {jobPositions.map((position) => (
                <div key={position.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
                  <h2 className={`${deviceType === 'smartwatch' ? 'text-lg' : 'text-2xl'} font-semibold mb-2`}>
                    {position.title}
                  </h2>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="text-sm bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full">
                      {position.department}
                    </span>
                    <span className="text-sm bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full">
                      {position.location}
                    </span>
                    <span className="text-sm bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full">
                      {position.type}
                    </span>
                  </div>
                  <p className={`${deviceType === 'smartwatch' ? 'text-xs' : 'text-base'} text-gray-600 dark:text-gray-400 mb-4`}>
                    {position.description}
                  </p>
                  <h3 className={`${deviceType === 'smartwatch' ? 'text-base' : 'text-xl'} font-semibold mb-2`}>
                    Requirements
                </h3>
                  <ul className="list-disc list-inside space-y-1">
                    {position.requirements.map((req, index) => (
                      <li key={index} className={`${deviceType === 'smartwatch' ? 'text-xs' : 'text-base'} text-gray-600 dark:text-gray-400`}>
                        {req}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        } />
        <Route path="/benefits" element={
          <div className="space-y-8">
            <h1 className={`${deviceType === 'smartwatch' ? 'text-xl' : 'text-4xl'} font-bold mb-8`}>
              Employee Benefits
            </h1>
            <div className="grid gap-6">
              {benefits.map((benefit) => (
                <div key={benefit.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
                  <div className="flex items-start space-x-4">
                    <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-full">
                      <Heart className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <h2 className={`${deviceType === 'smartwatch' ? 'text-lg' : 'text-2xl'} font-semibold mb-2`}>
                        {benefit.title}
                      </h2>
                      <p className={`${deviceType === 'smartwatch' ? 'text-xs' : 'text-base'} text-gray-600 dark:text-gray-400`}>
                        {benefit.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        } />
      </Routes>
    </div>
  );
}

function History() {
  const { deviceType } = useDeviceContext();
  const navigate = useNavigate();

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
        Our History
      </h1>

      <div className="relative">
        {milestones.map((milestone, index) => (
          <div key={index} className="relative pl-8 pb-8">
            {index !== milestones.length - 1 && (
              <div className="absolute left-4 top-4 bottom-0 w-0.5 bg-gray-200 dark:bg-gray-700" />
            )}
            <div className="absolute left-0 top-0 w-8 h-8 bg-blue-600 dark:bg-blue-400 rounded-full flex items-center justify-center">
              <Clock className="w-4 h-4 text-white" />
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
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
        ))}
      </div>
    </div>
  );
}

function Departments() {
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
        Our Departments
      </h1>

      <div className={`grid gap-6 ${getGridCols()}`}>
        {departments.map((dept) => (
          <div key={dept.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
            <div className="flex items-start space-x-4">
              <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-full">
                <Building className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h2 className={`${deviceType === 'smartwatch' ? 'text-lg' : 'text-2xl'} font-semibold mb-2`}>
                  {dept.name}
                </h2>
                <p className={`${deviceType === 'smartwatch' ? 'text-xs' : 'text-base'} text-gray-600 dark:text-gray-400 mb-4`}>
                  {dept.description}
                </p>
                <div className="space-y-2">
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Team Size: {dept.teamSize} members
                  </p>
                  <div>
                    <h3 className="text-sm font-semibold mb-1">Key Projects:</h3>
                    <ul className="list-disc list-inside space-y-1">
                      {dept.keyProjects.map((project, index) => (
                        <li key={index} className="text-sm text-gray-500 dark:text-gray-400">
                          {project}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function AwardsList() {
  const { deviceType } = useDeviceContext();
  const navigate = useNavigate();

  const getGridCols = () => {
    switch (deviceType) {
      case 'smartwatch':
        return 'grid-cols-1';
      case 'mobile':
        return 'grid-cols-2';
      case 'tablet':
        return 'grid-cols-3';
      default:
        return 'grid-cols-4';
    }
  };

  return (
    <div className={`grid ${getGridCols()} gap-4`}>
      {awards.map(award => (
        <div
          key={award.id}
          className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
          onClick={() => navigate(`/about/awards/${award.id}`)}
        >
          <div className="p-4">
            <h3 className="font-semibold text-lg">{award.title}</h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm mt-1">
              {award.year}
            </p>
            <p className="mt-2">{award.description}</p>
              </div>
            </div>
          ))}
        </div>
  );
}

function AwardDetail({ awardId }: { awardId: string }) {
  const navigate = useNavigate();
  const award = awards.find(a => a.id === awardId);

  if (!award) {
    return <div>Award not found</div>;
  }

  return (
    <div className="max-w-4xl mx-auto">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center text-blue-500 hover:text-blue-600 mb-4"
      >
        <ChevronLeft className="w-5 h-5" />
        <span>Back</span>
      </button>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
        <div className="p-6">
          <h1 className="text-2xl font-bold">{award.title}</h1>
          <p className="text-gray-600 dark:text-gray-300 mt-2">
            {award.year}
          </p>
          <p className="mt-4">{award.description}</p>
        </div>
      </div>
    </div>
  );
}

export function About() {
  const location = useLocation();
  const { deviceType } = useDeviceContext();

  const getPageTitle = () => {
    if (location.pathname.includes('/team')) return 'Our Team';
    if (location.pathname.includes('/awards')) return 'Our Awards';
    if (location.pathname.includes('/history')) return 'Our History';
    return 'About Us';
  };

  return (
    <div className="space-y-8">
      <section className="text-center">
        <h1 className={`${deviceType === 'smartwatch' ? 'text-xl' : 'text-4xl'} font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent`}>
          {getPageTitle()}
        </h1>
        <p className={`${deviceType === 'smartwatch' ? 'text-sm' : 'text-lg'} text-gray-600 dark:text-gray-400 max-w-2xl mx-auto`}>
          {location.pathname.includes('/team') ? 'Meet our team members' : location.pathname.includes('/awards') ? 'Our achievements' : 'Our history'}
        </p>
      </section>

      <Routes>
        <Route path="/" element={<History />} />
        <Route path="/story" element={<History />} />
        <Route path="/story/history" element={<History />} />
        <Route path="/story/milestones" element={<Milestones />} />
        <Route path="/team" element={<TeamList />} />
        <Route path="/team/:memberId" element={<TeamDetail memberId={location.pathname.split('/').pop() || ''} />} />
        <Route path="/team/leadership" element={<TeamList showLeadership={true} />} />
        <Route path="/team/departments" element={<Departments />} />
        <Route path="/team/departments/:department" element={<TeamList department={window.location.pathname.split('/').pop() || ''} />} />
        <Route path="/careers/*" element={<Careers />} />
        <Route path="/awards" element={<AwardsList />} />
        <Route path="/awards/:awardId" element={<AwardDetail awardId={location.pathname.split('/').pop() || ''} />} />
      </Routes>
    </div>
  );
}