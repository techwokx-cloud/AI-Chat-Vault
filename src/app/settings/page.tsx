"use client";

import { useState } from "react";
import { Check, Save } from "lucide-react";

export default function SettingsPage() {
  const [workspaceName, setWorkspaceName] = useState("Innovation Lab");
  const [saved, setSaved] = useState(false);

  function saveSettings(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    localStorage.setItem(
      "ai-chat-vault:settings:v1",
      JSON.stringify({ workspaceName }),
    );
    setSaved(true);
    window.setTimeout(() => setSaved(false), 1800);
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Settings</h1>
        <p className="mt-1 text-sm text-slate-500">
          Manage your AI Chat Vault account and workspace preferences.
        </p>
      </div>

      <form
        onSubmit={saveSettings}
        className="max-w-2xl space-y-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
      >
        <div>
          <label
            htmlFor="workspace-name"
            className="text-sm font-semibold text-slate-900"
          >
            Workspace name
          </label>

          <input
            id="workspace-name"
            value={workspaceName}
            onChange={(event) => setWorkspaceName(event.target.value)}
            className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
          />

          <p className="mt-1 text-xs text-slate-400">
            This name appears in your workspace header.
          </p>
        </div>

        <button
          type="submit"
          className="flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-500"
        >
          {saved ? <Check className="h-4 w-4" /> : <Save className="h-4 w-4" />}
          {saved ? "Saved" : "Save settings"}
        </button>
      </form>
    </div>
  );
}
