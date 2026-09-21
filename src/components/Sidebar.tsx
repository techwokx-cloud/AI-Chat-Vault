'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Home,
  MessageSquare,
  FolderOpen,
  Search,
  HardDrive,
  RefreshCw,
  Settings,
} from 'lucide-react';

const navItems = [
  { name: 'Home', href: '/', icon: Home },
  { name: 'Conversations', href: '/conversations', icon: MessageSquare },
  { name: 'Projects', href: '/projects', icon: FolderOpen },
  { name: 'Search', href: '/search', icon: Search },
  { name: 'Backups', href: '/backups', icon: HardDrive },
  { name: 'Rebuild & Export', href: '/rebuild', icon: RefreshCw },
  { name: 'Settings', href: '/settings', icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="w-64 bg-white border-r border-gray-200 h-screen sticky top-0">
      <div className="p-6">
        <h1 className="text-2xl font-bold text-blue-600">🛡️</h1>
        <p className="text-sm font-semibold text-gray-700">AI Chat Vault</p>
        <p className="text-xs text-gray-500">Safe, searchable, reusable</p>
      </div>

      <nav className="space-y-1 px-3">
        {navItems.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                isActive
                  ? 'bg-blue-50 text-blue-600 font-medium'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <item.icon size={20} />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>

      <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-gray-200 bg-gray-50">
        <div className="text-xs text-gray-600">
          <p className="font-semibold mb-1">Storage</p>
          <div className="w-full bg-gray-300 rounded-full h-2 mb-2">
            <div
              className="bg-blue-600 h-2 rounded-full"
              style={{ width: '48%' }} // 24GB / 50GB = 48%
            />
          </div>
          <p>24 GB / 50 GB</p>
        </div>
      </div>
    </div>
  );
}
