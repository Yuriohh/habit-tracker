import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { StreakProps } from '../../types/streak';
import { calculateStreak } from '../utils/streakCalculations';
import { getTodayKey } from '../utils/date';

export const useStreak = create<StreakProps>()(
  persist(
    (set) => ({
      streakData: { currentStreak: 0, lastCompletedDate: null },
      registerCompletion: () =>
        set((state) => ({
          streakData: calculateStreak(state.streakData, getTodayKey()),
        })),
    }),
    {
      name: 'streak-storage',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
