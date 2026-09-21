'use client';

import { Menu, Settings, Search } from 'lucide-react';

export default function ChatHeader() {
  return (
    <div className="border-b border-gray-200 bg-white px-4 py-3 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <Menu size={24} className="text-gray-600 cursor-pointer hover:text-gray-900" />
        <h1 className="text-xl font-bold text-gray-900">💬 AI Chat Vault</h1>
      </div>
      <div className="flex items-center gap-3">
        <Search size={20} className="text-gray-600 cursor-pointer hover:text-gray-900" />
        <Settings size={20} className="text-gray-600 cursor-pointer hover:text-gray-900" />
      </div>
    </div>
  );
}
