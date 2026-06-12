import { createStaticNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HabitFormScreen } from './src/features/habits/screens/HabitFormScreen';
import { HomeScreen } from './src/features/habits/screens/HomeScreen';
import { ProgressScreen } from './src/features/habits/screens/ProgressScreen';

const RootStack = createNativeStackNavigator({
  initialRouteName: 'Home',
  screens: {
    Home: HomeScreen,
    AddHabit: { screen: HabitFormScreen, options: { title: 'Adicionar Habito' } },
    EditHabit: { screen: HabitFormScreen, options: { title: 'Editar Habito' } },
    Progress: ProgressScreen,
  },
  screenOptions: {
    headerShown: false,
  },
});

const Navigation = createStaticNavigation(RootStack);

export default function App() {
  return <Navigation />;
}
