'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import {
  ChatBubbleLeftRightIcon,
  XMarkIcon,
  PaperAirplaneIcon,
} from '@heroicons/react/24/outline';

/**
 * "Chat with Me" — a browser-only assistant that answers visitor questions
 * about Nyi Htut Zaw using only the website's own data.
 *
 * - No server-side storage: the conversation lives in React state and is gone
 *   on refresh / tab close.
 * - Daily limit of 15 questions per browser, tracked in localStorage.
 * - Auto-ends after a period of inactivity.
 * - English + Myanmar UI; answers follow the visitor's language automatically.
 */

const DAILY_LIMIT = 15;
const QUOTA_KEY = 'chatWithMe.quota';
const INACTIVITY_MS = 10 * 60 * 1000; // auto-end session after 10 min idle

type Role = 'user' | 'assistant' | 'system';
interface Message {
  role: Role;
  content: string;
}

type Lang = 'en' | 'my';

const COPY: Record<Lang, Record<string, string>> = {
  en: {
    title: 'Chat with Me',
    subtitle: 'Ask about Nyi Htut Zaw',
    greeting:
      "Hi! 👋 I'm Nyi Htut Zaw's assistant. Ask me about his experience, skills, education, or how to get in touch.",
    placeholder: 'Type your question…',
    send: 'Send',
    remaining: 'questions left today',
    limitReached:
      "You've reached today's limit of 15 questions. Please come back tomorrow, or reach out via the contact page.",
    sessionEnded: 'Session ended due to inactivity. Send a message to start again.',
    error: 'Something went wrong. Please try again.',
    thinking: 'Thinking…',
    open: 'Open chat',
    close: 'Close chat',
  },
  my: {
    title: 'ကျွန်တော်နဲ့ စကားပြောမယ်',
    subtitle: 'Nyi Htut Zaw အကြောင်း မေးနိုင်ပါတယ်',
    greeting:
      'မင်္ဂလာပါ 👋 ကျွန်တော်က Nyi Htut Zaw ရဲ့ လက်ထောက်ပါ။ သူ့ရဲ့ အတွေ့အကြုံ၊ ကျွမ်းကျင်မှု၊ ပညာရေး သို့မဟုတ် ဆက်သွယ်နည်းတွေကို မေးနိုင်ပါတယ်။',
    placeholder: 'သင့်မေးခွန်းကို ရိုက်ထည့်ပါ…',
    send: 'ပို့မည်',
    remaining: 'မေးခွန်း ဒီနေ့ ကျန်သေး',
    limitReached:
      'ဒီနေ့အတွက် မေးခွန်း ၁၅ ခု ကန့်သတ်ချက် ပြည့်သွားပါပြီ။ မနက်ဖြန်ပြန်လာပါ၊ ဒါမှမဟုတ် ဆက်သွယ်ရန် စာမျက်နှာမှ ဆက်သွယ်ပါ။',
    sessionEnded: 'အလုပ်မလုပ်တာ ကြာသွားလို့ session ပိတ်လိုက်ပါပြီ။ ပြန်စရန် စာတစ်စောင် ပို့ပါ။',
    error: 'တစ်ခုခု မှားယွင်းသွားပါတယ်။ ထပ်ကြိုးစားပါ။',
    thinking: 'စဉ်းစားနေသည်…',
    open: 'chat ဖွင့်ရန်',
    close: 'chat ပိတ်ရန်',
  },
};

