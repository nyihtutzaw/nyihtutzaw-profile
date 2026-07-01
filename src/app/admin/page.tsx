'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { DocumentTextIcon, EnvelopeIcon, ArrowRightOnRectangleIcon } from '@heroicons/react/24/outline';

export default function AdminDashboardPage() {
  const router = useRouter();

  const logout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' });
    router.replace('/admin/login');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 px-4 py-10">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Admin</h1>
            <p className="text-gray-500 dark:text-gray-400">Manage your portfolio content.</p>
          </div>
          <button
            onClick={logout}
            className="inline-flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300 hover:text-red-500 transition-colors"
          >
            <ArrowRightOnRectangleIcon className="w-5 h-5" />
            Logout
          </button>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <Link
            href="/admin/cv"
            className="group bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="w-11 h-11 rounded-xl bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center mb-4">
              <DocumentTextIcon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
              CV Adjustment
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Preview, edit, adjust with AI, and download your CV.
            </p>
          </Link>

          <Link
            href="/admin/cover-letter"
            className="group bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="w-11 h-11 rounded-xl bg-indigo-50 dark:bg-indigo-900/30 flex items-center justify-center mb-4">
              <EnvelopeIcon className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
            </div>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
              Cover Letter Generator
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Describe a role and let AI draft a tailored cover letter.
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
}
