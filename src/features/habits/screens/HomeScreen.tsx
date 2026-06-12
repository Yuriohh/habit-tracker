import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useCallback, useMemo, useState } from 'react';
import { Alert, FlatList, StyleSheet, Text, View } from 'react-native';
import { useShallow } from 'zustand/shallow';
import { Button } from '../../../shared/components/Button';
import { colors, font } from '../../../shared/theme';
import { RootStackParamList } from '../../../shared/types/navigation';
import { CategoryFilter } from '../components/CategoryFilter';
import { HabitItem } from '../components/HabitItem';
import { Today } from '../components/Today';
import { DEFAULT_CATEGORY_ID } from '../constants/categories';
import { useHabit } from '../hooks/useHabits';
import { useHabitsStatus } from '../hooks/useHabitsStatus';
import { getHabitsByCategory } from '../utils/habitsCalculations';

export function HomeScreen() {
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

  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const showDeleteAlert = useCallback(
    (id: string) => {
      return Alert.alert('Apagar Hábito', 'Tem certeza que deseja apagar este hábito?', [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Apagar', style: 'destructive', onPress: () => deleteHabit(id) },
      ]);
    },
    [deleteHabit],
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerTitles}>
          <Text style={styles.title}>Meus Hábitos</Text>
          <Text style={styles.subtitle}>
            <Today /> - {done} de {total} Concluidos
          </Text>
        </View>

        <Button variant="ghost" label="Progresso" onPress={() => navigation.navigate('Progress')} />
      </View>
      <CategoryFilter selectedCategoryId={selectedCategoryId} onSelect={setSelectedCategoryId} />
      <FlatList
        data={filteredHabits}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <HabitItem
            habit={item}
            onToggle={() => toggleHabit(item.id)}
            onEdit={() => navigation.navigate('EditHabit', { habit: item })}
            onDelete={() => showDeleteAlert(item.id)}
          />
        )}
      />
      <Button
        label="Adicionar Hábito"
        onPress={() => navigation.navigate('AddHabit')}
        variant="primary"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, paddingTop: 60, backgroundColor: colors.background },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  headerTitles: { flexDirection: 'column' },
  title: { fontSize: font.xxl, fontWeight: 'bold', color: colors.textPrimary },
  subtitle: { fontSize: font.md, color: colors.textPrimary, marginBottom: 8 },
  progress: { fontSize: 16, color: '#666', paddingBottom: 16 },
});
