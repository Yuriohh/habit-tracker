import { toDateKey, getYesterdayKey } from './date';

describe('toDateKey', () => {
  it('formata data simples corretamente', () => {
    const date = new Date(2026, 5, 11); // 11 de junho de 2026 (mês base 0)
    expect(toDateKey(date)).toBe('2026-06-11');
  });

  it('adiciona zero à esquerda em mês e dia de um dígito', () => {
    const date = new Date(2026, 0, 5); // 5 de janeiro de 2026
    expect(toDateKey(date)).toBe('2026-01-05');
  });

  it('trata virada de ano corretamente', () => {
    const date = new Date(2026, 11, 31); // 31 de dezembro de 2026
    expect(toDateKey(date)).toBe('2026-12-31');
  });
});

describe('getYesterdayKey', () => {
  it('retorna o dia anterior corretamente', () => {
    expect(getYesterdayKey('2026-06-11')).toBe('2026-06-10');
  });

  it('volta para o mês anterior na virada de mês', () => {
    expect(getYesterdayKey('2026-03-01')).toBe('2026-02-28');
  });

  it('volta para o ano anterior na virada de ano', () => {
    expect(getYesterdayKey('2026-01-01')).toBe('2025-12-31');
  });

  it('lida com meses de 31 dias', () => {
    expect(getYesterdayKey('2026-08-01')).toBe('2026-07-31');
  });
});
