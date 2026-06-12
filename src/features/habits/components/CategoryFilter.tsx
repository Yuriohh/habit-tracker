import { StyleSheet, View } from 'react-native';
import { spacing } from '../../../shared/theme';
import { CATEGORIES } from '../constants/categories';
import { CategoryBadge } from './CategoryBadge';

type CategoryFilterProps = {
  selectedCategoryId: string;
  onSelect: (id: string) => void;
};

export function CategoryFilter({ selectedCategoryId, onSelect }: CategoryFilterProps) {
  return (
    <View style={styles.container}>
      {CATEGORIES.map((category) => (
        <CategoryBadge
          key={category.id}
          label={category.name}
          selected={selectedCategoryId === category.id}
          onPress={() => onSelect(category.id)}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginBottom: spacing.lg,
  },
});
