'use client';

import dynamic from 'next/dynamic';
import 'react-quill-new/dist/quill.snow.css';

const ReactQuill = dynamic(() => import('react-quill-new'), { 
  ssr: false,
  loading: () => <div className="h-48 bg-gray-100 dark:bg-gray-700 rounded-lg animate-pulse" />
});

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const modules = {
  toolbar: [
    [{ 'header': [1, 2, 3, false] }],
    ['bold', 'italic', 'underline', 'strike'],
    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
    ['link'],
    ['clean']
  ],
};

export default function RichTextEditor({ value, onChange, placeholder }: RichTextEditorProps) {
  return (
    <div className="rich-text-editor">
      <ReactQuill
        theme="snow"
        value={value}
        onChange={onChange}
        modules={modules}
        placeholder={placeholder}
        className="bg-white dark:bg-gray-700 rounded-lg"
      />
      <style jsx global>{`
        .rich-text-editor .ql-toolbar {
          border-top-left-radius: 0.5rem;
          border-top-right-radius: 0.5rem;
          background: #f3f4f6;
          border-color: #d1d5db;
        }
        .dark .rich-text-editor .ql-toolbar {
          background: #374151;
          border-color: #4b5563;
        }
        .rich-text-editor .ql-container {
          border-bottom-left-radius: 0.5rem;
          border-bottom-right-radius: 0.5rem;
          min-height: 150px;
          border-color: #d1d5db;
        }
        .dark .rich-text-editor .ql-container {
          border-color: #4b5563;
        }
        .rich-text-editor .ql-editor {
          min-height: 150px;
          color: #111827;
        }
        .dark .rich-text-editor .ql-editor {
          color: #f9fafb;
        }
        .dark .rich-text-editor .ql-editor.ql-blank::before {
          color: #9ca3af;
        }
        .dark .rich-text-editor .ql-stroke {
          stroke: #d1d5db;
        }
        .dark .rich-text-editor .ql-fill {
          fill: #d1d5db;
        }
        .dark .rich-text-editor .ql-picker-label {
          color: #d1d5db;
        }
      `}</style>
    </div>
  );
}
