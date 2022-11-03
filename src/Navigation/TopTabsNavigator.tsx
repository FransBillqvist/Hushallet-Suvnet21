import {
  createMaterialTopTabNavigator,
  MaterialTopTabBarProps,
} from '@react-navigation/material-top-tabs';
import React from 'react';
import { View } from 'react-native';
import { IconButton, Text } from 'react-native-paper';
import HomeScreen from '../Screens/HomeScreen';
import StatisticsScreen from '../Screens/StatisticsScreen';

export type TopTabsParamList = {
  TodayScreen: undefined;
  StatisticsScreen: undefined;
};

const Tab = createMaterialTopTabNavigator<TopTabsParamList>();

export function TopTabsNavigator() {
  return (
    <Tab.Navigator tabBar={CustomTabBar}>
      <Tab.Screen name='TodayScreen' component={HomeScreen} options={{ title: 'Idag' }} />
      <Tab.Screen
        name='StatisticsScreen'
        component={StatisticsScreen}
        options={{ title: 'Denna veckan' }}
      />
    </Tab.Navigator>
  );
}

const CustomTabBar = (props: MaterialTopTabBarProps) => {
  const { index, routeNames } = props.state;

  const prevScreen = routeNames[index - 1];
  const nextScreen = routeNames[index + 1];

  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'white',
      }}
    >
      <IconButton
        style={prevScreen ? {} : { opacity: 0 }}
        icon={'chevron-left'}
        onPress={() => {
          if (prevScreen) props.navigation.navigate(prevScreen);
        }}
      />
      <Text variant='titleMedium'>
        {props.descriptors[props.state.routes[index].key].options.title}
      </Text>
      <IconButton
        style={nextScreen ? {} : { opacity: 0 }}
        icon={'chevron-right'}
        onPress={() => {
          if (nextScreen) props.navigation.navigate(nextScreen);
        }}
      />
    </View>
  );
};
