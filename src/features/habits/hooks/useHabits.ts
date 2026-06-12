import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { HabitsProps } from '../../types/habits';
import { useStreak } from './useStreak';
import { DEFAULT_CATEGORY_ID } from '../constants/categories';

export const useHabit = create<HabitsProps>()(
  persist(
    (set, get) => ({
      habits: [],
      toggleHabit: (id) => {
        const habit = get().habits.find((h) => h.id === id);
        const willBeDone = !!habit && !habit.done;
        set((state) => ({
          habits: state.habits.map((h) => (h.id === id ? { ...h, done: !h.done } : h)),
        }));
        if (willBeDone) useStreak.getState().registerCompletion();
      },
      addHabit: (name, categoryId) =>
        set((state) => ({
          habits: [...state.habits, { id: Date.now().toString(), name, done: false, categoryId }],
        })),
      deleteHabit: (id) =>
        set((state) => ({
          habits: state.habits.filter((h) => h.id !== id),
        })),
      editHabit: (id, name, categoryId) =>
        set((state) => ({
          habits: state.habits.map((h) => (h.id === id ? { ...h, name, categoryId } : h)),
        })),
    }),
    {
      name: 'habits-storage',
      storage: createJSONStorage(() => AsyncStorage),
      version: 1,
      migrate: (persisted: any) => {
        if (persisted?.habits) {
          persisted.habits = persisted.habits.map((h: any) => ({
            ...h,
            categoryId: h.categoryId ?? DEFAULT_CATEGORY_ID,
          }));
        }
        return persisted;
      },
    },
  ),
);
