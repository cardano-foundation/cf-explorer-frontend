import { alpha, createTheme } from "@mui/material";
import { ThemeType } from "../types/user";

const breakpoints = {
  values: {
    xs: 0,
    sm: 540,
    md: 1024,
    lg: 1370,
    xl: 1536,
  },
};

const typography = { fontFamily: "Helvetica, sans-serif, monospace" };

const primary = {
  green_1: "#29744D",
  green_1_20: alpha("#29744D", 0.2),
  green_2: "#438F68",
  green_2_0: alpha("#438F68", 0.0),
  green_2_10: alpha("#438F68", 0.1),
  green_2_20: alpha("#438F68", 0.2),
  green_2_30: alpha("#438F68", 0.3),
  green_3: "#53A57B",
  green_4: "#65B98E",
  green_5: "#7ED4A8",
  green_6: "#9EEFC5",
  green_7: "#B9FFDB",
  green_8: "#5A9C56",
  green_9: "#184c78",
  green_9_10: alpha("#184c78", 0.1),
  green_9_20: alpha("#184c78", 0.2),
};

const grays = {
  gray_1: "#13152F",
  gray_1_44: alpha("#13152F", 0.44),
  gray_2: "#1F213A",
  gray_3: "#344054",
  gray_4: "#667085",
  gray_4_20: alpha("#667085", 0.2),
  gray_4_40: alpha("#667085", 0.4),
  gray_4_50: alpha("#667085", 0.5),
  gray_5: "#98A2B3",
  gray_5_10: alpha("#98A2B3", 0.1),
  gray_5_20: alpha("#98A2B3", 0.2),
  gray_5_50: alpha("#98A2B3", 0.5),
  gray_6: "#E3E5E9",
  gray_7: "#F2F2F2",
  gray_8: "#F7F7F7",
  gray_9: "#A3A3A3",
  gray_10: "#ECECEC",
  gray_11: "#E7E8EA",
  gray_12: "#C8CDD8",
  gray_13: "#B7B7B7",
};

const error = {
  error_1: "#DD4343",
  error_1_10: alpha("#DD4343", 0.1),
  error_1_20: alpha("#DD4343", 0.2),
  error_2: "#F75E5E",
  error_3: "#FF7474",
  error_4: "#FF8D8D",
  error_5: "#FFACAC",
  error_6: "#FFC6C6",
  error_7: "#FFE2E2",
};

const warning = {
  warning_1: "#FFA800",
  warning_1_20: alpha("#FFA800", 0.2),
  warning_2: "#F9B736",
  warning_3: "#FFC75A",
  warning_4: "#FFD37E",
  warning_5: "#FFDD9B",
  warning_6: "#FFE8BA",
  warning_7: "#FFF2DA",
};

const blue = {
  blue_0: "#108AEF",
  blue_0_7: alpha("#108AEF", 0.07),
  blue_0_20: alpha("#108AEF", 0.2),
  blue_1: "#154666",
  blue_2: "#256289",
  blue_3: "#3272A8",
  blue_4: "#4084BD",
  blue_5: "#5DA2DC",
  blue_6: "#78BBF2",
  blue_7: "#A3D5FF",
};

const purple = {
  purple_2: "#6866D4",
  purple_6: "#E3E2FC",
};

const white = {
  white: "#FFFFFF",
  white_5: alpha("#FFFFFF", 0.05),
  white_6: alpha("#FFFFFF", 0.06),
  white_7: alpha("#FFFFFF", 0.07),
  white_10: alpha("#FFFFFF", 0.1),
  white_30: alpha("#FFFFFF", 0.3),
  white_50: alpha("#FFFFFF", 0.5),
  white_60: alpha("#FFFFFF", 0.6),
  white_90: alpha("#FFFFFF", 0.9),
};

const black = {
  black: "#000000",
  black_5: alpha("#000000", 0.05),
  black_7: alpha("#000000", 0.07),
  black_10: alpha("#000000", 0.1),
  black_20: alpha("#000000", 0.2),
  black_40: alpha("#000000", 0.4),
  black_50: alpha("#000000", 0.5),
};

const gradient = {
  gradient_0: "linear-gradient(263.55deg, #5A9C56 0%, #184C78 100%)",
  gradient_1: "linear-gradient(0deg, #5A9C56 0%, #184C78 100%)",
  gradient_2: "linear-gradient(90deg, #2193B0 0%, #6DD5ED 100%)",
  gradient_3: "linear-gradient(90deg, #4776E6 0%, #8E54E9 100%)",
  gradient_4: "linear-gradient(90deg, #E65C00 0%, #F9D423 100%)",
  gradient_5: "linear-gradient(90deg, #A770EF 0%, #CF8BF3 37.85%, #FDB99B 100%)",
  gradient_6: "linear-gradient(90deg, #F2709C 0%, #FF9472 100%)",
  gradient_7: "linear-gradient(90deg, #8E9EAB 0%, #EEF2F3 100%)",
  gradient_8: "linear-gradient(0deg, #FFFFFF00 0%, #FFFFFF40 50%, #FFFFFF00 100%)",
  gradient_9: "linear-gradient(52.78deg, #5A9C56 20.64%, #184C78 73.83%)",
};

const shadow = {
  shadow_0: "0px 10px 25px rgba(0, 0, 0, 0.03)",
  shadow_1: "0px 2px 1px -1px rgba(0, 0, 0, 0.2), 0px 1px 1px rgba(0, 0, 0, 0.14), 0px 1px 3px rgba(0, 0, 0, 0.12)",
  shadow_2: "0px 4px 30px rgba(0, 0, 0, 0.1)",
  shadow_3: "0px 1px 20px rgba(0, 0, 0, 0.05)",
  shadow_4: "0px 4px 50px rgba(0, 0, 0, 0.05)",
};

const themeDefault = {
  breakpoints,
  typography,
  ...primary,
  ...grays,
  ...error,
  ...warning,
  ...blue,
  ...purple,
  ...white,
  ...black,
  ...gradient,
  ...shadow,
  textColor: grays.gray_1,
  textColorLight: grays.gray_4,
  textColorLighter: grays.gray_5,
  textColorBold: black.black,
  textColorReverse: white.white,
  borderColor: grays.gray_6,
  linkColor: blue.blue_0,
  boxBackgroundColor: white.white,
  bodyBackground: grays.gray_8,
};

type DefaultTheme = {
  [Key in keyof typeof themeDefault]: typeof themeDefault[Key];
};

interface CustomTheme extends DefaultTheme {
  mode: "light" | "dark";
  isDark?: boolean;
}

const lightTheme: CustomTheme = {
  ...themeDefault,
  mode: "light",
};

const darkTheme: CustomTheme = {
  ...themeDefault,
  mode: "dark",
  isDark: true,
  textColor: grays.gray_1,
  textColorLight: grays.gray_4,
  textColorLighter: grays.gray_5,
  textColorBold: black.black,
  textColorReverse: white.white,
  borderColor: grays.gray_6,
  linkColor: blue.blue_0,
  boxBackgroundColor: white.white,
  bodyBackground: grays.gray_8,
};

declare module "@mui/material" {
  interface Theme extends CustomTheme {}
  interface ThemeOptions extends CustomTheme {}
}

declare module "@emotion/react" {
  interface Theme extends CustomTheme {}
  interface ThemeOptions extends CustomTheme {}
}

const light = createTheme(lightTheme);
const dark = createTheme(darkTheme);

const themes: { [key in ThemeType]: typeof light } = {
  light,
  dark,
};

export default themes;
