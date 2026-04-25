'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import type { About, CoreValue, TimelineEvent } from '@/types/database';

export default function AboutEditor() {
  const [about, setAbout] = useState<About | null>(null);
  const [coreValues, setCoreValues] = useState<CoreValue[]>([]);
  const [timelineEvents, setTimelineEvents] = useState<TimelineEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const supabase = createClient();
    
    const [aboutRes, valuesRes, eventsRes] = await Promise.all([
      supabase.from('about').select('*').single(),
      supabase.from('core_values').select('*').order('sort_order'),
      supabase.from('timeline_events').select('*').order('sort_order'),
    ]);

    if (aboutRes.data) setAbout(aboutRes.data);
    if (valuesRes.data) setCoreValues(valuesRes.data);
    if (eventsRes.data) setTimelineEvents(eventsRes.data);
    setLoading(false);
  };

  const handleSaveAbout = async () => {
    if (!about) return;
    setSaving(true);
    setMessage(null);

    const supabase = createClient();
    const { error } = await supabase
      .from('about')
      .upsert({
        id: about.id || undefined,
        intro_title: about.intro_title,
        intro_paragraphs: about.intro_paragraphs,
      });

    if (error) {
      setMessage({ type: 'error', text: error.message });
    } else {
      setMessage({ type: 'success', text: 'About section saved!' });
    }
    setSaving(false);
  };

  const handleSaveCoreValue = async (value: CoreValue) => {
    const supabase = createClient();
    const { error } = await supabase
      .from('core_values')
      .upsert({
        id: value.id,
        title: value.title,
        description: value.description,
        icon: value.icon,
        sort_order: value.sort_order,
      });

    if (error) {
      setMessage({ type: 'error', text: error.message });
    } else {
      setMessage({ type: 'success', text: 'Core value saved!' });
      fetchData();
    }
  };

  const handleDeleteCoreValue = async (id: string) => {
    if (!confirm('Are you sure you want to delete this core value?')) return;
    
    const supabase = createClient();
    const { error } = await supabase.from('core_values').delete().eq('id', id);

    if (error) {
      setMessage({ type: 'error', text: error.message });
    } else {
      fetchData();
    }
  };

  const handleSaveTimelineEvent = async (event: TimelineEvent) => {
    const supabase = createClient();
    const { error } = await supabase
      .from('timeline_events')
      .upsert({
        id: event.id,
        year: event.year,
        title: event.title,
        description: event.description,
        icon: event.icon,
        color: event.color,
        sort_order: event.sort_order,
      });

    if (error) {
      setMessage({ type: 'error', text: error.message });
    } else {
      setMessage({ type: 'success', text: 'Timeline event saved!' });
      fetchData();
    }
  };

  const handleDeleteTimelineEvent = async (id: string) => {
    if (!confirm('Are you sure you want to delete this timeline event?')) return;
    
    const supabase = createClient();
    const { error } = await supabase.from('timeline_events').delete().eq('id', id);

    if (error) {
      setMessage({ type: 'error', text: error.message });
    } else {
      fetchData();
    }
  };

  const addNewCoreValue = () => {
    const newValue: CoreValue = {
      id: `new-${Date.now()}`,
      title: '',
      description: '',
      icon: 'LightBulbIcon',
      sort_order: coreValues.length,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    setCoreValues([...coreValues, newValue]);
  };

  const addNewTimelineEvent = () => {
    const newEvent: TimelineEvent = {
      id: `new-${Date.now()}`,
      year: '',
      title: '',
      description: '',
      icon: 'RocketLaunchIcon',
      color: 'from-blue-500 to-blue-600',
      sort_order: timelineEvents.length,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    setTimelineEvents([...timelineEvents, newEvent]);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
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

      {/* About Section */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          About Introduction
        </h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Intro Title
            </label>
            <input
              type="text"
              value={about?.intro_title || ''}
              onChange={(e) => setAbout(about ? { ...about, intro_title: e.target.value } : null)}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Intro Paragraphs (one per line)
            </label>
            <textarea
              value={about?.intro_paragraphs?.join('\n') || ''}
              onChange={(e) => setAbout(about ? { ...about, intro_paragraphs: e.target.value.split('\n') } : null)}
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
          </div>
          <div className="flex justify-end">
            <button
              onClick={handleSaveAbout}
              disabled={saving}
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold rounded-lg"
            >
              {saving ? 'Saving...' : 'Save About'}
            </button>
          </div>
        </div>
      </div>

      {/* Core Values */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Core Values
          </h2>
          <button
            onClick={addNewCoreValue}
            className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg"
          >
            + Add Value
          </button>
        </div>
        <div className="space-y-4">
          {coreValues.map((value, index) => (
            <div key={value.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <input
                  type="text"
                  placeholder="Title"
                  value={value.title}
                  onChange={(e) => {
                    const updated = [...coreValues];
                    updated[index] = { ...value, title: e.target.value };
                    setCoreValues(updated);
                  }}
                  className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
                <input
                  type="text"
                  placeholder="Icon (e.g., LightBulbIcon)"
                  value={value.icon}
                  onChange={(e) => {
                    const updated = [...coreValues];
                    updated[index] = { ...value, icon: e.target.value };
                    setCoreValues(updated);
                  }}
                  className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>
              <textarea
                placeholder="Description"
                value={value.description}
                onChange={(e) => {
                  const updated = [...coreValues];
                  updated[index] = { ...value, description: e.target.value };
                  setCoreValues(updated);
                }}
                rows={2}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white mb-4"
              />
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => handleDeleteCoreValue(value.id)}
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm"
                >
                  Delete
                </button>
                <button
                  onClick={() => handleSaveCoreValue(value)}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm"
                >
                  Save
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Timeline Events */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Timeline Events
          </h2>
          <button
            onClick={addNewTimelineEvent}
            className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg"
          >
            + Add Event
          </button>
        </div>
        <div className="space-y-4">
          {timelineEvents.map((event, index) => (
            <div key={event.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <input
                  type="text"
                  placeholder="Year (e.g., 2020-2022)"
                  value={event.year}
                  onChange={(e) => {
                    const updated = [...timelineEvents];
                    updated[index] = { ...event, year: e.target.value };
                    setTimelineEvents(updated);
                  }}
                  className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
                <input
                  type="text"
                  placeholder="Title"
                  value={event.title}
                  onChange={(e) => {
                    const updated = [...timelineEvents];
                    updated[index] = { ...event, title: e.target.value };
                    setTimelineEvents(updated);
                  }}
                  className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
                <input
                  type="text"
                  placeholder="Color (e.g., from-blue-500 to-blue-600)"
                  value={event.color}
                  onChange={(e) => {
                    const updated = [...timelineEvents];
                    updated[index] = { ...event, color: e.target.value };
                    setTimelineEvents(updated);
                  }}
                  className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>
              <textarea
                placeholder="Description"
                value={event.description}
                onChange={(e) => {
                  const updated = [...timelineEvents];
                  updated[index] = { ...event, description: e.target.value };
                  setTimelineEvents(updated);
                }}
                rows={2}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white mb-4"
              />
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => handleDeleteTimelineEvent(event.id)}
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm"
                >
                  Delete
                </button>
                <button
                  onClick={() => handleSaveTimelineEvent(event)}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm"
                >
                  Save
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
