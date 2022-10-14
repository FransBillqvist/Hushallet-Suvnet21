import { StatusBar } from 'expo-status-bar';
import { NativeBaseProvider } from 'native-base';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider as ReduxProvider } from 'react-redux';
import RootNavigator from './src/Navigation/RootNavigator';
import { store } from './src/Store/store';

export default function App() {
  return (
    <SafeAreaProvider>
      <NativeBaseProvider>
        <ReduxProvider store={store}>
          <StatusBar style='auto' />
          <RootNavigator />
        </ReduxProvider>
      </NativeBaseProvider>
    </SafeAreaProvider>
  );
}
