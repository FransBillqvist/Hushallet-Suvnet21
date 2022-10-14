import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider as ReduxProvider } from 'react-redux';
import RootNavigator from './src/Navigation/RootNavigator';
import { store } from './src/Store/store';

export default function App() {
  return (
    <ReduxProvider store={store}>
      <SafeAreaProvider>
        <StatusBar style='auto' />
        <RootNavigator />
      </SafeAreaProvider>
    </ReduxProvider>
  );
}
