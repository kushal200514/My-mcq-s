import React, { useState, useEffect, useMemo, useRef } from 'react';
import { 
  CheckCircle2, 
  XCircle, 
  ChevronLeft, 
  ChevronRight, 
  Bookmark, 
  AlertTriangle, 
  Clock, 
  Send, 
  RotateCcw, 
  Sparkles, 
  HelpCircle,
  Flag,
  FileText,
  AlertCircle,
  Eye,
  Check,
  Award
} from 'lucide-react';
import { Question, QuizAttempt, QuizMode } from '../types';
import { useApp } from '../context/AppContext';

interface QuizViewProps {
  initialWeekFilter?: number | 'all' | 'incorrect' | 'bookmarks' | 'difficult' | 'unseen';
  initialMode?: QuizMode;
  onCompleteQuiz: (attempt: QuizAttempt) => void;
  onExit: () => void;
}

export const QuizView: React.FC<QuizViewProps> = ({
  initialWeekFilter = 1,
  initialMode = 'practice',
  onCompleteQuiz,
  onExit
}) => {
  const { 
    questions, 
    weeks, 
    stats, 
    settings, 
    toggleBookmark, 
    toggleDifficult, 
    isBookmarked, 
    isDifficult,
    activeAttempt,
    setActiveAttempt
  } = useApp();

  const [mode, setMode] = useState<QuizMode>(initialMode);
  const [weekFilter, setWeekFilter] = useState<number | 'all' | 'incorrect' | 'bookmarks' | 'difficult' | 'unseen'>(initialWeekFilter);
  const [currentIndex, setCurrentIndex] = useState(0);
  
  // Selected answers for the current attempt: questionId -> optionId or optionId[]
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string | string[]>>({});
  
  // Submitted status per question in Practice Mode (to reveal immediate feedback): questionId -> true
  const [submittedInPractice, setSubmittedInPractice] = useState<Record<string, boolean>>({});

  // Show explanation toggle per question
  const [showExplanation, setShowExplanation] = useState<Record<string, boolean>>({});

  // Timer in Exam Mode
  const [timeRemainingSeconds, setTimeRemainingSeconds] = useState<number>(() => {
    return (settings.defaultExamDurationMinutes || 30) * 60;
  });
  const [timerActive, setTimerActive] = useState<boolean>(initialMode === 'exam');

  // Confirmation dialogs
  const [showUnfinishedWarning, setShowUnfinishedWarning] = useState(false);
  const startTimeRef = useRef<number>(Date.now());

  // Filter the questions based on weekFilter
  const quizQuestions: Question[] = useMemo(() => {
    let list: Question[] = [];

    if (typeof weekFilter === 'number') {
      list = questions.filter(q => q.week === weekFilter);
    } else if (weekFilter === 'all') {
      list = [...questions];
    } else if (weekFilter === 'incorrect') {
      list = questions.filter(q => stats.wrongQuestionIds.includes(q.id));
    } else if (weekFilter === 'bookmarks') {
      list = questions.filter(q => stats.bookmarkedQuestionIds.includes(q.id));
    } else if (weekFilter === 'difficult') {
      list = questions.filter(q => stats.difficultQuestionIds.includes(q.id));
    } else if (weekFilter === 'unseen') {
      list = questions.filter(q => !stats.questionHistory[q.id]);
    }

    if (settings.shuffleQuestions) {
      list = [...list].sort(() => Math.random() - 0.5);
    }

    return list;
  }, [questions, weekFilter, stats, settings.shuffleQuestions]);

  // Current active question
  const currentQuestion: Question | undefined = quizQuestions[currentIndex];

  // Set up or resume attempt
  useEffect(() => {
    if (activeAttempt && activeAttempt.questionIds.length > 0 && activeAttempt.mode === mode) {
      setSelectedAnswers(activeAttempt.answers || {});
    }
  }, []);

  // Timer countdown for Exam Mode
  useEffect(() => {
    if (mode !== 'exam' || !timerActive) return;

    const timer = setInterval(() => {
      setTimeRemainingSeconds(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmitFinalQuiz(true); // Auto-submit when time expires
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [mode, timerActive]);

  // Handle option click (single or multi-select)
  const handleSelectOption = (optionId: string) => {
    if (!currentQuestion) return;

    // In practice mode, if question has already been submitted, lock it for this attempt
    if (mode === 'practice' && submittedInPractice[currentQuestion.id]) {
      return;
    }

    const qId = currentQuestion.id;
    const isMulti = currentQuestion.questionType === 'multiple';

    setSelectedAnswers(prev => {
      let updated: string | string[];

      if (isMulti) {
        const currentSelection = Array.isArray(prev[qId]) ? (prev[qId] as string[]) : [];
        if (currentSelection.includes(optionId)) {
          updated = currentSelection.filter(id => id !== optionId);
        } else {
          updated = [...currentSelection, optionId];
        }
      } else {
        updated = optionId;
      }

      const nextAnswers = { ...prev, [qId]: updated };
      
      // Auto-save active attempt in local storage
      const activeData: QuizAttempt = {
        id: `attempt_${startTimeRef.current}`,
        title: getQuizTitle(),
        weekFilter,
        mode,
        startedAt: startTimeRef.current,
        answers: nextAnswers,
        questionIds: quizQuestions.map(q => q.id),
        correctCount: 0,
        incorrectCount: 0,
        unansweredCount: 0,
        score: 0,
        accuracyPercentage: 0,
        durationSeconds: Math.floor((Date.now() - startTimeRef.current) / 1000)
      };
      setActiveAttempt(activeData);

      return nextAnswers;
    });
  };

  // Submit Answer in Practice Mode
  const handleSubmitPracticeAnswer = () => {
    if (!currentQuestion) return;
    const qId = currentQuestion.id;
    const currentAns = selectedAnswers[qId];

    if (!currentAns || (Array.isArray(currentAns) && currentAns.length === 0)) {
      return;
    }

    setSubmittedInPractice(prev => ({ ...prev, [qId]: true }));
    setShowExplanation(prev => ({ ...prev, [qId]: true }));
  };

  // Final Quiz submission (both Practice finish or Exam finish)
  const handleSubmitFinalQuiz = (forceSubmit = false) => {
    if (!forceSubmit && mode === 'exam') {
      const unansweredCount = quizQuestions.filter(q => {
        const ans = selectedAnswers[q.id];
        return !ans || (Array.isArray(ans) && ans.length === 0);
      }).length;

      if (unansweredCount > 0) {
        setShowUnfinishedWarning(true);
        return;
      }
    }

    setShowUnfinishedWarning(false);
    const duration = Math.floor((Date.now() - startTimeRef.current) / 1000);

    let correctCount = 0;
    let incorrectCount = 0;
    let unansweredCount = 0;

    quizQuestions.forEach(q => {
      const ans = selectedAnswers[q.id];
      if (!ans || (Array.isArray(ans) && ans.length === 0)) {
        unansweredCount += 1;
        return;
      }

      let isCorrect = false;
      if (Array.isArray(q.correctAnswer)) {
        if (Array.isArray(ans)) {
          const s1 = [...q.correctAnswer].sort().join(',');
          const s2 = [...ans].sort().join(',');
          isCorrect = s1 === s2;
        }
      } else {
        if (q.verificationStatus === 'dual_accepted' && q.id === 'w1-q10') {
          isCorrect = ans === 'b' || ans === 'c';
        } else {
          isCorrect = ans === q.correctAnswer;
        }
      }

      if (isCorrect) correctCount += 1;
      else incorrectCount += 1;
    });

    const total = quizQuestions.length;
    const accuracy = total > 0 ? Math.round((correctCount / total) * 100) : 0;

    const completedAttempt: QuizAttempt = {
      id: `attempt_${Date.now()}`,
      title: getQuizTitle(),
      weekFilter,
      mode,
      startedAt: startTimeRef.current,
      completedAt: Date.now(),
      answers: selectedAnswers,
      questionIds: quizQuestions.map(q => q.id),
      correctCount,
      incorrectCount,
      unansweredCount,
      score: correctCount,
      accuracyPercentage: accuracy,
      durationSeconds: Math.max(1, duration),
      timeLimitMinutes: mode === 'exam' ? settings.defaultExamDurationMinutes : undefined
    };

    onCompleteQuiz(completedAttempt);
  };

  const getQuizTitle = () => {
    if (typeof weekFilter === 'number') {
      const w = weeks.find(item => item.week === weekFilter);
      return `Week ${weekFilter}: ${w ? w.title : 'Assignment'}`;
    }
    if (weekFilter === 'all') return 'Full Course Mock Exam (All Weeks)';
    if (weekFilter === 'incorrect') return 'Revision: Previously Missed Questions';
    if (weekFilter === 'bookmarks') return 'Revision: Bookmarked Questions';
    if (weekFilter === 'difficult') return 'Revision: Difficult Questions';
    return 'Practice Session';
  };

  // Keyboard shortcut listener for A, B, C, D, E, Enter, ArrowLeft, ArrowRight
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['input', 'textarea'].includes((e.target as HTMLElement).tagName.toLowerCase())) {
        return;
      }

      const key = e.key.toLowerCase();
      if (['a', 'b', 'c', 'd', 'e'].includes(key) && currentQuestion) {
        const optionExists = currentQuestion.options.some(o => o.id.toLowerCase() === key);
        if (optionExists) {
          handleSelectOption(key);
        }
      } else if (e.key === 'ArrowRight' && currentIndex < quizQuestions.length - 1) {
        setCurrentIndex(prev => prev + 1);
      } else if (e.key === 'ArrowLeft' && currentIndex > 0) {
        setCurrentIndex(prev => prev - 1);
      } else if (e.key === 'Enter' && mode === 'practice' && !submittedInPractice[currentQuestion?.id || '']) {
        handleSubmitPracticeAnswer();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, currentQuestion, mode, submittedInPractice, selectedAnswers]);

  // If no questions in set
  if (quizQuestions.length === 0) {
    return (
      <div className="max-w-2xl mx-auto py-16 px-4 text-center">
        <div className="w-16 h-16 rounded-2xl bg-slate-800 text-slate-400 flex items-center justify-center mx-auto mb-4">
          <HelpCircle className="w-8 h-8" />
        </div>
        <h2 className="text-xl font-bold text-white">No Questions in this Selection</h2>
        <p className="text-sm text-slate-400 mt-2">
          {weekFilter === 'incorrect' 
            ? "Great job! You don't have any incorrect questions logged yet."
            : weekFilter === 'bookmarks'
              ? "You haven't bookmarked any questions yet. Bookmark questions anytime during practice."
              : "No questions found matching your filter criteria."}
        </p>
        <button
          onClick={onExit}
          className="mt-6 px-6 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-semibold text-sm transition-all"
        >
          Return to Dashboard
        </button>
      </div>
    );
  }

  // Answer state verification helper
  const isQuestionAnswered = (qId: string) => {
    const a = selectedAnswers[qId];
    return a && (!Array.isArray(a) || a.length > 0);
  };

  const isCurrentSubmitted = currentQuestion && submittedInPractice[currentQuestion.id];
  const userCurrentAns = currentQuestion ? selectedAnswers[currentQuestion.id] : undefined;

  const isCurrentCorrect = currentQuestion && (() => {
    if (!userCurrentAns) return false;
    if (Array.isArray(currentQuestion.correctAnswer)) {
      if (Array.isArray(userCurrentAns)) {
        return [...currentQuestion.correctAnswer].sort().join(',') === [...userCurrentAns].sort().join(',');
      }
      return false;
    }
    if (currentQuestion.verificationStatus === 'dual_accepted' && currentQuestion.id === 'w1-q10') {
      return userCurrentAns === 'b' || userCurrentAns === 'c';
    }
    return userCurrentAns === currentQuestion.correctAnswer;
  })();

  const formatTimer = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-16">
      {/* Top Header Bar: Mode, Question count, Timer & Exit */}
      <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800/80 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <button
            onClick={onExit}
            className="p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
            title="Exit session"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-white text-sm sm:text-base">{getQuizTitle()}</span>
              <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                mode === 'exam' 
                  ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30' 
                  : 'bg-brand-500/20 text-brand-300 border border-brand-500/30'
              }`}>
                {mode} Mode
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Question {currentIndex + 1} of {quizQuestions.length}
            </p>
          </div>
        </div>

        {/* Right side: Timer & Final Submit Button */}
        <div className="flex items-center gap-3">
          {mode === 'exam' && (
            <div className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border text-sm font-mono font-bold ${
              timeRemainingSeconds < 300 
                ? 'bg-rose-500/20 border-rose-500/40 text-rose-300 animate-pulse' 
                : 'bg-slate-800/80 border-slate-700 text-slate-200'
            }`}>
              <Clock className="w-4 h-4 text-brand-400" />
              <span>{formatTimer(timeRemainingSeconds)}</span>
            </div>
          )}

          <button
            onClick={() => handleSubmitFinalQuiz(false)}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs sm:text-sm font-bold shadow-lg shadow-emerald-600/20 transition-all"
          >
            <Send className="w-4 h-4" />
            <span>Finish Test</span>
          </button>
        </div>
      </div>

      {/* Progress Bar across questions */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between text-xs text-slate-400">
          <span>{Object.keys(selectedAnswers).length} answered</span>
          <span>{Math.round((Object.keys(selectedAnswers).length / quizQuestions.length) * 100)}% complete</span>
        </div>
        <div className="w-full bg-slate-800/80 h-2 rounded-full overflow-hidden">
          <div 
            className="bg-gradient-to-r from-brand-500 to-indigo-500 h-full rounded-full transition-all duration-300"
            style={{ width: `${(Object.keys(selectedAnswers).length / quizQuestions.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Main Question Card */}
      {currentQuestion && (
        <div className="p-6 sm:p-8 rounded-2xl bg-slate-900/90 border border-slate-800/90 shadow-xl space-y-6">
          {/* Question Meta badges & Bookmark / Difficult actions */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-800/80">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2.5 py-1 rounded-lg bg-brand-500/10 border border-brand-500/20 text-brand-300 text-xs font-bold font-mono">
                Week {currentQuestion.week} • Q{currentQuestion.originalQuestionNumber}
              </span>
              <span className="px-2 py-0.5 rounded-md bg-slate-800 text-[11px] text-slate-300 font-medium">
                {currentQuestion.topic}
              </span>
              <span className="px-2 py-0.5 rounded-md bg-slate-800 text-[11px] text-slate-400 capitalize">
                {currentQuestion.questionType.replace('_', ' ')}
              </span>
              {currentQuestion.verificationStatus === 'dual_accepted' && (
                <span className="px-2 py-0.5 rounded-md bg-amber-500/15 border border-amber-500/30 text-amber-300 text-[11px] font-semibold">
                  Dual Accepted Key
                </span>
              )}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => toggleDifficult(currentQuestion.id)}
                className={`flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-xs font-medium border transition-colors ${
                  isDifficult(currentQuestion.id)
                    ? 'bg-rose-500/20 border-rose-500/40 text-rose-300'
                    : 'bg-slate-800/60 border-slate-700/60 text-slate-400 hover:text-slate-200'
                }`}
                title="Mark as Difficult"
              >
                <AlertTriangle className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Difficult</span>
              </button>

              <button
                onClick={() => toggleBookmark(currentQuestion.id)}
                className={`flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-xs font-medium border transition-colors ${
                  isBookmarked(currentQuestion.id)
                    ? 'bg-amber-500/20 border-amber-500/40 text-amber-300'
                    : 'bg-slate-800/60 border-slate-700/60 text-slate-400 hover:text-slate-200'
                }`}
                title="Bookmark for Revision"
              >
                <Bookmark className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Bookmark</span>
              </button>
            </div>
          </div>

          {/* Question Text */}
          <div className="space-y-2">
            <h3 className="text-lg sm:text-xl font-bold text-white leading-relaxed">
              {currentQuestion.questionText}
            </h3>
            {currentQuestion.questionType === 'multiple' && (
              <p className="text-xs text-indigo-400 font-medium">
                * This question has multiple correct answers. Select all that apply.
              </p>
            )}
          </div>

          {/* Options Grid */}
          <div className="grid grid-cols-1 gap-3 pt-2">
            {currentQuestion.options.map((opt) => {
              const isSelected = Array.isArray(userCurrentAns)
                ? userCurrentAns.includes(opt.id)
                : userCurrentAns === opt.id;

              // Reveal status in Practice mode after submission
              const isOptionCorrect = Array.isArray(currentQuestion.correctAnswer)
                ? currentQuestion.correctAnswer.includes(opt.id)
                : (currentQuestion.verificationStatus === 'dual_accepted' && currentQuestion.id === 'w1-q10')
                  ? (opt.id === 'b' || opt.id === 'c')
                  : opt.id === currentQuestion.correctAnswer;

              let cardStyle = "border-slate-800 bg-slate-950/60 text-slate-200 hover:border-slate-700 hover:bg-slate-800/50";
              let badgeStyle = "bg-slate-800 text-slate-400 border-slate-700";

              if (mode === 'practice' && isCurrentSubmitted) {
                if (isOptionCorrect) {
                  cardStyle = "border-emerald-500/60 bg-emerald-950/30 text-emerald-100 glow-emerald";
                  badgeStyle = "bg-emerald-500 text-white border-emerald-400";
                } else if (isSelected && !isOptionCorrect) {
                  cardStyle = "border-rose-500/60 bg-rose-950/30 text-rose-200";
                  badgeStyle = "bg-rose-500 text-white border-rose-400";
                } else {
                  cardStyle = "border-slate-800/60 bg-slate-950/40 text-slate-500 opacity-60";
                }
              } else if (isSelected) {
                cardStyle = "border-brand-500 bg-brand-950/40 text-white shadow-lg shadow-brand-500/15";
                badgeStyle = "bg-brand-600 text-white border-brand-500 font-bold";
              }

              return (
                <button
                  key={opt.id}
                  onClick={() => handleSelectOption(opt.id)}
                  disabled={mode === 'practice' && isCurrentSubmitted}
                  className={`
                    w-full text-left p-4 sm:p-4.5 rounded-xl border transition-all duration-200
                    flex items-center gap-3.5 group
                    ${cardStyle}
                  `}
                >
                  <div className={`
                    w-8 h-8 rounded-lg flex items-center justify-center font-mono font-bold text-xs uppercase border shrink-0 transition-colors
                    ${badgeStyle}
                  `}>
                    {mode === 'practice' && isCurrentSubmitted && isOptionCorrect ? (
                      <Check className="w-4 h-4 text-white" />
                    ) : (
                      opt.id
                    )}
                  </div>

                  <span className="flex-1 text-sm sm:text-base font-medium">
                    {opt.text}
                  </span>

                  {mode === 'practice' && isCurrentSubmitted && isOptionCorrect && (
                    <span className="text-xs font-semibold text-emerald-400 shrink-0 flex items-center gap-1">
                      <CheckCircle2 className="w-4 h-4" /> Correct Answer
                    </span>
                  )}
                  {mode === 'practice' && isCurrentSubmitted && isSelected && !isOptionCorrect && (
                    <span className="text-xs font-semibold text-rose-400 shrink-0 flex items-center gap-1">
                      <XCircle className="w-4 h-4" /> Your Selection
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Action Row: In Practice mode, show Submit Answer button if unsubmitted */}
          {mode === 'practice' && !isCurrentSubmitted && (
            <div className="pt-2 flex justify-end">
              <button
                onClick={handleSubmitPracticeAnswer}
                disabled={!isQuestionAnswered(currentQuestion.id)}
                className={`
                  flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-sm transition-all
                  ${isQuestionAnswered(currentQuestion.id)
                    ? 'bg-brand-600 hover:bg-brand-500 text-white shadow-lg shadow-brand-600/25'
                    : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                  }
                `}
              >
                <span>Check Answer</span>
                <Send className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* Practice Mode Immediate Feedback & Explanation Box */}
          {mode === 'practice' && isCurrentSubmitted && (
            <div className={`
              p-5 rounded-2xl border transition-all space-y-3
              ${isCurrentCorrect 
                ? 'bg-emerald-950/20 border-emerald-500/30' 
                : 'bg-rose-950/20 border-rose-500/30'
              }
            `}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {isCurrentCorrect ? (
                    <>
                      <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                      <span className="font-bold text-emerald-300 text-sm">Correct! Excellent work.</span>
                    </>
                  ) : (
                    <>
                      <XCircle className="w-5 h-5 text-rose-400" />
                      <span className="font-bold text-rose-300 text-sm">Incorrect. See the source solution below:</span>
                    </>
                  )}
                </div>

                <div className="text-xs text-slate-400 font-mono">
                  Source: {currentQuestion.sourcePdf.split(' - ')[0]} (p.{currentQuestion.sourcePage})
                </div>
              </div>

              {currentQuestion.verificationNotes && (
                <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs">
                  <strong>Verification Note:</strong> {currentQuestion.verificationNotes}
                </div>
              )}

              {currentQuestion.explanation && (
                <div className="pt-2 border-t border-slate-800/80 text-sm text-slate-300 leading-relaxed">
                  <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
                    Explanation & Course Context
                  </div>
                  {currentQuestion.explanation}
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Navigation Controls: Previous / Next & Question Grid */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <button
            onClick={() => setCurrentIndex(prev => Math.max(0, prev - 1))}
            disabled={currentIndex === 0}
            className={`
              flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl border text-sm font-semibold transition-all
              ${currentIndex > 0 
                ? 'bg-slate-900 border-slate-700 text-white hover:bg-slate-800' 
                : 'bg-slate-950/50 border-slate-800/50 text-slate-600 cursor-not-allowed'
              }
            `}
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Previous</span>
          </button>

          <button
            onClick={() => setCurrentIndex(prev => Math.min(quizQuestions.length - 1, prev + 1))}
            disabled={currentIndex === quizQuestions.length - 1}
            className={`
              flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl border text-sm font-semibold transition-all
              ${currentIndex < quizQuestions.length - 1 
                ? 'bg-brand-600 border-brand-500 text-white hover:bg-brand-500 shadow-md shadow-brand-600/20' 
                : 'bg-slate-950/50 border-slate-800/50 text-slate-600 cursor-not-allowed'
              }
            `}
          >
            <span>Next</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Keyboard shortcut hint */}
        <div className="hidden lg:flex items-center gap-2 text-xs text-slate-500">
          <span>Shortcuts:</span>
          <kbd className="px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700 text-slate-300 font-mono">A-D</kbd>
          <span>to select</span>
          <kbd className="px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700 text-slate-300 font-mono">←</kbd>
          <kbd className="px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700 text-slate-300 font-mono">→</kbd>
          <span>to navigate</span>
        </div>
      </div>

      {/* Question Number Quick Navigator Drawer / Grid */}
      <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800/80 space-y-3">
        <div className="flex items-center justify-between text-xs text-slate-400">
          <span className="font-semibold uppercase tracking-wider">Question Navigator</span>
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-full bg-brand-500 inline-block" /> Answered
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-full bg-slate-800 border border-slate-700 inline-block" /> Unanswered
            </span>
            <span className="flex items-center gap-1">
              <Bookmark className="w-3 h-3 text-amber-400 inline" /> Bookmarked
            </span>
          </div>
        </div>

        <div className="grid grid-cols-6 sm:grid-cols-10 md:grid-cols-12 gap-2 max-h-48 overflow-y-auto p-1">
          {quizQuestions.map((q, idx) => {
            const isAnswered = isQuestionAnswered(q.id);
            const isCurrent = idx === currentIndex;
            const isBooked = isBookmarked(q.id);

            // Practice mode submitted status
            const isSub = submittedInPractice[q.id];
            let borderBg = "bg-slate-800/60 border-slate-700 text-slate-400 hover:border-slate-500";

            if (mode === 'practice' && isSub) {
              const uAns = selectedAnswers[q.id];
              let correct = false;
              if (Array.isArray(q.correctAnswer) && Array.isArray(uAns)) {
                correct = [...q.correctAnswer].sort().join(',') === [...uAns].sort().join(',');
              } else {
                correct = uAns === q.correctAnswer;
              }
              borderBg = correct 
                ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-300 font-bold' 
                : 'bg-rose-500/20 border-rose-500/50 text-rose-300 font-bold';
            } else if (isAnswered) {
              borderBg = "bg-brand-500/20 border-brand-500/50 text-brand-300 font-bold";
            }

            if (isCurrent) {
              borderBg += " ring-2 ring-white ring-offset-2 ring-offset-slate-900";
            }

            return (
              <button
                key={q.id}
                onClick={() => setCurrentIndex(idx)}
                className={`
                  relative h-9 rounded-xl border text-xs font-mono transition-all flex items-center justify-center
                  ${borderBg}
                `}
                title={`Jump to Question ${idx + 1}`}
              >
                <span>{idx + 1}</span>
                {isBooked && (
                  <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-amber-400" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Warning Modal for Unfinished Exam Mode Submission */}
      {showUnfinishedWarning && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="max-w-md w-full p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl space-y-4">
            <div className="flex items-center gap-3 text-amber-400">
              <div className="p-2 rounded-xl bg-amber-500/10">
                <AlertCircle className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white">Unfinished Questions Warning</h3>
            </div>

            <p className="text-sm text-slate-300">
              You still have{' '}
              <strong className="text-amber-400">
                {quizQuestions.length - Object.keys(selectedAnswers).length} unanswered question(s)
              </strong>.
              In Exam Mode, unattempted questions are not counted as correct. Are you sure you want to finish now?
            </p>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setShowUnfinishedWarning(false)}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold"
              >
                Keep Testing
              </button>
              <button
                onClick={() => handleSubmitFinalQuiz(true)}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-600 to-rose-600 hover:from-amber-500 hover:to-rose-500 text-white text-xs font-bold shadow-lg"
              >
                Submit Anyway
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
