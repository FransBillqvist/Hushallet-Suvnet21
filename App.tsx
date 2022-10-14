import { StatusBar } from 'expo-status-bar';
import { NativeBaseProvider } from 'native-base';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import useColorScheme from './src/Hooks/useColorScheme';
import RootNavigator from './src/Navigation/RootNavigator';

export default function App() {
  const colorScheme = useColorScheme();

  return (
    <NativeBaseProvider>
      <SafeAreaProvider>
        <StatusBar />
        <RootNavigator colorScheme={colorScheme} />
      </SafeAreaProvider>
    </NativeBaseProvider>
  );
}
