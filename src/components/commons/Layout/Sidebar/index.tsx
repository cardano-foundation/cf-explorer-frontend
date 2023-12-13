import React from "react";
import { useSelector } from "react-redux";
import { useWindowSize } from "react-use";
import { Box, Button, ButtonGroup, useTheme } from "@mui/material";

import { useScreen } from "src/commons/hooks/useScreen";
import {
  DarkModeMobile,
  LightModeMobile,
  LogoDarkmodeFullIcon,
  LogoDarkmodeShortIcon,
  LogoFullIcon,
  LogoIcon
} from "src/commons/resources";
import { setTheme } from "src/stores/theme";
import { RootState } from "src/stores/types";

import SelectNetwork from "../Header/SelectNetwork";
import SidebarMenu from "./SidebarMenu";
import { HeaderTop, LogoLink, NavBarLogo, NavbarContainer, NavbarMenuBottom, WrapButtonSelect } from "./styles";

const Sidebar: React.FC = () => {
  const { sidebar } = useSelector(({ user }: RootState) => user);
  const { theme } = useSelector(({ theme }: RootState) => theme);
  const { isTablet, isMobile } = useScreen();
  const { height } = useWindowSize();
  const muiTheme = useTheme();
  const getLogo = () => {
    if (theme === "light") {
      if (sidebar) {
        return LogoFullIcon;
      } else {
        return LogoIcon;
      }
    } else {
      if (sidebar) {
        return LogoDarkmodeFullIcon;
      } else {
        return LogoDarkmodeShortIcon;
      }
    }
  };
  return (
    <NavbarContainer vh={height}>
      <HeaderTop>
        <LogoLink to="/" open={sidebar ? 1 : 0}>
          <NavBarLogo src={getLogo()} sidebar={+sidebar} alt="logo cardano" />
        </LogoLink>
      </HeaderTop>
      <SidebarMenu />
      <NavbarMenuBottom sidebar={+sidebar}>
        <SelectNetwork />
      </NavbarMenuBottom>
      {isTablet && (
        <WrapButtonSelect>
          <ButtonGroup fullWidth={isMobile} variant="outlined" aria-label="outlined primary button group">
            <Box
              component={Button}
              textTransform={"capitalize"}
              onClick={() => {
                setTheme("light");
              }}
              borderColor={muiTheme.isDark ? muiTheme.palette.primary[100] : muiTheme.palette.primary.main}
              color={muiTheme.isDark ? muiTheme.palette.secondary.light : muiTheme.palette.primary.main}
              bgcolor={muiTheme.isDark ? "transparent" : muiTheme.palette.primary[200]}
              fontSize={16}
            >
              <Box
                component={LightModeMobile}
                mr={"4px"}
                fill={muiTheme.isDark ? muiTheme.palette.secondary.light : muiTheme.palette.primary.main}
              />
              Light
            </Box>
            <Box
              component={Button}
              textTransform={"capitalize"}
              onClick={() => {
                setTheme("dark");
              }}
              fontSize={16}
              borderColor={muiTheme.isDark ? muiTheme.palette.primary.main : muiTheme.palette.primary[200]}
              color={muiTheme.isDark ? muiTheme.palette.primary.main : muiTheme.palette.secondary.light}
              bgcolor={muiTheme.isDark ? muiTheme.palette.secondary[0] : "transparent"}
            >
              <Box
                component={DarkModeMobile}
                mr={"4px"}
                fill={muiTheme.isDark ? muiTheme.palette.primary.main : muiTheme.palette.secondary.light}
              />
              Dark
            </Box>
          </ButtonGroup>
        </WrapButtonSelect>
      )}
    </NavbarContainer>
  );
};

export default Sidebar;