function todayKey(): string {
  // Local date (YYYY-MM-DD) so the limit resets at the visitor's midnight.
  const d = new Date();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${d.getFullYear()}-${m}-${day}`;
}

function readQuota(): number {
  try {
    const raw = localStorage.getItem(QUOTA_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as { date: string; count: number };
      if (parsed.date === todayKey()) return parsed.count;
    }
  } catch {
    /* ignore */
  }
  return 0;
}

function writeQuota(count: number): void {
  try {
    localStorage.setItem(QUOTA_KEY, JSON.stringify({ date: todayKey(), count }));
  } catch {
    /* ignore */
  }
}

/** Renders assistant text, turning markdown links [label](/path) into clickable links. */
function RichText({ text }: { text: string }) {
  const linkRe = /\[([^\]]+)\]\((\/[^)\s]*)\)/g;
  const nodes: React.ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let key = 0;

  while ((match = linkRe.exec(text)) !== null) {
    if (match.index > lastIndex) {
      nodes.push(text.slice(lastIndex, match.index));
    }
    const [, label, href] = match;
    nodes.push(
      <Link
        key={`l${key++}`}
        href={href}
        className="text-blue-600 dark:text-blue-400 underline underline-offset-2 hover:text-blue-700 dark:hover:text-blue-300"
      >
        {label}
      </Link>
    );
    lastIndex = linkRe.lastIndex;
  }
  if (lastIndex < text.length) nodes.push(text.slice(lastIndex));

  return <span className="whitespace-pre-wrap break-words">{nodes}</span>;
}

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [lang, setLang] = useState<Lang>('en');
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [used, setUsed] = useState(0);

  const scrollRef = useRef<HTMLDivElement>(null);
  const inactivityTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const t = COPY[lang];
  const remaining = Math.max(0, DAILY_LIMIT - used);
  const limitReached = remaining <= 0;

  // Initialise language from the browser and load today's quota.
  useEffect(() => {
    const nav = navigator.language?.toLowerCase() ?? '';
    if (nav.startsWith('my')) setLang('my');
    setUsed(readQuota());
  }, []);

  // Auto-scroll to the newest message.
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, loading]);

  const endSession = useCallback(() => {
    setMessages((prev) =>
      prev.length ? [{ role: 'system', content: COPY[lang].sessionEnded }] : prev
    );
  }, [lang]);

  const resetInactivity = useCallback(() => {
    if (inactivityTimer.current) clearTimeout(inactivityTimer.current);
    inactivityTimer.current = setTimeout(endSession, INACTIVITY_MS);
  }, [endSession]);

  useEffect(() => {
    return () => {
      if (inactivityTimer.current) clearTimeout(inactivityTimer.current);
    };
  }, []);

  async function send() {
    const question = input.trim();
    if (!question || loading || limitReached) return;

    // Drop any prior "session ended" notice when restarting.
    const base = messages.filter((m) => m.role !== 'system');
    const next: Message[] = [...base, { role: 'user', content: question }];
    setMessages(next);
    setInput('');
    setLoading(true);
    resetInactivity();

    // Count the question against the daily quota immediately.
    const newUsed = readQuota() + 1;
    writeQuota(newUsed);
    setUsed(newUsed);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: next.map(({ role, content }) => ({ role, content })),
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.reply) {
        setMessages([...next, { role: 'system', content: data.error || t.error }]);
      } else {
        setMessages([...next, { role: 'assistant', content: data.reply }]);
      }
    } catch {
      setMessages([...next, { role: 'system', content: t.error }]);
    } finally {
      setLoading(false);
      resetInactivity();
    }
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  }

  return (
    <>
      {/* Launcher button */}
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? t.close : t.open}
        className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-purple-600 text-white shadow-lg transition-transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400"
      >
        {open ? (
          <XMarkIcon className="h-6 w-6" />
        ) : (
          <ChatBubbleLeftRightIcon className="h-6 w-6" />
        )}
      </button>

      {/* Chat panel */}
      {open && (
        <div className="fixed bottom-24 right-5 z-50 flex h-[32rem] max-h-[calc(100vh-7rem)] w-[22rem] max-w-[calc(100vw-2.5rem)] flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-2xl dark:border-gray-700 dark:bg-gray-800">
          {/* Header */}
          <div className="flex items-center justify-between bg-gradient-to-r from-blue-600 to-purple-600 px-4 py-3 text-white">
            <div>
              <p className="text-sm font-semibold leading-tight">{t.title}</p>
              <p className="text-xs text-blue-100">{t.subtitle}</p>
            </div>
            <button
              onClick={() => setLang((l) => (l === 'en' ? 'my' : 'en'))}
              className="rounded-md bg-white/20 px-2 py-1 text-xs font-medium hover:bg-white/30"
              aria-label="Toggle language"
            >
              {lang === 'en' ? 'မြန်မာ' : 'EN'}
            </button>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-3">
            {/* Local greeting (not sent to the API, not counted) */}
            <div className="flex justify-start">
              <div className="max-w-[85%] rounded-2xl rounded-tl-sm bg-gray-100 px-3 py-2 text-sm text-gray-800 dark:bg-gray-700 dark:text-gray-100">
                {t.greeting}
              </div>
            </div>

            {messages.map((m, i) => {
              if (m.role === 'system') {
                return (
                  <p
                    key={i}
                    className="mx-auto max-w-[90%] text-center text-xs italic text-gray-500 dark:text-gray-400"
                  >
                    {m.content}
                  </p>
                );
              }
              const isUser = m.role === 'user';
              return (
                <div key={i} className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
                  <div
                    className={`max-w-[85%] px-3 py-2 text-sm ${
                      isUser
                        ? 'rounded-2xl rounded-tr-sm bg-blue-600 text-white'
                        : 'rounded-2xl rounded-tl-sm bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-100'
                    }`}
                  >
                    {isUser ? (
                      <span className="whitespace-pre-wrap break-words">{m.content}</span>
                    ) : (
                      <RichText text={m.content} />
                    )}
                  </div>
                </div>
              );
            })}

            {loading && (
              <div className="flex justify-start">
                <div className="rounded-2xl rounded-tl-sm bg-gray-100 px-3 py-2 text-sm text-gray-500 dark:bg-gray-700 dark:text-gray-300">
                  {t.thinking}
                </div>
              </div>
            )}
          </div>

          {/* Footer / input */}
          <div className="border-t border-gray-200 px-3 py-2 dark:border-gray-700">
            {limitReached ? (
              <p className="px-1 py-2 text-center text-xs text-gray-500 dark:text-gray-400">
                {t.limitReached}
              </p>
            ) : (
              <>
                <div className="flex items-end gap-2">
                  <textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={onKeyDown}
                    onFocus={resetInactivity}
                    rows={1}
                    placeholder={t.placeholder}
                    className="max-h-24 flex-1 resize-none rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-900 dark:text-gray-100"
                  />
                  <button
                    onClick={send}
                    disabled={loading || !input.trim()}
                    aria-label={t.send}
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-600 text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    <PaperAirplaneIcon className="h-5 w-5" />
                  </button>
                </div>
                <p className="mt-1 px-1 text-right text-[11px] text-gray-400 dark:text-gray-500">
                  {remaining} {t.remaining}
                </p>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
