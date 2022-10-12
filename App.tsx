import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import RootNavigator from './Navigation/RootNavigator';

export default function App() {
  return (
    <SafeAreaProvider>
      <StatusBar style='auto' />
      <RootNavigator />
    </SafeAreaProvider>
  );
}
