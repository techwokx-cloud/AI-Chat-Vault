'use client';

import React, { useState, useEffect } from 'react';
import { Save, Key, Bell, Lock, Database, Download } from 'lucide-react';

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    autoBackup: true,
    backupFrequency: 'weekly',
    notifications: true,
    notificationEmail: '',
    theme: 'dark',
    exportFormat: 'json',
  });

  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const response = await fetch('/api/settings');
      const data = await response.json();
      setSettings(data);
    } catch (error) {
      console.error('Failed to fetch settings:', error);
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const response = await fetch('/api/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings),
      });

      if (response.ok) {
        setMessage('Settings saved successfully');
        setTimeout(() => setMessage(''), 3000);
      } else {
        setMessage('Failed to save settings');
      }
    } catch (error) {
      console.error('Save failed:', error);
      setMessage('Error saving settings');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Settings</h1>

      {message && (
        <div className={`p-4 rounded-lg mb-6 ${
          message.includes('success')
            ? 'bg-green-50 text-green-800'
            : 'bg-red-50 text-red-800'
        }`}>
          {message}
        </div>
      )}

      <div className="space-y-6">
        {/* Backup Settings */}
        <div className="border border-gray-200 rounded-lg p-6">
          <h2 className="flex items-center gap-2 text-xl font-semibold mb-4">
            <Database size={24} />
            Backup Settings
          </h2>

          <label className="flex items-center gap-3 mb-4">
            <input
              type="checkbox"
              checked={settings.autoBackup}
              onChange={(e) =>
                setSettings({ ...settings, autoBackup: e.target.checked })
              }
              className="w-5 h-5"
            />
            <span>Enable automatic backups</span>
          </label>

          <div>
            <label className="block text-sm font-medium mb-2">Backup Frequency</label>
            <select
              value={settings.backupFrequency}
              onChange={(e) =>
                setSettings({ ...settings, backupFrequency: e.target.value })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            >
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
            </select>
          </div>
        </div>

        {/* Notification Settings */}
        <div className="border border-gray-200 rounded-lg p-6">
          <h2 className="flex items-center gap-2 text-xl font-semibold mb-4">
            <Bell size={24} />
            Notifications
          </h2>

          <label className="flex items-center gap-3 mb-4">
            <input
              type="checkbox"
              checked={settings.notifications}
              onChange={(e) =>
                setSettings({ ...settings, notifications: e.target.checked })
              }
              className="w-5 h-5"
            />
            <span>Enable notifications</span>
          </label>

          <div>
            <label className="block text-sm font-medium mb-2">Email Address</label>
            <input
              type="email"
              value={settings.notificationEmail}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  notificationEmail: e.target.value,
                })
              }
              placeholder="your@email.com"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            />
          </div>
        </div>

        {/* Export Settings */}
        <div className="border border-gray-200 rounded-lg p-6">
          <h2 className="flex items-center gap-2 text-xl font-semibold mb-4">
            <Download size={24} />
            Export Settings
          </h2>

          <div>
            <label className="block text-sm font-medium mb-2">Export Format</label>
            <select
              value={settings.exportFormat}
              onChange={(e) =>
                setSettings({ ...settings, exportFormat: e.target.value })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            >
              <option value="json">JSON</option>
              <option value="markdown">Markdown</option>
              <option value="zip">ZIP Archive</option>
            </select>
          </div>
        </div>

        {/* Save Button */}
        <button
          onClick={handleSave}
          disabled={isSaving}
          className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 font-semibold"
        >
          <Save size={20} />
          {isSaving ? 'Saving...' : 'Save Settings'}
        </button>
      </div>
    </div>
  );
}
