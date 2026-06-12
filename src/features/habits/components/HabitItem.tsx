import Checkbox from 'expo-checkbox';
import { SymbolView } from 'expo-symbols';
import React, { useCallback } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { colors, font, radius } from '../../../shared/theme';
import { Habit } from '../../types/habits';

type HabitItemProps = {
  habit: Habit;
  onToggle: () => void;
  onEdit: () => void;
  onDelete: () => void;
};

function HabitItemComponent({ habit, onToggle, onEdit, onDelete }: HabitItemProps) {
  const handleToggle = useCallback(() => onToggle(), [onToggle]);
  const handleEdit = useCallback(() => onEdit(), [onEdit]);
  const handleDelete = useCallback(() => onDelete(), [onDelete]);

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.habitToggle} onPress={handleToggle}>
        <Checkbox
          value={habit.done}
          onValueChange={handleToggle}
          style={styles.checkbox}
          color={habit.done ? colors.accent : colors.border}
        />
        <Text
          style={[
            styles.habitName,
            {
              textDecorationLine: habit.done ? 'line-through' : 'none',
              color: habit.done ? colors.textMuted : colors.textPrimary,
            },
          ]}
        >
          {habit.name}
        </Text>
      </TouchableOpacity>
      <View style={styles.habitToggle}>
        <TouchableOpacity onPress={handleEdit} accessibilityLabel="edit-habit">
          <SymbolView
            name={{ ios: 'pencil', android: 'edit' }}
            tintColor={colors.textMuted}
            size={20}
            style={{ marginRight: 12 }}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleDelete} accessibilityLabel="delete-habit">
          <SymbolView
            name={{ ios: 'trash', android: 'delete' }}
            tintColor={colors.textMuted}
            size={20}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

export const HabitItem = React.memo(HabitItemComponent);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    backgroundColor: colors.card,
    borderRadius: radius.md,
    marginVertical: 4,
    padding: 12,
  },
  checkbox: {
    marginRight: 12,
    borderRadius: radius.sm,
  },
  habitName: { fontSize: font.lg },
  habitToggle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  delete: { color: 'red', fontSize: 16 },
});
