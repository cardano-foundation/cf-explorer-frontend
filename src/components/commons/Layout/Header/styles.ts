import { Box, Button, Container, IconButton, Switch, styled } from "@mui/material";
import { Link } from "react-router-dom";

import { sunIcon, moonIcon } from "src/commons/resources";

export const HeaderContainer = styled("header")`
  color: ${(props) => props.theme.palette.secondary.main};
  position: relative;
`;

export const HeaderBox = styled(Container)<{ home: number }>`
  display: flex;
  gap: 10px;
  ${(props) =>
    props.home
      ? `flex-direction: column-reverse;`
      : `
        flex-direction: row;
        justify-content: space-between;
        align-items:center;
      `}
  ${({ theme }) => theme.breakpoints.down("md")} {
    ${(props) => (props.home ? `` : `justify-content: flex-end;`)}
  }
`;

export const HeaderTop = styled("div")(({ theme }) => ({
  zIndex: 1300,
  display: "flex",
  justifyContent: "flex-end",
  alignItems: "center",
  gap: 20,
  padding: "30px 0",
  [theme.breakpoints.down("md")]: {
    display: "flex",
    position: "fixed",
    top: 0,
    left: 0,
    justifyContent: "space-between",
    width: "calc(100% - 32px)",
    padding: "16px 16px",
    backgroundColor: theme.palette.secondary[0],
    boxShadow: theme.shadow.card
  }
}));

export const HeaderMain = styled("div")<{ home: number }>(({ theme, home }) => ({
  position: "relative",
  textAlign: "start",
  padding: home ? "0px 0px 50px" : "27px 0px",
  [theme.breakpoints.down("md")]: {
    padding: home ? "62px 0px 48px" : 0,
    display: home ? "block" : "none"
  },
  [theme.breakpoints.down("sm")]: {
    padding: 0
  }
}));

export const Title = styled("h1")<{ home: number }>`
  display: ${(props) => (props.home ? "block" : "none")};
  text-align: center;
  ${({ theme }) => theme.breakpoints.down("md")} {
    font-size: 30px;
  }
`;

export const HeaderLogoLink = styled(Link)<{ open?: number }>(({ theme }) => ({
  display: "none",
  width: "max-content",
  height: 50,
  [theme.breakpoints.down("md")]: {
    display: "block",
    height: 44
  }
}));

export const HeaderLogo = styled("img")(({ theme }) => ({
  height: 50,
  width: "auto",
  [theme.breakpoints.down("md")]: {
    height: 44
  }
}));

export const SearchButton = styled(Button)<{ home?: number }>(({ theme, home }) => ({
  padding: 0,
  minWidth: 24,
  height: 24,
  display: "none",
  [theme.breakpoints.down("md")]: {
    display: "block"
  },
  [theme.breakpoints.between("sm", "md")]: {
    display: home ? "none" : "block"
  }
}));

export const HumburgerArea = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 15px;
`;

export const SideBarRight = styled(Box)(() => ({
  display: "flex",
  justifyContent: "flex-end",
  alignItems: "center",
  gap: 15
}));

export const NetworkContainer = styled(Box)(({ theme }) => ({
  display: "block",
  [theme.breakpoints.down("sm")]: {
    display: "none"
  }
}));

export const ButtonSideBar = styled(IconButton)`
  display: none;
  ${({ theme }) => theme.breakpoints.down("md")} {
    display: block;
  }
`;

export const HeaderSearchContainer = styled(Box)<{ home?: number }>`
  ${(props) => props.theme.breakpoints.down("sm")} {
    display: ${({ home }) => (home ? "block" : "none")};
  }
`;

export const SwitchMode = styled(Switch)(({ theme }) => ({
  padding: 8,
  width: 76,
  height: 44,
  "& .MuiButtonBase-root": {
    width: 60,
    paddingLeft: 0,
    paddingRight: theme.isDark ? 0 : "9px"
  },
  "& .MuiSwitch-track": {
    background: theme.isDark ? `${theme.palette.secondary[0]} !important` : theme.palette.primary[100],
    opacity: `1 !important`,
    border: `1px solid ${theme.palette.primary[200]}`,
    borderRadius: 80 / 2,
    position: "relative",
    "&:before": {
      content: '""',
      position: "absolute",
      top: "50%",
      left: "7%",
      transform: "translateY(-42%)  scale(0.8)",
      width: 23,
      display: theme.isDark ? "block" : "none",
      height: 26,
      backgroundRepeat: "no-repeat",
      backgroundImage: `url(${sunIcon})`
    },
    "&:after": {
      content: '""',
      position: "absolute",
      top: "54%",
      display: theme.isDark ? "none" : "block",
      transform: "translateY(-50%) scale(0.8)",
      width: 23,
      height: 26,
      backgroundRepeat: "no-repeat",
      backgroundImage: `url(${moonIcon})`,
      right: "5%"
    }
  },
  "& .MuiSwitch-thumb": {
    boxShadow: "none",
    width: 24,
    height: 24,
    margin: `2px 4px`,
    position: "relative",
    background: theme.isDark ? theme.palette.primary.main : theme.palette.secondary.light,
    "&:before": {
      content: '""',
      display: theme.isDark ? "none" : "block",
      position: "absolute",
      top: "50%",
      left: "7%",
      transform: "translateY(-42%)  scale(0.8)",
      width: 23,
      height: 26,
      backgroundRepeat: "no-repeat",
      backgroundImage: `url(${sunIcon})`
    },
    "&:after": {
      content: '""',
      position: "absolute",
      top: "54%",
      transform: "translateY(-50%) scale(0.8)",
      width: 23,
      height: 26,
      display: theme.isDark ? "block" : "none",
      backgroundRepeat: "no-repeat",
      backgroundImage: `url(${moonIcon})`,
      right: "-1%"
    }
  }
}));

export const WrapButtonSelect = styled(Box)(({ theme }) => ({
  [theme.breakpoints.down(355)]: {
    display: "none"
  },
  [theme.breakpoints.down("sm")]: {
    display: "none"
  }
}));
