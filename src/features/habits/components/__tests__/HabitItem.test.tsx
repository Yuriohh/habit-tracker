import { fireEvent, render, screen } from '@testing-library/react-native';
import { HabitItem } from '../HabitItem';
const mockHabit = {
  id: '1',
  name: 'Beber água',
  done: true,
  categoryId: 'productivity',
};

describe('HabitItem', () => {
  it('Renderiza o nome do hábito', async () => {
    await render(
      <HabitItem habit={mockHabit} onToggle={jest.fn()} onEdit={jest.fn()} onDelete={jest.fn()} />,
    );

    const element = screen.getByText('Beber água');
    expect(element).toBeTruthy();
  });

  it('Chama onToggle, onEdit e onDelete ao pressionar o item', async () => {
    const onToggle = jest.fn();
    const onEdit = jest.fn();
    const onDelete = jest.fn();

    await render(
      <HabitItem habit={mockHabit} onToggle={onToggle} onEdit={onEdit} onDelete={onDelete} />,
    );

    await fireEvent.press(screen.getByText('Beber água'));
    expect(onToggle).toHaveBeenCalledTimes(1);

    await fireEvent.press(screen.getByLabelText('edit-habit'));
    expect(onEdit).toHaveBeenCalledTimes(1);

    await fireEvent.press(screen.getByLabelText('delete-habit'));
    expect(onDelete).toHaveBeenCalledTimes(1);
  });

  it('Chama onEdit ao pressionar o item', async () => {
    const onEdit = jest.fn();

    await render(
      <HabitItem habit={mockHabit} onToggle={jest.fn()} onEdit={onEdit} onDelete={jest.fn()} />,
    );

    await fireEvent.press(screen.getByLabelText('edit-habit'));
    expect(onEdit).toHaveBeenCalledTimes(1);
  });

  it('Chama onDelete ao pressionar o item', async () => {
    const onDelete = jest.fn();

    await render(
      <HabitItem habit={mockHabit} onToggle={jest.fn()} onEdit={jest.fn()} onDelete={onDelete} />,
    );

    await fireEvent.press(screen.getByLabelText('delete-habit'));
    expect(onDelete).toHaveBeenCalledTimes(1);
  });

  it('Renderiza o nome do hábito com line-through para hábitos concluídos', async () => {
    await render(
      <HabitItem habit={mockHabit} onToggle={jest.fn()} onEdit={jest.fn()} onDelete={jest.fn()} />,
    );

    const element = screen.getByText('Beber água');
    expect(element).toBeChecked();
  });
});
