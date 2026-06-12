import { StreakData } from '../../types/streak';
import { getYesterdayKey } from './date';

/**
 * Calcula o novo estado do streak quando o usuário conclui um hábito.
 * Função pura — recebe "today" como parâmetro para facilitar testes.
 *
 * Regras:
 * - lastCompletedDate === today  → já contou hoje, sem mudança.
 * - lastCompletedDate === ontem  → incrementa currentStreak.
 * - qualquer outro caso (null ou mais antigo) → reseta para 1.
 */
export function calculateStreak(current: StreakData, today: string): StreakData {
  const { lastCompletedDate, currentStreak } = current;

  if (lastCompletedDate === today) {
    return current;
  }

  if (lastCompletedDate === getYesterdayKey(today)) {
    return { currentStreak: currentStreak + 1, lastCompletedDate: today };
  }

  return { currentStreak: 1, lastCompletedDate: today };
}

/**
 * Retorna o streak a ser exibido na UI.
 * Mostra o currentStreak salvo apenas se lastCompletedDate for hoje ou ontem;
 * caso contrário retorna 0 (o streak foi quebrado).
 */
export function getDisplayStreak(streakData: StreakData, today: string): number {
  const { lastCompletedDate, currentStreak } = streakData;

  if (lastCompletedDate === today || lastCompletedDate === getYesterdayKey(today)) {
    return currentStreak;
  }

  return 0;
}
