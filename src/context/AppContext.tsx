import React, { createContext, useContext, useState, useEffect } from 'react';
import { Question, QuizAttempt, UserStats, AppSettings, WeekMeta } from '../types';
import { WEEKS_METADATA } from '../data/questions';
import { StorageService } from '../services/storage';

interface AppContextType {
  questions: Question[];
  weeks: WeekMeta[];
  stats: UserStats;
  settings: AppSettings;
  activeAttempt: QuizAttempt | null;
  toggleBookmark: (questionId: string) => void;
  toggleDifficult: (questionId: string) => void;
  isBookmarked: (questionId: string) => boolean;
  isDifficult: (questionId: string) => boolean;
  saveCompletedAttempt: (attempt: QuizAttempt) => void;
  setActiveAttempt: (attempt: QuizAttempt | null) => void;
  updateQuestion: (updatedQuestion: Question) => void;
  addQuestions: (newQuestions: Question[]) => void;
  resetWeekProgress: (weekNum: number) => void;
  resetAllProgress: () => void;
  updateSettings: (newSettings: Partial<AppSettings>) => void;
  exportDataJson: () => string;
  importDataJson: (jsonStr: string) => { success: boolean; message: string };
  getWeekStats: (weekNum: number) => {
    total: number;
    attempted: number;
    correct: number;
    incorrect: number;
    accuracy: number;
    completed: boolean;
  };
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [questions, setQuestions] = useState<Question[]>(() => StorageService.getQuestions());
  const [stats, setStats] = useState<UserStats>(() => StorageService.getStats());
  const [settings, setSettings] = useState<AppSettings>(() => StorageService.getSettings());
  const [activeAttempt, setActiveAttemptState] = useState<QuizAttempt | null>(() => StorageService.getActiveAttempt());

  useEffect(() => {
    StorageService.saveQuestions(questions);
  }, [questions]);

  useEffect(() => {
    StorageService.saveStats(stats);
  }, [stats]);

  useEffect(() => {
    StorageService.saveSettings(settings);
  }, [settings]);

  const setActiveAttempt = (attempt: QuizAttempt | null) => {
    setActiveAttemptState(attempt);
    StorageService.saveActiveAttempt(attempt);
  };

  const isBookmarked = (id: string) => stats.bookmarkedQuestionIds.includes(id);
  const isDifficult = (id: string) => stats.difficultQuestionIds.includes(id);

  const toggleBookmark = (questionId: string) => {
    setStats(prev => {
      const exists = prev.bookmarkedQuestionIds.includes(questionId);
      const updated = exists
        ? prev.bookmarkedQuestionIds.filter(id => id !== questionId)
        : [...prev.bookmarkedQuestionIds, questionId];
      return { ...prev, bookmarkedQuestionIds: updated };
    });
  };

  const toggleDifficult = (questionId: string) => {
    setStats(prev => {
      const exists = prev.difficultQuestionIds.includes(questionId);
      const updated = exists
        ? prev.difficultQuestionIds.filter(id => id !== questionId)
        : [...prev.difficultQuestionIds, questionId];
      return { ...prev, difficultQuestionIds: updated };
    });
  };

  const saveCompletedAttempt = (attempt: QuizAttempt) => {
    setStats(prev => {
      const updatedAttempts = [attempt, ...prev.attempts];
      const newQuestionHistory = { ...prev.questionHistory };
      const wrongSet = new Set(prev.wrongQuestionIds);

      // Analyze question answers in this attempt
      attempt.questionIds.forEach(qId => {
        const q = questions.find(item => item.id === qId);
        if (!q) return;

        const userAns = attempt.answers[qId];
        let isCorrect = false;

        if (Array.isArray(q.correctAnswer)) {
          if (Array.isArray(userAns)) {
            const s1 = [...q.correctAnswer].sort().join(',');
            const s2 = [...userAns].sort().join(',');
            isCorrect = s1 === s2;
          }
        } else {
          if (q.verificationStatus === 'dual_accepted' && q.id === 'w1-q10') {
            isCorrect = userAns === 'b' || userAns === 'c';
          } else {
            isCorrect = userAns === q.correctAnswer;
          }
        }

        if (isCorrect) {
          wrongSet.delete(qId);
        } else {
          wrongSet.add(qId);
        }

        const existingHist = newQuestionHistory[qId] || {
          attemptsCount: 0,
          lastAttemptedAt: attempt.completedAt || Date.now(),
          lastResult: isCorrect ? 'correct' : 'incorrect',
          history: []
        };

        existingHist.attemptsCount += 1;
        existingHist.lastAttemptedAt = attempt.completedAt || Date.now();
        existingHist.lastResult = isCorrect ? 'correct' : 'incorrect';
        existingHist.history.push({
          result: isCorrect ? 'correct' : 'incorrect',
          timestamp: attempt.completedAt || Date.now(),
          selectedAnswer: userAns || ''
        });

        newQuestionHistory[qId] = existingHist;
      });

      // Calculate total attempted unique questions and accuracy
      const attemptedUniqueCount = Object.keys(newQuestionHistory).length;
      let totalCorrectCount = 0;
      Object.values(newQuestionHistory).forEach(h => {
        if (h.lastResult === 'correct') totalCorrectCount += 1;
      });

      const totalIncorrectCount = attemptedUniqueCount - totalCorrectCount;
      const overallAcc = attemptedUniqueCount > 0 ? Math.round((totalCorrectCount / attemptedUniqueCount) * 100) : 0;

      return {
        ...prev,
        attempts: updatedAttempts,
        wrongQuestionIds: Array.from(wrongSet),
        questionHistory: newQuestionHistory,
        totalAttempted: attemptedUniqueCount,
        totalCorrect: totalCorrectCount,
        totalIncorrect: totalIncorrectCount,
        accuracyRate: overallAcc
      };
    });

    // Clear active attempt once completed
    setActiveAttempt(null);
  };

