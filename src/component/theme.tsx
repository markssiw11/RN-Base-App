import React, { ReactNode } from 'react';
import { ViewStyle, TextStyle, ImageStyle } from 'react-native';
import {
  createTheme,
  createText,
  createBox,
  useTheme as useReTheme,
  ThemeProvider as ReStyleThemeProvider,
} from '@shopify/restyle';

export const pallette = {
  white: 'white',
};

export const theme = createTheme({
  colors: {
    primary: '#09a505',
    primaryLight: '#5D9800',
    primaryDark: '#2A593F',
    lightBlue: '#BFEAF5',
    secondary: '#25509E',
    danger: '#FF0058',
    orange: '#FFA800',
    orangeLight: 'rgba(255, 168, 0,  0.2)',
    yellow: '#FAD618',
    purple: '#4024A2',
    title: '#0C0D34',
    text: 'rgba(12, 13,52,  0.7)',
    grey: 'rgba(12, 13,52,  0.05)',
    darkGrey: '#808080',
    border: '#E4E4E4',
    background: '#F1F2F6',
    white: '#ffffff',
  },
  spacing: {
    z: 0,
    s: 8,
    m: 16,
    l: 24,
    xl: 40,
    xxl: 60,
  },
  button: {
    s: 20,
    m: 32,
    l: 48,
    xl: 60,
  },
  borderRadii: {
    s: 4,
    m: 10,
    l: 25,
    ml: 50,
    xl: 75,
    xxl: 100,
  },
  textVariants: {
    title1: {
      fontSize: 28,
      fontFamily: 'SFProDisplay-Medium',
      color: 'text',
    },
    title2: {
      fontSize: 20,
      lineHeight: 30,
      fontFamily: 'SFProDisplay-Medium',
      color: 'white'
    },
    title3Primary: {
      fontSize: 16,
      fontFamily: 'SFProDisplay-Medium',
      color: 'primary',
    },
    title3: {
      fontSize: 16,
      fontFamily: 'SFProDisplay-Medium',
      color: 'text',
    },
    popupTitle: {
      fontSize: 17,
      fontFamily: 'SFProDisplay-Medium',
    },
    body: {
      fontSize: 16,
      lineHeight: 24,
      fontFamily: 'SFProDisplay-Regular',
      color: 'text',
    },
    button: {
      fontSize: 15,
      fontFamily: 'SFProDisplay-Medium',
      color: 'text',
      textAlign: 'center',
    },
    header: {
      fontsize: 18,
      lineHeight: 24,
      fontFamily: 'SFProDisplay-Bold',
      color: 'background',
    },
    information: {
      fontSize: 14,
      fontFamily: 'SFProDisplay-Regular',
      color: 'text',
    },
    warning: {
      fontSize: 13,
      fontFamily: 'SFProDisplay-Regular',
      color: 'danger',
      marginLeft: "s"
    },
    required: {
      color: 'danger',
    },
    buttonWhite: {
      fontSize: 15,
      fontFamily: 'SFProDisplay-Medium',
      color: 'white',
      textAlign: 'center',
    },
  },
  breakpoints: {},
});

export const ThemeProvider = ({ children }: { children: ReactNode }) => (
  <ReStyleThemeProvider {...{ theme }}>{children}</ReStyleThemeProvider>
);

export type Theme = typeof theme;

export const Box = createBox<Theme>();
export const Text = createText<Theme>();
export const useTheme = () => useReTheme<Theme>();

type NamedStyles<T> = { [P in keyof T]: ViewStyle | TextStyle | ImageStyle };
export const makeStyles = <T extends NamedStyles<T>>(styles: (theme: Theme) => T) => () => {
  const currentTheme = useTheme();
  return styles(currentTheme);
};
