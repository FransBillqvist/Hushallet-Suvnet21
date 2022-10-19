import {
  DarkTheme as NavDarkTheme,
  DefaultTheme as NavLightTheme,
  Theme as NavTheme,
} from '@react-navigation/native';
import { ColorSchemeName } from 'react-native';
import {
  MD3DarkTheme as PaperDarkTheme,
  MD3LightTheme as PaperLightTheme,
  Theme as PaperTheme,
} from 'react-native-paper';

type Theme = NavTheme & PaperTheme;

export const lightTheme: Theme = {
  ...PaperLightTheme,
  ...NavLightTheme,
  colors: {
    ...PaperLightTheme.colors,
    ...NavLightTheme.colors,
    primary: 'yellow',
    secondary: 'green',
  },
};

export const darkTheme: Theme = {
  ...PaperDarkTheme,
  ...NavDarkTheme,
  colors: {
    ...PaperDarkTheme.colors,
    ...NavDarkTheme.colors,
    primary: 'green',
    secondary: 'yellow',
  },
};

export function getTheme(scheme: ColorSchemeName) {
  return scheme === 'dark' ? darkTheme : lightTheme;
}
