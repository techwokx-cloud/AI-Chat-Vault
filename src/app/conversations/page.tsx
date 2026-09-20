"use client";

import Link from "next/link";
import { ArrowLeft, MessageSquare, Search, Star } from "lucide-react";
import { useMemo, useState } from "react";
import { MOCK_CONVERSATIONS } from "@/lib/mock-data";

export default function ConversationsPage() {
  const [query, setQuery] = useState("");

  const conversations = useMemo(() => {
    const search = query.trim().toLowerCase();

    if (!search) {
      return MOCK_CONVERSATIONS;
    }

    return MOCK_CONVERSATIONS.filter((conversation) =>
      [conversation.title, conversation.preview, conversation.tag].some(
        (value) => value.toLowerCase().includes(search),
      ),
    );
  }, [query]);

  return (
    <div className="space-y-6">
      <div>
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-blue-600"
        >
          <ArrowLeft className="h-4 w-4" />
          Dashboard
        </Link>

        <h1 className="mt-4 text-2xl font-bold text-slate-900">
          Conversations
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          Browse and manage your archived AI conversations.
        </p>
      </div>

      <div className="relative max-w-xl">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

        <label htmlFor="conversation-search" className="sr-only">
          Search conversations
        </label>

        <input
          id="conversation-search"
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search conversations..."
          className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-10 pr-4 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {conversations.map((conversation) => (
          <article
            key={conversation.id}
            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
          >
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
                <MessageSquare className="h-5 w-5" />
              </div>

              <div className="min-w-0 flex-1">
                <h2 className="flex items-center gap-1 truncate font-semibold text-slate-900">
                  {conversation.isStarred && (
                    <Star className="h-4 w-4 shrink-0 fill-amber-400 text-amber-400" />
                  )}
                  <span className="truncate">{conversation.title}</span>
                </h2>

                <p className="mt-1 text-xs text-slate-400">
                  {conversation.date}
                </p>
              </div>
            </div>

            <p className="mt-4 text-sm text-slate-600">
              {conversation.preview}
            </p>

            <span className="mt-4 inline-block rounded-md border border-purple-100 bg-purple-50 px-2 py-1 text-xs font-medium text-purple-700">
              {conversation.tag}
            </span>
          </article>
        ))}

        {conversations.length === 0 && (
          <p className="text-sm text-slate-500">
            No matching conversations found.
          </p>
        )}
      </div>
    </div>
  );
}
