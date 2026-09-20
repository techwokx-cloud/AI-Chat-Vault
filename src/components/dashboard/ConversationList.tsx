"use client";

import { useMemo, useState } from "react";
import { ChevronDown, MessageSquare, Search, Star } from "lucide-react";
import { MOCK_CONVERSATIONS } from "@/lib/mock-data";

export function ConversationList() {
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState(MOCK_CONVERSATIONS[0]?.id ?? "");

  const filteredConversations = useMemo(() => {
    const search = query.trim().toLowerCase();

    if (!search) return MOCK_CONVERSATIONS;

    return MOCK_CONVERSATIONS.filter((conversation) =>
      [conversation.title, conversation.preview, conversation.tag].some((value) =>
        value.toLowerCase().includes(search),
      ),
    );
  }, [query]);

  return (
    <section className="flex min-h-[560px] flex-col rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm">
      <div className="mb-3 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <h2 className="text-base font-bold text-slate-900">Conversations</h2>
          <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-600">
            1,284
          </span>
        </div>

        <button type="button" className="flex items-center gap-1 text-xs font-medium text-slate-500 hover:text-slate-800">
          Newest
          <ChevronDown className="h-3.5 w-3.5" />
        </button>
      </div>

      <div className="relative mb-3">
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
          className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2 pl-9 pr-3 text-xs outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
        />
      </div>

      <div className="min-h-0 flex-1 space-y-2 overflow-y-auto pr-1">
        {filteredConversations.map((item) => {
          const isSelected = item.id === selectedId;

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => setSelectedId(item.id)}
              className={[
                "relative w-full rounded-xl border p-3 text-left transition-all focus:outline-none focus:ring-2 focus:ring-blue-500/30",
                isSelected
                  ? "border-blue-200 bg-blue-50/60 shadow-sm"
                  : "border-slate-100 hover:border-slate-200 hover:bg-slate-50",
              ].join(" ")}
            >
              <div className="flex items-start gap-3">
                <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-100 text-blue-600">
                  <MessageSquare className="h-4 w-4" />
                </div>

                <div className="min-w-0 flex-1">
                  <h3 className="flex items-center gap-1 truncate text-xs font-bold text-slate-900">
                    {item.isStarred && (
                      <Star className="h-3 w-3 shrink-0 fill-amber-500 text-amber-500" />
                    )}
                    <span className="truncate">{item.title}</span>
                  </h3>

                  <p className="mt-0.5 truncate text-[11px] text-slate-500">
                    {item.preview}
                  </p>

                  <div className="mt-2 flex items-center justify-between gap-2">
                    <span className="rounded-md border border-purple-100 bg-purple-50 px-2 py-0.5 text-[10px] font-medium text-purple-700">
                      {item.tag}
                    </span>
                    <span className="shrink-0 text-[10px] text-slate-400">
                      {item.date}
                    </span>
                  </div>
                </div>
              </div>
            </button>
          );
        })}

        {filteredConversations.length === 0 && (
          <div className="rounded-xl border border-dashed border-slate-200 p-6 text-center">
            <p className="text-sm font-medium text-slate-700">No conversations found</p>
            <p className="mt-1 text-xs text-slate-400">Try a different search term.</p>
          </div>
        )}
      </div>
    </section>
  );
}
