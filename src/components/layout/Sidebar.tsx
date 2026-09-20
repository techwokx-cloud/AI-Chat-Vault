"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ChevronDown,
  Database,
  Folder,
  Home,
  MessageSquare,
  RefreshCw,
  Search,
  Settings,
} from "lucide-react";

const NAV_ITEMS = [
  { name: "Home", href: "/", icon: Home },
  { name: "Conversations", href: "/conversations", icon: MessageSquare },
  { name: "Projects", href: "/projects", icon: Folder },
  { name: "Search", href: "/search", icon: Search },
  { name: "Backups", href: "/backups", icon: Database },
  { name: "Rebuild & Export", href: "/rebuild", icon: RefreshCw },
  { name: "Settings", href: "/settings", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden min-h-screen w-64 shrink-0 flex-col justify-between bg-[#0B132B] p-4 text-white lg:flex lg:sticky lg:top-0">
      <div>
        <div className="mb-6 flex items-center gap-3 px-2 py-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 font-bold shadow-md">
            ☁️
          </div>
          <div>
            <h1 className="font-bold leading-none tracking-tight">AI Chat Vault</h1>
            <p className="mt-1 text-xs text-slate-400">Safe, searchable, reusable</p>
          </div>
        </div>

        <nav aria-label="Main navigation" className="space-y-1">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive =
              item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);

            return (
              <Link
                key={item.name}
                href={item.href}
                aria-current={isActive ? "page" : undefined}
                className={[
                  "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30"
                    : "text-slate-300 hover:bg-slate-800/60 hover:text-white",
                ].join(" ")}
              >
                <Icon className="h-5 w-5" />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="space-y-4">
        <div className="rounded-xl border border-slate-800/80 bg-[#131C38] p-4">
          <div className="mb-2 flex items-center justify-between text-xs text-slate-300">
            <span className="flex items-center gap-1.5 font-medium">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              Storage
            </span>
            <span className="font-semibold text-slate-200">2.4 GB / 50 GB</span>
          </div>

          <div className="mb-3 h-2 w-full overflow-hidden rounded-full bg-slate-800">
            <div className="h-full w-[10%] bg-blue-500" />
          </div>

          <div className="flex items-center justify-between border-t border-slate-800 pt-2 text-xs">
            <div>
              <p className="text-[11px] text-slate-400">Last backup</p>
              <p className="font-medium text-slate-200">Sep 20, 2026 • 08:30</p>
            </div>
            <span className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2 py-0.5 text-[10px] font-semibold text-emerald-400">
              Up to date
            </span>
          </div>
        </div>

        <button
          type="button"
          className="flex w-full items-center justify-between rounded-xl border border-slate-800/50 bg-[#131C38]/50 p-2 text-left hover:bg-[#131C38]"
        >
          <span className="flex items-center gap-3">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-600 text-xs font-bold">
              IL
            </span>
            <span className="text-xs">
              <span className="block font-semibold text-white">Innovation Lab</span>
              <span className="text-[11px] text-slate-400">Team Admin</span>
            </span>
          </span>
          <ChevronDown className="h-4 w-4 text-slate-400" />
        </button>
      </div>
    </aside>
  );
}
