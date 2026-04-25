import { createClient } from '@/lib/supabase/server';
import type { 
  Profile, 
  About, 
  CoreValue, 
  TimelineEvent, 
  WorkExperience, 
  Education, 
  SkillGroup, 
  Skill, 
  Certification, 
  Project, 
  BlogPost 
} from '@/types/database';

// Profile
export async function getProfile(): Promise<Profile | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('profile')
    .select('*')
    .single();
  
  if (error) {
    console.error('Error fetching profile:', error);
    return null;
  }
  return data;
}

// About Section
export async function getAbout(): Promise<About | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('about')
    .select('*')
    .single();
  
  if (error) {
    console.error('Error fetching about:', error);
    return null;
  }
  return data;
}

export async function getCoreValues(): Promise<CoreValue[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('core_values')
    .select('*')
    .order('sort_order', { ascending: true });
  
  if (error) {
    console.error('Error fetching core values:', error);
    return [];
  }
  return data || [];
}

export async function getTimelineEvents(): Promise<TimelineEvent[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('timeline_events')
    .select('*')
    .order('sort_order', { ascending: true });
  
  if (error) {
    console.error('Error fetching timeline events:', error);
    return [];
  }
  return data || [];
}

// Work Experience
export async function getWorkExperience(): Promise<WorkExperience[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('work_experience')
    .select('*')
    .order('sort_order', { ascending: true });
  
  if (error) {
    console.error('Error fetching work experience:', error);
    return [];
  }
  return data || [];
}

// Education
export async function getEducation(): Promise<Education[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('education')
    .select('*')
    .order('sort_order', { ascending: true });
  
  if (error) {
    console.error('Error fetching education:', error);
    return [];
  }
  return data || [];
}

// Skills
export async function getSkillGroups(): Promise<SkillGroup[]> {
  const supabase = await createClient();
  const { data: groups, error: groupsError } = await supabase
    .from('skill_groups')
    .select('*')
    .order('sort_order', { ascending: true });
  
  if (groupsError) {
    console.error('Error fetching skill groups:', groupsError);
    return [];
  }

  const { data: skills, error: skillsError } = await supabase
    .from('skills')
    .select('*')
    .order('sort_order', { ascending: true });
  
  if (skillsError) {
    console.error('Error fetching skills:', skillsError);
    return groups || [];
  }

  // Combine groups with their skills
  return (groups || []).map((group: SkillGroup) => ({
    ...group,
    skills: (skills || []).filter((skill: Skill) => skill.group_id === group.id)
  }));
}

export async function getSkills(): Promise<Skill[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('skills')
    .select('*')
    .order('sort_order', { ascending: true });
  
  if (error) {
    console.error('Error fetching skills:', error);
    return [];
  }
  return data || [];
}

// Certifications
export async function getCertifications(): Promise<Certification[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('certifications')
    .select('*')
    .order('sort_order', { ascending: true });
  
  if (error) {
    console.error('Error fetching certifications:', error);
    return [];
  }
  return data || [];
}

// Projects
export async function getProjects(): Promise<Project[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .order('sort_order', { ascending: true });
  
  if (error) {
    console.error('Error fetching projects:', error);
    return [];
  }
  return data || [];
}

export async function getFeaturedProjects(): Promise<Project[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('is_featured', true)
    .order('sort_order', { ascending: true });
  
  if (error) {
    console.error('Error fetching featured projects:', error);
    return [];
  }
  return data || [];
}

// Blog Posts
export async function getBlogPosts(): Promise<BlogPost[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('is_published', true)
    .order('published_at', { ascending: false });
  
  if (error) {
    console.error('Error fetching blog posts:', error);
    return [];
  }
  return data || [];
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('slug', slug)
    .eq('is_published', true)
    .single();
  
  if (error) {
    console.error('Error fetching blog post:', error);
    return null;
  }
  return data;
}
