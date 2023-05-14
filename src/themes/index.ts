import { createTheme } from '@mui/material';
import { ThemeType } from '../types/user';
import breakpoints from './breakpoints';
import palette, { CustomPalette } from './palette';
import shadows from './shadows';
import typography from './typography';

export type CustomTheme = {
  palette: CustomPalette;
  shadow: typeof shadows.light;
  typography: typeof typography;
  breakpoints: typeof breakpoints;
  mode: ThemeType;
  isDark: boolean;
};

const lightTheme: CustomTheme = {
  palette: palette.light,
  shadow: shadows.light,
  typography: typography,
  breakpoints: breakpoints,
  mode: 'light',
  isDark: false
};

const darkTheme: CustomTheme = {
  palette: palette.light,
  shadow: shadows.light,
  typography: typography,
  breakpoints: breakpoints,
  mode: 'dark',
  isDark: false
};

declare module '@mui/material' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface Theme extends CustomTheme {
    palette: CustomPalette;
    shadow: typeof shadows.light;
    typography: typeof typography;
    mode: ThemeType;
    isDark: boolean;
  }
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface ThemeOptions extends CustomTheme {}
}
/* eslint-disable @typescript-eslint/no-empty-interface */
declare module '@emotion/react' {
  interface Theme extends CustomTheme {}
  interface ThemeOptions extends CustomTheme {}
}

const light = createTheme(lightTheme);
const dark = createTheme(darkTheme);

const themes: { [key in ThemeType]: typeof light } = {
  light,
  dark
};

export default themes;
