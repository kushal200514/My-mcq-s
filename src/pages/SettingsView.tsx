import React, { useState } from 'react';
import { 
  Settings as SettingsIcon, 
  Download, 
  Upload, 
  RotateCcw, 
  Trash2, 
  CheckCircle2, 
  AlertCircle, 
  Save, 
  Calendar, 
  Clock, 
  Shuffle, 
  Volume2, 
  Sparkles 
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const SettingsView: React.FC = () => {
  const { 
    settings, 
    updateSettings, 
    exportDataJson, 
    importDataJson, 
    resetAllProgress, 
    resetWeekProgress,
    weeks,
    stats,
    questions 
  } = useApp();

  const [examDate, setExamDate] = useState(settings.examDate);
  const [examDuration, setExamDuration] = useState(settings.defaultExamDurationMinutes);
  const [shuffleQuestions, setShuffleQuestions] = useState(settings.shuffleQuestions);
  const [shuffleOptions, setShuffleOptions] = useState(settings.shuffleOptions);
  const [savedNotice, setSavedNotice] = useState(false);

  // Import / Export states
  const [importNotice, setImportNotice] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [confirmResetAll, setConfirmResetAll] = useState(false);
  const [selectedWeekToReset, setSelectedWeekToReset] = useState<number>(1);
  const [resetWeekNotice, setResetWeekNotice] = useState<string | null>(null);

  const handleSavePreferences = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings({
      examDate,
      defaultExamDurationMinutes: examDuration,
      shuffleQuestions,
      shuffleOptions,
    });
    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 2500);
  };

  const handleDownloadBackup = () => {
    const jsonStr = exportDataJson();
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `nuptel_prep_backup_${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      const res = importDataJson(content);
      if (res.success) {
        setImportNotice({ type: 'success', text: res.message });
      } else {
        setImportNotice({ type: 'error', text: res.message });
      }
    };
    reader.onerror = () => {
      setImportNotice({ type: 'error', text: 'Error reading uploaded backup file.' });
    };
    reader.readAsText(file);
    e.target.value = ''; // Reset input
  };

  const handleResetSingleWeek = () => {
    resetWeekProgress(selectedWeekToReset);
    setResetWeekNotice(`Week ${selectedWeekToReset} progress reset successfully.`);
    setTimeout(() => setResetWeekNotice(null), 2500);
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto pb-16">
      {/* Top Banner */}
      <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
            Settings & Data Management
          </h2>
          <p className="text-sm text-slate-400 mt-0.5">
            Configure examination schedule, quiz preferences, and export/import progress backups
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleDownloadBackup}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white text-xs font-semibold border border-slate-700 transition-colors"
          >
            <Download className="w-4 h-4" />
            <span>Export Backup</span>
          </button>
        </div>
      </div>

      {/* Exam & Practice Preferences Form */}
      <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Calendar className="w-4 h-4 text-brand-400" />
            <span>Examination Schedule & Rules</span>
          </h3>
          {savedNotice && (
            <span className="text-xs text-emerald-400 font-semibold flex items-center gap-1 animate-pulse">
              <CheckCircle2 className="w-4 h-4" /> Preferences Saved!
            </span>
          )}
        </div>

        <form onSubmit={handleSavePreferences} className="space-y-5 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-400 font-semibold mb-1.5">
                Target Exam Date
              </label>
              <input
                type="date"
                value={examDate}
                onChange={(e) => setExamDate(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white font-mono text-sm focus:outline-none focus:border-brand-500"
                required
              />
              <span className="text-[11px] text-slate-500 mt-1 block">Default: 23 October 2026 (NPTEL HCI Certification)</span>
            </div>

            <div>
              <label className="block text-slate-400 font-semibold mb-1.5">
                Default Timed Exam Duration (Minutes)
              </label>
              <select
                value={examDuration}
                onChange={(e) => setExamDuration(Number(e.target.value))}
                className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 text-sm focus:outline-none focus:border-brand-500"
              >
                <option value={15}>15 Minutes (Quick Drill)</option>
                <option value={30}>30 Minutes (Standard)</option>
                <option value={45}>45 Minutes (Extended)</option>
                <option value={60}>60 Minutes (Full Exam Simulation)</option>
              </select>
              <span className="text-[11px] text-slate-500 mt-1 block">Applied when taking mock tests in Timed Exam Mode</span>
            </div>
          </div>

          <div className="pt-2 border-t border-slate-800/80 space-y-3">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={shuffleQuestions}
                onChange={(e) => setShuffleQuestions(e.target.checked)}
                className="w-4 h-4 rounded text-brand-600 focus:ring-brand-500 bg-slate-950 border-slate-800"
              />
              <div>
                <span className="text-sm font-semibold text-slate-200">Shuffle Question Order</span>
                <p className="text-[11px] text-slate-400">Randomizes question presentation order in practice and exam sessions.</p>
              </div>
            </label>
          </div>

          <div className="pt-3 flex justify-end">
            <button
              type="submit"
              className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-bold text-xs shadow-lg shadow-brand-600/25 transition-all"
            >
              <Save className="w-4 h-4" />
              <span>Save Settings</span>
            </button>
          </div>
        </form>
      </div>

      {/* Backup Export & Restore Section */}
      <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <Download className="w-4 h-4 text-emerald-400" />
          <span>Data Backup & Progress Portability</span>
        </h3>
        <p className="text-xs text-slate-300">
          All your quiz attempts, bookmarks, question stats, and custom edits are preserved in browser LocalStorage. You can export a full JSON snapshot to transfer to another device or restore in case browser cache is cleared.
        </p>

        {importNotice && (
          <div className={`p-3 rounded-xl text-xs flex items-center gap-2 ${
            importNotice.type === 'success' ? 'bg-emerald-500/20 text-emerald-300' : 'bg-rose-500/20 text-rose-300'
          }`}>
            {importNotice.type === 'success' ? <CheckCircle2 className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
            <span>{importNotice.text}</span>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          {/* Export card */}
          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 flex flex-col justify-between gap-3">
            <div>
              <span className="font-bold text-white text-sm">Download Backup JSON</span>
              <p className="text-xs text-slate-400 mt-1">
                Saves all {questions.length} questions, {stats.attempts.length} attempts, and your bookmarks to a local JSON file.
              </p>
            </div>
            <button
              onClick={handleDownloadBackup}
              className="flex items-center justify-center gap-2 py-2 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-colors"
            >
              <Download className="w-4 h-4" />
              <span>Export JSON File</span>
            </button>
          </div>

          {/* Import card */}
          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 flex flex-col justify-between gap-3">
            <div>
              <span className="font-bold text-white text-sm">Restore from Backup JSON</span>
              <p className="text-xs text-slate-400 mt-1">
                Upload a previously saved JSON backup to seamlessly restore your entire preparation history.
              </p>
            </div>
            <label className="flex items-center justify-center gap-2 py-2 px-4 rounded-xl bg-brand-600 hover:bg-brand-500 text-white text-xs font-semibold cursor-pointer transition-colors shadow-md">
              <Upload className="w-4 h-4" />
              <span>Select File to Restore</span>
              <input
                type="file"
                accept=".json,application/json"
                onChange={handleFileUpload}
                className="hidden"
              />
            </label>
          </div>
        </div>
      </div>

      {/* Progress Reset Actions */}
      <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <RotateCcw className="w-4 h-4 text-amber-400" />
          <span>Progress Reset & Re-practice Options</span>
        </h3>
        <p className="text-xs text-slate-400">
          Reset specific weeks if you wish to re-test them fresh, or reset your entire attempt history.
        </p>

        {resetWeekNotice && (
          <div className="p-3 rounded-xl bg-emerald-500/20 text-emerald-300 text-xs flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" />
            <span>{resetWeekNotice}</span>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          {/* Reset Single Week */}
          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-3">
            <span className="font-bold text-white text-sm block">Reset Single Week Progress</span>
            <div className="flex items-center gap-2">
              <select
                value={selectedWeekToReset}
                onChange={(e) => setSelectedWeekToReset(Number(e.target.value))}
                className="flex-1 p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 text-xs"
              >
                {weeks.map(w => (
                  <option key={w.week} value={w.week}>Week {w.week}: {w.title}</option>
                ))}
              </select>
              <button
                onClick={handleResetSingleWeek}
                className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold shrink-0"
              >
                Reset Week
              </button>
            </div>
          </div>

          {/* Reset All Data */}
          <div className="p-4 rounded-xl bg-slate-950/60 border border-rose-500/20 space-y-3">
            <span className="font-bold text-rose-300 text-sm block">Factory Reset All Progress</span>
            {confirmResetAll ? (
              <div className="space-y-2">
                <p className="text-[11px] text-rose-400">Are you sure? This will clear all attempts, bookmarks, and history.</p>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => { resetAllProgress(); setConfirmResetAll(false); }}
                    className="px-3 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs"
                  >
                    Confirm Reset
                  </button>
                  <button
                    onClick={() => setConfirmResetAll(false)}
                    className="px-3 py-1.5 rounded-lg bg-slate-800 text-slate-300 text-xs"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <button
                onClick={() => setConfirmResetAll(true)}
                className="w-full flex items-center justify-center gap-2 py-2 px-4 rounded-xl bg-rose-950/40 hover:bg-rose-900/60 text-rose-300 border border-rose-500/30 text-xs font-semibold transition-colors"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Reset All History</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
