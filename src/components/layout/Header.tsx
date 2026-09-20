"use client";

import { Bell, ChevronDown, Menu, Search } from "lucide-react";

export function Header() {
  return (
    <header className="sticky top-0 z-10 flex h-16 items-center justify-between gap-4 border-b border-slate-200 bg-white px-4 sm:px-6 lg:px-8">
      <button type="button" className="rounded-xl p-2 text-slate-500 hover:bg-slate-100 lg:hidden" aria-label="Open navigation">
        <Menu className="h-5 w-5" />
      </button>

      <div className="relative min-w-0 max-w-xl flex-1">
        <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        <label htmlFor="global-search" className="sr-only">
          Search conversations, projects, or keywords
        </label>
        <input
          id="global-search"
          type="search"
          placeholder="Search conversations, projects, or keywords..."
          className="w-full rounded-xl border border-slate-200/80 bg-slate-100/70 py-2 pl-10 pr-12 text-sm text-slate-800 outline-none placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
        />
        <kbd className="absolute right-3 top-1/2 hidden -translate-y-1/2 rounded border border-slate-200 bg-white px-1.5 py-0.5 text-[10px] text-slate-400 sm:block">
          ⌘ K
        </kbd>
      </div>

      <div className="flex items-center gap-2 sm:gap-4">
        <button type="button" className="relative rounded-xl p-2 text-slate-500 hover:bg-slate-100" aria-label="Notifications">
          <Bell className="h-5 w-5" />
          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-blue-600" />
        </button>

        <button type="button" className="flex items-center gap-2 border-l border-slate-200 pl-2 sm:gap-2.5">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-900 text-xs font-bold text-white">
            IL
          </span>
          <span className="hidden text-xs font-medium text-slate-700 sm:inline">
            Innovation Lab
          </span>
          <ChevronDown className="h-3.5 w-3.5 text-slate-400" />
        </button>
      </div>
    </header>
  );
}
