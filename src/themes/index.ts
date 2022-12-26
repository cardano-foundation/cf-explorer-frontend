import { createTheme } from "@mui/material";
import { HeaderBackground } from "../commons/resources";
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

const themeDefault = {
  breakpoints,
  typography,
};

const lightTheme = {
  ...themeDefault,
  textColor: "#13152f",
  titleColor: "#98a2b3",
  textColorPale: "#667085",
  textColorReverse: "#ffffff",
  textColorHover: "#13152f",
  textColorReverseHover: "#ffffff",
  colorGreen: "#29744d",
  colorGreenLight: "#438f68",
  colorGreenPale: "#438f6833",
  colorGreenDark: "#184c78",
  colorBlue: "#108aef",
  colorBlueDark: "#13152f",
  colorRed: "#dd4343",
  colorYellow: "#ffa800",
  colorBlack: "#000000",
  borderColor: "#e5e5e5",
  linearGradientGreen: "linear-gradient(263.55deg, #5a9c56 0%, #184c78 100%)",
  menuItemSelectedText: "#353945",
  menuItemText: "#b1b5c3",
  modalBackground: "#f7f7f7",
  bodyBackground: "#f7f7f7",
  headerBackgroundImage: `url(${HeaderBackground})`,
  footerBackgroundColor: "#13152f",
  footerColor: "#98a2b3",
  copyrightBackgroundColor: "#1f213a",
  footerColorGreen: "#29744D",
  shadowRaised: "0px 10px 25px rgba(0, 0, 0, 0.03)",
  shadowRaisedHover:
    "0px 2px 1px -1px rgba(0, 0, 0, 0.2), 0px 1px 1px rgba(0, 0, 0, 0.14), 0px 1px 3px rgba(0, 0, 0, 0.12)",
  borderRadius: "10px",
};

export const darkTheme: typeof lightTheme = {
  ...themeDefault,
  textColor: "#ffffff",
  titleColor: "#98a2b3",
  textColorPale: "#667085",
  textColorReverse: "#13152f",
  textColorHover: "#ffffff",
  textColorReverseHover: "#13152f",
  colorGreen: "#29744d",
  colorGreenLight: "#438f68",
  colorGreenPale: "#438f6833",
  colorGreenDark: "#184c78",
  colorBlue: "#108aef",
  colorBlueDark: "#13152f",
  colorRed: "#f75e5e",
  colorYellow: "#ffa800",
  colorBlack: "#000000",
  borderColor: "#13152f",
  linearGradientGreen: "linear-gradient(263.55deg, #5a9c56 0%, #184c78 100%)",
  menuItemSelectedText: "#fff",
  menuItemText: "#777e90",
  modalBackground: "#f7f7f7",
  bodyBackground: "#f7f7f7",
  headerBackgroundImage: `url(${HeaderBackground})`,
  footerBackgroundColor: "#13152f",
  footerColor: "#29744D",
  copyrightBackgroundColor: "#1f213a",
  footerColorGreen: "#98a2b3",
  shadowRaised: "0px 10px 25px rgba(0, 0, 0, 0.03)",
  shadowRaisedHover:
    "0px 2px 1px -1px rgba(0, 0, 0, 0.2), 0px 1px 1px rgba(0, 0, 0, 0.14), 0px 1px 3px rgba(0, 0, 0, 0.12)",
  borderRadius: "10px",
};

type CustomTheme = {
  [Key in keyof typeof lightTheme]: typeof lightTheme[Key];
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
const dark = createTheme(lightTheme);

const themes: { [key in ThemeType]: typeof light } = {
  light,
  dark,
};

export default themes;
