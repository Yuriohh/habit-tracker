import { Text, View } from 'react-native';

type StreakBadgeProps = {
  streak: number;
};

export function StreakBadge({ streak }: StreakBadgeProps) {
  return (
    <View className="flex-row items-center bg-card rounded-lg px-3 py-1 gap-1">
      <Text className="text-lg">🔥</Text>
      <Text className="text-lg text-accent font-bold">{streak}</Text>
    </View>
  );
}
