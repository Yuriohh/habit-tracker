import { useShallow } from "zustand/shallow";
import { useHabit } from "./useHabits";
import { useHabitsStatus } from "./useHabitsStatus";
import { useCallback, useMemo, useState } from "react";
import { getHabitsByCategory } from "../utils/habitsCalculations";
import { Alert } from "react-native";
import { DEFAULT_CATEGORY_ID } from "../constants/categories";
import { HomeScreenViewModel } from "../../types/homescreenViewModel";

export function useHomeScreenViewModel(): HomeScreenViewModel {
  const { habits, toggleHabit, deleteHabit } = useHabit(
    useShallow((state) => ({
      habits: state.habits,
      toggleHabit: state.toggleHabit,
      deleteHabit: state.deleteHabit,
    })),
  );

  const { total, done } = useHabitsStatus();
  const [selectedCategoryId, setSelectedCategoryId] = useState(DEFAULT_CATEGORY_ID);

  const filteredHabits = useMemo(
    () => getHabitsByCategory(habits, selectedCategoryId),
    [habits, selectedCategoryId],
  );

  const showDeleteAlert = useCallback(
    (id: string) => {
      return Alert.alert('Apagar Hábito', 'Tem certeza que deseja apagar este hábito?', [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Apagar', style: 'destructive', onPress: () => deleteHabit(id) },
      ]);
    },
    [deleteHabit],
  );

  return {
    filteredHabits,
    total,
    done,
    selectedCategoryId,
    toggleHabit,
    showDeleteAlert,
    setSelectedCategoryId,
  };
}
