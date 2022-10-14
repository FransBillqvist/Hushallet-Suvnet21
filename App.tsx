import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import RootNavigator from './src/Navigation/RootNavigator';
import { NativeBaseProvider } from 'native-base';

export default function App() {
  return (
    <NativeBaseProvider>
      <SafeAreaProvider>
        <StatusBar style='auto' />
        <RootNavigator />
      </SafeAreaProvider>
    </NativeBaseProvider>
  );
}
