'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import {
  ArrowLeftIcon,
  ArrowDownTrayIcon,
  SparklesIcon,
  TrashIcon,
} from '@heroicons/react/24/outline';
import { generateCoverLetterPDF } from '@/utils/generateCoverLetter';

const DEFAULT_ROLE = 'Senior AI Engineer';

export default function AdminCoverLetterPage() {
  const [input, setInput] = useState('');
  const [letter, setLetter] = useState('');
  const [role, setRole] = useState(DEFAULT_ROLE);
  const [addMissingSkills, setAddMissingSkills] = useState(true);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  const dateLabel = useMemo(
    () => new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
    []
  );

  const generate = async () => {
    if (!input.trim()) return;
    setBusy(true);
    setError('');
    try {
      const res = await fetch('/api/admin/cover-letter/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        // Pass the existing letter so the prompt can revise instead of restart.
        body: JSON.stringify({ input, existing: letter, addMissingSkills }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(data.error || 'Generation failed.');
        return;
      }
      setLetter(data.letter);
      if (data.role) setRole(data.role);
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setBusy(false);
    }
  };

  const download = () => {
    if (!letter.trim()) return;
    generateCoverLetterPDF(letter, dateLabel, role.trim() || DEFAULT_ROLE);
  };

  const clear = () => {
    setLetter('');
    setRole(DEFAULT_ROLE);
    setError('');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Top bar */}
      <div className="sticky top-0 z-10 bg-white/90 dark:bg-gray-800/90 backdrop-blur border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <Link
              href="/admin"
              className="inline-flex items-center gap-1.5 text-sm text-gray-600 dark:text-gray-300 hover:text-blue-600"
            >
              <ArrowLeftIcon className="w-4 h-4" />
              Admin
            </Link>
            <span className="text-gray-300 dark:text-gray-600">/</span>
            <h1 className="font-semibold text-gray-900 dark:text-white truncate">Cover Letter Generator</h1>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={clear}
              disabled={!letter}
              className="inline-flex items-center gap-1.5 text-sm px-3 py-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-40"
            >
              <TrashIcon className="w-4 h-4" />
              Clear
            </button>
            <button
              onClick={download}
              disabled={!letter.trim()}
              className="inline-flex items-center gap-1.5 text-sm px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium disabled:opacity-50"
            >
              <ArrowDownTrayIcon className="w-4 h-4" />
              Download PDF
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Input */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-4 mb-6">
          <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            <SparklesIcon className="w-4 h-4 text-blue-500" />
            Describe the role / company (or paste the job description)
          </label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="e.g. Senior AI Engineer at Acme AI, Bangkok. They want LangGraph agents, RAG, and AWS experience. Emphasize my revenue-growth AI agent work."
            disabled={busy}
            className="w-full h-28 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none disabled:opacity-60"
          />
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mt-3 gap-3">
            <label className="flex items-start gap-2 text-xs text-gray-500 dark:text-gray-400 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={addMissingSkills}
                onChange={(e) => setAddMissingSkills(e.target.checked)}
                disabled={busy}
                className="mt-0.5 h-4 w-4 rounded border-gray-300 dark:border-gray-600 text-indigo-600 focus:ring-indigo-500"
              />
              <span>
                Present job-required skills I don&apos;t have yet as my own. Employers, dates, degrees and
                metrics are never fabricated. The header role adapts to the job automatically.
              </span>
            </label>
            <button
              onClick={generate}
              disabled={busy || !input.trim()}
              className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 hover:opacity-90 text-white font-medium disabled:opacity-50 whitespace-nowrap"
            >
              <SparklesIcon className="w-4 h-4" />
              {busy ? 'Generating…' : letter ? 'Regenerate' : 'Generate'}
            </button>
          </div>
          {error && <p className="text-sm text-red-500 mt-2">{error}</p>}
        </div>

        {/* Editor + Preview */}
        <div className="grid gap-6 lg:grid-cols-2">
          <div>
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-sm font-semibold text-gray-700 dark:text-gray-300">Editor</h2>
              {busy && <span className="text-xs text-blue-500 animate-pulse">AI is writing…</span>}
            </div>
            <textarea
              value={letter}
              onChange={(e) => setLetter(e.target.value)}
              placeholder="Your generated cover letter will appear here. You can edit it freely."
              className="w-full h-[65vh] rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-4 text-sm leading-relaxed focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            />
          </div>

          <div>
            <h2 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Preview</h2>
            <div className="h-[65vh] overflow-auto rounded-2xl border border-gray-200 dark:border-gray-700 bg-white shadow-inner">
              <div className="p-8 text-gray-900">
                <div className="border-b border-gray-300 pb-3 mb-4">
                  <p className="text-xl font-extrabold tracking-wide">NYI HTUT ZAW</p>
                  <input
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    aria-label="Header role"
                    placeholder={DEFAULT_ROLE}
                    className="text-sm w-full bg-transparent border border-transparent hover:border-gray-200 focus:border-blue-400 rounded px-1 -ml-1 focus:outline-none"
                  />
                  <p className="text-xs text-gray-600 mt-1">
                    nyihtutzaw.2015@gmail.com | +66 92 540 2997
                  </p>
                  <p className="text-xs text-gray-600">
                    linkedin.com/in/nyihtutzaw | github.com/nyihtutzaw
                  </p>
                </div>
                <p className="text-sm text-gray-600 mb-4">{dateLabel}</p>
                {letter.trim() ? (
                  letter
                    .replace(/\r\n/g, '\n')
                    .split(/\n{2,}/)
                    .map((para, i) => (
                      <p key={i} className="text-sm leading-relaxed mb-3 whitespace-pre-line">
                        {para.trim()}
                      </p>
                    ))
                ) : (
                  <p className="text-sm text-gray-400 italic">
                    Generate a cover letter to see the preview.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
