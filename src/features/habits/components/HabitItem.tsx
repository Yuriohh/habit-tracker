import Checkbox from 'expo-checkbox';
import { SymbolView } from 'expo-symbols';
import React, { useCallback } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import clsx from 'clsx';
import { colors } from '../../../shared/theme';
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
    <View className="flex-row justify-between items-center bg-card rounded-lg my-1 p-3">
      <TouchableOpacity className="flex-row items-center" onPress={handleToggle}>
        <Checkbox
          value={habit.done}
          onValueChange={handleToggle}
          style={{ marginRight: 12, borderRadius: 6 }}
          color={habit.done ? colors.accent : colors.border}
        />
        <Text
          className={clsx('text-base', {
            'line-through text-textMuted': habit.done,
            'text-textPrimary': !habit.done,
          })}
          accessibilityRole="checkbox"
          accessibilityState={{ checked: habit.done }}
        >
          {habit.name}
        </Text>
      </TouchableOpacity>
      <View className="flex-row items-center">
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
