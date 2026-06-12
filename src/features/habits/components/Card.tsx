import { FlatList, Text, View } from 'react-native';
import { Habit } from '../../types/habits';
import { HabitItem } from './HabitItem';
import { CardItem } from './CardItem';
import { StyleSheet } from 'react-native';
import { colors, radius } from '../../../shared/theme';

type CardProps = {
  title: string;
  habits: Habit[];
};

export function Card({ title, habits }: CardProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      {habits.map((habit) => (
        <CardItem item={habit} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: colors.card,
    marginVertical: 20,
    borderRadius: radius.md,
    height: 'auto',
  },
  title: {
    color: colors.textPrimary,
    marginBottom: 16,
  },
});
