import { Text } from 'react-native';
import { StyleSheet } from 'react-native';
import { colors } from '../../../shared/theme';

export function Today({ size }: { size?: 'small' | 'large' }) {
  const date = new Date();
  const options = { weekday: 'long' } as const;
  const today = date.toLocaleDateString('pt-BR', options);

  return <Text style={[styles.today, { fontSize: size === 'large' ? 16 : 12 }]}>{today}</Text>;
}

const styles = StyleSheet.create({
  today: {
    color: colors.textMuted,
    textTransform: 'uppercase',
  },
});
