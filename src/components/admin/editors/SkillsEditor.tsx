'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import type { SkillGroup, Skill } from '@/types/database';
import ImageUpload from '../ImageUpload';

export default function SkillsEditor() {
  const [skillGroups, setSkillGroups] = useState<SkillGroup[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const supabase = createClient();
    
    const { data: groups } = await supabase
      .from('skill_groups')
      .select('*')
      .order('sort_order');

    const { data: skills } = await supabase
      .from('skills')
      .select('*')
      .order('sort_order');

    const groupsWithSkills = (groups || []).map((group: SkillGroup) => ({
      ...group,
      skills: (skills || []).filter((skill: Skill) => skill.group_id === group.id)
    }));

    setSkillGroups(groupsWithSkills);
    setLoading(false);
  };

  const handleSaveGroup = async (group: SkillGroup) => {
    const supabase = createClient();
    const isNew = group.id.startsWith('new-');
    
    const { error } = await supabase
      .from('skill_groups')
      .upsert({
        id: isNew ? undefined : group.id,
        name: group.name,
        sort_order: group.sort_order,
      });

    if (error) {
      setMessage({ type: 'error', text: error.message });
    } else {
      setMessage({ type: 'success', text: 'Skill group saved!' });
      fetchData();
    }
  };

  const handleDeleteGroup = async (id: string) => {
    if (!confirm('Are you sure? This will delete all skills in this group.')) return;
    
    const supabase = createClient();
    await supabase.from('skills').delete().eq('group_id', id);
    const { error } = await supabase.from('skill_groups').delete().eq('id', id);

    if (error) {
      setMessage({ type: 'error', text: error.message });
    } else {
      fetchData();
    }
  };

  const handleSaveSkill = async (skill: Skill) => {
    const supabase = createClient();
    const isNew = skill.id.startsWith('new-');
    
    const { error } = await supabase
      .from('skills')
      .upsert({
        id: isNew ? undefined : skill.id,
        group_id: skill.group_id,
        name: skill.name,
        logo_url: skill.logo_url,
        sort_order: skill.sort_order,
      });

    if (error) {
      setMessage({ type: 'error', text: error.message });
    } else {
      setMessage({ type: 'success', text: 'Skill saved!' });
      fetchData();
    }
  };

  const handleDeleteSkill = async (id: string) => {
    if (!confirm('Are you sure you want to delete this skill?')) return;
    
    const supabase = createClient();
    const { error } = await supabase.from('skills').delete().eq('id', id);

    if (error) {
      setMessage({ type: 'error', text: error.message });
    } else {
      fetchData();
    }
  };

  const addNewGroup = () => {
    const newGroup: SkillGroup = {
      id: `new-${Date.now()}`,
      name: '',
      sort_order: skillGroups.length,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      skills: [],
    };
    setSkillGroups([...skillGroups, newGroup]);
  };

  const addNewSkill = (groupId: string) => {
    const groupIndex = skillGroups.findIndex(g => g.id === groupId);
    if (groupIndex === -1) return;

    const newSkill: Skill = {
      id: `new-${Date.now()}`,
      group_id: groupId,
      name: '',
      logo_url: null,
      sort_order: skillGroups[groupIndex].skills?.length || 0,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    const updated = [...skillGroups];
    updated[groupIndex] = {
      ...updated[groupIndex],
      skills: [...(updated[groupIndex].skills || []), newSkill],
    };
    setSkillGroups(updated);
  };

  const updateSkill = (groupIndex: number, skillIndex: number, updates: Partial<Skill>) => {
    const updated = [...skillGroups];
    const skills = [...(updated[groupIndex].skills || [])];
    skills[skillIndex] = { ...skills[skillIndex], ...updates };
    updated[groupIndex] = { ...updated[groupIndex], skills };
    setSkillGroups(updated);
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
          Skills
        </h2>
        <button
          onClick={addNewGroup}
          className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg"
        >
          + Add Group
        </button>
      </div>

      {skillGroups.map((group, groupIndex) => (
        <div key={group.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <div className="flex items-center gap-4 mb-6">
            <input
              type="text"
              placeholder="Group Name"
              value={group.name}
              onChange={(e) => {
                const updated = [...skillGroups];
                updated[groupIndex] = { ...group, name: e.target.value };
                setSkillGroups(updated);
              }}
              className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-lg font-semibold"
            />
            <button
              onClick={() => handleSaveGroup(group)}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
            >
              Save Group
            </button>
            <button
              onClick={() => handleDeleteGroup(group.id)}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg"
            >
              Delete
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {group.skills?.map((skill, skillIndex) => (
              <div key={skill.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                <div className="flex flex-col items-center gap-2">
                  <ImageUpload
                    currentImage={skill.logo_url || ''}
                    onUpload={(url) => updateSkill(groupIndex, skillIndex, { logo_url: url })}
                    folder="skills"
                  />
                  <input
                    type="text"
                    placeholder="Skill Name"
                    value={skill.name}
                    onChange={(e) => updateSkill(groupIndex, skillIndex, { name: e.target.value })}
                    className="w-full px-3 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-center"
                  />
                  <div className="flex gap-1">
                    <button
                      onClick={() => handleDeleteSkill(skill.id)}
                      className="px-2 py-1 text-xs bg-red-600 hover:bg-red-700 text-white rounded"
                    >
                      ✕
                    </button>
                    <button
                      onClick={() => handleSaveSkill(skill)}
                      className="px-2 py-1 text-xs bg-blue-600 hover:bg-blue-700 text-white rounded"
                    >
                      ✓
                    </button>
                  </div>
                </div>
              </div>
            ))}
            <button
              onClick={() => addNewSkill(group.id)}
              className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-4 flex items-center justify-center text-gray-500 dark:text-gray-400 hover:border-blue-500 hover:text-blue-500 transition-colors"
            >
              + Add Skill
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
