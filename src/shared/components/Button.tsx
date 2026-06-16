import { Text, TouchableOpacity, TouchableOpacityProps } from 'react-native';
import clsx from 'clsx';

type ButtonProps = TouchableOpacityProps & {
  variant: 'primary' | 'ghost' | 'destructive';
  label: string;
  onPress: () => void;
};

export function Button({ variant, label, onPress, ...rest }: ButtonProps) {
  return (
    <TouchableOpacity
      {...rest}
      onPress={onPress}
      className={clsx('flex items-center p-3 rounded-xl', {
        'bg-accent': variant === 'primary',
        'bg-transparent border border-border': variant === 'ghost',
        'bg-dangerBg border border-dangerBorder': variant === 'destructive',
      })}
    >
      <Text
        className={clsx('text-white font-lg font-medium', {
          'text-white': variant === 'primary',
          'text-textSecondary': variant === 'ghost',
          'text-danger': variant === 'destructive',
        })}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
}

// const styles = StyleSheet.create({
//   base: {
//     padding: spacing.lg,
//     borderRadius: radius.md,
//     alignItems: 'center',
//   },
//   primary: {
//     backgroundColor: colors.accent,
//   },
//   ghost: {
//     backgroundColor: 'transparent',
//     borderWidth: 0.5,
//     borderColor: colors.border,
//   },
//   destructive: {
//     backgroundColor: colors.dangerBg,
//     borderWidth: 0.5,
//     borderColor: colors.dangerBorder,
//   },
//   label: {
//     fontSize: font.lg,
//     fontWeight: 500,
//   },
//   primaryLabel: {
//     color: '#fff',
//   },
//   ghostLabel: {
//     color: colors.textSecondary,
//   },
//   destructiveLabel: {
//     color: colors.danger,
//   },
// });
