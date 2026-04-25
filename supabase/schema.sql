-- =============================================
-- Portfolio Database Schema
-- Run this in Supabase SQL Editor
-- =============================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =============================================
-- PROFILE TABLE (Hero section, contact info)
-- =============================================
CREATE TABLE IF NOT EXISTS profile (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  title VARCHAR(255) NOT NULL,
  bio TEXT,
  email VARCHAR(255),
  location VARCHAR(255),
  profile_image_url TEXT,
  linkedin_url TEXT,
  github_url TEXT,
  medium_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =============================================
-- ABOUT SECTION
-- =============================================
CREATE TABLE IF NOT EXISTS about (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  intro_title VARCHAR(255),
  intro_paragraphs TEXT[], -- Array of paragraphs
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS core_values (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  icon VARCHAR(100) NOT NULL, -- Icon name from heroicons
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS timeline_events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  year VARCHAR(50) NOT NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  icon VARCHAR(100) NOT NULL,
  color VARCHAR(100) NOT NULL, -- Tailwind gradient class
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =============================================
-- WORK EXPERIENCE
-- =============================================
CREATE TABLE IF NOT EXISTS work_experience (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  logo_url TEXT,
  logo_alt VARCHAR(255),
  title VARCHAR(255) NOT NULL,
  company VARCHAR(255) NOT NULL,
  employment_type VARCHAR(100), -- Full-time, Contract, etc.
  period VARCHAR(100) NOT NULL,
  location VARCHAR(255),
  description TEXT,
  details TEXT, -- HTML content for detailed view
  skills TEXT[], -- Array of skill names
  show_in_cv BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =============================================
-- EDUCATION
-- =============================================
CREATE TABLE IF NOT EXISTS education (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  logo_url TEXT,
  logo_alt VARCHAR(255),
  period VARCHAR(100) NOT NULL,
  degree VARCHAR(255) NOT NULL,
  institution VARCHAR(255) NOT NULL,
  grade VARCHAR(100),
  skills TEXT[],
  is_current BOOLEAN DEFAULT false,
  is_highlighted BOOLEAN DEFAULT false,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =============================================
-- SKILLS
-- =============================================
CREATE TABLE IF NOT EXISTS skill_groups (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS skills (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  group_id UUID REFERENCES skill_groups(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  logo_url TEXT,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =============================================
-- CERTIFICATIONS
-- =============================================
CREATE TABLE IF NOT EXISTS certifications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title VARCHAR(255) NOT NULL,
  image_url TEXT,
  issued_by VARCHAR(255) NOT NULL,
  date VARCHAR(50),
  credential_url TEXT,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =============================================
-- PROJECTS
-- =============================================
CREATE TABLE IF NOT EXISTS projects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title VARCHAR(255) NOT NULL,
  description TEXT,
  image_url TEXT,
  technologies TEXT[],
  github_url TEXT,
  live_url TEXT,
  is_featured BOOLEAN DEFAULT false,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =============================================
-- BLOG POSTS
-- =============================================
CREATE TABLE IF NOT EXISTS blog_posts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  excerpt TEXT,
  content TEXT,
  cover_image_url TEXT,
  is_published BOOLEAN DEFAULT false,
  published_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =============================================
-- ROW LEVEL SECURITY (RLS)
-- =============================================

-- Enable RLS on all tables
ALTER TABLE profile ENABLE ROW LEVEL SECURITY;
ALTER TABLE about ENABLE ROW LEVEL SECURITY;
ALTER TABLE core_values ENABLE ROW LEVEL SECURITY;
ALTER TABLE timeline_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE work_experience ENABLE ROW LEVEL SECURITY;
ALTER TABLE education ENABLE ROW LEVEL SECURITY;
ALTER TABLE skill_groups ENABLE ROW LEVEL SECURITY;
ALTER TABLE skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE certifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

-- Public read access for all tables (portfolio is public)
CREATE POLICY "Public read access" ON profile FOR SELECT USING (true);
CREATE POLICY "Public read access" ON about FOR SELECT USING (true);
CREATE POLICY "Public read access" ON core_values FOR SELECT USING (true);
CREATE POLICY "Public read access" ON timeline_events FOR SELECT USING (true);
CREATE POLICY "Public read access" ON work_experience FOR SELECT USING (true);
CREATE POLICY "Public read access" ON education FOR SELECT USING (true);
CREATE POLICY "Public read access" ON skill_groups FOR SELECT USING (true);
CREATE POLICY "Public read access" ON skills FOR SELECT USING (true);
CREATE POLICY "Public read access" ON certifications FOR SELECT USING (true);
CREATE POLICY "Public read access" ON projects FOR SELECT USING (true);
CREATE POLICY "Public read access for published posts" ON blog_posts FOR SELECT USING (is_published = true);

-- Authenticated users can do everything (admin)
CREATE POLICY "Admin full access" ON profile FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access" ON about FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access" ON core_values FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access" ON timeline_events FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access" ON work_experience FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access" ON education FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access" ON skill_groups FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access" ON skills FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access" ON certifications FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access" ON projects FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access" ON blog_posts FOR ALL USING (auth.role() = 'authenticated');

-- =============================================
-- STORAGE BUCKET SETUP (Run separately or via dashboard)
-- =============================================
-- INSERT INTO storage.buckets (id, name, public) VALUES ('portfolio-images', 'portfolio-images', true);

-- Storage policies
-- CREATE POLICY "Public read access" ON storage.objects FOR SELECT USING (bucket_id = 'portfolio-images');
-- CREATE POLICY "Admin upload access" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'portfolio-images' AND auth.role() = 'authenticated');
-- CREATE POLICY "Admin update access" ON storage.objects FOR UPDATE USING (bucket_id = 'portfolio-images' AND auth.role() = 'authenticated');
-- CREATE POLICY "Admin delete access" ON storage.objects FOR DELETE USING (bucket_id = 'portfolio-images' AND auth.role() = 'authenticated');

-- =============================================
-- UPDATED_AT TRIGGER
-- =============================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_profile_updated_at BEFORE UPDATE ON profile FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_about_updated_at BEFORE UPDATE ON about FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_core_values_updated_at BEFORE UPDATE ON core_values FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_timeline_events_updated_at BEFORE UPDATE ON timeline_events FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_work_experience_updated_at BEFORE UPDATE ON work_experience FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_education_updated_at BEFORE UPDATE ON education FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_skill_groups_updated_at BEFORE UPDATE ON skill_groups FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_skills_updated_at BEFORE UPDATE ON skills FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_certifications_updated_at BEFORE UPDATE ON certifications FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_projects_updated_at BEFORE UPDATE ON projects FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_blog_posts_updated_at BEFORE UPDATE ON blog_posts FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
