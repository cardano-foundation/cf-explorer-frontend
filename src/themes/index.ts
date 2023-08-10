import { Components, Theme, createTheme } from "@mui/material";

import { ThemeType } from "../types/user";
import breakpoints from "./breakpoints";
import palette, { CustomPalette } from "./palette";
import shadows from "./shadows";
import typography from "./typography";

type CustomTheme = {
  palette: CustomPalette;
  shadow: typeof shadows.light;
  typography: typeof typography;
  breakpoints: typeof breakpoints;
  mode: ThemeType;
  isDark: boolean;
  components: Components<Omit<Theme, "components">>;
};

const theme = createTheme({
  palette: palette.light,
  shadow: shadows.light,
  typography: typography,
  breakpoints: breakpoints,
  mode: "light",
  isDark: false
});

const lightTheme: CustomTheme = {
  palette: palette.light,
  shadow: shadows.light,
  typography: typography,
  breakpoints: breakpoints,
  mode: "light",
  isDark: false,
  components: {
    MuiContainer: {
      styleOverrides: {
        maxWidthLg: {
          [theme.breakpoints.up("xl")]: {
            maxWidth: 2030
          }
        }
      }
    }
  }
};

const darkTheme: CustomTheme = {
  ...lightTheme,
  mode: "dark",
  isDark: false
};
declare module "@mui/material" {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface Theme extends CustomTheme {
    palette: CustomPalette;
    shadow: typeof shadows.light;
    typography: typeof typography;
    mode: ThemeType;
    isDark: boolean;
  }
  interface BreakpointOverrides {
    xs: true;
    sm: true;
    md: true;
    lg: true;
    xl: true;
    laptop: true;
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface ThemeOptions extends CustomTheme {}
}

declare module "@emotion/react" {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface Theme extends CustomTheme {}
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface ThemeOptions extends CustomTheme {}
}

const light = createTheme(lightTheme);
const dark = createTheme(darkTheme);

const themes: { [key in ThemeType]: typeof light } = {
  light,
  dark
};

export default themes;
