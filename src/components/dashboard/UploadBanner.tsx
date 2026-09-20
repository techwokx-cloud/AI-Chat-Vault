"use client";

import { useRef } from "react";
import { UploadCloud } from "lucide-react";

export function UploadBanner() {
  const inputRef = useRef<HTMLInputElement>(null);

  function handleFileChange(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    console.log("Selected file:", file.name);
  }

  return (
    <section className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#0B193C] via-[#102A6B] to-[#4F46E5] p-5 text-white shadow-lg shadow-indigo-950/10 sm:p-6">
      <div className="relative z-10 flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
        <div className="flex items-start gap-4">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-white/15 bg-white/10 text-3xl backdrop-blur-md">
            <span aria-hidden="true">🛡️</span>
          </div>

          <div>
            <h2 className="text-lg font-bold tracking-tight sm:text-xl">
              Your AI conversations, always safe
            </h2>

            <p className="mt-1 max-w-xl text-sm text-slate-200/90">
              Back up, search, and reuse your conversations independently of
              any one AI account.
            </p>
          </div>
        </div>

        <div className="flex w-full flex-col items-center gap-2 md:w-auto">
          <input
            ref={inputRef}
            type="file"
            accept=".zip,.json,.md,.markdown"
            className="hidden"
            onChange={handleFileChange}
          />

          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-md shadow-blue-600/30 transition-all hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-offset-2 focus:ring-offset-[#102A6B] md:w-auto"
          >
            <UploadCloud className="h-5 w-5" />
            Import conversation
          </button>

          <span className="text-center text-[11px] text-slate-300">
            ZIP, JSON, or Markdown
          </span>
        </div>
      </div>
    </section>
  );
}
