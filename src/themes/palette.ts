import { alpha } from "@mui/material";

import { ThemeType } from "../types/user";

export const createGradient = (deg: number, startColor: string, endColor: string, start = 0, end = 100): string => {
  return `linear-gradient(${deg}deg, ${startColor} ${start}%, ${endColor} ${end}%)`;
};

const GREEN = {
  100: "#B9FFDB",
  200: "#9EEFC5",
  300: "#7ED4A8",
  400: "#65B98E",
  400_10: "#D6E2FF",
  450: "#5A9C56",
  500: "#53A57B",
  600: "#438F68",
  600_10: alpha("#438F68", 0.1),
  600_20: alpha("#438F68", 0.2),
  600_30: alpha("#438F68", 0.3),
  700: "#29744D",
  700_10: alpha("#29744D", 0.1),
  700_20: alpha("#29744D", 0.2),
  800: "#184c78",
  800_10: alpha("#184c78", 0.1),
  800_20: alpha("#184c78", 0.2)
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
  400: "#50596D",
  500: "#50596D",
  600: "#1F213A",
  700: "#13152F",
  A100: "#A3A3A3",
  A200: "#ECECEC",
  A400: "#B7B7B7"
};

const RED = {
  100: "#FFE2E2",
  200: "#FFC6C6",
  300: "#FFACAC",
  400: "#FF8D8D",
  500: "#FF7474",
  600: "#F75E5E",
  700: "#DD4343",
  700_10: alpha("#DD4343", 0.1),
  700_20: alpha("#DD4343", 0.2),
  800: "#DE350B"
};

const YELLOW = {
  100: "#FFF2DA",
  200: "#FFE8BA",
  300: "#FFDD9B",
  400: "#FFD37E",
  500: "#FFC75A",
  600: "#F9B736",
  700: "#FFA800",
  700_20: alpha("#FFA800", 0.2)
};

const BLUE = {
  100: "#A3D5FF",
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
  200: "#E3E2FC",
  500: "#6866D4"
};

const primary = {
  light: GREEN[500],
  main: GREEN[600],
  dark: GREEN[700],
  contrastText: COMMON.white
};

const secondary = {
  light: BLUE[800_7],
  main: BLUE[800],
  dark: GREY[500],
  contrastText: COMMON.white
};

const text = {
  primary: GREY[700],
  secondary: GREY[500],
  disabled: alpha(GREY[400], 0.4),
  hint: GREY[300],
  dark: COMMON.black
};

const border = {
  primary: "#ECECEC",
  secondary: GREEN[800_10],
  main: GREY[200],
  disabled: GREY[400],
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
  light: RED[700_10],
  main: RED[700],
  dark: RED[700],
  contrastText: COMMON.white
};
const warning = {
  light: YELLOW[700_20],
  main: YELLOW[700],
  dark: YELLOW[700],
  contrastText: COMMON.white
};

const info = {
  light: BLUE[800_20],
  main: BLUE[800],
  dark: BLUE[800],
  contrastText: COMMON.white
};

const success = {
  light: GREEN[600_20],
  main: GREEN[600],
  dark: GREEN[700],
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
