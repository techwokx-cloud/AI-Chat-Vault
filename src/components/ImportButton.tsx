'use client';

import React, { useRef, useState } from 'react';
import { Upload } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function ImportButton() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    const validTypes = [
      'application/json',
      'application/zip',
      'text/markdown',
      'text/plain'
    ];

    if (!validTypes.includes(file.type)) {
      alert('Please select a valid file (JSON, ZIP, Markdown, or TXT)');
      return;
    }

    setIsLoading(true);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('/api/conversations/import', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        alert(`Successfully imported ${data.count} conversation(s)`);
        router.refresh();
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
      } else {
        const error = await response.json();
        alert(`Import failed: ${error.message || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Import failed:', error);
      alert('Failed to import conversation');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={() => fileInputRef.current?.click()}
        disabled={isLoading}
        className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
        title="Import conversation from ZIP, JSON, or Markdown"
      >
        <Upload size={20} />
        Import Conversation
      </button>
      <input
        ref={fileInputRef}
        type="file"
        accept=".json,.zip,.md,.txt"
        onChange={handleFileSelect}
        className="hidden"
      />
    </>
  );
}
