import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { ColorSchemeName, Text } from 'react-native';
import { getTheme } from '../Components/theme';
import ChoreScreen from '../Screens/ChoreScreen';
import CreateScreen from '../Screens/CreateScreen';
import DetailScreen from '../Screens/DetailScreen';
import EditChoreScreen from '../Screens/EditChoreScreen';
import ManagerScreen from '../Screens/ManagerScreen';
import ProfileScreen from '../Screens/ProfileScreen';
import RegisterScreen from '../Screens/RegisterScreen';
import StartScreen from '../Screens/StartScreen';
import { useAppSelector } from '../Store/store';
import { TopTabsNavigator } from './TopTabsNavigator';

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
  ProfileScreen: undefined;
  DetailScreen: undefined;
};

const RootStack = createNativeStackNavigator<RootStackParamList>();

export default function RootNavigator({ colorScheme }: { colorScheme: ColorSchemeName }) {
  const user = useAppSelector((state) => state.user.user);
  const activeHouse = useAppSelector((state) => state.household.singleHousehold);
  const homeName: string = activeHouse?.name || 'Household';
  const currentAvatar = useAppSelector((state) => state.profile.currentProfile.avatar);
  return (
    <NavigationContainer theme={getTheme(colorScheme)}>
      <RootStack.Navigator>
        {user.uid === '' ? (
          <>
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
              component={TopTabsNavigator}
              options={{ title: homeName, headerRight: () => <Text>{currentAvatar}</Text> }}
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
