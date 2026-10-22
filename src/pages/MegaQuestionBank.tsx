import React, { useState, useMemo } from 'react';
import { 
  Layers, 
  Play, 
  Timer, 
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
  Award,
  Zap,
  BookOpen,
  Eye,
  EyeOff,
  Flame,
  Check,
  X,
  RotateCcw
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { MEGA_WEEKS_STATS } from '../data/megaQuestions';
import { Question, QuizMode, WeekFilterType, QuestionBankType } from '../types';

interface MegaQuestionBankProps {
  onStartQuiz: (options: {
    week?: WeekFilterType;
    mode?: QuizMode;
    onlyIncorrect?: boolean;
    questionLimit?: number;
    bankType?: QuestionBankType;
  }) => void;
}

export const MegaQuestionBank: React.FC<MegaQuestionBankProps> = ({ onStartQuiz }) => {
  const { 
    megaQuestions, 
    getMegaWeekStats, 
    stats, 
    toggleBookmark, 
    toggleDifficult,
    isBookmarked, 
    isDifficult 
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedWeek, setSelectedWeek] = useState<string>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [expandedWeek, setExpandedWeek] = useState<number | null>(null);
  const [revealedAnswers, setRevealedAnswers] = useState<Record<string, boolean>>({});

  // Batch modal state
  const [batchModalWeek, setBatchModalWeek] = useState<number | 'all' | null>(null);
  const [selectedBatchSize, setSelectedBatchSize] = useState<number>(25);
  const [selectedMode, setSelectedMode] = useState<QuizMode>('practice');

  // Overall Mega stats
  const totalMegaCount = megaQuestions.length;
  const attemptedMegaCount = useMemo(() => {
    return megaQuestions.filter(q => stats.questionHistory[q.id]?.attemptsCount > 0).length;
  }, [megaQuestions, stats.questionHistory]);

  const correctMegaCount = useMemo(() => {
    return megaQuestions.filter(q => stats.questionHistory[q.id]?.lastResult === 'correct').length;
  }, [megaQuestions, stats.questionHistory]);

  const overallAccuracy = attemptedMegaCount > 0 ? Math.round((correctMegaCount / attemptedMegaCount) * 100) : 0;

  // Toggle revealing answer inline
  const toggleRevealAnswer = (qId: string) => {
    setRevealedAnswers(prev => ({ ...prev, [qId]: !prev[qId] }));
  };

  // Open batch modal
  const openBatchModal = (week: number | 'all', defaultMode: QuizMode = 'practice') => {
    setBatchModalWeek(week);
    setSelectedMode(defaultMode);
    setSelectedBatchSize(25);
  };

  // Confirm start batch
  const handleLaunchBatch = () => {
    if (batchModalWeek === null) return;
    const filterKey: WeekFilterType = batchModalWeek === 'all' ? 'mega-all' : `mega-${batchModalWeek}`;
    onStartQuiz({
      week: filterKey,
      mode: selectedMode,
      questionLimit: selectedBatchSize === 0 ? undefined : selectedBatchSize,
      bankType: 'mega'
    });
    setBatchModalWeek(null);
  };

  // Filtered week list
  const filteredWeekStats = useMemo(() => {
    return MEGA_WEEKS_STATS.filter(w => {
      if (selectedWeek !== 'all' && w.week.toString() !== selectedWeek) return false;

      const weekQs = megaQuestions.filter(q => q.week === w.week);
      const ws = getMegaWeekStats(w.week);

      // Status
      if (selectedStatus === 'completed' && !ws.completed) return false;
      if (selectedStatus === 'in_progress' && (ws.attempted === 0 || ws.completed)) return false;
      if (selectedStatus === 'not_started' && ws.attempted > 0) return false;

      // Difficulty
      if (selectedDifficulty !== 'all') {
        const hasDiff = weekQs.some(q => q.difficulty === selectedDifficulty);
        if (!hasDiff) return false;
      }

      // Search
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchTitle = w.title.toLowerCase().includes(q) || w.module.toLowerCase().includes(q);
        const matchQuestions = weekQs.some(item => 
          item.questionText.toLowerCase().includes(q) || 
          item.topic.toLowerCase().includes(q) ||
          (item.explanation && item.explanation.toLowerCase().includes(q))
        );
        if (!matchTitle && !matchQuestions) return false;
      }

      return true;
    });
  }, [megaQuestions, selectedWeek, selectedDifficulty, selectedStatus, searchQuery, getMegaWeekStats]);

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-16">
      {/* Hero Header Banner */}
      <div className="relative overflow-hidden rounded-3xl p-6 sm:p-8 bg-gradient-to-br from-indigo-950 via-slate-900 to-purple-950 border border-indigo-500/30 shadow-2xl">
        <div className="absolute -right-16 -top-16 w-80 h-80 bg-brand-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -left-16 -bottom-16 w-72 h-72 bg-purple-500/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-amber-500/20 to-brand-500/20 text-amber-300 text-xs font-bold border border-amber-500/30">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>Comprehensive 3,000 Questions Bank</span>
            </div>

            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-xl bg-slate-800/80 border border-slate-700/80 text-slate-300 text-xs font-mono">
                752 Lecture Pages Covered
              </span>
              <span className="px-3 py-1 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-semibold">
                Weeks 1 – 12
              </span>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
                3,000 Questions Practice Bank
              </h1>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                Master Human-Computer Interfaces with an exhaustive repository of <strong className="text-white">2,250 verified questions</strong> separated by week, with detailed answer rationales and lecture slide citations.
              </p>
            </div>

            {/* Quick Action Buttons */}
            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={() => openBatchModal('all', 'practice')}
                className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-gradient-to-r from-brand-600 to-indigo-600 hover:from-brand-500 hover:to-indigo-500 text-white font-bold text-sm shadow-xl shadow-brand-600/25 transition-all hover:scale-[1.02]"
              >
                <Zap className="w-4 h-4 text-amber-300" />
                <span>Practice All Weeks</span>
              </button>

              <button
                onClick={() => openBatchModal('all', 'exam')}
                className="flex items-center gap-2 px-4 py-3 rounded-2xl bg-slate-800/90 hover:bg-slate-700 text-white font-semibold text-sm border border-slate-700 transition-all hover:scale-[1.02]"
              >
                <Timer className="w-4 h-4 text-brand-400" />
                <span>Timed Mock</span>
              </button>
            </div>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-slate-800/80">
            <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800">
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Total Questions</span>
              <p className="text-2xl font-extrabold text-white mt-0.5">{totalMegaCount.toLocaleString()}</p>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800">
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Attempted</span>
              <p className="text-2xl font-extrabold text-brand-300 mt-0.5">{attemptedMegaCount}</p>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800">
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Mastered (Correct)</span>
              <p className="text-2xl font-extrabold text-emerald-400 mt-0.5">{correctMegaCount}</p>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800">
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Bank Accuracy</span>
              <p className="text-2xl font-extrabold text-purple-300 mt-0.5">{overallAccuracy}%</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800/80 space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search 3,000 Qs by keyword, topic, text..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-950/70 border border-slate-800 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-brand-500 transition-colors"
            />
          </div>

          {/* Week Filter */}
          <select
            value={selectedWeek}
            onChange={(e) => setSelectedWeek(e.target.value)}
            className="px-3 py-2 rounded-xl bg-slate-950/70 border border-slate-800 text-slate-200 text-sm focus:outline-none focus:border-brand-500"
          >
            <option value="all">All 12 Weeks (Full Bank)</option>
            {MEGA_WEEKS_STATS.map(w => (
              <option key={w.week} value={w.week}>Week {w.week} ({w.count} Qs)</option>
            ))}
          </select>

          {/* Difficulty Filter */}
          <select
            value={selectedDifficulty}
            onChange={(e) => setSelectedDifficulty(e.target.value)}
            className="px-3 py-2 rounded-xl bg-slate-950/70 border border-slate-800 text-slate-200 text-sm focus:outline-none focus:border-brand-500"
          >
            <option value="all">All Difficulties</option>
            <option value="easy">Easy Questions</option>
            <option value="medium">Medium Questions</option>
            <option value="hard">Hard Questions</option>
          </select>

          {/* Status Filter */}
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-3 py-2 rounded-xl bg-slate-950/70 border border-slate-800 text-slate-200 text-sm focus:outline-none focus:border-brand-500"
          >
            <option value="all">All Statuses</option>
            <option value="completed">Completed (100%)</option>
            <option value="in_progress">In Progress</option>
            <option value="not_started">Not Started</option>
          </select>
        </div>
      </div>

      {/* Week Cards Grid */}
      <div className="space-y-4">
        {filteredWeekStats.map((w) => {
          const weekQs = megaQuestions.filter(q => q.week === w.week);
          const ws = getMegaWeekStats(w.week);
          const isExpanded = expandedWeek === w.week;

          // Difficulty breakdown
          const easyCount = weekQs.filter(q => q.difficulty === 'easy').length;
          const mediumCount = weekQs.filter(q => q.difficulty === 'medium').length;
          const hardCount = weekQs.filter(q => q.difficulty === 'hard').length;

          // Filter questions if user is searching while expanded
          const visibleQs = weekQs.filter(q => {
            if (selectedDifficulty !== 'all' && q.difficulty !== selectedDifficulty) return false;
            if (searchQuery.trim()) {
              const query = searchQuery.toLowerCase();
              return q.questionText.toLowerCase().includes(query) ||
                q.topic.toLowerCase().includes(query) ||
                (q.explanation && q.explanation.toLowerCase().includes(query));
            }
            return true;
          });

          return (
            <div 
              key={w.week}
              className={`rounded-2xl transition-all border ${
                isExpanded 
                  ? 'bg-slate-900/95 border-brand-500/40 shadow-xl' 
                  : 'bg-slate-900/70 border-slate-800/80 hover:border-slate-700/80'
              }`}
            >
              {/* Card Header Row */}
              <div className="p-5 sm:p-6 flex flex-col md:flex-row md:items-center justify-between gap-5">
                {/* Left info */}
                <div className="space-y-2 flex-1">
                  <div className="flex flex-wrap items-center gap-2.5">
                    <span className="px-3 py-1 rounded-xl bg-gradient-to-r from-brand-600/30 to-indigo-600/30 border border-brand-500/40 text-brand-300 font-extrabold text-xs tracking-wider uppercase">
                      Week {w.week}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-lg bg-slate-800 text-xs text-slate-400 font-mono">
                      {w.count} Questions
                    </span>
                    <span className="px-2.5 py-0.5 rounded-lg bg-slate-800/80 text-xs text-slate-400">
                      Pages {w.pages}
                    </span>
                    {ws.completed && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-lg bg-emerald-500/20 text-emerald-300 text-xs font-semibold border border-emerald-500/30">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        Completed
                      </span>
                    )}
                  </div>

                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                      {w.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
                      {w.module}
                    </p>
                  </div>

                  {/* Difficulty Breakdown badges */}
                  <div className="flex items-center gap-2 pt-1 text-xs">
                    <span className="text-slate-500 font-medium">Difficulty:</span>
                    <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[11px]">
                      {easyCount} Easy
                    </span>
                    <span className="px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20 text-[11px]">
                      {mediumCount} Medium
                    </span>
                    <span className="px-2 py-0.5 rounded bg-rose-500/10 text-rose-400 border border-rose-500/20 text-[11px]">
                      {hardCount} Hard
                    </span>
                  </div>
                </div>

                {/* Right Progress & Actions */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                  {/* Progress meter */}
                  <div className="w-full sm:w-44 space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-400 font-medium">Progress</span>
                      <span className="font-bold text-slate-200">{ws.attempted} / {ws.total} ({ws.accuracy}%)</span>
                    </div>
                    <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                      <div 
                        className="bg-gradient-to-r from-brand-500 to-emerald-500 h-full rounded-full transition-all duration-300"
                        style={{ width: `${ws.total > 0 ? (ws.attempted / ws.total) * 100 : 0}%` }}
                      />
                    </div>
                  </div>

                  {/* Buttons */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => openBatchModal(w.week, 'practice')}
                      className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-bold text-xs sm:text-sm transition-all shadow-md shadow-brand-600/20"
                      title="Practice this week"
                    >
                      <Play className="w-4 h-4 fill-white" />
                      <span>Practice</span>
                    </button>

                    <button
                      onClick={() => openBatchModal(w.week, 'exam')}
                      className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                      title="Timed Exam for this week"
                    >
                      <Timer className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => setExpandedWeek(isExpanded ? null : w.week)}
                      className={`flex items-center gap-1 px-3 py-2.5 rounded-xl text-xs font-semibold border transition-all ${
                        isExpanded
                          ? 'bg-slate-800 text-white border-slate-700'
                          : 'bg-slate-950/60 text-slate-400 hover:text-white border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      <span>{isExpanded ? 'Hide' : 'Browse'}</span>
                      {isExpanded ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>
              </div>

              {/* Expandable Question Browser */}
              {isExpanded && (
                <div className="border-t border-slate-800/80 bg-slate-950/60 p-5 sm:p-6 space-y-4 rounded-b-2xl">
                  <div className="flex items-center justify-between gap-4 pb-2 border-b border-slate-800/60">
                    <div className="flex items-center gap-2">
                      <BookOpen className="w-4 h-4 text-brand-400" />
                      <span className="text-sm font-bold text-white">
                        Showing {visibleQs.length} Questions for Week {w.week}
                      </span>
                    </div>

                    <button
                      onClick={() => openBatchModal(w.week, 'practice')}
                      className="text-xs font-bold text-brand-400 hover:text-brand-300 inline-flex items-center gap-1"
                    >
                      <span>Launch Interactive Practice</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
                    {visibleQs.map((q, idx) => {
                      const isRevealed = !!revealedAnswers[q.id];
                      const hist = stats.questionHistory[q.id];

                      return (
                        <div 
                          key={q.id}
                          className="p-4 rounded-xl bg-slate-900/90 border border-slate-800/80 space-y-3 transition-colors hover:border-slate-700"
                        >
                          {/* Q Header */}
                          <div className="flex items-start justify-between gap-3">
                            <div className="flex items-center gap-2">
                              <span className="px-2 py-0.5 rounded bg-brand-500/10 border border-brand-500/20 text-brand-300 text-xs font-bold font-mono">
                                #{q.originalQuestionNumber}
                              </span>
                              <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                                q.difficulty === 'hard'
                                  ? 'bg-rose-500/15 text-rose-300 border border-rose-500/20'
                                  : q.difficulty === 'medium'
                                    ? 'bg-amber-500/15 text-amber-300 border border-amber-500/20'
                                    : 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/20'
                              }`}>
                                {q.difficulty}
                              </span>
                              <span className="text-xs text-slate-400 font-medium">
                                Page {q.sourcePage}
                              </span>
                              {hist && (
                                <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                                  hist.lastResult === 'correct'
                                    ? 'bg-emerald-500/20 text-emerald-300'
                                    : 'bg-rose-500/20 text-rose-300'
                                }`}>
                                  {hist.lastResult === 'correct' ? 'Solved' : 'Wrong in last quiz'}
                                </span>
                              )}
                            </div>

                            <div className="flex items-center gap-1.5">
                              <button
                                onClick={() => toggleBookmark(q.id)}
                                className={`p-1.5 rounded-lg border transition-colors ${
                                  isBookmarked(q.id)
                                    ? 'bg-brand-500/20 border-brand-500/40 text-brand-300'
                                    : 'bg-slate-800/60 border-slate-700/60 text-slate-400 hover:text-slate-200'
                                }`}
                                title="Bookmark Question"
                              >
                                <Bookmark className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={() => toggleDifficult(q.id)}
                                className={`p-1.5 rounded-lg border transition-colors ${
                                  isDifficult(q.id)
                                    ? 'bg-rose-500/20 border-rose-500/40 text-rose-300'
                                    : 'bg-slate-800/60 border-slate-700/60 text-slate-400 hover:text-slate-200'
                                }`}
                                title="Mark as Difficult"
                              >
                                <Flame className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>

                          {/* Question Text */}
                          <p className="text-sm font-semibold text-slate-100 leading-snug">
                            {q.questionText}
                          </p>

                          {/* Options Grid */}
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                            {q.options.map((opt) => {
                              const isCorrectOpt = Array.isArray(q.correctAnswer)
                                ? q.correctAnswer.includes(opt.id)
                                : q.correctAnswer === opt.id;

                              return (
                                <div
                                  key={opt.id}
                                  className={`p-2.5 rounded-lg text-xs flex items-start gap-2 border transition-colors ${
                                    isRevealed && isCorrectOpt
                                      ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-200 font-medium'
                                      : 'bg-slate-950/60 border-slate-800 text-slate-300'
                                  }`}
                                >
                                  <span className={`w-5 h-5 rounded flex items-center justify-center font-bold text-[10px] shrink-0 ${
                                    isRevealed && isCorrectOpt
                                      ? 'bg-emerald-500 text-white'
                                      : 'bg-slate-800 text-slate-400'
                                  }`}>
                                    {opt.id.toUpperCase()}
                                  </span>
                                  <span className="leading-snug">{opt.text}</span>
                                </div>
                              );
                            })}
                          </div>

                          {/* Reveal Answer Button */}
                          <div className="pt-2 flex flex-wrap items-center justify-between gap-2 border-t border-slate-800/60">
                            <button
                              onClick={() => toggleRevealAnswer(q.id)}
                              className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-400 hover:text-brand-300 transition-colors"
                            >
                              {isRevealed ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                              <span>{isRevealed ? 'Hide Answer & Explanation' : 'Show Answer & Explanation'}</span>
                            </button>

                            {isRevealed && (
                              <span className="text-xs font-bold text-emerald-400">
                                Correct: {Array.isArray(q.correctAnswer) ? q.correctAnswer.join(', ').toUpperCase() : q.correctAnswer.toUpperCase()}
                              </span>
                            )}
                          </div>

                          {/* Explanation Card */}
                          {isRevealed && q.explanation && (
                            <div className="p-3 rounded-lg bg-indigo-950/40 border border-indigo-500/20 text-xs text-indigo-200/90 leading-relaxed">
                              <strong className="text-indigo-300">Explanation: </strong>
                              {q.explanation}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          );
        })}

        {filteredWeekStats.length === 0 && (
          <div className="text-center py-16 bg-slate-900/40 rounded-2xl border border-slate-800">
            <Layers className="w-12 h-12 text-slate-600 mx-auto mb-3" />
            <h3 className="text-base font-bold text-white">No weeks match your filter</h3>
            <p className="text-xs text-slate-400 mt-1">Try clearing your search query or reset the filters.</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedWeek('all');
                setSelectedDifficulty('all');
                setSelectedStatus('all');
              }}
              className="mt-4 px-4 py-2 rounded-xl bg-brand-600 hover:bg-brand-500 text-white text-xs font-semibold transition-colors"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>

      {/* Batch Practice Selection Modal */}
      {batchModalWeek !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-lg rounded-2xl bg-slate-900 border border-slate-700 shadow-2xl p-6 space-y-6">
            <div className="flex items-start justify-between gap-4 border-b border-slate-800 pb-4">
              <div>
                <span className="text-xs font-bold text-brand-400 uppercase tracking-wider">
                  Configure Practice Session
                </span>
                <h3 className="text-xl font-bold text-white mt-1">
                  {batchModalWeek === 'all' 
                    ? '3,000 Questions Bank (All Weeks)' 
                    : `Week ${batchModalWeek}: ${MEGA_WEEKS_STATS.find(w => w.week === batchModalWeek)?.title || ''}`}
                </h3>
              </div>
              <button
                onClick={() => setBatchModalWeek(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Select Batch Size */}
            <div className="space-y-2.5">
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
                Select Number of Questions
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {[
                  { size: 25, label: '25 Qs', subtitle: 'Quick Sprint (~15m)' },
                  { size: 50, label: '50 Qs', subtitle: 'Standard (~30m)' },
                  { size: 100, label: '100 Qs', subtitle: 'Deep Dive (~60m)' },
                  { size: 0, label: 'All Qs', subtitle: 'Full Week Set' }
                ].map((item) => (
                  <button
                    key={item.size}
                    type="button"
                    onClick={() => setSelectedBatchSize(item.size)}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      selectedBatchSize === item.size
                        ? 'bg-brand-600/20 border-brand-500 text-white shadow-lg shadow-brand-500/10'
                        : 'bg-slate-950/70 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                    }`}
                  >
                    <div className="font-bold text-sm text-white">{item.label}</div>
                    <div className="text-[10px] text-slate-400 mt-0.5">{item.subtitle}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Select Mode */}
            <div className="space-y-2.5">
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
                Select Practice Mode
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setSelectedMode('practice')}
                  className={`p-3.5 rounded-xl border text-left transition-all ${
                    selectedMode === 'practice'
                      ? 'bg-brand-600/20 border-brand-500 text-white'
                      : 'bg-slate-950/70 border-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <div className="flex items-center gap-2 font-bold text-sm text-white">
                    <Play className="w-4 h-4 text-brand-400" />
                    <span>Practice Mode</span>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1 leading-snug">
                    Instant feedback, option explanations, and answer reveals.
                  </p>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedMode('exam')}
                  className={`p-3.5 rounded-xl border text-left transition-all ${
                    selectedMode === 'exam'
                      ? 'bg-indigo-600/20 border-indigo-500 text-white'
                      : 'bg-slate-950/70 border-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <div className="flex items-center gap-2 font-bold text-sm text-white">
                    <Timer className="w-4 h-4 text-indigo-400" />
                    <span>Timed Mock Exam</span>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1 leading-snug">
                    Strict timer, no answers revealed until final submission.
                  </p>
                </button>
              </div>
            </div>

            {/* Footer buttons */}
            <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
              <button
                type="button"
                onClick={() => setBatchModalWeek(null)}
                className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-sm font-semibold transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleLaunchBatch}
                className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-brand-600 to-indigo-600 hover:from-brand-500 hover:to-indigo-500 text-white font-bold text-sm shadow-lg shadow-brand-500/25 transition-all"
              >
                <Zap className="w-4 h-4 text-amber-300" />
                <span>Start Practice</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
