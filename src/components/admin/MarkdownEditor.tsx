'use client';

import dynamic from 'next/dynamic';
import '@uiw/react-md-editor/markdown-editor.css';
import '@uiw/react-markdown-preview/markdown.css';

const MDEditor = dynamic(() => import('@uiw/react-md-editor'), { 
  ssr: false,
  loading: () => <div className="h-48 bg-gray-100 dark:bg-gray-700 rounded-lg animate-pulse" />
});

interface MarkdownEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  height?: number;
}

export default function MarkdownEditor({ value, onChange, placeholder, height = 300 }: MarkdownEditorProps) {
  return (
    <div data-color-mode="light" className="markdown-editor-wrapper">
      <MDEditor
        value={value}
        onChange={(val) => onChange(val || '')}
        preview="live"
        height={height}
        textareaProps={{
          placeholder: placeholder || 'Write your content in Markdown...',
        }}
      />
      <style jsx global>{`
        .markdown-editor-wrapper .w-md-editor {
          border-radius: 0.5rem;
          border: 1px solid #d1d5db;
        }
        .dark .markdown-editor-wrapper {
          --color-canvas-default: #1f2937;
          --color-fg-default: #f9fafb;
        }
        .dark .markdown-editor-wrapper .w-md-editor {
          background-color: #1f2937;
          border-color: #4b5563;
        }
        .dark .markdown-editor-wrapper .w-md-editor-toolbar {
          background-color: #374151;
          border-color: #4b5563;
        }
        .dark .markdown-editor-wrapper .w-md-editor-toolbar li > button {
          color: #d1d5db;
        }
        .dark .markdown-editor-wrapper .w-md-editor-content {
          background-color: #1f2937;
        }
        .dark .markdown-editor-wrapper .w-md-editor-text-input,
        .dark .markdown-editor-wrapper .w-md-editor-text-pre > code {
          color: #f9fafb !important;
        }
        .dark .markdown-editor-wrapper .wmde-markdown {
          background-color: #1f2937;
          color: #f9fafb;
        }
      `}</style>
    </div>
  );
}
