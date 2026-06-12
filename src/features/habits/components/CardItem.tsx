import { Text, View } from 'react-native';
import { Habit } from '../../types/habits';
import Checkbox from 'expo-checkbox';
import { colors, radius } from '../../../shared/theme';
import { StyleSheet } from 'react-native';

export function CardItem({ item }: { item: Habit }) {
  return (
    <View style={styles.container}>
      <Checkbox
        value={item.done}
        style={styles.checkbox}
        color={item.done ? colors.accent : colors.border}
      />
      <Text
        style={[
          styles.habitName,
          {
            textDecorationLine: item.done ? 'line-through' : 'none',
            color: item.done ? colors.textMuted : colors.textPrimary,
          },
        ]}
      >
        {item.name}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 4,
  },
  checkbox: {
    marginRight: 12,
    borderRadius: radius.sm,
  },
  habitName: {
    fontSize: 16,
    fontWeight: '500',
  },
});
