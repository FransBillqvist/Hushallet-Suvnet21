import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider as ReduxProvider } from 'react-redux';
import { getTheme } from './src/Components/theme';
import useColorScheme from './src/Hooks/useColorScheme';
import RootNavigator from './src/Navigation/RootNavigator';
import { store } from './src/Store/store';

export default function App() {
  const colorScheme = useColorScheme();

  return (
    <SafeAreaProvider>
      <ReduxProvider store={store}>
        <PaperProvider theme={getTheme(colorScheme)}>
          <StatusBar style='auto' />
          <RootNavigator colorScheme={colorScheme} />
        </PaperProvider>
      </ReduxProvider>
    </SafeAreaProvider>
  );
}
