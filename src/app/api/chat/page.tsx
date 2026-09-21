'use client';

import { useState } from 'react';
import ChatHeader from '@/components/chat/ChatHeader';
import ChatMessages from '@/components/chat/ChatMessages';
import ChatInput from '@/components/chat/ChatInput';

export default function ChatPage() {
  const [messages, setMessages] = useState<any[]>([
    { id: 1, role: 'assistant', content: 'Hey! How can I help you today?', timestamp: new Date() }
  ]);
  const [loading, setLoading] = useState(false);

  const handleSendMessage = async (text: string) => {
    if (!text.trim()) return;

    const userMessage = {
      id: messages.length + 1,
      role: 'user',
      content: text,
      timestamp: new Date()
    };

    setMessages([...messages, userMessage]);
    setLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text, history: messages })
      });

      const data = await response.json();

      const assistantMessage = {
        id: messages.length + 2,
        role: 'assistant',
        content: data.reply,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-white">
      <ChatHeader />
      <ChatMessages messages={messages} loading={loading} />
      <ChatInput onSendMessage={handleSendMessage} disabled={loading} />
    </div>
  );
}
