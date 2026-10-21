import React, { useEffect } from 'react';
import { 
  CheckCircle2, 
  XCircle, 
  RotateCcw, 
  ArrowRight, 
  Clock, 
  Award, 
  AlertTriangle, 
  Sparkles, 
  Bookmark, 
  BookOpen, 
  HelpCircle,
  Check,
  ChevronRight
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { QuizAttempt, Question } from '../types';
import { useApp } from '../context/AppContext';

interface ResultsViewProps {
  attempt: QuizAttempt;
  onRetryQuiz: (options: { week?: number | 'all' | 'incorrect' | 'bookmarks' | 'difficult' | 'unseen'; mode?: 'practice' | 'exam' }) => void;
  onReturnDashboard: () => void;
}

export const ResultsView: React.FC<ResultsViewProps> = ({
  attempt,
  onRetryQuiz,
  onReturnDashboard
}) => {
  const { questions, toggleBookmark, isBookmarked } = useApp();

  const total = attempt.questionIds.length;
  const correct = attempt.correctCount;
  const incorrect = attempt.incorrectCount;
  const unanswered = attempt.unansweredCount;
  const accuracy = attempt.accuracyPercentage;

  // Trigger confetti if high score >= 80%
  useEffect(() => {
    if (accuracy >= 80) {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  }, [accuracy]);

  // Map question data for review
  const reviewQuestions = attempt.questionIds.map(id => questions.find(q => q.id === id)).filter(Boolean) as Question[];

  // Identify topics user missed in this attempt
  const missedTopicsMap: Record<string, number> = {};
  reviewQuestions.forEach(q => {
    const userAns = attempt.answers[q.id];
    let isCorrect = false;

    if (Array.isArray(q.correctAnswer)) {
      if (Array.isArray(userAns)) {
        isCorrect = [...q.correctAnswer].sort().join(',') === [...userAns].sort().join(',');
      }
    } else {
      if (q.verificationStatus === 'dual_accepted' && q.id === 'w1-q10') {
        isCorrect = userAns === 'b' || userAns === 'c';
      } else {
        isCorrect = userAns === q.correctAnswer;
      }
    }

    if (!isCorrect) {
      missedTopicsMap[q.topic] = (missedTopicsMap[q.topic] || 0) + 1;
    }
  });

  const missedTopics = Object.entries(missedTopicsMap).sort((a, b) => b[1] - a[1]);

  const formatDuration = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}m ${s}s`;
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-16">
      {/* Score Hero Card */}
      <div className="relative overflow-hidden rounded-3xl p-6 sm:p-8 bg-gradient-to-br from-slate-900 via-brand-950/60 to-slate-950 border border-slate-800 shadow-2xl text-center">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-48 h-48 bg-brand-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 max-w-xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-xs font-semibold text-slate-300">
            <Award className="w-3.5 h-3.5 text-amber-400" />
            <span>{attempt.title} • {attempt.mode.toUpperCase()} MODE</span>
          </div>

          <div className="space-y-1">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              {accuracy >= 80 ? 'Outstanding Performance!' : accuracy >= 60 ? 'Good Effort!' : 'Keep Practicing!'}
            </h2>
            <p className="text-sm text-slate-400">
              {accuracy >= 80 
                ? 'You have demonstrated strong mastery of this material. Ready for the exam!' 
                : 'Review the detailed source explanations below to solidify your understanding.'}
            </p>
          </div>

          {/* Big Score Display */}
          <div className="flex items-center justify-center gap-6 py-2">
            <div className="text-center">
              <div className="text-5xl sm:text-6xl font-black font-mono tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-indigo-400">
                {accuracy}%
              </div>
              <div className="text-xs uppercase font-bold text-slate-400 tracking-wider mt-1">Accuracy Score</div>
            </div>

            <div className="h-12 w-px bg-slate-800" />

            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold font-mono text-white">
                {correct} <span className="text-xl text-slate-500">/ {total}</span>
              </div>
              <div className="text-xs uppercase font-bold text-slate-400 tracking-wider mt-1">Correct Questions</div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-3">
            {incorrect > 0 && (
              <button
                onClick={() => onRetryQuiz({ week: 'incorrect', mode: 'practice' })}
                className="flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-500 hover:to-red-500 text-white font-bold text-sm shadow-lg shadow-rose-600/25 transition-all"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Retry {incorrect} Incorrect Questions</span>
              </button>
            )}

            <button
              onClick={() => onRetryQuiz({ week: attempt.weekFilter, mode: attempt.mode })}
              className="flex items-center gap-2 px-5 py-3 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-bold text-sm shadow-lg shadow-brand-600/25 transition-all"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Restart Quiz</span>
            </button>

            <button
              onClick={onReturnDashboard}
              className="flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-sm font-semibold transition-all"
            >
              <span>Back to Dashboard</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 text-center">
          <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Correct</div>
          <div className="text-2xl font-bold font-mono text-emerald-400">{correct}</div>
        </div>
        <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 text-center">
          <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Incorrect</div>
          <div className="text-2xl font-bold font-mono text-rose-400">{incorrect}</div>
        </div>
        <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 text-center">
          <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Unanswered</div>
          <div className="text-2xl font-bold font-mono text-amber-400">{unanswered}</div>
        </div>
        <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 text-center">
          <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Time Taken</div>
          <div className="text-2xl font-bold font-mono text-slate-200">{formatDuration(attempt.durationSeconds)}</div>
        </div>
      </div>

      {/* Weak Topics Warning */}
      {missedTopics.length > 0 && (
        <div className="p-5 rounded-2xl bg-rose-950/20 border border-rose-500/20 space-y-2">
          <div className="flex items-center gap-2 text-rose-400 font-bold text-sm">
            <AlertTriangle className="w-4 h-4" />
            <span>Topics Requiring Revision from this Quiz</span>
          </div>
          <div className="flex flex-wrap gap-2 pt-1">
            {missedTopics.map(([topic, count]) => (
              <span key={topic} className="px-3 py-1 rounded-xl bg-slate-900 border border-rose-500/30 text-xs text-rose-300 font-medium">
                {topic}: <strong>{count} incorrect</strong>
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Question-by-Question Review Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-white tracking-tight">Question-by-Question Review</h3>
          <span className="text-xs text-slate-400 font-mono">{reviewQuestions.length} Questions Tested</span>
        </div>

        <div className="space-y-4">
          {reviewQuestions.map((q, idx) => {
            const userAns = attempt.answers[q.id];
            let isCorrect = false;

            if (Array.isArray(q.correctAnswer)) {
              if (Array.isArray(userAns)) {
                isCorrect = [...q.correctAnswer].sort().join(',') === [...userAns].sort().join(',');
              }
            } else {
              if (q.verificationStatus === 'dual_accepted' && q.id === 'w1-q10') {
                isCorrect = userAns === 'b' || userAns === 'c';
              } else {
                isCorrect = userAns === q.correctAnswer;
              }
            }

            const isBooked = isBookmarked(q.id);

            return (
              <div 
                key={q.id}
                className={`
                  p-5 rounded-2xl border transition-all space-y-3
                  ${isCorrect 
                    ? 'bg-slate-900/80 border-slate-800' 
                    : 'bg-rose-950/10 border-rose-500/30'
                  }
                `}
              >
                {/* Header */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-2.5">
                    <span className={`
                      w-6 h-6 rounded-lg text-xs font-mono font-bold flex items-center justify-center shrink-0
                      ${isCorrect ? 'bg-emerald-500/20 text-emerald-400' : 'bg-rose-500/20 text-rose-400'}
                    `}>
                      {idx + 1}
                    </span>
                    <div>
                      <h4 className="text-sm sm:text-base font-bold text-white leading-snug">
                        {q.questionText}
                      </h4>
                      <div className="flex flex-wrap items-center gap-2 mt-1 text-[11px] text-slate-400">
                        <span>Week {q.week}</span>
                        <span>•</span>
                        <span>{q.topic}</span>
                        <span>•</span>
                        <span className="font-mono text-slate-500">{q.sourcePdf.split(' - ')[0]} p.{q.sourcePage}</span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => toggleBookmark(q.id)}
                    className={`p-1.5 rounded-lg ${isBooked ? 'text-amber-400 bg-amber-500/20' : 'text-slate-500 hover:text-slate-300'}`}
                    title={isBooked ? 'Bookmarked' : 'Add bookmark'}
                  >
                    <Bookmark className="w-4 h-4" />
                  </button>
                </div>

                {/* Options List */}
                <div className="grid grid-cols-1 gap-2 pt-1">
                  {q.options.map(opt => {
                    const isSelected = Array.isArray(userAns) ? userAns.includes(opt.id) : userAns === opt.id;
                    const isOptionCorrect = Array.isArray(q.correctAnswer)
                      ? q.correctAnswer.includes(opt.id)
                      : (q.verificationStatus === 'dual_accepted' && q.id === 'w1-q10')
                        ? (opt.id === 'b' || opt.id === 'c')
                        : opt.id === q.correctAnswer;

                    let bg = "bg-slate-950/50 border-slate-800/80 text-slate-400";
                    if (isOptionCorrect) {
                      bg = "bg-emerald-950/30 border-emerald-500/50 text-emerald-200 font-semibold";
                    } else if (isSelected && !isOptionCorrect) {
                      bg = "bg-rose-950/30 border-rose-500/50 text-rose-200 line-through";
                    }

                    return (
                      <div key={opt.id} className={`p-2.5 rounded-xl border flex items-center gap-3 text-xs sm:text-sm ${bg}`}>
                        <span className="w-5 h-5 rounded uppercase font-mono font-bold flex items-center justify-center shrink-0 bg-slate-900 border border-slate-700">
                          {opt.id}
                        </span>
                        <span className="flex-1">{opt.text}</span>
                        {isOptionCorrect && (
                          <span className="text-[11px] text-emerald-400 font-semibold flex items-center gap-1">
                            <Check className="w-3.5 h-3.5" /> Correct Answer
                          </span>
                        )}
                        {isSelected && !isOptionCorrect && (
                          <span className="text-[11px] text-rose-400 font-semibold flex items-center gap-1">
                            <XCircle className="w-3.5 h-3.5" /> Your Choice
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Explanation */}
                {q.explanation && (
                  <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 text-xs text-slate-300 space-y-1">
                    <span className="font-semibold text-slate-400 uppercase tracking-wider block">Source Reference & Explanation</span>
                    <p>{q.explanation}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
