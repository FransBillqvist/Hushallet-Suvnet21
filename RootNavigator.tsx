import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import HomeScreen from './HomeScreen';
import HouseholdScreen from './HouseholdScreen';
import LoginScreen from './LoginScreen';

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

export type RootStackParamList = {
  HomeScreen: undefined;
  HouseholdScreen: undefined;
  LoginScreen: undefined;
};

const RootStack = createNativeStackNavigator<RootStackParamList>();

export default function RootNavigator() {
  return (
    <NavigationContainer>
      <RootStack.Navigator>
        <RootStack.Screen name='LoginScreen' component={LoginScreen} />
        <RootStack.Screen name='HomeScreen' component={HomeScreen} />
        <RootStack.Screen name='HouseholdScreen' component={HouseholdScreen} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
}
