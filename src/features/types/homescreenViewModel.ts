import { Habit } from "./habits";

export interface HomeScreenViewModel {
  filteredHabits: Habit[];
  total: number;
  done: number;
  selectedCategoryId: string;

  toggleHabit: (id: string) => void;
  showDeleteAlert: (id: string) => void;
  setSelectedCategoryId: (id: string) => void;
}
