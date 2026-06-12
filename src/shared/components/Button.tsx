import { StyleSheet, Text, TouchableOpacity, TouchableOpacityProps } from 'react-native';
import { colors, font, radius, spacing } from '../theme';

type ButtonProps = TouchableOpacityProps & {
  variant: 'primary' | 'ghost' | 'destructive';
  label: string;
  onPress: () => void;
};

export function Button({ variant, label, onPress, ...rest }: ButtonProps) {
  return (
    <TouchableOpacity {...rest} onPress={onPress} style={[styles.base, styles[variant]]}>
      <Text style={[styles.label, styles[`${variant}Label`]]}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  base: {
    padding: spacing.lg,
    borderRadius: radius.md,
    alignItems: 'center',
  },
  primary: {
    backgroundColor: colors.accent,
  },
  ghost: {
    backgroundColor: 'transparent',
    borderWidth: 0.5,
    borderColor: colors.border,
  },
  destructive: {
    backgroundColor: colors.dangerBg,
    borderWidth: 0.5,
    borderColor: colors.dangerBorder,
  },
  label: {
    fontSize: font.lg,
    fontWeight: 500,
  },
  primaryLabel: {
    color: '#fff',
  },
  ghostLabel: {
    color: colors.textSecondary,
  },
  destructiveLabel: {
    color: colors.danger,
  },
});
