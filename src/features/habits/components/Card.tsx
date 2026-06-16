import { FlatList, Text, View } from 'react-native';
import { Habit } from '../../types/habits';
import { CardItem } from './CardItem';

type CardProps = {
  title: string;
  habits: Habit[];
};

export function Card({ title, habits }: CardProps) {
  return (
    <View className="p-4 bg-card my-5 rounded-lg">
      <Text className="text-textPrimary mb-4">{title}</Text>
      {habits.map((habit) => (
        <CardItem item={habit} key={habit.id} />
      ))}
    </View>
  );
}
