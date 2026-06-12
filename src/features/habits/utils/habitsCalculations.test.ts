import { calculateStats, getHabitsByCategory } from "./habitsCalculations"

describe('calculateStats', () => {
  it('retorna zeros quando não há hábitos', () => {
    const result = calculateStats([])
    expect(result).toEqual({total: 0, done: 0, progress: 0})
  })

  it('calcula corretamente com hábitos mistos', () => {
    const habits = [
      { id: '1', name: 'Test Habit 1', done: true, categoryId: 'health' },
      { id: '2', name: 'Test Habit 2', done: false, categoryId: 'health' },
      { id: '3', name: 'Test Habit 3', done: true, categoryId: 'study' },
    ]

    const result = calculateStats(habits)
    expect(result).toEqual({total: 3, done: 2, progress: 67})
  })

  it('retorna 100% quando todos hábitos forem concluidos', () => {
    const result = calculateStats([
      { id: '1', name: 'Test', done: true, categoryId: 'health' },
      { id: '2', name: 'Test', done: true, categoryId: 'health' },
    ])
    expect(result.progress).toBe(100)
  })

  it('retorna 0% quando nenhum hábito for concluido', () => {
    const result = calculateStats([
      { id: '1', name: 'Test', done: false, categoryId: 'health' },
      { id: '2', name: 'Test', done: false, categoryId: 'health' },
    ])
    expect(result.progress).toBe(0)
  })

  it('retorna calculo arredondado para progress, ex: 33$ não 33,33$', () => {
    const result = calculateStats([
      { id: '1', name: 'Test', done: true, categoryId: 'health' },
      { id: '2', name: 'Test', done: false, categoryId: 'health' },
      { id: '3', name: 'Test', done: false, categoryId: 'health' },
    ])
    expect(result.progress).toBe(33)
  })
})

describe('getHabitsByCategory', () => {
  const habits = [
    { id: '1', name: 'Beber água', done: false, categoryId: 'health' },
    { id: '2', name: 'Meditar', done: false, categoryId: 'health' },
    { id: '3', name: 'Ler livro', done: false, categoryId: 'study' },
    { id: '4', name: 'Organizar tarefas', done: false, categoryId: 'productivity' },
  ]

  it('retorna apenas os hábitos da categoria selecionada', () => {
    const result = getHabitsByCategory(habits, 'health')
    expect(result).toHaveLength(2)
    expect(result.every((h) => h.categoryId === 'health')).toBe(true)
  })

  it('retorna lista vazia quando não há hábitos na categoria', () => {
    const result = getHabitsByCategory(habits, 'nonexistent')
    expect(result).toHaveLength(0)
  })

  it('retorna lista vazia quando a lista de hábitos está vazia', () => {
    const result = getHabitsByCategory([], 'health')
    expect(result).toHaveLength(0)
  })

  it('retorna hábito único quando só um pertence à categoria', () => {
    const result = getHabitsByCategory(habits, 'study')
    expect(result).toHaveLength(1)
    expect(result[0].id).toBe('3')
  })
})
