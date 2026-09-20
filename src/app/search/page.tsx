"use client";

import { useMemo, useState } from "react";
import { Search as SearchIcon, MessageSquare } from "lucide-react";
import { MOCK_CONVERSATIONS } from "@/lib/mock-data";

export default function SearchPage() {
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    const value = query.trim().toLowerCase();

    if (!value) {
      return [];
    }

    return MOCK_CONVERSATIONS.filter((conversation) =>
      [conversation.title, conversation.preview, conversation.tag].some(
        (field) => field.toLowerCase().includes(value),
      ),
    );
  }, [query]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Search</h1>
        <p className="mt-1 text-sm text-slate-500">
          Search across your archived conversations and project memory.
        </p>
      </div>

      <div className="relative max-w-2xl">
        <SearchIcon className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
        <input
          autoFocus
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search your archive..."
          className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-11 pr-4 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
        />
      </div>

      <div className="space-y-3">
        {results.map((conversation) => (
          <article
            key={conversation.id}
            className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
          >
            <div className="flex items-center gap-3">
              <MessageSquare className="h-5 w-5 text-blue-600" />
              <h2 className="font-semibold text-slate-900">
                {conversation.title}
              </h2>
            </div>
            <p className="mt-2 text-sm text-slate-500">
              {conversation.preview}
            </p>
          </article>
        ))}

        {query && results.length === 0 && (
          <p className="text-sm text-slate-500">
            No matching conversations found.
          </p>
        )}

        {!query && (
          <p className="text-sm text-slate-400">
            Enter a keyword to search your archive.
          </p>
        )}
      </div>
    </div>
  );
}
