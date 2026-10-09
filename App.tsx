import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ThemeProvider } from './src/context/ThemeContext';
import { LanguageProvider } from './src/context/LanguageContext';
import { TodoListScreen } from './src/screens/TodoListScreen';

export default function App() {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <LanguageProvider>
          <TodoListScreen />
          <StatusBar style="auto" />
        </LanguageProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
