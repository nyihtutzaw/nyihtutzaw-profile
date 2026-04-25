'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import type { Education } from '@/types/database';
import ImageUpload from '../ImageUpload';

export default function EducationEditor() {
  const [education, setEducation] = useState<Education[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('education')
      .select('*')
      .order('sort_order');

    if (error) {
      console.error('Error fetching education:', error);
    } else {
      setEducation(data || []);
    }
    setLoading(false);
  };

  const handleSave = async (edu: Education) => {
    const supabase = createClient();
    const isNew = edu.id.startsWith('new-');
    
    const { error } = await supabase
      .from('education')
      .upsert({
        id: isNew ? undefined : edu.id,
        logo_url: edu.logo_url,
        logo_alt: edu.logo_alt,
        period: edu.period,
        degree: edu.degree,
        institution: edu.institution,
        grade: edu.grade,
        skills: edu.skills,
        is_current: edu.is_current,
        is_highlighted: edu.is_highlighted,
        sort_order: edu.sort_order,
      });

    if (error) {
      setMessage({ type: 'error', text: error.message });
    } else {
      setMessage({ type: 'success', text: 'Education saved!' });
      fetchData();
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this education entry?')) return;
    
    const supabase = createClient();
    const { error } = await supabase.from('education').delete().eq('id', id);

    if (error) {
      setMessage({ type: 'error', text: error.message });
    } else {
      fetchData();
    }
  };

  const addNew = () => {
    const newEdu: Education = {
      id: `new-${Date.now()}`,
      logo_url: null,
      logo_alt: null,
      period: '',
      degree: '',
      institution: '',
      grade: null,
      skills: [],
      is_current: false,
      is_highlighted: false,
      sort_order: education.length,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    setEducation([newEdu, ...education]);
  };

  const updateEducation = (index: number, updates: Partial<Education>) => {
    const updated = [...education];
    updated[index] = { ...updated[index], ...updates };
    setEducation(updated);
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
          Education
        </h2>
        <button
          onClick={addNew}
          className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg"
        >
          + Add Education
        </button>
      </div>

      {education.map((edu, index) => (
        <div key={edu.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <div className="flex items-start gap-4 mb-6">
            <ImageUpload
              currentImage={edu.logo_url || ''}
              onUpload={(url) => updateEducation(index, { logo_url: url })}
              folder="education"
            />
            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Degree"
                value={edu.degree}
                onChange={(e) => updateEducation(index, { degree: e.target.value })}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
              <input
                type="text"
                placeholder="Institution"
                value={edu.institution}
                onChange={(e) => updateEducation(index, { institution: e.target.value })}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
              <input
                type="text"
                placeholder="Period (e.g., 2018 - 2022)"
                value={edu.period}
                onChange={(e) => updateEducation(index, { period: e.target.value })}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
              <input
                type="text"
                placeholder="Grade"
                value={edu.grade || ''}
                onChange={(e) => updateEducation(index, { grade: e.target.value })}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Skills (comma-separated)
              </label>
              <input
                type="text"
                value={edu.skills?.join(', ') || ''}
                onChange={(e) => updateEducation(index, { skills: e.target.value.split(',').map(s => s.trim()).filter(Boolean) })}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>

            <div className="flex gap-6">
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id={`current-${edu.id}`}
                  checked={edu.is_current}
                  onChange={(e) => updateEducation(index, { is_current: e.target.checked })}
                  className="w-4 h-4"
                />
                <label htmlFor={`current-${edu.id}`} className="text-sm text-gray-700 dark:text-gray-300">
                  Currently Studying
                </label>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id={`highlight-${edu.id}`}
                  checked={edu.is_highlighted}
                  onChange={(e) => updateEducation(index, { is_highlighted: e.target.checked })}
                  className="w-4 h-4"
                />
                <label htmlFor={`highlight-${edu.id}`} className="text-sm text-gray-700 dark:text-gray-300">
                  Highlighted
                </label>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-2 mt-4">
            <button
              onClick={() => handleDelete(edu.id)}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg"
            >
              Delete
            </button>
            <button
              onClick={() => handleSave(edu)}
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
