'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { User } from '@supabase/supabase-js';
import ProfileEditor from './editors/ProfileEditor';
import AboutEditor from './editors/AboutEditor';
import ExperienceEditor from './editors/ExperienceEditor';
import EducationEditor from './editors/EducationEditor';
import SkillsEditor from './editors/SkillsEditor';
import CertificationsEditor from './editors/CertificationsEditor';
import ProjectsEditor from './editors/ProjectsEditor';

interface AdminDashboardProps {
  user: User;
}

const menuItems = [
  { id: 'profile', name: 'Profile', icon: '👤' },
  { id: 'about', name: 'About', icon: '📝' },
  { id: 'experience', name: 'Experience', icon: '💼' },
  { id: 'education', name: 'Education', icon: '🎓' },
  { id: 'skills', name: 'Skills', icon: '🛠️' },
  { id: 'certifications', name: 'Certifications', icon: '📜' },
  { id: 'projects', name: 'Projects', icon: '🚀' },
];

export default function AdminDashboard({ user }: AdminDashboardProps) {
  const [activeSection, setActiveSection] = useState('profile');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const router = useRouter();

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push('/admin/login');
    router.refresh();
  };

  const renderEditor = () => {
    switch (activeSection) {
      case 'profile':
        return <ProfileEditor />;
      case 'about':
        return <AboutEditor />;
      case 'experience':
        return <ExperienceEditor />;
      case 'education':
        return <EducationEditor />;
      case 'skills':
        return <SkillsEditor />;
      case 'certifications':
        return <CertificationsEditor />;
      case 'projects':
        return <ProjectsEditor />;
      default:
        return <ProfileEditor />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* Top Bar */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <svg className="w-6 h-6 text-gray-600 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">
              Portfolio Admin
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <a
              href="/"
              target="_blank"
              className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
            >
              View Site →
            </a>
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {user.email}
            </span>
            <button
              onClick={handleLogout}
              className="px-4 py-2 text-sm bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="flex h-[calc(100vh-57px)]">
        {/* Sidebar */}
        <aside
          className={`${
            sidebarOpen ? 'w-64' : 'w-0'
          } transition-all duration-300 overflow-hidden bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 h-full`}
        >
          <nav className="p-4 space-y-2">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                  activeSection === item.id
                    ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                <span className="text-xl">{item.icon}</span>
                <span className="font-medium">{item.name}</span>
              </button>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 overflow-y-auto">
          <div className="max-w-4xl mx-auto">
            {renderEditor()}
          </div>
        </main>
      </div>
    </div>
  );
}