  const updateQuestion = (updated: Question) => {
    setQuestions(prev => prev.map(q => q.id === updated.id ? updated : q));
  };

  const addQuestions = (newQs: Question[]) => {
    setQuestions(prev => {
      const existingIds = new Set(prev.map(q => q.id));
      const filtered = newQs.filter(q => !existingIds.has(q.id));
      return [...prev, ...filtered];
    });
  };

  const resetWeekProgress = (weekNum: number) => {
    const weekQuestionIds = new Set(questions.filter(q => q.week === weekNum).map(q => q.id));

    setStats(prev => {
      const updatedHistory = { ...prev.questionHistory };
      weekQuestionIds.forEach(id => {
        delete updatedHistory[id];
      });

      const updatedWrong = prev.wrongQuestionIds.filter(id => !weekQuestionIds.has(id));
      const updatedBookmarks = prev.bookmarkedQuestionIds.filter(id => !weekQuestionIds.has(id));
      const updatedDifficult = prev.difficultQuestionIds.filter(id => !weekQuestionIds.has(id));

      const attemptedUniqueCount = Object.keys(updatedHistory).length;
      let totalCorrectCount = 0;
      Object.values(updatedHistory).forEach(h => {
        if (h.lastResult === 'correct') totalCorrectCount += 1;
      });

      return {
        ...prev,
        questionHistory: updatedHistory,
        wrongQuestionIds: updatedWrong,
        bookmarkedQuestionIds: updatedBookmarks,
        difficultQuestionIds: updatedDifficult,
        totalAttempted: attemptedUniqueCount,
        totalCorrect: totalCorrectCount,
        totalIncorrect: attemptedUniqueCount - totalCorrectCount,
        accuracyRate: attemptedUniqueCount > 0 ? Math.round((totalCorrectCount / attemptedUniqueCount) * 100) : 0
      };
    });
  };

  const resetAllProgress = () => {
    StorageService.resetAll();
    setStats({
      totalAttempted: 0,
      totalCorrect: 0,
      totalIncorrect: 0,
      accuracyRate: 0,
      bookmarkedQuestionIds: [],
      difficultQuestionIds: [],
      wrongQuestionIds: [],
      attempts: [],
      questionHistory: {}
    });
    setActiveAttempt(null);
  };

  const updateSettings = (newSettings: Partial<AppSettings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  };

  const exportDataJson = () => StorageService.exportBackup();

  const importDataJson = (jsonStr: string) => {
    const res = StorageService.importBackup(jsonStr);
    if (res.success) {
      setQuestions(StorageService.getQuestions());
      setStats(StorageService.getStats());
      setSettings(StorageService.getSettings());
      setActiveAttempt(StorageService.getActiveAttempt());
    }
    return res;
  };

  const getWeekStats = (weekNum: number) => {
    const weekQuestions = questions.filter(q => q.week === weekNum);
    const total = weekQuestions.length;
    let attempted = 0;
    let correct = 0;

    weekQuestions.forEach(q => {
      const hist = stats.questionHistory[q.id];
      if (hist && hist.attemptsCount > 0) {
        attempted += 1;
        if (hist.lastResult === 'correct') correct += 1;
      }
    });

    const incorrect = attempted - correct;
    const accuracy = attempted > 0 ? Math.round((correct / attempted) * 100) : 0;
    const completed = total > 0 && attempted >= total;

    return { total, attempted, correct, incorrect, accuracy, completed };
  };

  return (
    <AppContext.Provider
      value={{
        questions,
        weeks: WEEKS_METADATA,
        stats,
        settings,
        activeAttempt,
        toggleBookmark,
        toggleDifficult,
        isBookmarked,
        isDifficult,
        saveCompletedAttempt,
        setActiveAttempt,
        updateQuestion,
        addQuestions,
        resetWeekProgress,
        resetAllProgress,
        updateSettings,
        exportDataJson,
        importDataJson,
        getWeekStats
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
