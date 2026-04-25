'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import type { Profile } from '@/types/database';
import ImageUpload from '../ImageUpload';

export default function ProfileEditor() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('profile')
      .select('*')
      .single();

    if (error && error.code !== 'PGRST116') {
      console.error('Error fetching profile:', error);
    }
    setProfile(data);
    setLoading(false);
  };

  const handleSave = async () => {
    if (!profile) return;
    setSaving(true);
    setMessage(null);

    const supabase = createClient();
    const { error } = await supabase
      .from('profile')
      .upsert({
        id: profile.id || undefined,
        name: profile.name,
        title: profile.title,
        bio: profile.bio,
        email: profile.email,
        location: profile.location,
        profile_image_url: profile.profile_image_url,
        linkedin_url: profile.linkedin_url,
        github_url: profile.github_url,
        medium_url: profile.medium_url,
      });

    if (error) {
      setMessage({ type: 'error', text: error.message });
    } else {
      setMessage({ type: 'success', text: 'Profile saved successfully!' });
      fetchProfile();
    }
    setSaving(false);
  };

  const handleImageUpload = (url: string) => {
    if (profile) {
      setProfile({ ...profile, profile_image_url: url });
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
        Edit Profile
      </h2>

      {message && (
        <div
          className={`mb-6 px-4 py-3 rounded-lg ${
            message.type === 'success'
              ? 'bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300'
              : 'bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-300'
          }`}
        >
          {message.text}
        </div>
      )}

      <div className="space-y-6">
        <div className="flex flex-col items-center mb-6">
          <ImageUpload
            currentImage={profile?.profile_image_url || ''}
            onUpload={handleImageUpload}
            folder="profile"
          />
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
            Profile Image
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Name
            </label>
            <input
              type="text"
              value={profile?.name || ''}
              onChange={(e) => setProfile(profile ? { ...profile, name: e.target.value } : null)}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Title
            </label>
            <input
              type="text"
              value={profile?.title || ''}
              onChange={(e) => setProfile(profile ? { ...profile, title: e.target.value } : null)}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Bio
          </label>
          <textarea
            value={profile?.bio || ''}
            onChange={(e) => setProfile(profile ? { ...profile, bio: e.target.value } : null)}
            rows={4}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Email
            </label>
            <input
              type="email"
              value={profile?.email || ''}
              onChange={(e) => setProfile(profile ? { ...profile, email: e.target.value } : null)}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Location
            </label>
            <input
              type="text"
              value={profile?.location || ''}
              onChange={(e) => setProfile(profile ? { ...profile, location: e.target.value } : null)}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              LinkedIn URL
            </label>
            <input
              type="url"
              value={profile?.linkedin_url || ''}
              onChange={(e) => setProfile(profile ? { ...profile, linkedin_url: e.target.value } : null)}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              GitHub URL
            </label>
            <input
              type="url"
              value={profile?.github_url || ''}
              onChange={(e) => setProfile(profile ? { ...profile, github_url: e.target.value } : null)}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Medium URL
            </label>
            <input
              type="url"
              value={profile?.medium_url || ''}
              onChange={(e) => setProfile(profile ? { ...profile, medium_url: e.target.value } : null)}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
          </div>
        </div>

        <div className="flex justify-end">
          <button
            onClick={handleSave}
            disabled={saving}
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold rounded-lg transition-colors"
          >
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>
    </div>
  );
}
