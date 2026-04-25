'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import type { Project } from '@/types/database';
import ImageUpload from '../ImageUpload';

export default function ProjectsEditor() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('sort_order');

    if (error) {
      console.error('Error fetching projects:', error);
    } else {
      setProjects(data || []);
    }
    setLoading(false);
  };

  const handleSave = async (project: Project) => {
    const supabase = createClient();
    const isNew = project.id.startsWith('new-');
    
    const { error } = await supabase
      .from('projects')
      .upsert({
        id: isNew ? undefined : project.id,
        title: project.title,
        description: project.description,
        image_url: project.image_url,
        technologies: project.technologies,
        github_url: project.github_url,
        live_url: project.live_url,
        is_featured: project.is_featured,
        sort_order: project.sort_order,
      });

    if (error) {
      setMessage({ type: 'error', text: error.message });
    } else {
      setMessage({ type: 'success', text: 'Project saved!' });
      fetchData();
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this project?')) return;
    
    const supabase = createClient();
    const { error } = await supabase.from('projects').delete().eq('id', id);

    if (error) {
      setMessage({ type: 'error', text: error.message });
    } else {
      fetchData();
    }
  };

  const addNew = () => {
    const newProject: Project = {
      id: `new-${Date.now()}`,
      title: '',
      description: null,
      image_url: null,
      technologies: [],
      github_url: null,
      live_url: null,
      is_featured: false,
      sort_order: projects.length,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    setProjects([newProject, ...projects]);
  };

  const updateProject = (index: number, updates: Partial<Project>) => {
    const updated = [...projects];
    updated[index] = { ...updated[index], ...updates };
    setProjects(updated);
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
          Projects
        </h2>
        <button
          onClick={addNew}
          className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg"
        >
          + Add Project
        </button>
      </div>

      {projects.map((project, index) => (
        <div key={project.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex flex-col items-center gap-4">
              <div className="w-full aspect-video relative overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700">
                {project.image_url ? (
                  <img
                    src={project.image_url}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                    <span className="text-gray-400">No image</span>
                  </div>
                )}
              </div>
              <ImageUpload
                currentImage={project.image_url || ''}
                onUpload={(url) => updateProject(index, { image_url: url })}
                folder="projects"
              />
            </div>

            <div className="md:col-span-2 space-y-4">
              <input
                type="text"
                placeholder="Project Title"
                value={project.title}
                onChange={(e) => updateProject(index, { title: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
              
              <textarea
                placeholder="Description"
                value={project.description || ''}
                onChange={(e) => updateProject(index, { description: e.target.value })}
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />

              <input
                type="text"
                placeholder="Technologies (comma-separated)"
                value={project.technologies?.join(', ') || ''}
                onChange={(e) => updateProject(index, { technologies: e.target.value.split(',').map(s => s.trim()).filter(Boolean) })}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />

              <div className="grid grid-cols-2 gap-4">
                <input
                  type="url"
                  placeholder="GitHub URL"
                  value={project.github_url || ''}
                  onChange={(e) => updateProject(index, { github_url: e.target.value })}
                  className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
                <input
                  type="url"
                  placeholder="Live URL"
                  value={project.live_url || ''}
                  onChange={(e) => updateProject(index, { live_url: e.target.value })}
                  className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id={`featured-${project.id}`}
                  checked={project.is_featured}
                  onChange={(e) => updateProject(index, { is_featured: e.target.checked })}
                  className="w-4 h-4"
                />
                <label htmlFor={`featured-${project.id}`} className="text-sm text-gray-700 dark:text-gray-300">
                  Featured Project
                </label>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-2 mt-4">
            <button
              onClick={() => handleDelete(project.id)}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg"
            >
              Delete
            </button>
            <button
              onClick={() => handleSave(project)}
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
