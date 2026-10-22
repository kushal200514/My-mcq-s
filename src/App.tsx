import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Sidebar, NavTab } from './components/layout/Sidebar';
import { Header } from './components/layout/Header';
import { Dashboard } from './pages/Dashboard';
import { WeeklyBank } from './pages/WeeklyBank';
import { MegaQuestionBank } from './pages/MegaQuestionBank';
import { QuizView } from './pages/QuizView';
import { ResultsView } from './pages/ResultsView';
import { BookmarksView } from './pages/BookmarksView';
import { AnalyticsView } from './pages/AnalyticsView';
import { VerificationView } from './pages/VerificationView';
import { SettingsView } from './pages/SettingsView';
import { QuizAttempt, QuizMode, WeekFilterType, QuestionBankType } from './types';

const MainApp: React.FC = () => {
  const { saveCompletedAttempt, activeAttempt } = useApp();
  const [currentTab, setCurrentTab] = useState<NavTab>('dashboard');
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  // Active quiz config
  const [quizParams, setQuizParams] = useState<{
    week: WeekFilterType;
    mode: QuizMode;
    questionLimit?: number;
    bankType?: QuestionBankType;
  }>({ week: 1, mode: 'practice' });

  // Last completed attempt for Results view
  const [lastCompletedAttempt, setLastCompletedAttempt] = useState<QuizAttempt | null>(null);

  // Trigger starting a quiz
  const handleStartQuiz = (options: {
    week?: WeekFilterType;
    mode?: QuizMode;
    onlyIncorrect?: boolean;
    questionLimit?: number;
    bankType?: QuestionBankType;
  }) => {
    let weekTarget: WeekFilterType = options.week !== undefined ? options.week : 1;
    if (options.onlyIncorrect) {
      weekTarget = 'incorrect';
    }

    const selectedMode: QuizMode = options.mode || 'practice';
    setQuizParams({
      week: weekTarget,
      mode: selectedMode,
      questionLimit: options.questionLimit,
      bankType: options.bankType
    });
    setCurrentTab(selectedMode === 'exam' ? 'exam' : 'quiz');
  };

  const handleCompleteQuiz = (attempt: QuizAttempt) => {
    saveCompletedAttempt(attempt);
    setLastCompletedAttempt(attempt);
    setCurrentTab('results');
  };

  const handleExitQuiz = () => {
    setCurrentTab('dashboard');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-brand-500 selection:text-white">
      {/* Sidebar navigation */}
      <Sidebar
        currentTab={currentTab}
        onSelectTab={(tab) => {
          if (tab === 'quiz') {
            handleStartQuiz({ week: 'all', mode: 'practice' });
          } else if (tab === 'exam') {
            handleStartQuiz({ week: 'all', mode: 'exam' });
          } else {
            setCurrentTab(tab);
          }
        }}
        isOpenMobile={isMobileSidebarOpen}
        onCloseMobile={() => setIsMobileSidebarOpen(false)}
      />

      {/* Main Content Area */}
      <div className="lg:pl-64 flex flex-col min-h-screen">
        <Header
          onToggleSidebar={() => setIsMobileSidebarOpen(prev => !prev)}
          currentTab={currentTab}
          onStartPractice={(type) => {
            handleStartQuiz({ week: type === 'incorrect' ? 'incorrect' : 'all', mode: 'practice' });
          }}
        />

        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          {currentTab === 'dashboard' && (
            <Dashboard
              onNavigate={(tab) => setCurrentTab(tab)}
              onStartQuiz={handleStartQuiz}
            />
          )}

          {currentTab === 'mega' && (
            <MegaQuestionBank
              onStartQuiz={handleStartQuiz}
            />
          )}

          {currentTab === 'weeks' && (
            <WeeklyBank
              onStartQuiz={handleStartQuiz}
            />
          )}

          {(currentTab === 'quiz' || currentTab === 'exam') && (
            <QuizView
              initialWeekFilter={quizParams.week}
              initialMode={quizParams.mode}
              questionLimit={quizParams.questionLimit}
              bankType={quizParams.bankType}
              onCompleteQuiz={handleCompleteQuiz}
              onExit={handleExitQuiz}
            />
          )}

          {currentTab === 'results' && lastCompletedAttempt && (
            <ResultsView
              attempt={lastCompletedAttempt}
              onRetryQuiz={handleStartQuiz}
              onReturnDashboard={() => setCurrentTab('dashboard')}
            />
          )}

          {currentTab === 'saved' && (
            <BookmarksView
              onStartQuiz={(opts) => handleStartQuiz({ week: opts.week, mode: opts.mode })}
            />
          )}

          {currentTab === 'analytics' && (
            <AnalyticsView
              onStartQuiz={handleStartQuiz}
            />
          )}

          {currentTab === 'verification' && (
            <VerificationView />
          )}

          {currentTab === 'settings' && (
            <SettingsView />
          )}
        </main>
      </div>
    </div>
  );
};

export function App() {
  return (
    <AppProvider>
      <MainApp />
    </AppProvider>
  );
}

export default App;
