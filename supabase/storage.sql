-- =============================================
-- Storage Bucket Setup
-- Run this in Supabase SQL Editor AFTER schema.sql
-- =============================================

-- Create the storage bucket for portfolio images
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'portfolio-images',
  'portfolio-images',
  true,
  5242880, -- 5MB limit
  ARRAY['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml']
) ON CONFLICT (id) DO NOTHING;

-- Storage policies for public read access
CREATE POLICY "Public read access for portfolio images"
ON storage.objects FOR SELECT
USING (bucket_id = 'portfolio-images');

-- Storage policies for authenticated users (admin) to upload
CREATE POLICY "Admin upload access for portfolio images"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'portfolio-images' AND auth.role() = 'authenticated');

-- Storage policies for authenticated users (admin) to update
CREATE POLICY "Admin update access for portfolio images"
ON storage.objects FOR UPDATE
USING (bucket_id = 'portfolio-images' AND auth.role() = 'authenticated');

-- Storage policies for authenticated users (admin) to delete
CREATE POLICY "Admin delete access for portfolio images"
ON storage.objects FOR DELETE
USING (bucket_id = 'portfolio-images' AND auth.role() = 'authenticated');
