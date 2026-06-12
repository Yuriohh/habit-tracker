import { Category } from '../../types/category';

export const CATEGORIES: Category[] = [
  { id: 'health', name: 'Saúde' },
  { id: 'productivity', name: 'Produtividade' },
  { id: 'study', name: 'Estudo' },
];

export const DEFAULT_CATEGORY_ID = CATEGORIES[0].id;
