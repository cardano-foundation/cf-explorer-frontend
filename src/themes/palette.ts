import { alpha } from "@mui/material";

import { ThemeType } from "../types/user";

export const createGradient = (deg: number, startColor: string, endColor: string, start = 0, end = 100): string => {
  return `linear-gradient(${deg}deg, ${startColor} ${start}%, ${endColor} ${end}%)`;
};

const GREEN = {
  100: "#53A57B",
  200: "#146635",
  100_10: "#D6E2FF",
  200_10: alpha("#146635", 0.1),
  200_15: alpha("#146635", 0.15),
  200_30: alpha("#146635", 0.3),
  300: "#184c78",
  300_10: alpha("#184c78", 0.1),
  300_20: alpha("#184c78", 0.2)
};

const COMMON = {
  black: "#000000",
  white: "#FFFFFF"
};

const GREY = {
  50: "#F7F7F7",
  80: "#F4F4F4",
  100: "#F2F2F2",
  200: "#E3E5E9",
  300: "#50596D",
  400: "#141520",
  500: "#F6F6F6",
  A100: "#A3A3A3",
  A200: "#E7E8E9",
  A400: "#B7B7B7"
};

const RED = {
  100: "#B60000",
  100_15: alpha("#B60000", 0.15),
  100_20: alpha("#B60000", 0.2)
};

const YELLOW = {
  100: "#7A501D",
  100_15: alpha("#7A501D", 0.15)
};

const BLUE = {
  100: "#0048DB",
  100_7: alpha("#0048DB", 0.07),
  100_10: alpha("#0048DB", 0.1),
  100_15: alpha("#0048DB", 0.15),
  100_20: alpha("#0048DB", 0.2),
  200: "#78BBF2",
  300: "#5DA2DC",
  400: "#4084BD",
  500: "#3272A8",
  600: "#256289",
  700: "#154666",
  800: "#0052CC",
  800_7: alpha("#0052CC", 0.07),
  800_20: alpha("#0052CC", 0.2)
};

const PURPLE = {
  100: "#E3E2FC",
  200: "#6866D4"
};

const primary = {
  light: GREEN[100],
  main: GREEN[200],
  dark: GREEN[200],
  contrastText: COMMON.white
};

const secondary = {
  light: BLUE[100_7],
  main: BLUE[100],
  dark: GREY[300],
  contrastText: COMMON.white
};

const text = {
  primary: GREY[400],
  secondary: GREY[300],
  disabled: alpha(GREY[300], 0.4),
  hint: GREY[300],
  dark: COMMON.black
};

const border = {
  primary: "#E3E5E9",
  secondary: GREEN[300_10],
  main: GREY[200],
  disabled: GREY[300],
  hint: "#C8CDD8",
  block: "#438F68",
  line: alpha(COMMON.black, 0.1)
};
const background = {
  paper: COMMON.white,
  default: GREY[50],
  neutral: GREY["A200"]
};

const error = {
  light: RED[100_15],
  main: RED[100],
  dark: RED[100],
  contrastText: COMMON.white
};
const warning = {
  light: YELLOW[100_15],
  main: YELLOW[100],
  dark: YELLOW[100],
  contrastText: COMMON.white
};

const info = {
  light: BLUE[100_20],
  main: BLUE[100],
  dark: BLUE[100],
  contrastText: COMMON.white
};

const success = {
  light: GREEN[200_15],
  main: GREEN[200],
  dark: GREEN[200],
  contrastText: COMMON.white
};

const GRADIENTS = {
  0: "linear-gradient(263.55deg, #5A9C56 0%, #184C78 100%)",
  1: "linear-gradient(0deg, #5A9C56 0%, #184C78 100%)",
  2: "linear-gradient(90deg, #2193B0 0%, #6DD5ED 100%)",
  3: "linear-gradient(90deg, #4776E6 0%, #8E54E9 100%)",
  4: "linear-gradient(90deg, #E65C00 0%, #F9D423 100%)",
  5: "linear-gradient(90deg, #A770EF 0%, #CF8BF3 37.85%, #FDB99B 100%)",
  6: "linear-gradient(90deg, #F2709C 0%, #FF9472 100%)",
  7: "linear-gradient(90deg, #8E9EAB 0%, #EEF2F3 100%)",
  8: "linear-gradient(0deg, #FFFFFF00 0%, #FFFFFF40 50%, #FFFFFF00 100%)",
  9: "linear-gradient(52.78deg, #5A9C56 20.64%, #184C78 73.83%)"
};

const customPalette = {
  common: COMMON,
  primary,
  secondary,
  error,
  warning,
  info,
  success,
  grey: GREY,
  text,
  background,
  green: GREEN,
  blue: BLUE,
  red: RED,
  yellow: YELLOW,
  purple: PURPLE,
  gradient: GRADIENTS,
  border
};

export type CustomPalette = {
  [Key in keyof typeof customPalette]: (typeof customPalette)[Key];
};

export type CustomTypeText = {
  [Key in keyof typeof text]: (typeof text)[Key];
};

export type CustomTypeBackground = {
  [Key in keyof typeof background]: (typeof background)[Key];
};

declare module "@mui/material" {
  type Palette = CustomPalette;
  type PaletteOptions = CustomPalette;
  type TypeText = CustomTypeText;
  type TypeBackground = CustomTypeBackground;
}

declare module "@emotion/react" {
  type Palette = CustomPalette;
  type PaletteOptions = CustomPalette;
  type TypeText = CustomTypeText;
  type TypeBackground = CustomTypeBackground;
}

const light: CustomPalette = {
  ...customPalette
};

const dark: CustomPalette = {
  ...customPalette
};

const palette: { [key in ThemeType]: CustomPalette } = {
  light,
  dark
};

export default palette;
