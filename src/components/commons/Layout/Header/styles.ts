import { Box, Button, Container, styled } from "@mui/material";
import { Link } from "react-router-dom";

import { MenuIcon } from "src/commons/resources";

export const HeaderContainer = styled("header")`
  color: ${(props) => props.theme.palette.text.primary};
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
    backgroundColor: theme.palette.common.white,
    boxShadow: theme.shadow.card
  }
}));

export const HeaderMain = styled("div")<{ home: number }>(({ theme, home }) => ({
  position: "relative",
  textAlign: "start",
  padding: home ? "0px 0px 50px" : "27px 0px",
  "& > div": {
    paddingTop: 0,
    marginBottom: 0
  },
  [theme.breakpoints.down("md")]: {
    padding: home ? "62px 0px 48px" : 0,
    display: home ? "block" : "none"
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

export const SearchButton = styled(Button)(({ theme }) => ({
  padding: 0,
  minWidth: 24,
  height: 24,
  display: "none",
  [theme.breakpoints.down("md")]: {
    display: "block"
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

export const Toggle = styled("i")`
  width: 20px;
  height: 24px;
  background-image: url(${MenuIcon});
  background-repeat: no-repeat;
  background-position: center;
  display: none;
  ${({ theme }) => theme.breakpoints.down("md")} {
    display: block;
  }
`;

export const HeaderSearchContainer = styled(Box)`
  ${(props) => props.theme.breakpoints.down("sm")} {
    display: none;
  }
`;
