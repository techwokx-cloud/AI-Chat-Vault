'use client';

import { useState } from 'react';
import { Upload, CheckCircle } from 'lucide-react';
import Link from 'next/link';

export default function ImportPage() {
  const [rawText, setRawText] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleImport = async () => {
    if (!rawText.trim()) return;

    setLoading(true);
    try {
      const response = await fetch('/api/import', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ rawText })
      });

      const data = await response.json();
      setResult(data);
      setSuccess(true);
      setRawText('');

      // Auto-redirect after 2 seconds
      setTimeout(() => {
        window.location.href = '/';
      }, 2000);
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to import conversation');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-2xl mx-auto">
        <Link href="/" className="text-blue-500 hover:underline mb-4 block">
          ← Back
        </Link>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center gap-3 mb-6">
            <Upload size={28} className="text-blue-500" />
            <h1 className="text-2xl font-bold">Import Conversation</h1>
          </div>

          <p className="text-gray-600 mb-4">
            Paste your raw chat text below. The parser will automatically detect who said what.
          </p>

          <textarea
            value={rawText}
            onChange={(e) => setRawText(e.target.value)}
            placeholder="Paste your conversation here... The parser will detect user vs assistant messages."
            className="w-full h-64 p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm"
          />

          <button
            onClick={handleImport}
            disabled={loading || !rawText.trim() || success}
            className="mt-4 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white px-6 py-2 rounded-lg font-medium transition"
          >
            {success ? '✓ Imported!' : loading ? 'Importing...' : 'Import Conversation'}
          </button>

          {success && result && (
            <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-center gap-2 text-green-700 font-medium mb-2">
                <CheckCircle size={20} />
                Successfully imported!
              </div>
              <p className="text-sm text-gray-600">
                <strong>Title:</strong> {result.conversation.title}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Messages:</strong> {result.conversation.messageCount}
              </p>
              <p className="text-sm text-gray-500 mt-2">
                Redirecting to dashboard...
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}