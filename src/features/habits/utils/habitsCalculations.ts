import { Habit } from "../../types/habits";

export function calculateStats(habits: Habit[]) {
  const total = habits.length;
  const done = habits.filter((h) => h.done).length;
  const progress = total > 0 ? Math.round((done / total) * 100) : 0;

  return { total, done, progress };
}

export function getHabitsByCategory(habits: Habit[], categoryId: string): Habit[] {
  return habits.filter((h) => h.categoryId === categoryId);
}
