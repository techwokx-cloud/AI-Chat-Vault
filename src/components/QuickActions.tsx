'use client';

import React, { useState } from 'react';
import { Search, Download, Plus, RefreshCw } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function QuickActions() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = () => {
    router.push('/search');
  };

  const handleRebuild = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/rebuild', { method: 'POST' });
      if (response.ok) {
        alert('All conversations rebuilt successfully');
        router.refresh();
      }
    } catch (error) {
      console.error('Rebuild failed:', error);
      alert('Failed to rebuild conversations');
    } finally {
      setIsLoading(false);
    }
  };

  const handleExport = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/export', { method: 'GET' });
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `ai-chat-vault-export-${new Date().toISOString().split('T')[0]}.zip`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error('Export failed:', error);
      alert('Failed to export archive');
    } finally {
      setIsLoading(false);
    }
  };

  const handleNewConversation = () => {
    router.push('/conversations/new');
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {/* Search Conversations */}
      <button
        onClick={handleSearch}
        className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-lg hover:shadow-md transition-all"
      >
        <div className="flex flex-col items-center gap-2">
          <Search className="text-blue-600" size={24} />
          <span className="text-sm font-medium text-blue-900">Search Conversations</span>
          <span className="text-xs text-blue-700">Find what you need, fast</span>
        </div>
      </button>

      {/* Rebuild Context */}
      <button
        onClick={handleRebuild}
        disabled={isLoading}
        className="p-6 bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-200 rounded-lg hover:shadow-md transition-all disabled:opacity-50"
      >
        <div className="flex flex-col items-center gap-2">
          <RefreshCw className={`text-purple-600 ${isLoading ? 'animate-spin' : ''}`} size={24} />
          <span className="text-sm font-medium text-purple-900">Rebuild Context</span>
          <span className="text-xs text-purple-700">Continue from archived history</span>
        </div>
      </button>

      {/* Export Archive */}
      <button
        onClick={handleExport}
        disabled={isLoading}
        className="p-6 bg-gradient-to-br from-green-50 to-green-100 border border-green-200 rounded-lg hover:shadow-md transition-all disabled:opacity-50"
      >
        <div className="flex flex-col items-center gap-2">
          <Download className="text-green-600" size={24} />
          <span className="text-sm font-medium text-green-900">Export Archive</span>
          <span className="text-xs text-green-700">Download your data anytime</span>
        </div>
      </button>

      {/* New Conversation */}
      <button
        onClick={handleNewConversation}
        className="p-6 bg-gradient-to-br from-orange-50 to-orange-100 border border-orange-200 rounded-lg hover:shadow-md transition-all"
      >
        <div className="flex flex-col items-center gap-2">
          <Plus className="text-orange-600" size={24} />
          <span className="text-sm font-medium text-orange-900">New Conversation</span>
          <span className="text-xs text-orange-700">Start a fresh conversation</span>
        </div>
      </button>
    </div>
  );
}
