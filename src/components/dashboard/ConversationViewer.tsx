"use client";

import { useState } from "react";
import { Copy, Download, Eye, Paperclip, RefreshCw, Send } from "lucide-react";

export function ConversationViewer() {
  const [prompt, setPrompt] = useState("");
  const [copied, setCopied] = useState(false);

  async function copyCode() {
    await navigator.clipboard.writeText(
      "oci network security-list update --security-list-id ocid1.securitylist... --ingress-security-rules '[ ... ]'",
    );
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  }

  function submitPrompt(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (prompt.trim()) setPrompt("");
  }

  return (
    <section className="flex min-h-[560px] flex-col rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm sm:p-5">
      <div className="flex flex-col gap-3 border-b border-slate-100 pb-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <span className="text-sm text-amber-500">★</span>
            <h2 className="truncate text-base font-bold text-slate-900">
              TechWokx Oracle Cloud Setup
            </h2>
            <span className="hidden shrink-0 rounded-md border border-purple-100 bg-purple-50 px-2 py-0.5 text-xs font-medium text-purple-700 sm:inline">
              TechWokx
            </span>
          </div>
          <p className="mt-1 text-xs text-slate-400">
            Sep 17, 2026 • 12 messages • 1.2k words
          </p>
        </div>

        <div className="flex shrink-0 items-center gap-2">
          <button type="button" className="flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50">
            <Eye className="h-3.5 w-3.5" />
            View
          </button>

          <button type="button" className="flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50">
            <Download className="h-3.5 w-3.5" />
            Download
          </button>

          <button type="button" className="flex items-center gap-1.5 rounded-lg bg-blue-600 px-3 py-1.5 text-xs font-medium text-white shadow-sm hover:bg-blue-500">
            <RefreshCw className="h-3.5 w-3.5" />
            Rebuild
          </button>
        </div>
      </div>

      <div className="min-h-0 flex-1 space-y-4 overflow-y-auto py-4 pr-1">
        <Message avatar="IL" avatarClass="bg-indigo-600" author="You" time="Sep 17, 2026 • 10:19 AM">
          <p>Here&apos;s the current OCI setup for TechWokx. Please confirm the configuration and suggest any improvements.</p>
          <CodeBlock>{`Compartment: techwokx
Region: ca-toronto-1
VCN: TechWokx-VCN (10.0.0.0/16)
Compute: techwokx-prod
OS: Ubuntu 24.04 (aarch64)
Shape: VM.Standard.A1.Flex (1 OCPU, 6 GB, 1 Gbps)`}</CodeBlock>
        </Message>

        <Message avatar="C" avatarClass="bg-orange-600" author="Claude" time="Sep 17, 2026 • 10:23 AM">
          <p>The configuration looks good. Here are a few recommendations to improve security and performance:</p>
          <ol className="list-decimal space-y-1 pl-4">
            <li>Add a security list rule to restrict SSH access.</li>
            <li>Consider using a private subnet for internal resources.</li>
            <li>Enable backup for the compute instance.</li>
            <li>Monitor usage with OCI Monitoring.</li>
          </ol>
        </Message>

        <Message avatar="IL" avatarClass="bg-indigo-600" author="You" time="Sep 17, 2026 • 10:31 AM">
          <p>Thanks. I&apos;ll implement those changes. Can you also provide the CLI commands for the security list rules?</p>
        </Message>

        <Message avatar="C" avatarClass="bg-orange-600" author="Claude" time="Sep 17, 2026 • 10:35 AM">
          <p>Here are the CLI commands to update the security list rules:</p>
          <div className="relative">
            <CodeBlock>{`oci network security-list update --security-list-id ocid1.securitylist... \\
  --ingress-security-rules '[ ... ]'`}</CodeBlock>
            <button
              type="button"
              onClick={copyCode}
              className="absolute right-2 top-2 flex items-center gap-1 rounded border border-slate-700 bg-slate-800 px-2 py-1 text-[10px] text-slate-300 hover:text-white"
            >
              <Copy className="h-3 w-3" />
              {copied ? "Copied" : "Copy"}
            </button>
          </div>
        </Message>
      </div>

      <form onSubmit={submitPrompt} className="flex items-center gap-2 border-t border-slate-100 pt-3">
        <button type="button" className="rounded-lg p-2 text-slate-400 hover:text-slate-600" aria-label="Attach file">
          <Paperclip className="h-4 w-4" />
        </button>

        <label htmlFor="continuation-prompt" className="sr-only">
          Continuation prompt
        </label>

        <input
          id="continuation-prompt"
          type="text"
          value={prompt}
          onChange={(event) => setPrompt(event.target.value)}
          placeholder="Create a continuation prompt..."
          className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 text-xs outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
        />

        <button type="submit" className="rounded-xl bg-blue-600 p-2 text-white shadow-sm hover:bg-blue-500" aria-label="Send continuation prompt">
          <Send className="h-4 w-4" />
        </button>
      </form>
    </section>
  );
}

function Message({
  avatar,
  avatarClass,
  author,
  time,
  children,
}: {
  avatar: string;
  avatarClass: string;
  author: string;
  time: string;
  children: React.ReactNode;
}) {
  return (
    <article className="flex items-start gap-3">
      <div className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white ${avatarClass}`}>
        {avatar}
      </div>

      <div className="min-w-0 flex-1">
        <div className="mb-1 flex flex-wrap items-center gap-2">
          <span className="text-xs font-bold text-slate-900">{author}</span>
          <span className="text-[10px] text-slate-400">{time}</span>
        </div>

        <div className="space-y-2 rounded-2xl border border-slate-100 bg-slate-50 p-3.5 text-xs leading-relaxed text-slate-700">
          {children}
        </div>
      </div>
    </article>
  );
}

function CodeBlock({ children }: { children: string }) {
  return (
    <pre className="overflow-x-auto rounded-xl bg-slate-900 p-3 font-mono text-[11px] text-slate-100">
      {children}
    </pre>
  );
}
