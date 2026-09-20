'use client';

import React, { useState } from 'react';
import { formatDate } from '@/lib/utils';
import { ConversationWithMetadata } from '@/types';
import Link from 'next/link';
import { 
  Download, 
  RotateCcw, 
  Eye, 
  Share2,
  Copy,
  Trash2 
} from 'lucide-react';

interface ConversationCardProps {
  conversation: ConversationWithMetadata;
  onDelete?: (id: string) => void;
  onExport?: (id: string) => void;
}

export default function ConversationCard({ 
  conversation, 
  onDelete,
  onExport 
}: ConversationCardProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  const handleRebuild = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/conversations/${conversation.id}/rebuild`, {
        method: 'POST',
      });
      if (response.ok) {
        alert('Conversation rebuilt successfully');
      }
    } catch (error) {
      console.error('Rebuild failed:', error);
      alert('Failed to rebuild conversation');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownload = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/conversations/${conversation.id}/export`, {
        method: 'GET',
      });
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${conversation.title}.json`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error('Download failed:', error);
      alert('Failed to download conversation');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm('Are you sure? This action cannot be undone.')) return;
    
    try {
      const response = await fetch(`/api/conversations/${conversation.id}`, {
        method: 'DELETE',
      });
      if (response.ok && onDelete) {
        onDelete(conversation.id);
      }
    } catch (error) {
      console.error('Delete failed:', error);
      alert('Failed to delete conversation');
    }
  };

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(
        `${window.location.origin}/conversations/${conversation.id}`
      );
      alert('Link copied to clipboard');
    } catch {
      alert('Failed to copy link');
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <Link 
            href={`/conversations/${conversation.id}`}
            className="text-lg font-semibold text-blue-600 hover:text-blue-800 block"
          >
            {conversation.title}
          </Link>
          <p className="text-sm text-gray-600 mt-1 line-clamp-2">
            {conversation.summary || 'No summary available'}
          </p>
          <div className="flex gap-2 mt-3 text-xs text-gray-500">
            <span>{conversation.messageCount} messages</span>
            <span>•</span>
            <span>{formatDate(conversation.createdAt)}</span>
            {conversation.tags && conversation.tags.length > 0 && (
              <>
                <span>•</span>
                <span className="flex gap-1">
                  {conversation.tags.slice(0, 2).map(tag => (
                    <span key={tag} className="bg-gray-100 px-2 py-1 rounded">
                      {tag}
                    </span>
                  ))}
                </span>
              </>
            )}
          </div>
        </div>

        <div className="relative">
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="p-2 hover:bg-gray-100 rounded-lg"
            title="More options"
          >
            <span className="text-xl">⋯</span>
          </button>

          {showMenu && (
            <div className="absolute right-0 top-10 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
              <button
                onClick={() => {
                  window.open(`/conversations/${conversation.id}`, '_blank');
                  setShowMenu(false);
                }}
                className="flex items-center gap-2 w-full px-4 py-2 hover:bg-gray-50 text-sm"
                title="View conversation"
              >
                <Eye size={16} /> View
              </button>

              <button
                onClick={() => {
                  handleDownload();
                  setShowMenu(false);
                }}
                disabled={isLoading}
                className="flex items-center gap-2 w-full px-4 py-2 hover:bg-gray-50 text-sm disabled:opacity-50"
                title="Download as JSON"
              >
                <Download size={16} /> Download
              </button>

              <button
                onClick={() => {
                  handleRebuild();
                  setShowMenu(false);
                }}
                disabled={isLoading}
                className="flex items-center gap-2 w-full px-4 py-2 hover:bg-gray-50 text-sm disabled:opacity-50"
                title="Rebuild conversation context"
              >
                <RotateCcw size={16} /> Rebuild
              </button>

              <button
                onClick={() => {
                  handleShare();
                  setShowMenu(false);
                }}
                className="flex items-center gap-2 w-full px-4 py-2 hover:bg-gray-50 text-sm"
                title="Copy share link"
              >
                <Share2 size={16} /> Share
              </button>

              <button
                onClick={() => {
                  handleDelete();
                  setShowMenu(false);
                }}
                className="flex items-center gap-2 w-full px-4 py-2 hover:bg-red-50 text-red-600 text-sm"
                title="Delete conversation"
              >
                <Trash2 size={16} /> Delete
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
