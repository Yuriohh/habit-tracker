import { Text, TouchableOpacity } from 'react-native';
import clsx from 'clsx';

type CategoryBadgeProps = {
  label: string;
  selected: boolean;
  onPress: () => void;
};

export function CategoryBadge({ label, selected, onPress }: CategoryBadgeProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      className={clsx('rounded-lg px-3 py-1', {
        'bg-accent': selected,
        'bg-card': !selected,
      })}
      accessibilityLabel={`category-${label}`}
      accessibilityState={{ selected }}
    >
      <Text
        className={clsx('text-sm font-semibold', {
          'text-white': selected,
          'text-textSecondary': !selected,
        })}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
}
