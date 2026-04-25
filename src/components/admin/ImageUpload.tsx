'use client';

import { useState, useRef } from 'react';
import { createClient } from '@/lib/supabase/client';

interface ImageUploadProps {
  currentImage: string;
  onUpload: (url: string) => void;
  folder: string;
}

export default function ImageUpload({ currentImage, onUpload, folder }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState(currentImage);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);

    try {
      const supabase = createClient();
      const fileExt = file.name.split('.').pop();
      const fileName = `${folder}/${Date.now()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from('portfolio-images')
        .upload(fileName, file, { upsert: true });

      if (uploadError) {
        console.error('Upload error:', uploadError);
        return;
      }

      const { data: { publicUrl } } = supabase.storage
        .from('portfolio-images')
        .getPublicUrl(fileName);

      setPreview(publicUrl);
      onUpload(publicUrl);
    } catch (error) {
      console.error('Error uploading:', error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div
        onClick={() => fileInputRef.current?.click()}
        className="w-32 h-32 rounded-full border-4 border-dashed border-gray-300 dark:border-gray-600 flex items-center justify-center cursor-pointer hover:border-blue-500 transition-colors overflow-hidden"
      >
        {preview ? (
          <img src={preview} alt="Preview" className="w-full h-full object-cover" />
        ) : (
          <div className="text-center text-gray-500 dark:text-gray-400">
            <svg className="w-8 h-8 mx-auto mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            <span className="text-xs">Upload</span>
          </div>
        )}
      </div>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleUpload}
        className="hidden"
      />
      {uploading && (
        <p className="text-sm text-blue-600 dark:text-blue-400 mt-2">Uploading...</p>
      )}
    </div>
  );
}
