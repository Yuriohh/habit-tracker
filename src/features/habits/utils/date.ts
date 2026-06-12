/**
 * Converte uma Date para chave de dia no formato YYYY-MM-DD (horário local).
 * Função pura — testável sem mockar o relógio.
 */
export function toDateKey(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/**
 * Retorna a chave do dia de hoje (YYYY-MM-DD, horário local).
 */
export function getTodayKey(): string {
  return toDateKey(new Date());
}

/**
 * Dado um todayKey no formato YYYY-MM-DD, retorna a chave do dia anterior.
 */
export function getYesterdayKey(todayKey: string): string {
  const [year, month, day] = todayKey.split('-').map(Number);
  const d = new Date(year, month - 1, day);
  d.setDate(d.getDate() - 1);
  return toDateKey(d);
}
