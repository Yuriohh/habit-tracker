import { useMemo } from 'react';
import { useHabit } from './useHabits';
import { calculateStats } from '../utils/habitsCalculations';

export function useHabitsStatus() {
  const habits = useHabit((state) => state.habits);

  return useMemo(() => calculateStats(habits), [habits]);
}
