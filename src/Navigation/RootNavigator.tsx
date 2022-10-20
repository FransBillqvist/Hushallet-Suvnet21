import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { ColorSchemeName } from 'react-native';
import { getTheme } from '../Components/theme';
import ChoreScreen from '../Screens/ChoreScreen';
import CreateScreen from '../Screens/CreateScreen';
import DetailScreen from '../Screens/DetailScreen';
import DevStartScreen from '../Screens/DevStartScreen';
import EditChoreScreen from '../Screens/EditChoreScreen';
import HomeScreen from '../Screens/HomeScreen';
import ManagerScreen from '../Screens/ManagerScreen';
import ProfileScreen from '../Screens/ProfileScreen';
import RegisterScreen from '../Screens/RegisterScreen';
import StartScreen from '../Screens/StartScreen';
import StatisticsScreen from '../Screens/StatisticsScreen';
// import { useAppSelector } from "../Store/store";

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

export type RootStackParamList = {
  HomeScreen: undefined;
  ManagerScreen: undefined;
  StartScreen: undefined;
  RegisterScreen: undefined;
  ChoreScreen: undefined;
  CreateScreen: undefined;
  EditChoreScreen: undefined;
  StatisticsScreen: undefined;
  ProfileScreen: undefined;
  DetailScreen: undefined;
  DevStartScreen: undefined;
};

const RootStack = createNativeStackNavigator<RootStackParamList>();

export default function RootNavigator({ colorScheme }: { colorScheme: ColorSchemeName }) {
  // const user = useAppSelector((state) => state.user.user)
  return (
    <NavigationContainer theme={getTheme(colorScheme)}>
      <RootStack.Navigator>
        {/* DELETE DEVSTARTSCREEN BEFORE GOING LIVE!!*/}

        {/* {!user ? ( */}
          {/* <> */}
          <RootStack.Screen name='DevStartScreen' component={DevStartScreen} />
          <RootStack.Screen name='StartScreen' component={StartScreen} />
          <RootStack.Screen name='RegisterScreen' component={RegisterScreen} />
        {/* </> */}
        {/* ) : ( */}
          {/* <> */}
          <RootStack.Screen name='HomeScreen' component={HomeScreen} />
          <RootStack.Screen name='ManagerScreen' component={ManagerScreen} />
          <RootStack.Screen name='ChoreScreen' component={ChoreScreen} />
          <RootStack.Screen name='CreateScreen' component={CreateScreen} />
          <RootStack.Screen name='StatisticsScreen' component={StatisticsScreen} />
          <RootStack.Screen name='ProfileScreen' component={ProfileScreen} />
          <RootStack.Screen name='DetailScreen' component={DetailScreen} />
          {/* </> */}
          {/* )} */}
      </RootStack.Navigator>
    </NavigationContainer>
  );
}
