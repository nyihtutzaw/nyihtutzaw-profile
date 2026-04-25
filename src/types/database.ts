export interface Profile {
  id: string;
  name: string;
  title: string;
  bio: string | null;
  email: string | null;
  location: string | null;
  profile_image_url: string | null;
  linkedin_url: string | null;
  github_url: string | null;
  medium_url: string | null;
  created_at: string;
  updated_at: string;
}

export interface About {
  id: string;
  intro_title: string | null;
  intro_paragraphs: string[] | null;
  created_at: string;
  updated_at: string;
}

export interface CoreValue {
  id: string;
  title: string;
  description: string;
  icon: string;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface TimelineEvent {
  id: string;
  year: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface WorkExperience {
  id: string;
  logo_url: string | null;
  logo_alt: string | null;
  title: string;
  company: string;
  employment_type: string | null;
  period: string;
  location: string | null;
  description: string | null;
  details: string | null;
  skills: string[] | null;
  show_in_cv: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface Education {
  id: string;
  logo_url: string | null;
  logo_alt: string | null;
  period: string;
  degree: string;
  institution: string;
  grade: string | null;
  skills: string[] | null;
  is_current: boolean;
  is_highlighted: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface SkillGroup {
  id: string;
  name: string;
  sort_order: number;
  created_at: string;
  updated_at: string;
  skills?: Skill[];
}

export interface Skill {
  id: string;
  group_id: string;
  name: string;
  logo_url: string | null;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface Certification {
  id: string;
  title: string;
  image_url: string | null;
  issued_by: string;
  date: string | null;
  credential_url: string | null;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface Project {
  id: string;
  title: string;
  description: string | null;
  image_url: string | null;
  technologies: string[] | null;
  github_url: string | null;
  live_url: string | null;
  is_featured: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string | null;
  cover_image_url: string | null;
  is_published: boolean;
  published_at: string | null;
  created_at: string;
  updated_at: string;
}

// Database types for Supabase
export type Database = {
  public: {
    Tables: {
      profile: {
        Row: Profile;
        Insert: Omit<Profile, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<Profile, 'id' | 'created_at' | 'updated_at'>>;
      };
      about: {
        Row: About;
        Insert: Omit<About, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<About, 'id' | 'created_at' | 'updated_at'>>;
      };
      core_values: {
        Row: CoreValue;
        Insert: Omit<CoreValue, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<CoreValue, 'id' | 'created_at' | 'updated_at'>>;
      };
      timeline_events: {
        Row: TimelineEvent;
        Insert: Omit<TimelineEvent, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<TimelineEvent, 'id' | 'created_at' | 'updated_at'>>;
      };
      work_experience: {
        Row: WorkExperience;
        Insert: Omit<WorkExperience, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<WorkExperience, 'id' | 'created_at' | 'updated_at'>>;
      };
      education: {
        Row: Education;
        Insert: Omit<Education, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<Education, 'id' | 'created_at' | 'updated_at'>>;
      };
      skill_groups: {
        Row: SkillGroup;
        Insert: Omit<SkillGroup, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<SkillGroup, 'id' | 'created_at' | 'updated_at'>>;
      };
      skills: {
        Row: Skill;
        Insert: Omit<Skill, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<Skill, 'id' | 'created_at' | 'updated_at'>>;
      };
      certifications: {
        Row: Certification;
        Insert: Omit<Certification, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<Certification, 'id' | 'created_at' | 'updated_at'>>;
      };
      projects: {
        Row: Project;
        Insert: Omit<Project, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<Project, 'id' | 'created_at' | 'updated_at'>>;
      };
      blog_posts: {
        Row: BlogPost;
        Insert: Omit<BlogPost, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<BlogPost, 'id' | 'created_at' | 'updated_at'>>;
      };
    };
  };
};
