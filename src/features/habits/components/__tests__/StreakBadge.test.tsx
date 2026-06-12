import { render, screen } from '@testing-library/react-native';
import { StreakBadge } from '../StreakBadge';

describe('StreakBadge', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('exibe o número do streak', async () => {
    await render(<StreakBadge streak={5} />);
    expect(screen.getByText('5')).toBeTruthy();
  });

  it('exibe o ícone de fogo', async () => {
    await render(<StreakBadge streak={3} />);
    expect(screen.getByText('🔥')).toBeTruthy();
  });

  it('exibe streak zero corretamente', async () => {
    await render(<StreakBadge streak={0} />);
    expect(screen.getByText('0')).toBeTruthy();
  });

  it('exibe streak de dois dígitos', async () => {
    await render(<StreakBadge streak={42} />);
    expect(screen.getByText('42')).toBeTruthy();
  });
});
