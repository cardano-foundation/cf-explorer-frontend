import { Box } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { useWindowSize } from "react-use";

import { LogoDarkmodeFullIcon, LogoDarkmodeShortIcon, LogoFullIcon, LogoIcon } from "src/commons/resources";
import { setTheme } from "src/stores/theme";
import { RootState } from "src/stores/types";

import SelectLanguage from "../Header/SelectLanguage";
import SelectNetwork from "../Header/SelectNetwork";
import { SwitchMode } from "../Header/styles";
import SidebarMenu from "./SidebarMenu";
import { HeaderTop, LogoLink, NavBarLogo, NavbarContainer, NavbarMenuBottom, WrapButtonSelect } from "./styles";

const Sidebar: React.FC = () => {
  const { sidebar } = useSelector(({ user }: RootState) => user);
  const { theme } = useSelector(({ theme }: RootState) => theme);
  const { height } = useWindowSize();
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
      <WrapButtonSelect>
        <SelectLanguage />
        <Box>
          <SwitchMode
            checked={theme === "dark"}
            onChange={(e) => {
              setTheme(e.target.checked ? "dark" : "light");
            }}
          />
        </Box>
      </WrapButtonSelect>
    </NavbarContainer>
  );
};

export default Sidebar;
