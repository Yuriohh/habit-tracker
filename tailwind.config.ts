import { colors } from './src/shared/theme';

// Tokens de theme.ts são números (px no React Native). O NativeWind os
// interpreta como pixels; os tipos do Tailwind esperam string, por isso o
// config não usa `satisfies Config` — os valores são repassados verbatim.
export default {
  content: ['./App.tsx', './src/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors,
    },
  },
  plugins: [],
};
