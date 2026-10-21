import { Question, QuizAttempt, UserStats, AppSettings } from '../types';
import { INITIAL_QUESTIONS } from '../data/questions';

const STORAGE_KEYS = {
  QUESTIONS: 'nuptel_prep_questions_v1',
  STATS: 'nuptel_prep_stats_v1',
  SETTINGS: 'nuptel_prep_settings_v1',
  ACTIVE_ATTEMPT: 'nuptel_prep_active_attempt_v1',
};

const DEFAULT_SETTINGS: AppSettings = {
  defaultExamDurationMinutes: 30,
  soundEnabled: true,
  instantFeedbackInPractice: true,
  shuffleQuestions: false,
  shuffleOptions: false,
  examDate: '2026-10-23',
};

export class StorageService {
  static getQuestions(): Question[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.QUESTIONS);
      if (!data) {
        this.saveQuestions(INITIAL_QUESTIONS);
        return INITIAL_QUESTIONS;
      }
      const parsed = JSON.parse(data);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
      return INITIAL_QUESTIONS;
    } catch (e) {
      console.error('Failed to load questions from storage, using initial questions', e);
      return INITIAL_QUESTIONS;
    }
  }

  static saveQuestions(questions: Question[]): void {
    try {
      localStorage.setItem(STORAGE_KEYS.QUESTIONS, JSON.stringify(questions));
    } catch (e) {
      console.error('Failed to save questions to storage', e);
    }
  }

  static getStats(): UserStats {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.STATS);
      if (!data) {
        return {
          totalAttempted: 0,
          totalCorrect: 0,
          totalIncorrect: 0,
          accuracyRate: 0,
          bookmarkedQuestionIds: [],
          difficultQuestionIds: [],
          wrongQuestionIds: [],
          attempts: [],
          questionHistory: {}
        };
      }
      return JSON.parse(data);
    } catch (e) {
      console.error('Failed to load user stats from storage', e);
      return {
        totalAttempted: 0,
        totalCorrect: 0,
        totalIncorrect: 0,
        accuracyRate: 0,
        bookmarkedQuestionIds: [],
        difficultQuestionIds: [],
        wrongQuestionIds: [],
        attempts: [],
        questionHistory: {}
      };
    }
  }

  static saveStats(stats: UserStats): void {
    try {
      localStorage.setItem(STORAGE_KEYS.STATS, JSON.stringify(stats));
    } catch (e) {
      console.error('Failed to save stats to storage', e);
    }
  }

  static getSettings(): AppSettings {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.SETTINGS);
      if (!data) return DEFAULT_SETTINGS;
      return { ...DEFAULT_SETTINGS, ...JSON.parse(data) };
    } catch {
      return DEFAULT_SETTINGS;
    }
  }

  static saveSettings(settings: AppSettings): void {
    try {
      localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
    } catch (e) {
      console.error('Failed to save settings', e);
    }
  }

  static getActiveAttempt(): QuizAttempt | null {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.ACTIVE_ATTEMPT);
      return data ? JSON.parse(data) : null;
    } catch {
      return null;
    }
  }

  static saveActiveAttempt(attempt: QuizAttempt | null): void {
    try {
      if (attempt) {
        localStorage.setItem(STORAGE_KEYS.ACTIVE_ATTEMPT, JSON.stringify(attempt));
      } else {
        localStorage.removeItem(STORAGE_KEYS.ACTIVE_ATTEMPT);
      }
    } catch (e) {
      console.error('Failed to save active attempt', e);
    }
  }

  static exportBackup(): string {
    const backup = {
      version: '1.0',
      exportedAt: new Date().toISOString(),
      questions: this.getQuestions(),
      stats: this.getStats(),
      settings: this.getSettings()
    };
    return JSON.stringify(backup, null, 2);
  }

  static importBackup(jsonString: string): { success: boolean; message: string } {
    try {
      const data = JSON.parse(jsonString);
      if (!data || typeof data !== 'object') {
        return { success: false, message: 'Invalid backup file: file content is not a valid JSON object.' };
      }

      if (data.questions && Array.isArray(data.questions)) {
        this.saveQuestions(data.questions);
      }

      if (data.stats && typeof data.stats === 'object') {
        this.saveStats(data.stats);
      }

      if (data.settings && typeof data.settings === 'object') {
        this.saveSettings(data.settings);
      }

      return { success: true, message: 'Progress and questions restored successfully!' };
    } catch (err: unknown) {
      return { success: false, message: `Failed to restore: ${err instanceof Error ? err.message : 'Unknown JSON parse error'}` };
    }
  }

  static resetAll(): void {
    localStorage.removeItem(STORAGE_KEYS.QUESTIONS);
    localStorage.removeItem(STORAGE_KEYS.STATS);
    localStorage.removeItem(STORAGE_KEYS.SETTINGS);
    localStorage.removeItem(STORAGE_KEYS.ACTIVE_ATTEMPT);
  }
}
