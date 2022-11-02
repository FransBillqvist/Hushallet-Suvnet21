import { createMaterialTopTabNavigator, MaterialTopTabBarProps } from '@react-navigation/material-top-tabs';
import React from 'react';
import StatisticsScreen from '../Screens/StatisticsScreen';
import HomeScreen from '../Screens/HomeScreen';
import { View, Text } from 'react-native';

export type TopTabsParamList = {
  TodayScreen: undefined;
  StatisticsScreen: undefined;
}

const Tab = createMaterialTopTabNavigator<TopTabsParamList>();

export function TopTabsNavigator() {
  return (
    <Tab.Navigator tabBar={CustomTabBar}>
      <Tab.Screen name="TodayScreen" component={HomeScreen} options={{ title: 'Idag' }}/>
      <Tab.Screen
        name='StatisticsScreen'
        component={StatisticsScreen}
        options={{ title: 'Denna veckan' }}
      />
    </Tab.Navigator>
  );
}


const CustomTabBar = (props: MaterialTopTabBarProps) => {
  const {index, routeNames, routes } = props.state;

  // props.descriptors[0].options.title

  
  const prevScreen = routeNames[index-1]
  const currentScreen = routeNames[index];
  const nextScreen = routeNames[index+1];
  
  // props.jumpTo(prevScreen);
  // props.jumpTo(nextScreen);

  return (
    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
      <Text>{"<"}</Text>
      <Text>{currentScreen}</Text>
      <Text>{">"}</Text>
    </View>
  )
}

