import { Habit } from '../../features/types/habits';

export type RootStackParamList = {
  Home: undefined;
  AddHabit: undefined;
  EditHabit: { habit: Habit };
  Progress: undefined;
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
