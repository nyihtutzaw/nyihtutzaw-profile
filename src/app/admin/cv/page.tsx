'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import {
  ArrowLeftIcon,
  ArrowDownTrayIcon,
  SparklesIcon,
  ArrowPathIcon,
  BriefcaseIcon,
} from '@heroicons/react/24/outline';
import { buildCVMarkdown } from '@/lib/cvContent';
import { renderCVMarkdown } from '@/utils/renderCVMarkdown';
import { generateCVFromMarkdown } from '@/utils/generateCV';

export default function AdminCVPage() {
  const initial = useMemo(() => buildCVMarkdown(), []);
  const [cv, setCv] = useState(initial);
  const [instruction, setInstruction] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [addMissingSkills, setAddMissingSkills] = useState(true);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');

  const previewHtml = useMemo(() => renderCVMarkdown(cv), [cv]);

  const runAdjust = async (payload: {
    instruction?: string;
    jobDescription?: string;
    addMissingSkills?: boolean;
  }) => {
    setBusy(true);
    setError('');
    setNotice('');
    try {
      const res = await fetch('/api/admin/cv/adjust', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...payload, cv }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(data.error || 'AI adjustment failed.');
        return;
      }
      setCv(data.cv);
      setNotice('CV updated by AI. Review and edit as needed.');
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setBusy(false);
    }
  };

  const tailorToJob = async () => {
    if (!jobDescription.trim()) return;
    // Send the free-form instruction along too, if present.
    await runAdjust({
      jobDescription,
      instruction: instruction.trim() || undefined,
      addMissingSkills,
    });
  };

  const adjustWithAI = async () => {
    if (!instruction.trim()) return;
    await runAdjust({ instruction });
    setInstruction('');
  };

  const reset = () => {
    setCv(initial);
    setNotice('Reset to the default CV.');
    setError('');
  };

  const download = () => {
    generateCVFromMarkdown(cv);
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
            <h1 className="font-semibold text-gray-900 dark:text-white truncate">CV Adjustment</h1>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={reset}
              className="inline-flex items-center gap-1.5 text-sm px-3 py-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <ArrowPathIcon className="w-4 h-4" />
              Reset
            </button>
            <button
              onClick={download}
              className="inline-flex items-center gap-1.5 text-sm px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium"
            >
              <ArrowDownTrayIcon className="w-4 h-4" />
              Download PDF
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Job-description tailoring */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-4 mb-6">
          <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            <BriefcaseIcon className="w-4 h-4 text-indigo-500" />
            Tailor to a job description
          </label>
          <textarea
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            placeholder="Paste the full job description here. The CV headline, summary, skills, and experience will be re-tailored to match the target role and its requirements — using only your real experience."
            disabled={busy}
            className="w-full h-32 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none disabled:opacity-60"
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
                Add job-required skills I don&apos;t have yet to my Skills section (keyword match). Employers,
                dates, degrees and metrics are never fabricated.
              </span>
            </label>
            <button
              onClick={tailorToJob}
              disabled={busy || !jobDescription.trim()}
              className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 hover:opacity-90 text-white font-medium disabled:opacity-50 whitespace-nowrap"
            >
              <BriefcaseIcon className="w-4 h-4" />
              {busy ? 'Tailoring…' : 'Tailor CV to Job'}
            </button>
          </div>
        </div>

        {/* AI instruction bar */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-4 mb-6">
          <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            <SparklesIcon className="w-4 h-4 text-blue-500" />
            Adjust with AI
          </label>
          <div className="flex flex-col sm:flex-row gap-2">
            <input
              value={instruction}
              onChange={(e) => setInstruction(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !busy) adjustWithAI();
              }}
              placeholder="e.g. Emphasize AI agent work and tighten the summary to 3 sentences"
              disabled={busy}
              className="flex-1 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-60"
            />
            <button
              onClick={adjustWithAI}
              disabled={busy || !instruction.trim()}
              className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 hover:opacity-90 text-white font-medium disabled:opacity-50 whitespace-nowrap"
            >
              <SparklesIcon className="w-4 h-4" />
              {busy ? 'Adjusting…' : 'Adjust'}
            </button>
          </div>
          {error && <p className="text-sm text-red-500 mt-2">{error}</p>}
          {notice && !error && <p className="text-sm text-green-600 dark:text-green-400 mt-2">{notice}</p>}
          <p className="text-xs text-gray-400 dark:text-gray-500 mt-2">
            The AI uses the knowledge base about you and edits the current CV — it won&apos;t invent facts.
          </p>
        </div>

        {/* Editor + Preview */}
        <div className="grid gap-6 lg:grid-cols-2">
          <div>
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-sm font-semibold text-gray-700 dark:text-gray-300">Editor (Markdown)</h2>
              {busy && <span className="text-xs text-blue-500 animate-pulse">AI is writing…</span>}
            </div>
            <textarea
              value={cv}
              onChange={(e) => setCv(e.target.value)}
              spellCheck={false}
              className="w-full h-[70vh] rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-4 font-mono text-sm leading-relaxed focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            />
          </div>

          <div>
            <h2 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Preview</h2>
            <div className="h-[70vh] overflow-auto rounded-2xl border border-gray-200 dark:border-gray-700 bg-white shadow-inner">
              <div
                className="cv-preview p-8 text-gray-900"
                dangerouslySetInnerHTML={{ __html: previewHtml }}
              />
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        .cv-preview .cv-h1 {
          font-size: 1.6rem;
          font-weight: 800;
          letter-spacing: 0.02em;
          margin-bottom: 0.15rem;
        }
        .cv-preview .cv-h2 {
          font-size: 1rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-top: 1.25rem;
          margin-bottom: 0.4rem;
          padding-bottom: 0.25rem;
          border-bottom: 1px solid #111;
        }
        .cv-preview .cv-h3 {
          font-size: 0.95rem;
          font-weight: 700;
          margin-top: 0.75rem;
          margin-bottom: 0.1rem;
        }
        .cv-preview .cv-p {
          font-size: 0.85rem;
          line-height: 1.5;
          margin: 0.15rem 0;
        }
        .cv-preview .cv-ul {
          margin: 0.25rem 0 0.5rem 1.1rem;
          list-style: disc;
        }
        .cv-preview .cv-ul li {
          font-size: 0.85rem;
          line-height: 1.45;
          margin: 0.1rem 0;
        }
      `}</style>
    </div>
  );
}
