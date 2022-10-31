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
import { useAppSelector } from '../Store/store';
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
  EditChoreScreen: { id: string };
  StatisticsScreen: undefined;
  ProfileScreen: undefined;
  DetailScreen: undefined;
  DevStartScreen: undefined;
};

const RootStack = createNativeStackNavigator<RootStackParamList>();

export default function RootNavigator({ colorScheme }: { colorScheme: ColorSchemeName }) {
  const user = useAppSelector((state) => state.user.user);
  const activeHouse = useAppSelector((state) => state.household.singleHousehold);
  const homeName: string = activeHouse?.name || 'Household';
  console.log(user);
  return (
    <NavigationContainer theme={getTheme(colorScheme)}>
      <RootStack.Navigator>
        {/* DELETE DEVSTARTSCREEN BEFORE GOING LIVE!!*/}

        {user.uid === '' ? (
          <>
            <RootStack.Screen name='DevStartScreen' component={DevStartScreen} />
            <RootStack.Screen
              name='StartScreen'
              component={StartScreen}
              options={{ title: 'Inloggning' }}
            />
            <RootStack.Screen
              name='RegisterScreen'
              component={RegisterScreen}
              options={{ title: 'Registrera ny användare' }}
            />
          </>
        ) : (
          <>
            <RootStack.Screen
              name='ManagerScreen'
              component={ManagerScreen}
              options={{ title: 'Välj hushåll' }}
            />
            <RootStack.Screen
              name='HomeScreen'
              component={HomeScreen}
              options={{ title: homeName }}
            />
            <RootStack.Screen
              name='ChoreScreen'
              component={ChoreScreen}
              options={{ title: 'Skapa en ny syssla' }}
            />
            <RootStack.Screen
              name='CreateScreen'
              component={CreateScreen}
              options={{ title: '' }}
            />
            <RootStack.Screen
              name='EditChoreScreen'
              component={EditChoreScreen}
              options={{ title: 'Redigera en syssla' }}
            />
            <RootStack.Screen
              name='StatisticsScreen'
              component={StatisticsScreen}
              options={{ title: 'Statistik' }}
            />
            <RootStack.Screen
              name='ProfileScreen'
              component={ProfileScreen}
              options={{ title: 'Skapa en ny profil' }}
            />
            <RootStack.Screen
              name='DetailScreen'
              component={DetailScreen}
              options={{ title: 'Hushållet' }}
            />
          </>
        )}
      </RootStack.Navigator>
    </NavigationContainer>
  );
}
