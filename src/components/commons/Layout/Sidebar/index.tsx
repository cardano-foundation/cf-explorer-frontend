import { useTheme } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { useWindowSize } from "react-use";
import { LogoFullIcon, LogoIcon } from "../../../../commons/resources";
import { NETWORK, NETWORK_NAMES } from "../../../../commons/utils/constants";
import { RootState } from "../../../../stores/types";
import { setSidebar } from "../../../../stores/user";
import SidebarMenu from "./SidebarMenu";
import { NavbarContainer, NavBarLogo, LogoLink, NetworkName, HeaderTop, Toggle } from "./styles";

const Sidebar: React.FC = () => {
  const { sidebar } = useSelector(({ user }: RootState) => user);
  const handleToggle = () => setSidebar(!sidebar);
  const { width } = useWindowSize(0);
  const theme = useTheme();

  return (
    <NavbarContainer>
      <HeaderTop>
        <LogoLink to="/" open={sidebar ? 1 : 0}>
          <NavBarLogo
            src={sidebar || width < theme.breakpoints.values.md ? LogoFullIcon : LogoIcon}
            alt="logo desktop"
          />
          <NetworkName network={NETWORK}>{NETWORK_NAMES[NETWORK]}</NetworkName>
        </LogoLink>
        <Toggle onClick={handleToggle} />
      </HeaderTop>
      <SidebarMenu />
    </NavbarContainer>
  );
};

export default Sidebar;
