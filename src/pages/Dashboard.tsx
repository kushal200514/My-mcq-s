import React from 'react';
import { 
  CheckCircle2, 
  XCircle, 
  Target, 
  Bookmark, 
  AlertTriangle, 
  Play, 
  ArrowRight, 
  Clock, 
  BookOpen, 
  Flame, 
  History,
  RotateCcw,
  Sparkles,
  TrendingUp,
  Award
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ExamCountdown } from '../components/layout/ExamCountdown';
import { NavTab } from '../components/layout/Sidebar';

interface DashboardProps {
  onNavigate: (tab: NavTab) => void;
  onStartQuiz: (options: { week?: number | 'all' | 'incorrect' | 'bookmarks' | 'difficult'; mode?: 'practice' | 'exam' }) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ onNavigate, onStartQuiz }) => {
  const { questions, weeks, stats, activeAttempt, getWeekStats } = useApp();

  const totalQuestions = questions.length;
  const attemptedCount = stats.totalAttempted;
  const correctCount = stats.totalCorrect;
  const incorrectCount = stats.totalIncorrect;
  const accuracy = stats.accuracyRate;
  const bookmarkedCount = stats.bookmarkedQuestionIds.length;
  const difficultCount = stats.difficultQuestionIds.length;

  // Identify weak topics based on questionHistory
  const topicStats: Record<string, { total: number; incorrect: number }> = {};
  questions.forEach(q => {
    if (!topicStats[q.topic]) {
      topicStats[q.topic] = { total: 0, incorrect: 0 };
    }
    topicStats[q.topic].total += 1;
    const hist = stats.questionHistory[q.id];
    if (hist && hist.lastResult === 'incorrect') {
      topicStats[q.topic].incorrect += 1;
    }
  });

  const weakTopics = Object.entries(topicStats)
    .filter(([_, data]) => data.incorrect > 0)
    .sort((a, b) => b[1].incorrect - a[1].incorrect)
    .slice(0, 4);

  // Determine what "Continue Practicing" should do
  const handleContinuePracticing = () => {
    if (activeAttempt) {
      onStartQuiz({ mode: activeAttempt.mode });
      return;
    }
    if (stats.wrongQuestionIds.length > 0) {
      onStartQuiz({ week: 'incorrect', mode: 'practice' });
      return;
    }
    // Find first incomplete week
    for (const w of weeks) {
      const ws = getWeekStats(w.week);
      if (!ws.completed) {
        onStartQuiz({ week: w.week, mode: 'practice' });
        return;
      }
    }
    onStartQuiz({ week: 1, mode: 'practice' });
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Target Exam Countdown Hero */}
      <ExamCountdown />

      {/* Prominent Action Banner / Continue Practicing */}
      <div className="relative overflow-hidden rounded-2xl p-6 sm:p-7 bg-gradient-to-r from-brand-900/90 via-indigo-950/80 to-slate-900 border border-brand-500/30 shadow-2xl">
        <div className="absolute -right-12 -top-12 w-64 h-64 bg-brand-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/20 text-brand-300 text-xs font-semibold border border-brand-500/30">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>Smart Study Recommendation</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              {activeAttempt 
                ? 'Resume Unfinished Session' 
                : stats.wrongQuestionIds.length > 0 
                  ? `You have ${stats.wrongQuestionIds.length} questions to master` 
                  : 'Start Your HCI Exam Practice'}
            </h2>
            <p className="text-sm text-slate-300">
              {activeAttempt 
                ? `You have an in-progress ${activeAttempt.mode} session (${Object.keys(activeAttempt.answers).length} answered). Pick up right where you left off!` 
                : stats.wrongQuestionIds.length > 0
                  ? 'Target your weak areas immediately. Repeated practice on previously missed questions yields the fastest score improvements.'
                  : 'Practice all 12 official weekly assignment question banks with instant feedback and source citations.'}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
            <button
              onClick={handleContinuePracticing}
              className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-brand-600 to-indigo-600 hover:from-brand-500 hover:to-indigo-500 text-white font-bold text-sm shadow-xl shadow-brand-600/30 transition-all duration-200 transform hover:-translate-y-0.5"
            >
              <Play className="w-4 h-4 fill-current" />
              <span>{activeAttempt ? 'Resume Session' : stats.wrongQuestionIds.length > 0 ? 'Practice Missed Questions' : 'Continue Practicing'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => onStartQuiz({ week: 'all', mode: 'exam' })}
              className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-indigo-300 hover:text-white border border-indigo-500/30 font-semibold text-sm transition-all duration-200"
            >
              <Clock className="w-4 h-4 text-indigo-400" />
              <span>Full Mock Exam</span>
            </button>
          </div>
        </div>
      </div>

      {/* 4 Core Stat Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1: Total Questions & Attempted */}
        <div className="p-4 sm:p-5 rounded-2xl bg-slate-900/80 border border-slate-800/80 glass-card">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Total Progress</span>
            <div className="p-2 rounded-xl bg-brand-500/10 text-brand-400">
              <BookOpen className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-extrabold text-white font-mono">{attemptedCount}</span>
            <span className="text-xs text-slate-400 font-medium">/ {totalQuestions} questions</span>
          </div>
          <div className="mt-3 flex items-center justify-between text-xs text-slate-400">
            <span>Completion</span>
            <span className="font-semibold text-brand-300">
              {Math.round((attemptedCount / Math.max(totalQuestions, 1)) * 100)}%
            </span>
          </div>
          <div className="mt-1.5 w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
            <div 
              className="bg-brand-500 h-full rounded-full transition-all duration-500"
              style={{ width: `${Math.round((attemptedCount / Math.max(totalQuestions, 1)) * 100)}%` }}
            />
          </div>
        </div>

        {/* Metric 2: Accuracy Rate */}
        <div className="p-4 sm:p-5 rounded-2xl bg-slate-900/80 border border-slate-800/80 glass-card">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Overall Accuracy</span>
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400">
              <Target className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-extrabold text-emerald-400 font-mono">{accuracy}%</span>
            <span className="text-xs text-slate-400 font-medium">rate</span>
          </div>
          <div className="mt-3 flex items-center justify-between text-xs text-slate-400">
            <span className="flex items-center gap-1 text-emerald-400 font-medium">
              <CheckCircle2 className="w-3.5 h-3.5" /> {correctCount} correct
            </span>
            <span className="flex items-center gap-1 text-rose-400 font-medium">
              <XCircle className="w-3.5 h-3.5" /> {incorrectCount} wrong
            </span>
          </div>
          <div className="mt-1.5 w-full bg-slate-800 h-1.5 rounded-full overflow-hidden flex">
            <div 
              className="bg-emerald-500 h-full transition-all duration-500"
              style={{ width: `${attemptedCount > 0 ? (correctCount / attemptedCount) * 100 : 0}%` }}
            />
            <div 
              className="bg-rose-500 h-full transition-all duration-500"
              style={{ width: `${attemptedCount > 0 ? (incorrectCount / attemptedCount) * 100 : 0}%` }}
            />
          </div>
        </div>

        {/* Metric 3: Bookmarks & Difficult */}
        <div className="p-4 sm:p-5 rounded-2xl bg-slate-900/80 border border-slate-800/80 glass-card">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Saved For Revision</span>
            <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400">
              <Bookmark className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-extrabold text-amber-400 font-mono">{bookmarkedCount}</span>
            <span className="text-xs text-slate-400 font-medium">bookmarked</span>
          </div>
          <div className="mt-3 flex items-center justify-between text-xs text-slate-400">
            <span className="flex items-center gap-1 text-purple-400 font-medium">
              <AlertTriangle className="w-3.5 h-3.5" /> {difficultCount} flagged hard
            </span>
            <button 
              onClick={() => onNavigate('saved')} 
              className="text-brand-400 hover:text-brand-300 font-semibold"
            >
              Review →
            </button>
          </div>
          <div className="mt-1.5 w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
            <div 
              className="bg-amber-400 h-full rounded-full transition-all duration-500"
              style={{ width: `${Math.min(100, ((bookmarkedCount + difficultCount) / Math.max(totalQuestions, 1)) * 100)}%` }}
            />
          </div>
        </div>

        {/* Metric 4: Test Attempts Completed */}
        <div className="p-4 sm:p-5 rounded-2xl bg-slate-900/80 border border-slate-800/80 glass-card">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Test Sessions</span>
            <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-400">
              <Award className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-extrabold text-indigo-400 font-mono">{stats.attempts.length}</span>
            <span className="text-xs text-slate-400 font-medium">completed</span>
          </div>
          <div className="mt-3 flex items-center justify-between text-xs text-slate-400">
            <span>Pass readiness</span>
            <span className={`font-semibold ${accuracy >= 70 ? 'text-emerald-400' : 'text-amber-400'}`}>
              {accuracy >= 70 ? 'Exam Ready' : 'Needs Practice'}
            </span>
          </div>
          <div className="mt-1.5 w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
            <div 
              className={`h-full rounded-full transition-all duration-500 ${accuracy >= 70 ? 'bg-emerald-500' : 'bg-amber-500'}`}
              style={{ width: `${Math.min(100, accuracy)}%` }}
            />
          </div>
        </div>
      </div>

      {/* Weak Topics Diagnostic Banner (if any) */}
      {weakTopics.length > 0 && (
        <div className="p-5 rounded-2xl bg-rose-950/20 border border-rose-500/20">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-rose-500/20 text-rose-400">
                <AlertTriangle className="w-4 h-4" />
              </div>
              <h3 className="font-bold text-white text-sm">Focus Areas (Frequent Errors)</h3>
            </div>
            <button
              onClick={() => onStartQuiz({ week: 'incorrect', mode: 'practice' })}
              className="text-xs font-semibold text-rose-400 hover:text-rose-300 flex items-center gap-1"
            >
              <span>Practice All Missed</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {weakTopics.map(([topic, data]) => (
              <div key={topic} className="p-3 rounded-xl bg-slate-900/60 border border-rose-500/20">
                <div className="text-xs font-semibold text-slate-200 truncate" title={topic}>
                  {topic}
                </div>
                <div className="flex items-center justify-between mt-2 text-xs">
                  <span className="text-rose-400 font-medium">{data.incorrect} missed</span>
                  <span className="text-slate-400">{data.total} total</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Week-Wise Progress Grid (12 Weeks) */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-white tracking-tight">Week-Wise Question Completion</h3>
            <p className="text-xs text-slate-400">Track coverage across all 12 course units and assignments</p>
          </div>
          <button
            onClick={() => onNavigate('weeks')}
            className="text-xs font-semibold text-brand-400 hover:text-brand-300 flex items-center gap-1"
          >
            <span>View Full Bank</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {weeks.map((w) => {
            const ws = getWeekStats(w.week);
            const isCompleted = ws.completed;
            const hasStarted = ws.attempted > 0;

            return (
              <div 
                key={w.week}
                className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800/80 hover:border-brand-500/40 transition-all duration-200 group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="px-2.5 py-1 rounded-lg bg-brand-500/10 border border-brand-500/20 text-brand-300 text-xs font-bold font-mono">
                      Week {w.week}
                    </span>
                    <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${
                      isCompleted 
                        ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30' 
                        : hasStarted 
                          ? 'bg-amber-500/15 text-amber-400 border border-amber-500/30' 
                          : 'bg-slate-800 text-slate-400'
                    }`}>
                      {isCompleted ? 'Completed' : hasStarted ? 'In Progress' : 'Not Started'}
                    </span>
                  </div>

                  <h4 className="font-bold text-white text-sm group-hover:text-brand-300 transition-colors line-clamp-1">
                    {w.title}
                  </h4>
                  <p className="text-xs text-slate-400 mt-1 line-clamp-2">
                    {w.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-800/80 space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-400 font-medium">
                      {ws.attempted}/{ws.total} Questions
                    </span>
                    <span className="font-semibold text-emerald-400">
                      {ws.accuracy}% Accuracy
                    </span>
                  </div>

                  <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full transition-all duration-500 ${isCompleted ? 'bg-emerald-500' : 'bg-brand-500'}`}
                      style={{ width: `${ws.total > 0 ? (ws.attempted / ws.total) * 100 : 0}%` }}
                    />
                  </div>

                  <div className="flex items-center gap-2 pt-1">
                    <button
                      onClick={() => onStartQuiz({ week: w.week, mode: 'practice' })}
                      className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-semibold text-xs shadow-md shadow-brand-600/20 transition-all"
                    >
                      <Play className="w-3.5 h-3.5 fill-current" />
                      <span>Practice</span>
                    </button>

                    <button
                      onClick={() => onStartQuiz({ week: w.week, mode: 'exam' })}
                      className="py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white font-semibold text-xs transition-colors"
                      title="Take timed exam for this week"
                    >
                      <Clock className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Recent Practice Sessions */}
      {stats.attempts.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <History className="w-4 h-4 text-brand-400" />
              <h3 className="text-base font-bold text-white">Recent Practice Sessions</h3>
            </div>
            <button
              onClick={() => onNavigate('analytics')}
              className="text-xs font-semibold text-brand-400 hover:text-brand-300"
            >
              All Attempts ({stats.attempts.length}) →
            </button>
          </div>

          <div className="divide-y divide-slate-800/80 rounded-2xl bg-slate-900/80 border border-slate-800/80 overflow-hidden">
            {stats.attempts.slice(0, 4).map((att) => (
              <div key={att.id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-800/40 transition-colors">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-white text-sm">{att.title}</span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-semibold uppercase ${
                      att.mode === 'exam' 
                        ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30' 
                        : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                    }`}>
                      {att.mode}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-slate-400 mt-1">
                    <span>{new Date(att.completedAt || att.startedAt).toLocaleDateString()} at {new Date(att.completedAt || att.startedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                    <span>•</span>
                    <span>{att.questionIds.length} questions</span>
                    <span>•</span>
                    <span>{Math.floor(att.durationSeconds / 60)}m {att.durationSeconds % 60}s</span>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <div className="text-base font-bold font-mono text-emerald-400">
                      {att.accuracyPercentage}%
                    </div>
                    <div className="text-[11px] text-slate-400">
                      {att.correctCount}/{att.questionIds.length} correct
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      if (att.weekFilter === 'incorrect' || att.weekFilter === 'all' || typeof att.weekFilter === 'number') {
                        onStartQuiz({ week: att.weekFilter, mode: att.mode });
                      } else {
                        onStartQuiz({ mode: att.mode });
                      }
                    }}
                    className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white"
                    title="Retry this quiz"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
