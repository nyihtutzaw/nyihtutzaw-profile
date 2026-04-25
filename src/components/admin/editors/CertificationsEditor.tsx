'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import type { Certification } from '@/types/database';
import ImageUpload from '../ImageUpload';

export default function CertificationsEditor() {
  const [certifications, setCertifications] = useState<Certification[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('certifications')
      .select('*')
      .order('sort_order');

    if (error) {
      console.error('Error fetching certifications:', error);
    } else {
      setCertifications(data || []);
    }
    setLoading(false);
  };

  const handleSave = async (cert: Certification) => {
    const supabase = createClient();
    const isNew = cert.id.startsWith('new-');
    
    const { error } = await supabase
      .from('certifications')
      .upsert({
        id: isNew ? undefined : cert.id,
        title: cert.title,
        image_url: cert.image_url,
        issued_by: cert.issued_by,
        date: cert.date,
        credential_url: cert.credential_url,
        sort_order: cert.sort_order,
      });

    if (error) {
      setMessage({ type: 'error', text: error.message });
    } else {
      setMessage({ type: 'success', text: 'Certification saved!' });
      fetchData();
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this certification?')) return;
    
    const supabase = createClient();
    const { error } = await supabase.from('certifications').delete().eq('id', id);

    if (error) {
      setMessage({ type: 'error', text: error.message });
    } else {
      fetchData();
    }
  };

  const addNew = () => {
    const newCert: Certification = {
      id: `new-${Date.now()}`,
      title: '',
      image_url: null,
      issued_by: '',
      date: null,
      credential_url: null,
      sort_order: certifications.length,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    setCertifications([newCert, ...certifications]);
  };

  const updateCertification = (index: number, updates: Partial<Certification>) => {
    const updated = [...certifications];
    updated[index] = { ...updated[index], ...updates };
    setCertifications(updated);
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
          Certifications
        </h2>
        <button
          onClick={addNew}
          className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg"
        >
          + Add Certification
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {certifications.map((cert, index) => (
          <div key={cert.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <div className="flex flex-col items-center gap-4 mb-4">
              <div className="w-full aspect-video relative overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700">
                {cert.image_url ? (
                  <img
                    src={cert.image_url}
                    alt={cert.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                    <span className="text-gray-400">No image</span>
                  </div>
                )}
              </div>
              <ImageUpload
                currentImage={cert.image_url || ''}
                onUpload={(url) => updateCertification(index, { image_url: url })}
                folder="certifications"
              />
            </div>

            <div className="space-y-4">
              <input
                type="text"
                placeholder="Title"
                value={cert.title}
                onChange={(e) => updateCertification(index, { title: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
              <input
                type="text"
                placeholder="Issued By"
                value={cert.issued_by}
                onChange={(e) => updateCertification(index, { issued_by: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Date (e.g., 2024)"
                  value={cert.date || ''}
                  onChange={(e) => updateCertification(index, { date: e.target.value })}
                  className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
                <input
                  type="url"
                  placeholder="Credential URL"
                  value={cert.credential_url || ''}
                  onChange={(e) => updateCertification(index, { credential_url: e.target.value })}
                  className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={() => handleDelete(cert.id)}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg"
              >
                Delete
              </button>
              <button
                onClick={() => handleSave(cert)}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
              >
                Save
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
