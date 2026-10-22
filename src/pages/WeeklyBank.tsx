import React, { useState } from 'react';
import { 
  Play, 
  RotateCcw, 
  Search, 
  Filter, 
  CheckCircle2, 
  Clock, 
  FileText, 
  ChevronRight, 
  ChevronDown, 
  AlertCircle, 
  Bookmark, 
  Sparkles,
  Layers,
  BookOpen
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Question, WeekFilterType, QuizMode, QuestionBankType } from '../types';

interface WeeklyBankProps {
  onStartQuiz: (options: { 
    week?: WeekFilterType; 
    mode?: QuizMode; 
    onlyIncorrect?: boolean;
    questionLimit?: number;
    bankType?: QuestionBankType;
  }) => void;
}

export const WeeklyBank: React.FC<WeeklyBankProps> = ({ onStartQuiz }) => {
  const { questions, weeks, getWeekStats, stats, toggleBookmark, isBookmarked } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [expandedWeek, setExpandedWeek] = useState<number | null>(null);

  // Filter weeks based on search & filters
  const filteredWeeks = weeks.filter((w) => {
    const weekQs = questions.filter(q => q.week === w.week);
    const ws = getWeekStats(w.week);

    // Status filter
    if (selectedStatus === 'completed' && !ws.completed) return false;
    if (selectedStatus === 'in_progress' && (ws.attempted === 0 || ws.completed)) return false;
    if (selectedStatus === 'not_started' && ws.attempted > 0) return false;

    // Difficulty filter
    if (selectedDifficulty !== 'all') {
      const hasDiff = weekQs.some(q => q.difficulty === selectedDifficulty);
      if (!hasDiff) return false;
    }

    // Type filter
    if (selectedType !== 'all') {
      const hasType = weekQs.some(q => q.questionType === selectedType);
      if (!hasType) return false;
    }

    // Search query in title or description or questions
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchMeta = w.title.toLowerCase().includes(q) || w.description.toLowerCase().includes(q);
      const matchQuestions = weekQs.some(item => item.questionText.toLowerCase().includes(q));
      if (!matchMeta && !matchQuestions) return false;
    }

    return true;
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Top Banner & Filters */}
      <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800/80 space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
              Curated Week-Wise Question Bank
            </h2>
            <p className="text-sm text-slate-400 mt-0.5">
              12 Weeks extracted directly from official NPTEL course assignments & IIT Guwahati solutions
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-3 py-1.5 rounded-xl bg-brand-500/10 border border-brand-500/20 text-brand-300 text-xs font-semibold">
              {questions.length} Total Extracted Questions
            </span>
          </div>
        </div>

        {/* Search and Filters Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-2">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search topics, questions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-950/70 border border-slate-800 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-brand-500 transition-colors"
            />
          </div>

          {/* Status filter */}
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-3 py-2 rounded-xl bg-slate-950/70 border border-slate-800 text-slate-200 text-sm focus:outline-none focus:border-brand-500"
          >
            <option value="all">All Completion States</option>
            <option value="completed">Completed (100%)</option>
            <option value="in_progress">In Progress</option>
            <option value="not_started">Not Started</option>
          </select>

          {/* Question Type filter */}
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="px-3 py-2 rounded-xl bg-slate-950/70 border border-slate-800 text-slate-200 text-sm focus:outline-none focus:border-brand-500"
          >
            <option value="all">All Question Types</option>
            <option value="single">Single Choice (MCQ)</option>
            <option value="multiple">Multi-Select (Choose all)</option>
            <option value="true_false">True / False</option>
          </select>

          {/* Difficulty filter */}
          <select
            value={selectedDifficulty}
            onChange={(e) => setSelectedDifficulty(e.target.value)}
            className="px-3 py-2 rounded-xl bg-slate-950/70 border border-slate-800 text-slate-200 text-sm focus:outline-none focus:border-brand-500"
          >
            <option value="all">All Difficulties</option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </div>
      </div>

      {/* Week Cards List */}
      <div className="space-y-4">
        {filteredWeeks.length === 0 ? (
          <div className="p-12 text-center rounded-2xl bg-slate-900/40 border border-slate-800/80">
            <BookOpen className="w-12 h-12 text-slate-600 mx-auto mb-3" />
            <h3 className="text-base font-bold text-white">No Weeks Match Your Filters</h3>
            <p className="text-sm text-slate-400 mt-1">Try clearing your search query or reset the filter dropdowns.</p>
          </div>
        ) : (
          filteredWeeks.map((w) => {
            const ws = getWeekStats(w.week);
            const weekQs = questions.filter(q => q.week === w.week);
            const weekWrongQs = weekQs.filter(q => stats.wrongQuestionIds.includes(q.id));
            const isExpanded = expandedWeek === w.week;

            return (
              <div 
                key={w.week}
                className="rounded-2xl bg-slate-900/80 border border-slate-800/80 overflow-hidden transition-all duration-200 hover:border-slate-700"
              >
                {/* Week Card Header / Summary */}
                <div className="p-5 sm:p-6 flex flex-col lg:flex-row lg:items-center justify-between gap-5">
                  <div className="space-y-2 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="px-3 py-1 rounded-lg bg-brand-500/15 border border-brand-500/25 text-brand-300 font-bold text-xs font-mono">
                        Week {w.week}
                      </span>
                      <span className="text-xs text-slate-400 font-medium">{w.module}</span>
                      <span className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full ${
                        ws.completed 
                          ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30' 
                          : ws.attempted > 0 
                            ? 'bg-amber-500/15 text-amber-400 border border-amber-500/30' 
                            : 'bg-slate-800 text-slate-400'
                      }`}>
                        {ws.completed ? 'Completed' : ws.attempted > 0 ? `${ws.attempted}/${ws.total} Attempted` : 'Not Started'}
                      </span>
                    </div>

                    <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                      {w.title}
                    </h3>
                    <p className="text-sm text-slate-300">
                      {w.description}
                    </p>

                    {/* Topics Pill tags */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {w.topics.map((t, idx) => (
                        <span key={idx} className="px-2 py-0.5 rounded-md bg-slate-800/80 text-[11px] text-slate-400 font-medium">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Actions & Metrics */}
                  <div className="flex flex-col sm:flex-row lg:flex-col items-start lg:items-end justify-between gap-4 min-w-[220px]">
                    <div className="w-full text-right sm:text-left lg:text-right">
                      <div className="flex items-center justify-between lg:justify-end gap-3 text-xs mb-1.5">
                        <span className="text-slate-400">Accuracy</span>
                        <span className="font-bold text-emerald-400 font-mono text-sm">{ws.accuracy}%</span>
                      </div>
                      <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                        <div 
                          className="bg-brand-500 h-full rounded-full transition-all duration-500"
                          style={{ width: `${ws.total > 0 ? (ws.attempted / ws.total) * 100 : 0}%` }}
                        />
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-2 w-full">
                      <button
                        onClick={() => onStartQuiz({ week: w.week, mode: 'practice' })}
                        className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-semibold text-xs shadow-md shadow-brand-600/25 transition-all"
                      >
                        <Play className="w-3.5 h-3.5 fill-current" />
                        <span>Practice ({ws.total})</span>
                      </button>

                      {weekWrongQs.length > 0 && (
                        <button
                          onClick={() => onStartQuiz({ week: w.week, mode: 'practice', onlyIncorrect: true })}
                          className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-300 hover:bg-rose-500/25 text-xs font-semibold transition-colors"
                          title={`Practice ${weekWrongQs.length} questions previously answered incorrectly`}
                        >
                          <RotateCcw className="w-3.5 h-3.5" />
                          <span>Retry ({weekWrongQs.length})</span>
                        </button>
                      )}

                      <button
                        onClick={() => onStartQuiz({ week: w.week, mode: 'exam' })}
                        className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                        title="Timed Mock Exam for Week"
                      >
                        <Clock className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => setExpandedWeek(isExpanded ? null : w.week)}
                        className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
                        title={isExpanded ? 'Collapse questions' : 'Expand questions list'}
                      >
                        {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Expanded questions browser */}
                {isExpanded && (
                  <div className="border-t border-slate-800/80 bg-slate-950/50 p-5 divide-y divide-slate-800/60 space-y-4">
                    <div className="flex items-center justify-between pb-2">
                      <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                        Week {w.week} Questions Overview ({weekQs.length} questions)
                      </span>
                      <span className="text-xs text-brand-400">Click practice above to test interactively</span>
                    </div>

                    {weekQs.map((q, idx) => {
                      const isBooked = isBookmarked(q.id);
                      const isWrong = stats.wrongQuestionIds.includes(q.id);

                      return (
                        <div key={q.id} className="pt-3 pb-1 space-y-2">
                          <div className="flex items-start justify-between gap-3">
                            <div className="flex items-start gap-2.5">
                              <span className="w-6 h-6 rounded-lg bg-slate-800 text-slate-300 font-mono text-xs font-bold flex items-center justify-center shrink-0">
                                {idx + 1}
                              </span>
                              <div>
                                <p className="text-sm font-medium text-slate-200">
                                  {q.questionText}
                                </p>
                                <div className="flex flex-wrap items-center gap-2 mt-1.5 text-[11px] text-slate-400">
                                  <span className="capitalize px-1.5 py-0.5 rounded bg-slate-800/80">{q.questionType.replace('_', ' ')}</span>
                                  <span>•</span>
                                  <span className="text-slate-500 font-mono">{q.sourcePdf.split(' - ')[0]} p.{q.sourcePage}</span>
                                  {q.verificationStatus === 'dual_accepted' && (
                                    <span className="px-1.5 py-0.5 rounded bg-amber-500/15 text-amber-300 border border-amber-500/30">
                                      Dual Accepted in NPTEL
                                    </span>
                                  )}
                                  {isWrong && (
                                    <span className="px-1.5 py-0.5 rounded bg-rose-500/15 text-rose-300">
                                      Need Revision
                                    </span>
                                  )}
                                </div>
                              </div>
                            </div>

                            <button
                              onClick={() => toggleBookmark(q.id)}
                              className={`p-1.5 rounded-lg transition-colors ${
                                isBooked ? 'bg-amber-500/20 text-amber-400' : 'text-slate-500 hover:text-slate-300'
                              }`}
                              title={isBooked ? 'Remove Bookmark' : 'Bookmark Question'}
                            >
                              <Bookmark className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
