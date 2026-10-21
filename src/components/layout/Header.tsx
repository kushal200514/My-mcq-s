import React from 'react';
import { Menu, Play, AlertCircle, Sparkles } from 'lucide-react';
import { ExamCountdown } from './ExamCountdown';
import { useApp } from '../../context/AppContext';
import { NavTab } from './Sidebar';

interface HeaderProps {
  onToggleSidebar: () => void;
  currentTab: NavTab;
  onStartPractice: (type: 'all' | 'incorrect') => void;
}

const TAB_TITLES: Record<NavTab, { title: string; subtitle: string }> = {
  dashboard: { title: 'Exam Dashboard', subtitle: 'Overview, countdown, and mastery breakdown' },
  weeks: { title: 'Week-Wise Question Bank', subtitle: 'Assignments 1 to 12 extracted from NPTEL' },
  quiz: { title: 'Practice Mode', subtitle: 'Immediate feedback with detailed source explanations' },
  exam: { title: 'Timed Mock Exam', subtitle: 'Simulate official exam conditions without premature answers' },
  saved: { title: 'Saved & Difficult Questions', subtitle: 'High-priority revision for exam readiness' },
  analytics: { title: 'Performance Analytics', subtitle: 'Accuracy trends and weak topic diagnostics' },
  verification: { title: 'PDF Extraction & Verification', subtitle: 'Source PDF traceability and question audits' },
  settings: { title: 'Settings & Data Backup', subtitle: 'Exam preferences and JSON progress export/import' },
  results: { title: 'Test Results & Review', subtitle: 'Score evaluation and question-by-question breakdown' },
};

export const Header: React.FC<HeaderProps> = ({
  onToggleSidebar,
  currentTab,
  onStartPractice
}) => {
  const { stats } = useApp();
  const currentInfo = TAB_TITLES[currentTab] || { title: 'NPTEL Prep', subtitle: '' };

  return (
    <header className="sticky top-0 z-30 bg-slate-900/80 backdrop-blur-md border-b border-slate-800/80 px-4 sm:px-6 py-3.5">
      <div className="flex items-center justify-between gap-4">
        {/* Left: Mobile hamburger + Page Title */}
        <div className="flex items-center gap-3">
          <button
            onClick={onToggleSidebar}
            className="p-2 rounded-xl bg-slate-800/80 text-slate-300 hover:text-white hover:bg-slate-700/80 lg:hidden"
            aria-label="Open sidebar"
          >
            <Menu className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-lg sm:text-xl font-bold text-white tracking-tight font-sans">
              {currentInfo.title}
            </h1>
            <p className="text-xs text-slate-400 hidden sm:block">
              {currentInfo.subtitle}
            </p>
          </div>
        </div>

        {/* Right: Quick actions & Countdown */}
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="hidden md:block">
            <ExamCountdown compact />
          </div>

          {stats.wrongQuestionIds.length > 0 && (
            <button
              onClick={() => onStartPractice('incorrect')}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-300 hover:bg-rose-500/25 text-xs font-semibold transition-all duration-200"
              title="Practice all questions answered incorrectly in previous attempts"
            >
              <AlertCircle className="w-3.5 h-3.5" />
              <span>Retry Missed ({stats.wrongQuestionIds.length})</span>
            </button>
          )}

          <button
            onClick={() => onStartPractice('all')}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-brand-600 to-indigo-600 hover:from-brand-500 hover:to-indigo-500 text-white text-xs font-semibold shadow-md shadow-brand-600/25 transition-all duration-200"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span className="hidden sm:inline">Start</span> Practice
          </button>
        </div>
      </div>
    </header>
  );
};
