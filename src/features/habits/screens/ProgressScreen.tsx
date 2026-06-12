import { StyleSheet, Text, View } from 'react-native';
import { colors, font } from '../../../shared/theme';
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
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Today size="large" />
          <Text style={styles.title}>Progresso</Text>
        </View>
        <StreakBadge streak={streak} />
      </View>

      <View style={styles.card}>
        <SmallCard label="Total" value={total} />
        <SmallCard label="Feitos" value={done} />
        <SmallCard label="Progresso" value={progress} progress />
      </View>

      <View style={styles.habitsStatus}>
        <Text style={styles.subtitle}>
          {done} de {total} Concluídos
        </Text>
        <Text style={styles.progress}>{progress}%</Text>
      </View>

      <ProgressBar progress={progress} />

      <View style={styles.body}>
        <Card title="Habitos" habits={habits} />
      </View>

      <Button variant="ghost" label="Voltar" onPress={() => navigation.goBack()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, paddingTop: 60, backgroundColor: colors.background },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 24,
    gap: 16,
  },
  habitsStatus: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  body: {
    flex: 1,
  },
  title: { fontSize: font.xxl, color: 'white', marginBottom: 12 },
  subtitle: { fontSize: font.md, color: colors.textSecondary },
  progress: { fontSize: 16, color: colors.accent },
});
