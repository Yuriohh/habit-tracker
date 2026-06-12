import { fireEvent, render, screen } from '@testing-library/react-native';
import { RouteProp } from '@react-navigation/native';
import React from 'react';
import { HabitFormScreen } from '../HabitFormScreen';
import { RootStackParamList } from '../../../../shared/types/navigation';
import { Habit } from '../../../types/habits';

const mockGoBack = jest.fn();
const mockAddHabit = jest.fn();
const mockEditHabit = jest.fn();

jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: () => ({ goBack: mockGoBack }),
}));

jest.mock('../../hooks/useHabits', () => ({
  useHabit: () => ({ addHabit: mockAddHabit, editHabit: mockEditHabit }),
}));

const mockHabit: Habit = { id: '1', name: 'Beber água', done: false, categoryId: 'health' };

function buildEditRoute(habit: Habit): RouteProp<RootStackParamList, 'EditHabit'> {
  return { key: 'EditHabit', name: 'EditHabit', params: { habit } };
}

describe('HabitFormScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Renderização criação vs edição', () => {
    it('renderiza título e input vazio no modo criação', async () => {
      await render(<HabitFormScreen />);

      expect(screen.getByText('Adicionar Hábito')).toBeTruthy();
      expect(screen.getByPlaceholderText('Ex: Beber água, Meditar')).toHaveProp('value', '');
    });

    it('renderiza título e input com nome do hábito no modo edição', async () => {
      await render(<HabitFormScreen route={buildEditRoute(mockHabit)} />);

      expect(screen.getByText('Editar Hábito')).toBeTruthy();
      expect(screen.getByPlaceholderText('Ex: Beber água, Meditar')).toHaveProp('value', 'Beber água');
    });

    it('exibe o seletor de categoria', async () => {
      await render(<HabitFormScreen />);

      expect(screen.getByText('Categoria')).toBeTruthy();
      expect(screen.getByText('Saúde')).toBeTruthy();
      expect(screen.getByText('Produtividade')).toBeTruthy();
      expect(screen.getByText('Estudo')).toBeTruthy();
    });
  });

  describe('Salvar com campo vazio', () => {
    it('não chama addHabit nem goBack', async () => {
      await render(<HabitFormScreen />);

      await fireEvent.press(screen.getByText('Salvar'));

      expect(mockAddHabit).not.toHaveBeenCalled();
      expect(mockGoBack).not.toHaveBeenCalled();
    });
  });

  describe('Salvar com nome preenchido', () => {
    it('chama addHabit com nome e categoria padrão no modo criação', async () => {
      await render(<HabitFormScreen />);

      await fireEvent.changeText(
        screen.getByPlaceholderText('Ex: Beber água, Meditar'),
        'Meditar',
      );
      await fireEvent.press(screen.getByText('Salvar'));

      expect(mockAddHabit).toHaveBeenCalledWith('Meditar', 'health');
      expect(mockGoBack).toHaveBeenCalledTimes(1);
    });

    it('chama addHabit com categoria selecionada pelo usuário', async () => {
      await render(<HabitFormScreen />);

      await fireEvent.changeText(
        screen.getByPlaceholderText('Ex: Beber água, Meditar'),
        'Ler livro',
      );
      await fireEvent.press(screen.getByLabelText('category-Estudo'));
      await fireEvent.press(screen.getByText('Salvar'));

      expect(mockAddHabit).toHaveBeenCalledWith('Ler livro', 'study');
      expect(mockGoBack).toHaveBeenCalledTimes(1);
    });

    it('chama editHabit com o novo nome e categoria e navega para trás no modo edição', async () => {
      await render(<HabitFormScreen route={buildEditRoute(mockHabit)} />);

      await fireEvent.changeText(
        screen.getByPlaceholderText('Ex: Beber água, Meditar'),
        'Beber água com limão',
      );
      await fireEvent.press(screen.getByText('Salvar'));

      expect(mockEditHabit).toHaveBeenCalledWith('1', 'Beber água com limão', 'health');
      expect(mockGoBack).toHaveBeenCalledTimes(1);
    });

    it('chama editHabit com categoria trocada', async () => {
      await render(<HabitFormScreen route={buildEditRoute(mockHabit)} />);

      await fireEvent.press(screen.getByLabelText('category-Produtividade'));
      await fireEvent.press(screen.getByText('Salvar'));

      expect(mockEditHabit).toHaveBeenCalledWith('1', 'Beber água', 'productivity');
      expect(mockGoBack).toHaveBeenCalledTimes(1);
    });
  });
});
