'use client';

import dynamic from 'next/dynamic';

// Loaded after hydration so the chat bundle never blocks first paint.
const ChatWidget = dynamic(() => import('./ChatWidget'), { ssr: false });

export default ChatWidget;
