import { StatusBar } from 'expo-status-bar';
import { NativeBaseProvider } from 'native-base';
import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider as ReduxProvider } from 'react-redux';
import useColorScheme from './src/Hooks/useColorScheme';
import RootNavigator from './src/Navigation/RootNavigator';
import { store } from './src/Store/store';

export default function App() {
  const colorScheme = useColorScheme();

  return (
    <SafeAreaProvider>
      <NativeBaseProvider>
        <ReduxProvider store={store}>
          <PaperProvider>
            <StatusBar style='auto' />
            <RootNavigator colorScheme={colorScheme} />
          </PaperProvider>
        </ReduxProvider>
      </NativeBaseProvider>
    </SafeAreaProvider>
  );
}
