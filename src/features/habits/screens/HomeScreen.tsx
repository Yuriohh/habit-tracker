import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useCallback, useMemo, useState } from 'react';
import { Alert, FlatList, Text, View } from 'react-native';
import { useShallow } from 'zustand/shallow';
import { Button } from '../../../shared/components/Button';
import { RootStackParamList } from '../../../shared/types/navigation';
import { CategoryFilter } from '../components/CategoryFilter';
import { HabitItem } from '../components/HabitItem';
import { Today } from '../components/Today';
import { useHomeScreenViewModel } from '../hooks/useHomeScreenViewModel';

export function HomeScreen() {
  const {
    total,
    done,
    filteredHabits,
    showDeleteAlert,
    selectedCategoryId,
    setSelectedCategoryId,
    toggleHabit,
  } = useHomeScreenViewModel();

  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <View className="flex-1 p-6 pt-[60px] bg-background">
      <View className="flex-row justify-between items-center mb-6">
        <View className="flex-col">
          <Text className="text-2xl font-bold text-textPrimary">Meus Hábitos</Text>
          <Text className="text-sm text-textPrimary mb-2">
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
