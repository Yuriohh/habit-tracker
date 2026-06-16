import { View } from 'react-native';
import { CATEGORIES } from '../constants/categories';
import { CategoryBadge } from './CategoryBadge';

type CategoryFilterProps = {
  selectedCategoryId: string;
  onSelect: (id: string) => void;
};

export function CategoryFilter({ selectedCategoryId, onSelect }: CategoryFilterProps) {
  return (
    <View className="flex-row gap-2 mb-4">
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
