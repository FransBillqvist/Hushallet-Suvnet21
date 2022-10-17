import { StatusBar } from 'expo-status-bar';
import { NativeBaseProvider } from 'native-base';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import useColorScheme from './src/Hooks/useColorScheme';
import { Provider as ReduxProvider } from 'react-redux';
import RootNavigator from './src/Navigation/RootNavigator';
import { store } from './src/Store/store';

export default function App() {
  const colorScheme = useColorScheme();

  return (
    <SafeAreaProvider>
      <NativeBaseProvider>
        <ReduxProvider store={store}>
          <StatusBar style='auto' />
          <RootNavigator colorScheme={colorScheme} />
        </ReduxProvider>
      </NativeBaseProvider>
    </SafeAreaProvider>
  );
}
