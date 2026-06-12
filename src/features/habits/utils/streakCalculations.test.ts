import { calculateStreak, getDisplayStreak } from './streakCalculations';
import { StreakData } from '../../types/streak';

const TODAY = '2026-06-11';
const YESTERDAY = '2026-06-10';
const TWO_DAYS_AGO = '2026-06-09';

describe('calculateStreak', () => {
  it('inicia streak em 1 quando lastCompletedDate é null', () => {
    const initial: StreakData = { currentStreak: 0, lastCompletedDate: null };
    const result = calculateStreak(initial, TODAY);
    expect(result).toEqual({ currentStreak: 1, lastCompletedDate: TODAY });
  });

  it('incrementa streak quando lastCompletedDate foi ontem', () => {
    const data: StreakData = { currentStreak: 5, lastCompletedDate: YESTERDAY };
    const result = calculateStreak(data, TODAY);
    expect(result).toEqual({ currentStreak: 6, lastCompletedDate: TODAY });
  });

  it('não muda nada quando lastCompletedDate já é hoje', () => {
    const data: StreakData = { currentStreak: 3, lastCompletedDate: TODAY };
    const result = calculateStreak(data, TODAY);
    expect(result).toBe(data);
  });

  it('reseta para 1 quando lastCompletedDate foi há mais de 1 dia', () => {
    const data: StreakData = { currentStreak: 10, lastCompletedDate: TWO_DAYS_AGO };
    const result = calculateStreak(data, TODAY);
    expect(result).toEqual({ currentStreak: 1, lastCompletedDate: TODAY });
  });

  it('reseta para 1 quando lastCompletedDate é uma data muito antiga', () => {
    const data: StreakData = { currentStreak: 99, lastCompletedDate: '2024-01-01' };
    const result = calculateStreak(data, TODAY);
    expect(result).toEqual({ currentStreak: 1, lastCompletedDate: TODAY });
  });
});

describe('getDisplayStreak', () => {
  it('retorna currentStreak quando lastCompletedDate é hoje', () => {
    const data: StreakData = { currentStreak: 7, lastCompletedDate: TODAY };
    expect(getDisplayStreak(data, TODAY)).toBe(7);
  });

  it('retorna currentStreak quando lastCompletedDate foi ontem', () => {
    const data: StreakData = { currentStreak: 4, lastCompletedDate: YESTERDAY };
    expect(getDisplayStreak(data, TODAY)).toBe(4);
  });

  it('retorna 0 quando lastCompletedDate foi há mais de 1 dia', () => {
    const data: StreakData = { currentStreak: 12, lastCompletedDate: TWO_DAYS_AGO };
    expect(getDisplayStreak(data, TODAY)).toBe(0);
  });

  it('retorna 0 quando lastCompletedDate é null', () => {
    const data: StreakData = { currentStreak: 0, lastCompletedDate: null };
    expect(getDisplayStreak(data, TODAY)).toBe(0);
  });

  it('retorna 0 quando currentStreak é 0 e não há data', () => {
    const data: StreakData = { currentStreak: 0, lastCompletedDate: null };
    expect(getDisplayStreak(data, TODAY)).toBe(0);
  });
});
