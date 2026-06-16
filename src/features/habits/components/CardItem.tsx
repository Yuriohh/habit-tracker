import { Text, View } from 'react-native';
import { Habit } from '../../types/habits';
import Checkbox from 'expo-checkbox';
import { colors } from '../../../shared/theme';
import clsx from 'clsx';

export function CardItem({ item }: { item: Habit }) {
  return (
    <View className="flex-row items-center my-1">
      <Checkbox
        value={item.done}
        style={{ marginRight: 12, borderRadius: 6 }}
        color={item.done ? colors.accent : colors.border}
      />
      <Text
        className={clsx('text-base font-medium', {
          'line-through text-textMuted': item.done,
          'text-textPrimary': !item.done,
        })}
      >
        {item.name}
      </Text>
    </View>
  );
}
