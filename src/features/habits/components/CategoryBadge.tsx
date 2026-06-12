import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { colors, font, radius, spacing } from '../../../shared/theme';

type CategoryBadgeProps = {
  label: string;
  selected: boolean;
  onPress: () => void;
};

export function CategoryBadge({ label, selected, onPress }: CategoryBadgeProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.container, selected ? styles.selected : styles.unselected]}
      accessibilityLabel={`category-${label}`}
    >
      <Text style={[styles.label, selected ? styles.selectedLabel : styles.unselectedLabel]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: radius.md,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
  },
  selected: {
    backgroundColor: colors.accent,
  },
  unselected: {
    backgroundColor: colors.card,
  },
  label: {
    fontSize: font.md,
    fontWeight: '600',
  },
  selectedLabel: {
    color: '#fff',
  },
  unselectedLabel: {
    color: colors.textSecondary,
  },
});
