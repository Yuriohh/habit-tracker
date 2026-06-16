import { fireEvent, render, screen } from '@testing-library/react-native';
import React from 'react';
import { CategoryBadge } from '../CategoryBadge';

describe('CategoryBadge', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renderiza o label corretamente', async () => {
    await render(<CategoryBadge label="Saúde" selected={false} onPress={jest.fn()} />);

    expect(screen.getByText('Saúde')).toBeTruthy();
  });

  it('chama onPress ao ser pressionado', async () => {
    const onPress = jest.fn();
    await render(<CategoryBadge label="Saúde" selected={false} onPress={onPress} />);

    await fireEvent.press(screen.getByLabelText('category-Saúde'));

    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('aplica cor de destaque quando selecionado', async () => {
    await render(<CategoryBadge label="Saúde" selected={true} onPress={jest.fn()} />);

    const badge = screen.getByLabelText('category-Saúde');
    expect(badge).toBeSelected();
  });

  it('aplica cor neutra quando não selecionado', async () => {
    await render(<CategoryBadge label="Saúde" selected={false} onPress={jest.fn()} />);

    const badge = screen.getByLabelText('category-Saúde');
    expect(badge).not.toBeSelected();
  });
});
