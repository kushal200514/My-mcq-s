export type QuestionType = 'single' | 'multiple' | 'true_false';

export type VerificationStatus = 'verified' | 'dual_accepted' | 'needs_review';

export interface QuestionOption {
  id: string; // e.g. 'a', 'b', 'c', 'd', 'e'
  text: string;
}

export type QuestionBankType = 'assignment' | 'mega';

export interface Question {
  id: string;
  originalQuestionNumber: number;
  week: number; // 1 to 12
  module: string;
  topic: string;
  questionText: string;
  questionType: QuestionType;
  options: QuestionOption[];
  correctAnswer: string | string[]; // 'a' or ['a', 'b'] for multi-select
  explanation?: string;
  difficulty: 'easy' | 'medium' | 'hard';
  sourcePdf: string;
  sourcePage: number;
  verificationStatus: VerificationStatus;
  verificationNotes?: string;
  bankType?: QuestionBankType;
}

export interface WeekMeta {
  week: number;
  title: string;
  module: string;
  description: string;
  topics: string[];
}

export type QuizMode = 'practice' | 'exam';

export type WeekFilterType = 
  | number 
  | 'all' 
  | 'bookmarks' 
  | 'difficult' 
  | 'incorrect' 
  | 'unseen'
  | `mega-${number}`
  | 'mega-all';

export interface QuizAttempt {
  id: string;
  title: string;
  weekFilter: WeekFilterType;
  mode: QuizMode;
  startedAt: number;
  completedAt?: number;
  answers: Record<string, string | string[]>; // questionId -> optionId or optionId[]
  questionIds: string[];
  correctCount: number;
  incorrectCount: number;
  unansweredCount: number;
  score: number;
  accuracyPercentage: number;
  durationSeconds: number;
  timeLimitMinutes?: number;
  bankType?: QuestionBankType;
}

export interface UserStats {
  totalAttempted: number;
  totalCorrect: number;
  totalIncorrect: number;
  accuracyRate: number;
  bookmarkedQuestionIds: string[];
  difficultQuestionIds: string[];
  wrongQuestionIds: string[];
  attempts: QuizAttempt[];
  questionHistory: Record<string, {
    attemptsCount: number;
    lastAttemptedAt: number;
    lastResult: 'correct' | 'incorrect';
    history: Array<{ result: 'correct' | 'incorrect'; timestamp: number; selectedAnswer: string | string[] }>;
  }>;
}

export interface AppSettings {
  defaultExamDurationMinutes: number;
  soundEnabled: boolean;
  instantFeedbackInPractice: boolean;
  shuffleQuestions: boolean;
  shuffleOptions: boolean;
  examDate: string; // "2026-10-23"
}
