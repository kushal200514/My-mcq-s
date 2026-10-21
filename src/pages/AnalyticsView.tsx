import React from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  Calendar, 
  Award, 
  RotateCcw, 
  AlertTriangle,
  Layers,
  ArrowUpRight
} from 'lucide-react';
import { useApp } from '../context/AppContext';

interface AnalyticsViewProps {
  onStartQuiz: (options: { week?: number | 'all' | 'incorrect'; mode: 'practice' | 'exam' }) => void;
}

export const AnalyticsView: React.FC<AnalyticsViewProps> = ({ onStartQuiz }) => {
  const { questions, weeks, stats, getWeekStats } = useApp();

  const totalQuestions = questions.length;
  const attemptedCount = stats.totalAttempted;
  const accuracy = stats.accuracyRate;

  // Week-by-week accuracy data
  const weekData = weeks.map(w => {
    const ws = getWeekStats(w.week);
    return {
      week: w.week,
      title: w.title,
      accuracy: ws.accuracy,
      attempted: ws.attempted,
      total: ws.total,
      completed: ws.completed
    };
  });

  // Calculate topic performance
  const topicMap: Record<string, { total: number; correct: number; incorrect: number }> = {};
  questions.forEach(q => {
    if (!topicMap[q.topic]) {
      topicMap[q.topic] = { total: 0, correct: 0, incorrect: 0 };
    }
    topicMap[q.topic].total += 1;
    const hist = stats.questionHistory[q.id];
    if (hist && hist.attemptsCount > 0) {
      if (hist.lastResult === 'correct') {
        topicMap[q.topic].correct += 1;
      } else {
        topicMap[q.topic].incorrect += 1;
      }
    }
  });

  const topicList = Object.entries(topicMap).map(([topic, data]) => {
    const attempted = data.correct + data.incorrect;
    const rate = attempted > 0 ? Math.round((data.correct / attempted) * 100) : 0;
    return { topic, ...data, attempted, rate };
  }).sort((a, b) => b.attempted - a.attempted);

  // Recent attempts for trend
  const recentAttempts = [...stats.attempts].reverse().slice(-10);

  return (
    <div className="space-y-8 max-w-6xl mx-auto pb-16">
      {/* Top Header Card */}
      <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800/80 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
            Performance Analytics & Mastery Trends
          </h2>
          <p className="text-sm text-slate-400 mt-0.5">
            Diagnostic analytics across all 12 weeks, modules, and practice history
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="px-4 py-2 rounded-xl bg-slate-950 border border-slate-800 text-center">
            <div className="text-xs text-slate-400 font-semibold uppercase">Overall Accuracy</div>
            <div className="text-xl font-bold font-mono text-emerald-400">{accuracy}%</div>
          </div>
          <div className="px-4 py-2 rounded-xl bg-slate-950 border border-slate-800 text-center">
            <div className="text-xs text-slate-400 font-semibold uppercase">Total Sessions</div>
            <div className="text-xl font-bold font-mono text-indigo-400">{stats.attempts.length}</div>
          </div>
        </div>
      </div>

      {/* Week-Wise Accuracy Bar Chart */}
      <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800/80 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-white">Week-Wise Accuracy Breakdown</h3>
            <p className="text-xs text-slate-400">Target 70%+ across all weeks for certified exam readiness</p>
          </div>
          <span className="text-xs text-brand-400 font-semibold">12 Weeks Curriculum</span>
        </div>

        {/* Visual Chart */}
        <div className="pt-4 grid grid-cols-6 sm:grid-cols-12 gap-2 sm:gap-3 items-end h-56 border-b border-slate-800 pb-2">
          {weekData.map((w) => {
            const heightPercent = w.attempted > 0 ? Math.max(12, w.accuracy) : 4;
            const barColor = w.accuracy >= 80 
              ? 'bg-gradient-to-t from-emerald-600 to-teal-400' 
              : w.accuracy >= 60 
                ? 'bg-gradient-to-t from-indigo-600 to-brand-400' 
                : w.attempted > 0 
                  ? 'bg-gradient-to-t from-rose-600 to-amber-500' 
                  : 'bg-slate-800';

            return (
              <div key={w.week} className="flex flex-col items-center gap-1.5 group relative h-full justify-end">
                {/* Tooltip on hover */}
                <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute bottom-full mb-2 z-20 pointer-events-none p-2 rounded-xl bg-slate-950 border border-slate-700 text-center w-28 shadow-xl">
                  <div className="text-[11px] font-bold text-white">Week {w.week}</div>
                  <div className="text-xs text-emerald-400 font-mono font-bold">{w.accuracy}% Acc</div>
                  <div className="text-[10px] text-slate-400">{w.attempted}/{w.total} Done</div>
                </div>

                <div className="text-[10px] font-mono text-slate-400 font-semibold">
                  {w.attempted > 0 ? `${w.accuracy}%` : '-'}
                </div>

                <div 
                  className={`w-full rounded-t-xl transition-all duration-500 group-hover:brightness-125 ${barColor}`}
                  style={{ height: `${heightPercent}%` }}
                />

                <span className="text-xs font-mono font-bold text-slate-300">
                  W{w.week}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Attempts Accuracy Progression Trend Chart (if multiple attempts exist) */}
      {recentAttempts.length > 1 && (
        <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800/80 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-white">Score Progression Over Time</h3>
              <p className="text-xs text-slate-400">Tracking score changes across your last {recentAttempts.length} practice attempts</p>
            </div>
            <div className="flex items-center gap-2 text-xs text-emerald-400 font-semibold">
              <TrendingUp className="w-4 h-4" />
              <span>Score Trajectory</span>
            </div>
          </div>

          <div className="h-44 flex items-end gap-3 pt-6 border-b border-slate-800 pb-2">
            {recentAttempts.map((att, idx) => (
              <div key={att.id} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end group relative">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute bottom-full mb-1 z-20 pointer-events-none p-2 rounded-lg bg-slate-950 border border-slate-700 text-center text-xs shadow-xl">
                  <span className="font-bold text-white">{att.title}</span>
                  <div className="font-mono text-brand-300">{att.accuracyPercentage}% ({att.correctCount}/{att.questionIds.length})</div>
                </div>
                <div className="text-[11px] font-mono text-slate-400 font-bold">{att.accuracyPercentage}%</div>
                <div 
                  className="w-full max-w-[40px] rounded-t-lg bg-gradient-to-t from-brand-600 to-indigo-400 transition-all duration-500 group-hover:from-brand-500 group-hover:to-indigo-300"
                  style={{ height: `${Math.max(12, att.accuracyPercentage)}%` }}
                />
                <span className="text-[10px] text-slate-500 font-mono">#{idx + 1}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Topics Breakdown Table */}
      <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800/80 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-white">Topic-Level Diagnostic Breakdown</h3>
          <span className="text-xs text-slate-400">{topicList.length} Syllabus Topics</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 uppercase tracking-wider font-semibold">
                <th className="pb-3 pl-2">Topic Name</th>
                <th className="pb-3 text-center">Total Bank</th>
                <th className="pb-3 text-center">Attempted</th>
                <th className="pb-3 text-center">Correct</th>
                <th className="pb-3 text-center">Accuracy</th>
                <th className="pb-3 text-right pr-2">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {topicList.map((t) => (
                <tr key={t.topic} className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 pl-2 font-semibold text-slate-200">{t.topic}</td>
                  <td className="py-3 text-center text-slate-400 font-mono">{t.total}</td>
                  <td className="py-3 text-center text-slate-300 font-mono">{t.attempted}</td>
                  <td className="py-3 text-center text-emerald-400 font-mono">{t.correct}</td>
                  <td className="py-3 text-center font-mono font-bold text-white">
                    {t.attempted > 0 ? `${t.rate}%` : '-'}
                  </td>
                  <td className="py-3 text-right pr-2">
                    {t.attempted === 0 ? (
                      <span className="px-2 py-0.5 rounded text-[10px] bg-slate-800 text-slate-400">Unseen</span>
                    ) : t.rate >= 80 ? (
                      <span className="px-2 py-0.5 rounded text-[10px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">Mastered</span>
                    ) : t.rate >= 60 ? (
                      <span className="px-2 py-0.5 rounded text-[10px] bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">Moderate</span>
                    ) : (
                      <span className="px-2 py-0.5 rounded text-[10px] bg-rose-500/20 text-rose-300 border border-rose-500/30">Needs Revision</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Historical Attempts Table */}
      {stats.attempts.length > 0 && (
        <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800/80 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white">Attempt History Log</h3>
            <span className="text-xs text-slate-400">{stats.attempts.length} Total Sessions</span>
          </div>

          <div className="divide-y divide-slate-800/80 overflow-hidden">
            {stats.attempts.map((att) => (
              <div key={att.id} className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-white text-sm">{att.title}</span>
                    <span className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold ${
                      att.mode === 'exam' 
                        ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30' 
                        : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                    }`}>
                      {att.mode}
                    </span>
                  </div>
                  <div className="text-xs text-slate-400 flex items-center gap-2">
                    <span>{new Date(att.completedAt || att.startedAt).toLocaleString()}</span>
                    <span>•</span>
                    <span>{Math.floor(att.durationSeconds / 60)}m {att.durationSeconds % 60}s</span>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <span className="text-sm sm:text-base font-bold font-mono text-emerald-400">
                      {att.accuracyPercentage}%
                    </span>
                    <div className="text-[11px] text-slate-400">
                      {att.correctCount}/{att.questionIds.length} correct
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      if (typeof att.weekFilter === 'number' || att.weekFilter === 'all' || att.weekFilter === 'incorrect') {
                        onStartQuiz({ week: att.weekFilter, mode: att.mode });
                      } else {
                        onStartQuiz({ mode: att.mode });
                      }
                    }}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Retest</span>
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
