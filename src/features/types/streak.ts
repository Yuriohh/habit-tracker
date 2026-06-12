export type StreakData = {
  currentStreak: number;
  lastCompletedDate: string | null;
};

export type StreakState = {
  streakData: StreakData;
};

export type StreakActions = {
  registerCompletion: () => void;
};

export type StreakProps = StreakState & StreakActions;
