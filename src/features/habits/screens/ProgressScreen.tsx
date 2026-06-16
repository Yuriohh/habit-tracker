import { Text, View } from 'react-native';
import { ProgressBar } from '../components/ProgressBar';
import { useHabitsStatus } from '../hooks/useHabitsStatus';
import { Today } from '../components/Today';
import { SmallCard } from '../components/SmallCard';
import { Card } from '../components/Card';
import { useHabit } from '../hooks/useHabits';
import { Button } from '../../../shared/components/Button';
import { useNavigation } from '@react-navigation/native';
import { useStreak } from '../hooks/useStreak';
import { StreakBadge } from '../components/StreakBadge';
import { getDisplayStreak } from '../utils/streakCalculations';
import { getTodayKey } from '../utils/date';

export function ProgressScreen() {
  const { total, done, progress } = useHabitsStatus();
  const habits = useHabit((state) => state.habits);
  const streakData = useStreak((s) => s.streakData);
  const streak = getDisplayStreak(streakData, getTodayKey());

  const navigation = useNavigation();
  return (
    <View className="flex-1 p-6 pt-[60px] bg-background">
      <View className="flex-row justify-between items-center mb-1">
        <View>
          <Today size="large" />
          <Text className="text-2xl text-white mb-3">Progresso</Text>
        </View>
        <StreakBadge streak={streak} />
      </View>

      <View className="flex-row items-center my-6 gap-4">
        <SmallCard label="Total" value={total} />
        <SmallCard label="Feitos" value={done} />
        <SmallCard label="Progresso" value={progress} progress />
      </View>

      <View className="flex-row justify-between mb-1">
        <Text className="text-sm text-textSecondary">
          {done} de {total} Concluídos
        </Text>
        <Text className="text-base text-accent">{progress}%</Text>
      </View>

      <ProgressBar progress={progress} />

      <View className="flex-1">
        <Card title="Habitos" habits={habits} />
      </View>

      <Button variant="ghost" label="Voltar" onPress={() => navigation.goBack()} />
    </View>
  );
}
