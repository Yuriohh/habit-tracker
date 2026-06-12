export type Habit = {
  id: string;
  name: string;
  done: boolean;
  categoryId: string;
};

export type HabitState = {
  habits: Habit[];
};

export type HabitsActions = {
  toggleHabit: (id: string) => void;
  addHabit: (name: string, categoryId: string) => void;
  deleteHabit: (id: string) => void;
  editHabit: (id: string, name: string, categoryId: string) => void;
};

export type HabitsProps = HabitState & HabitsActions;
