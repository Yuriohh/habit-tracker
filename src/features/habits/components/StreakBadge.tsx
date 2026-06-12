import { StyleSheet, Text, View } from 'react-native';
import { colors, font, radius, spacing } from '../../../shared/theme';

type StreakBadgeProps = {
  streak: number;
};

export function StreakBadge({ streak }: StreakBadgeProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.fire}>🔥</Text>
      <Text style={styles.count}>{streak}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    borderRadius: radius.md,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    gap: spacing.xs,
  },
  fire: {
    fontSize: font.xl,
  },
  count: {
    fontSize: font.xl,
    color: colors.accent,
    fontWeight: 'bold',
  },
});
