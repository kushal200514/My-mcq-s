import React, { useState } from 'react';
import { Bookmark, AlertTriangle, Play, Eye, EyeOff, Trash2, CheckCircle2, BookOpen, Search } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Question } from '../types';

interface BookmarksViewProps {
  onStartQuiz: (options: { week: 'bookmarks' | 'difficult'; mode: 'practice' }) => void;
}

export const BookmarksView: React.FC<BookmarksViewProps> = ({ onStartQuiz }) => {
  const { allQuestions, stats, toggleBookmark, toggleDifficult } = useApp();
  const [activeTab, setActiveTab] = useState<'bookmarks' | 'difficult'>('bookmarks');
  const [revealedAnswers, setRevealedAnswers] = useState<Record<string, boolean>>({});
  const [searchQuery, setSearchQuery] = useState('');

  const bookmarkedQuestions = allQuestions.filter(q => stats.bookmarkedQuestionIds.includes(q.id));
  const difficultQuestions = allQuestions.filter(q => stats.difficultQuestionIds.includes(q.id));

  const currentList = activeTab === 'bookmarks' ? bookmarkedQuestions : difficultQuestions;

  const filteredList = currentList.filter(q => {
    if (!searchQuery.trim()) return true;
    const query = searchQuery.toLowerCase();
    return q.questionText.toLowerCase().includes(query) || q.topic.toLowerCase().includes(query);
  });

  const toggleReveal = (id: string) => {
    setRevealedAnswers(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-16">
      {/* Top Header Card */}
      <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800/80 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
            High-Priority Revision Bank
          </h2>
          <p className="text-sm text-slate-400 mt-0.5">
            Target saved items for rapid revision and flashcard-style reinforcement
          </p>
        </div>

        {currentList.length > 0 && (
          <button
            onClick={() => onStartQuiz({ week: activeTab, mode: 'practice' })}
            className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-brand-600 to-indigo-600 hover:from-brand-500 hover:to-indigo-500 text-white font-bold text-sm shadow-lg shadow-brand-600/25 transition-all"
          >
            <Play className="w-4 h-4 fill-current" />
            <span>Practice All {activeTab === 'bookmarks' ? 'Bookmarked' : 'Difficult'} ({currentList.length})</span>
          </button>
        )}
      </div>

      {/* Tabs and Search */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2 p-1 rounded-xl bg-slate-900/90 border border-slate-800">
          <button
            onClick={() => setActiveTab('bookmarks')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'bookmarks'
                ? 'bg-brand-600 text-white shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Bookmark className="w-3.5 h-3.5" />
            <span>Bookmarked ({bookmarkedQuestions.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('difficult')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'difficult'
                ? 'bg-rose-600 text-white shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>Difficult ({difficultQuestions.length})</span>
          </button>
        </div>

        <div className="relative flex-1 sm:max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search saved questions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-900/80 border border-slate-800 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-brand-500"
          />
        </div>
      </div>

      {/* Questions list */}
      <div className="space-y-4">
        {filteredList.length === 0 ? (
          <div className="p-12 text-center rounded-2xl bg-slate-900/40 border border-slate-800/80">
            {activeTab === 'bookmarks' ? (
              <Bookmark className="w-12 h-12 text-slate-600 mx-auto mb-3" />
            ) : (
              <AlertTriangle className="w-12 h-12 text-slate-600 mx-auto mb-3" />
            )}
            <h3 className="text-base font-bold text-white">
              No {activeTab === 'bookmarks' ? 'Bookmarked' : 'Difficult'} Questions Found
            </h3>
            <p className="text-sm text-slate-400 mt-1">
              Mark questions as bookmarked or difficult anytime during quiz practice to review them here.
            </p>
          </div>
        ) : (
          filteredList.map((q, idx) => {
            const isRevealed = revealedAnswers[q.id];

            return (
              <div 
                key={q.id}
                className="p-5 sm:p-6 rounded-2xl bg-slate-900/80 border border-slate-800/80 space-y-4 hover:border-slate-700 transition-colors"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-1.5">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-lg bg-brand-500/10 border border-brand-500/20 text-brand-300 text-xs font-mono font-bold">
                        Week {q.week} • Q{q.originalQuestionNumber}
                      </span>
                      <span className="text-xs text-slate-400 font-medium">{q.topic}</span>
                      <span className="text-[11px] text-slate-500 font-mono">
                        {q.sourcePdf.split(' - ')[0]} p.{q.sourcePage}
                      </span>
                    </div>

                    <h4 className="text-base sm:text-lg font-bold text-white leading-relaxed">
                      {q.questionText}
                    </h4>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0">
                    <button
                      onClick={() => toggleReveal(q.id)}
                      className={`p-2 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition-all ${
                        isRevealed 
                          ? 'bg-indigo-500/20 border-indigo-500/40 text-indigo-300' 
                          : 'bg-slate-800 border-slate-700 text-slate-300 hover:text-white'
                      }`}
                      title={isRevealed ? 'Hide Answer' : 'Show Answer & Explanation'}
                    >
                      {isRevealed ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      <span className="hidden sm:inline">{isRevealed ? 'Hide' : 'Reveal'}</span>
                    </button>

                    <button
                      onClick={() => activeTab === 'bookmarks' ? toggleBookmark(q.id) : toggleDifficult(q.id)}
                      className="p-2 rounded-xl bg-slate-800/80 hover:bg-rose-500/20 hover:text-rose-400 text-slate-400 border border-slate-700/60 transition-colors"
                      title="Remove from saved list"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Options preview */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                  {q.options.map(opt => {
                    const isCorrect = Array.isArray(q.correctAnswer)
                      ? q.correctAnswer.includes(opt.id)
                      : (q.verificationStatus === 'dual_accepted' && q.id === 'w1-q10')
                        ? (opt.id === 'b' || opt.id === 'c')
                        : opt.id === q.correctAnswer;

                    return (
                      <div 
                        key={opt.id}
                        className={`p-2.5 rounded-xl border text-xs sm:text-sm flex items-center gap-2.5 transition-all ${
                          isRevealed && isCorrect
                            ? 'bg-emerald-950/30 border-emerald-500/50 text-emerald-200 font-semibold'
                            : 'bg-slate-950/50 border-slate-800/80 text-slate-400'
                        }`}
                      >
                        <span className={`w-5 h-5 rounded font-mono uppercase font-bold flex items-center justify-center shrink-0 text-xs ${
                          isRevealed && isCorrect ? 'bg-emerald-500 text-white' : 'bg-slate-900 border border-slate-700'
                        }`}>
                          {opt.id}
                        </span>
                        <span className="flex-1">{opt.text}</span>
                        {isRevealed && isCorrect && (
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Detailed Explanation Drawer when revealed */}
                {isRevealed && (
                  <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2 text-xs text-slate-300">
                    <div className="flex items-center justify-between text-slate-400 font-semibold">
                      <span className="uppercase tracking-wider">Source Explanation</span>
                      <span className="font-mono text-brand-400">Accepted Answer: {Array.isArray(q.correctAnswer) ? q.correctAnswer.join(', ').toUpperCase() : q.correctAnswer.toUpperCase()}</span>
                    </div>
                    <p className="leading-relaxed">{q.explanation || 'Refer to official NPTEL assignment solution.'}</p>
                    {q.verificationNotes && (
                      <p className="text-amber-400 font-medium mt-1">Note: {q.verificationNotes}</p>
                    )}
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
