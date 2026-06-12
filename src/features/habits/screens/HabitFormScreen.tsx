import { RouteProp, useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { useShallow } from 'zustand/shallow';
import { Button } from '../../../shared/components/Button';
import { RootStackParamList } from '../../../shared/types/navigation';
import { colors, font, radius, spacing } from '../../../shared/theme';
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
      style={styles.container}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.inner}>
          <View>
            <Today size="large" />
            <Text style={styles.title}>{habit ? 'Editar Hábito' : 'Adicionar Hábito'}</Text>
          </View>
          <View>
            <Text style={styles.label}>Nome do hábito</Text>
            <TextInput
              placeholder="Ex: Beber água, Meditar"
              value={name}
              onChangeText={setName}
              style={[styles.input, name !== '' ? styles.inputFocused : styles.inputBlurred]}
              placeholderTextColor={colors.textMuted}
            />
          </View>
          <View>
            <Text style={styles.label}>Categoria</Text>
            <CategoryFilter selectedCategoryId={categoryId} onSelect={setCategoryId} />
          </View>
          <View style={styles.footer}>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inner: {
    flex: 1,
    justifyContent: 'space-evenly',
    padding: 24,
    paddingTop: 60,
    backgroundColor: colors.background,
  },
  title: { fontSize: font.xl, color: 'white' },
  label: { fontSize: font.md, color: colors.textMuted, marginBottom: 8 },
  input: {
    backgroundColor: colors.card,
    padding: spacing.lg,
    borderRadius: radius.md,
    color: colors.textPrimary,
    fontSize: font.xl,
    borderColor: colors.border,
    borderWidth: 2,
  },
  inputFocused: {
    borderColor: colors.accent,
  },
  inputBlurred: {
    borderColor: colors.border,
  },
  footer: { rowGap: 20 },
});
