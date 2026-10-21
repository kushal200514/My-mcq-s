import React from 'react';
import { 
  LayoutDashboard, 
  BookOpen, 
  PlayCircle, 
  Timer, 
  Bookmark, 
  BarChart3, 
  FileCheck, 
  Settings,
  Sparkles,
  GraduationCap
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export type NavTab = 
  | 'dashboard' 
  | 'weeks' 
  | 'quiz' 
  | 'exam' 
  | 'saved' 
  | 'analytics' 
  | 'verification' 
  | 'settings'
  | 'results';

interface SidebarProps {
  currentTab: NavTab;
  onSelectTab: (tab: NavTab) => void;
  isOpenMobile: boolean;
  onCloseMobile: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentTab,
  onSelectTab,
  isOpenMobile,
  onCloseMobile
}) => {
  const { stats, questions } = useApp();

  const navItems = [
    { id: 'dashboard' as NavTab, label: 'Dashboard', icon: LayoutDashboard },
    { id: 'weeks' as NavTab, label: 'Week Question Bank', icon: BookOpen, badge: '12 Weeks' },
    { id: 'quiz' as NavTab, label: 'Practice Mode', icon: PlayCircle },
    { id: 'exam' as NavTab, label: 'Timed Exam Mode', icon: Timer, highlight: true },
    { 
      id: 'saved' as NavTab, 
      label: 'Saved & Difficult', 
      icon: Bookmark, 
      count: stats.bookmarkedQuestionIds.length + stats.difficultQuestionIds.length 
    },
    { id: 'analytics' as NavTab, label: 'Performance Analytics', icon: BarChart3 },
    { id: 'verification' as NavTab, label: 'PDF Sources & Verify', icon: FileCheck },
    { id: 'settings' as NavTab, label: 'Settings & Backup', icon: Settings },
  ];

  const handleNavClick = (tab: NavTab) => {
    onSelectTab(tab);
    onCloseMobile();
  };

  return (
    <>
      {/* Mobile backdrop */}
      {isOpenMobile && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={onCloseMobile}
        />
      )}

      {/* Sidebar container */}
      <aside className={`
        fixed top-0 bottom-0 left-0 z-50 w-64 bg-slate-900/95 backdrop-blur-md border-r border-slate-800/80
        flex flex-col transition-transform duration-300 ease-in-out
        ${isOpenMobile ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        {/* Brand / Logo */}
        <div className="p-5 border-b border-slate-800/80 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-600 to-indigo-500 flex items-center justify-center text-white shadow-lg shadow-brand-500/25">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-white tracking-tight text-base font-sans">NPTEL Prep</span>
                <span className="px-1.5 py-0.5 rounded text-[10px] font-semibold bg-brand-500/20 text-brand-300 border border-brand-500/30">
                  HCI
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-medium">Exam Mastery Platform</p>
            </div>
          </div>
        </div>

        {/* Quick overall mastery pill */}
        <div className="px-4 py-3 border-b border-slate-800/60 bg-slate-950/40">
          <div className="flex items-center justify-between text-xs mb-1.5">
            <span className="text-slate-400 font-medium">Progress</span>
            <span className="text-brand-300 font-semibold">
              {stats.totalAttempted} / {questions.length} ({Math.round((stats.totalAttempted / Math.max(questions.length, 1)) * 100)}%)
            </span>
          </div>
          <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
            <div 
              className="bg-gradient-to-r from-brand-500 to-indigo-400 h-full rounded-full transition-all duration-500"
              style={{ width: `${Math.min(100, Math.round((stats.totalAttempted / Math.max(questions.length, 1)) * 100))}%` }}
            />
          </div>
        </div>

        {/* Nav list */}
        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`
                  w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200
                  ${isActive 
                    ? 'bg-brand-600 text-white shadow-md shadow-brand-600/30 font-semibold' 
                    : item.highlight
                      ? 'text-indigo-300 hover:bg-slate-800/80 hover:text-white border border-indigo-500/20 bg-indigo-500/5'
                      : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/60'
                  }
                `}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : item.highlight ? 'text-indigo-400' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </div>

                {item.badge && (
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${
                    isActive ? 'bg-brand-700 text-white' : 'bg-slate-800 text-slate-300'
                  }`}>
                    {item.badge}
                  </span>
                )}

                {item.count !== undefined && item.count > 0 && (
                  <span className={`text-[11px] px-2 py-0.5 rounded-full font-semibold ${
                    isActive ? 'bg-brand-700 text-white' : 'bg-brand-500/20 text-brand-300 border border-brand-500/30'
                  }`}>
                    {item.count}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Footer Info */}
        <div className="p-3 border-t border-slate-800/80 bg-slate-950/60 text-xs">
          <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800/80">
            <div className="flex items-center gap-2 text-brand-300 font-semibold mb-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Exam Date</span>
            </div>
            <p className="text-slate-300 font-medium">23 October 2026</p>
            <p className="text-[11px] text-slate-500 mt-0.5">IIT Guwahati NPTEL</p>
          </div>
        </div>
      </aside>
    </>
  );
};
