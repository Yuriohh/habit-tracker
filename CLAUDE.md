@AGENTS.md

# Habit Tracker

App de rastreamento de hábitos em React Native com Expo

## Comandos

- `yarn start` - inicia o app
- `yarn test` - roda os testes um vez
- `yarn test:watch` - roda os testes em modo watch

## Stack

- React Native + Expo SDK 56
- TypeScript
- Zustand (estado global com persistência via AsyncStorage)
- React Navigation (native stack)
- Jest + @testing-library/react-native (testes)

## Estrutura de pastas

src/features/habits/components #componentes da feature
src/features/habits/screens #telas da feature
src/features/habits/hooks #hooks da feature
src/features/habits/types #tipos Typescript da feature
src/shared/components #componentes reutilizaveis (Button, etc...)
src/shared/theme.ts #tokens de design (colors, spacing, radios, font)
src/shared/types #tipos globais

## Convenções

- Novos Components -> `src/features/<feature>/components`
- Novos hooks -> `src/features/<feature>/hooks`
- Novas telas -> `src/features/<feature>/screens`
- Sempre usar `useShallow` ao selecionar múltiplos valores do Zustand
- Separar tipos de estado e ações no Zustand (`HabitsState`, `HabitsActions`)
- Funções puras de cálculo -> `src/features/<feature>/utils`

## Testes

- Funções puras -> testes unitários em -> `utils/*.test.ts`
- Componentes -> testes em -> `components/*.test.tsx`
- Mockar navegação com `jest.mock('@react-navigation/native')`
- Usar `jest.clearAllMocks()` no `beforeEach`

## Design

- Dark mode com paleta definida em `src/shared/theme.ts`
- Nunca usar cores hardcoded - sempre usar tokens do theme
- Componente `Button` aceita variants: `primary`, `ghost`, `destructive`
