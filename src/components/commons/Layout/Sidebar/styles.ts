import { Box, styled } from "@mui/material";
import { Link } from "react-router-dom";

import { NETWORKS } from "src/commons/utils/constants";

export const NavbarContainer = styled("nav")<{ vh: number }>(({ theme, vh }) => ({
  position: "relative",
  width: "100%",
  height: "100vh",
  minHeight: vh,
  maxHeight: "fill-available",
  overflow: "hidden",
  padding: "25px 0px 60px",
  textAlign: "left",
  boxSizing: "border-box",
  background: theme.palette.primary[100],
  [theme.breakpoints.down("md")]: {
    backgroundColor: theme.palette.primary[100],
    padding: "16px 0px"
  }
}));

export const HeaderTop = styled("div")`
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 998;
  height: 80px ${({ theme }) => theme.breakpoints.down("md")} {
    padding: 16px;
    height: 76px;
  }
`;

export const LogoLink = styled(Link)<{ open?: number }>`
  position: relative;
  display: block;
  margin-left: ${(props) => (props.open ? 30 : 15)}px;
  margin-bottom: 30px;
  width: max-content;
  height: 50px;
  ${({ theme }) => theme.breakpoints.down("md")} {
    height: 44px;
    width: 155px;
    margin-left: 20px;
    margin-bottom: 16px;
  }
`;

export const NavBarLogo = styled("img")<{ sidebar: number }>(({ theme }) => ({
  height: 50,
  width: "auto",
  [theme.breakpoints.down("md")]: {
    height: 44
  }
}));

export const NetworkName = styled("small")<{ network: keyof typeof NETWORKS; sidebar?: number }>`
  position: absolute;
  bottom: 2px;
  right: 0;
  transform: translateY(50%);
  font-weight: var(--font-weight-bold);
  font-family: var(--font-family-title);
  color: ${(props) => {
    switch (props.network) {
      case NETWORKS.mainnet: {
        return props.theme.palette.primary.main;
      }
      case NETWORKS.preprod: {
        return props.theme.palette.secondary.main;
      }
      case NETWORKS.preview: {
        return props.theme.palette.secondary.main;
      }
      default: {
        return props.theme.palette.warning.main;
      }
    }
  }};
  text-transform: uppercase;
  display: ${({ sidebar }) => (sidebar ? "block" : "none")};
`;

export const NavbarMenuBottom = styled(Box)<{ sidebar: number }>(({ theme, sidebar }) => ({
  position: "absolute",
  left: 0,
  bottom: 0,
  width: sidebar ? 240 : 0,
  overflow: "hidden",
  boxSizing: "border-box",
  display: "none",
  [theme.breakpoints.down("sm")]: {
    display: "block",
    padding: "16px 20px 20px",
    boxSizing: "border-box",
    "& > div": {
      width: "100%"
    },
    position: "unset"
  }
}));
