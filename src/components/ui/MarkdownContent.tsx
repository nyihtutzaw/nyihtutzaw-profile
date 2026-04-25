'use client';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface MarkdownContentProps {
  content: string;
  className?: string;
}

export default function MarkdownContent({ content, className = '' }: MarkdownContentProps) {
  return (
    <div className={`prose prose-sm dark:prose-invert max-w-none ${className}`}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
        a: ({ href, children }) => (
          <a href={href} target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">
            {children}
          </a>
        ),
        ul: ({ children }) => (
          <ul className="list-disc list-inside space-y-1 my-2">{children}</ul>
        ),
        ol: ({ children }) => (
          <ol className="list-decimal list-inside space-y-1 my-2">{children}</ol>
        ),
        li: ({ children }) => (
          <li className="text-gray-700 dark:text-gray-300">{children}</li>
        ),
        p: ({ children }) => (
          <p className="text-gray-700 dark:text-gray-300 my-2">{children}</p>
        ),
        h1: ({ children }) => (
          <h1 className="text-xl font-bold text-gray-900 dark:text-white mt-4 mb-2">{children}</h1>
        ),
        h2: ({ children }) => (
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mt-3 mb-2">{children}</h2>
        ),
        h3: ({ children }) => (
          <h3 className="text-base font-semibold text-gray-900 dark:text-white mt-2 mb-1">{children}</h3>
        ),
        strong: ({ children }) => (
          <strong className="font-semibold text-gray-900 dark:text-white">{children}</strong>
        ),
        em: ({ children }) => (
          <em className="italic">{children}</em>
        ),
        code: ({ children }) => (
          <code className="bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded text-sm font-mono">{children}</code>
        ),
        blockquote: ({ children }) => (
          <blockquote className="border-l-4 border-blue-500 pl-4 italic my-2">{children}</blockquote>
        ),
      }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
