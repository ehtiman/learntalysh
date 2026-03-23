import { useState, useEffect } from "react";
import { useAuth } from "./useAuth";

export interface LessonProgress {
  lessonId: string;
  completed: boolean;
  score: number;
  bestScore: number;
  completedAt?: string;
}

export interface UserProgress {
  totalXp: number;
  streak: number;
  lessonsCompleted: string[];
  lessonScores: Record<string, LessonProgress>;
  level: number;
}

const getDefaultProgress = (): UserProgress => ({
  totalXp: 0,
  streak: 0,
  lessonsCompleted: [],
  lessonScores: {},
  level: 1,
});

const STORAGE_KEY = "learntalysh_progress";

export const useProgress = () => {
  const { user } = useAuth();
  const storageKey = user ? `${STORAGE_KEY}_${user.id}` : STORAGE_KEY;

  const [progress, setProgress] = useState<UserProgress>(() => {
    const stored = localStorage.getItem(storageKey);
    return stored ? JSON.parse(stored) : getDefaultProgress();
  });

  useEffect(() => {
    const stored = localStorage.getItem(storageKey);
    if (stored) {
      setProgress(JSON.parse(stored));
    } else {
      setProgress(getDefaultProgress());
    }
  }, [storageKey]);

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(progress));
  }, [progress, storageKey]);

  const completeLesson = (lessonId: string, score: number, xpReward: number) => {
    setProgress((prev) => {
      const existing = prev.lessonScores[lessonId];
      const isNew = !prev.lessonsCompleted.includes(lessonId);
      const bestScore = existing ? Math.max(existing.bestScore, score) : score;
      const xpEarned = isNew ? xpReward : Math.floor(xpReward * 0.25);
      const newXp = prev.totalXp + xpEarned;

      return {
        ...prev,
        totalXp: newXp,
        level: Math.floor(newXp / 100) + 1,
        streak: prev.streak + (isNew ? 1 : 0),
        lessonsCompleted: isNew
          ? [...prev.lessonsCompleted, lessonId]
          : prev.lessonsCompleted,
        lessonScores: {
          ...prev.lessonScores,
          [lessonId]: {
            lessonId,
            completed: true,
            score,
            bestScore,
            completedAt: new Date().toISOString(),
          },
        },
      };
    });
  };

  return { progress, completeLesson };
};
