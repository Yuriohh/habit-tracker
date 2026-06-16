import { RouteProp, useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { useShallow } from 'zustand/shallow';
import clsx from 'clsx';
import { Button } from '../../../shared/components/Button';
import { RootStackParamList } from '../../../shared/types/navigation';
import { colors } from '../../../shared/theme';
import { CategoryFilter } from '../components/CategoryFilter';
import { Today } from '../components/Today';
import { DEFAULT_CATEGORY_ID } from '../constants/categories';
import { useHabit } from '../hooks/useHabits';

type HabitFormRouteProps = RouteProp<RootStackParamList, 'EditHabit'>;

type Props = {
  route?: HabitFormRouteProps;
};

export function HabitFormScreen({ route }: Props) {
  const habit = route?.params?.habit;
  const [name, setName] = useState(habit?.name || '');
  const [categoryId, setCategoryId] = useState(habit?.categoryId ?? DEFAULT_CATEGORY_ID);

  const { addHabit, editHabit } = useHabit(
    useShallow((state) => ({ addHabit: state.addHabit, editHabit: state.editHabit })),
  );
  const navigation = useNavigation();

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1"
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View className="flex-1 justify-evenly p-6 pt-[60px] bg-background">
          <View>
            <Today size="large" />
            <Text className="text-lg text-white">{habit ? 'Editar Hábito' : 'Adicionar Hábito'}</Text>
          </View>
          <View>
            <Text className="text-sm text-textMuted mb-2">Nome do hábito</Text>
            <TextInput
              placeholder="Ex: Beber água, Meditar"
              value={name}
              onChangeText={setName}
              className={clsx('bg-card p-4 rounded-lg text-textPrimary text-lg border-2', {
                'border-accent': name !== '',
                'border-border': name === '',
              })}
              placeholderTextColor={colors.textMuted}
            />
          </View>
          <View>
            <Text className="text-sm text-textMuted mb-2">Categoria</Text>
            <CategoryFilter selectedCategoryId={categoryId} onSelect={setCategoryId} />
          </View>
          <View className="gap-y-5">
            <Button
              label="Salvar"
              onPress={() => {
                if (name.trim()) {
                  if (habit) {
                    editHabit(habit.id, name, categoryId);
                    navigation.goBack();
                  } else {
                    addHabit(name, categoryId);
                    setName('');
                    navigation.goBack();
                  }
                }
              }}
              variant="primary"
            />
            <Button label="Cancelar" onPress={() => navigation.goBack()} variant="ghost" />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
