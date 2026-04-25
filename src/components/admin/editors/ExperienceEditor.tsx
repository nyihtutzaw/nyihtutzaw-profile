'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import type { WorkExperience } from '@/types/database';
import ImageUpload from '../ImageUpload';
import MarkdownEditor from '../MarkdownEditor';

export default function ExperienceEditor() {
  const [experiences, setExperiences] = useState<WorkExperience[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('work_experience')
      .select('*')
      .order('sort_order');

    if (error) {
      console.error('Error fetching experiences:', error);
    } else {
      setExperiences(data || []);
    }
    setLoading(false);
  };

  const handleSave = async (exp: WorkExperience) => {
    const supabase = createClient();
    const isNew = exp.id.startsWith('new-');
    
    const { error } = await supabase
      .from('work_experience')
      .upsert({
        id: isNew ? undefined : exp.id,
        logo_url: exp.logo_url,
        logo_alt: exp.logo_alt,
        title: exp.title,
        company: exp.company,
        employment_type: exp.employment_type,
        period: exp.period,
        location: exp.location,
        description: exp.description,
        details: exp.details,
        skills: exp.skills,
        show_in_cv: exp.show_in_cv,
        sort_order: exp.sort_order,
      });

    if (error) {
      setMessage({ type: 'error', text: error.message });
    } else {
      setMessage({ type: 'success', text: 'Experience saved!' });
      fetchData();
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this experience?')) return;
    
    const supabase = createClient();
    const { error } = await supabase.from('work_experience').delete().eq('id', id);

    if (error) {
      setMessage({ type: 'error', text: error.message });
    } else {
      fetchData();
    }
  };

  const addNew = () => {
    const newExp: WorkExperience = {
      id: `new-${Date.now()}`,
      logo_url: null,
      logo_alt: null,
      title: '',
      company: '',
      employment_type: 'Full-time',
      period: '',
      location: null,
      description: null,
      details: null,
      skills: [],
      show_in_cv: true,
      sort_order: experiences.length,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    setExperiences([newExp, ...experiences]);
  };

  const updateExperience = (index: number, updates: Partial<WorkExperience>) => {
    const updated = [...experiences];
    updated[index] = { ...updated[index], ...updates };
    setExperiences(updated);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {message && (
        <div
          className={`px-4 py-3 rounded-lg ${
            message.type === 'success'
              ? 'bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300'
              : 'bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-300'
          }`}
        >
          {message.text}
        </div>
      )}

      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Work Experience
        </h2>
        <button
          onClick={addNew}
          className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg"
        >
          + Add Experience
        </button>
      </div>

      {experiences.map((exp, index) => (
        <div key={exp.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <div className="flex items-start gap-4 mb-6">
            <ImageUpload
              currentImage={exp.logo_url || ''}
              onUpload={(url) => updateExperience(index, { logo_url: url })}
              folder="work"
            />
            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Job Title"
                value={exp.title}
                onChange={(e) => updateExperience(index, { title: e.target.value })}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
              <input
                type="text"
                placeholder="Company"
                value={exp.company}
                onChange={(e) => updateExperience(index, { company: e.target.value })}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
              <input
                type="text"
                placeholder="Period (e.g., Jan 2020 - Present)"
                value={exp.period}
                onChange={(e) => updateExperience(index, { period: e.target.value })}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
              <input
                type="text"
                placeholder="Location"
                value={exp.location || ''}
                onChange={(e) => updateExperience(index, { location: e.target.value })}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
              <select
                value={exp.employment_type || 'Full-time'}
                onChange={(e) => updateExperience(index, { employment_type: e.target.value })}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Contract">Contract</option>
                <option value="Freelance">Freelance</option>
                <option value="Internship">Internship</option>
              </select>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id={`cv-${exp.id}`}
                  checked={exp.show_in_cv}
                  onChange={(e) => updateExperience(index, { show_in_cv: e.target.checked })}
                  className="w-4 h-4"
                />
                <label htmlFor={`cv-${exp.id}`} className="text-sm text-gray-700 dark:text-gray-300">
                  Show in CV
                </label>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Description
              </label>
              <textarea
                value={exp.description || ''}
                onChange={(e) => updateExperience(index, { description: e.target.value })}
                rows={2}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Skills (comma-separated)
              </label>
              <input
                type="text"
                value={exp.skills?.join(', ') || ''}
                onChange={(e) => updateExperience(index, { skills: e.target.value.split(',').map(s => s.trim()).filter(Boolean) })}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Details (Markdown)
              </label>
              <MarkdownEditor
                value={exp.details || ''}
                onChange={(value: string) => updateExperience(index, { details: value })}
                placeholder="Enter detailed description in Markdown..."
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 mt-4">
            <button
              onClick={() => handleDelete(exp.id)}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg"
            >
              Delete
            </button>
            <button
              onClick={() => handleSave(exp)}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
            >
              Save
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
