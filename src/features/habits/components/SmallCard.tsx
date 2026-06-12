import { Text, View } from 'react-native';
import { StyleSheet } from 'react-native';
import { colors, font, radius } from '../../../shared/theme';

type SmallCardProps = {
  label: string;
  value: number;
  progress?: boolean;
};

export function SmallCard({ label, value, progress }: SmallCardProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <Text style={[styles.value, { color: progress ? colors.accent : 'white' }]}>
        {value}
        {progress ? '%' : ''}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    backgroundColor: colors.card,
    height: 85,
    padding: 12,
    borderRadius: radius.md,
  },
  label: {
    color: colors.textMuted,
    fontSize: font.md,
  },
  value: {
    fontSize: font.xxl,
    fontWeight: 'bold',
    color: 'white',
  },
});
