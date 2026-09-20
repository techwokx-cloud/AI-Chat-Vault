"use client";

import { ChevronRight, Download, FolderPlus, RefreshCw, Search } from "lucide-react";

const ACTIONS = [
  { id: "search", title: "Search Conversations", desc: "Find what you need, fast", icon: Search, iconBg: "bg-blue-100 text-blue-600" },
  { id: "rebuild", title: "Rebuild Context", desc: "Continue from archived history", icon: RefreshCw, iconBg: "bg-emerald-100 text-emerald-600" },
  { id: "export", title: "Export Archive", desc: "Download your data anytime", icon: Download, iconBg: "bg-sky-100 text-sky-600" },
  { id: "projects", title: "Manage Projects", desc: "Organize your work", icon: FolderPlus, iconBg: "bg-indigo-100 text-indigo-600" },
];

export function QuickActions() {
  return (
    <section>
      <h2 className="mb-1 text-sm font-bold text-slate-900">Quick actions</h2>
      <p className="mb-3 text-xs text-slate-500">
        Get more from your AI conversation archive.
      </p>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {ACTIONS.map((action) => {
          const Icon = action.icon;

          return (
            <button
              key={action.id}
              type="button"
              className="group flex items-center justify-between rounded-2xl border border-slate-200/80 bg-white p-3.5 text-left shadow-sm transition-all hover:border-blue-300 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500/30"
            >
              <span className="flex items-center gap-3">
                <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${action.iconBg}`}>
                  <Icon className="h-5 w-5" />
                </span>

                <span>
                  <span className="block text-xs font-bold text-slate-900 group-hover:text-blue-600">
                    {action.title}
                  </span>
                  <span className="mt-0.5 block text-[11px] text-slate-400">
                    {action.desc}
                  </span>
                </span>
              </span>

              <ChevronRight className="h-4 w-4 text-slate-400 group-hover:text-blue-600" />
            </button>
          );
        })}
      </div>
    </section>
  );
}
