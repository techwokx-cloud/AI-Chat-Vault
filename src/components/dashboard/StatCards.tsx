"use client";

import {
  Clock,
  Folder,
  HardDrive,
  MessageSquare,
  Paperclip
} from "lucide-react";

const STATS = [
  {
    label: "Total Conversations",
    value: "1,284",
    icon: MessageSquare,
    iconBg: "bg-blue-50 text-blue-600"
  },
  {
    label: "Projects",
    value: "24",
    icon: Folder,
    iconBg: "bg-purple-50 text-purple-600"
  },
  {
    label: "Files & Attachments",
    value: "186",
    icon: Paperclip,
    iconBg: "bg-emerald-50 text-emerald-600"
  },
  {
    label: "Total Storage",
    value: "12.4 GB",
    icon: HardDrive,
    iconBg: "bg-sky-50 text-sky-600"
  },
  {
    label: "Last Backup",
    value: "Sep 20, 2026",
    subtext: "08:30",
    icon: Clock,
    iconBg: "bg-amber-50 text-amber-600"
  }
];

export function StatCards() {
  return (
    <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5">
      {STATS.map((stat) => {
        const Icon = stat.icon;

        return (
          <div
            key={stat.label}
            className="flex items-center gap-4 rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm"
          >
            <div
              className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${stat.iconBg}`}
            >
              <Icon className="h-5 w-5" />
            </div>

            <div className="min-w-0">
              <p className="text-xs font-medium text-slate-500">
                {stat.label}
              </p>

              <p className="mt-0.5 text-xl font-bold leading-none text-slate-900">
                {stat.value}

                {stat.subtext && (
                  <span className="mt-1 block text-xs font-normal text-slate-400">
                    {stat.subtext}
                  </span>
                )}
              </p>
            </div>
          </div>
        );
      })}
    </section>
  );
}
