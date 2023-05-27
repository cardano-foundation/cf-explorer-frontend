import React from "react";
import { useSelector } from "react-redux";
import { LogoFullIcon, LogoIcon } from "~/commons/resources";
import { NETWORK, NETWORK_NAMES } from "~/commons/utils/constants";
import { RootState } from "~/stores/types";
import SidebarMenu from "./SidebarMenu";
import { NavbarContainer, NavBarLogo, LogoLink, NetworkName, HeaderTop, NavbarMenuBottom } from "./styles";
import SelectNetwork from "../Header/SelectNetwork";
import { useWindowSize } from "react-use";

const Sidebar: React.FC = () => {
  const { sidebar } = useSelector(({ user }: RootState) => user);
  const { height } = useWindowSize();
  return (
    <NavbarContainer vh={height}>
      <HeaderTop>
        <LogoLink to='/' open={sidebar ? 1 : 0}>
          <NavBarLogo src={sidebar ? LogoFullIcon : LogoIcon} sidebar={+sidebar} alt='logo cardano' />
          <NetworkName sidebar={+sidebar} network={NETWORK}>
            {NETWORK_NAMES[NETWORK]}
          </NetworkName>
        </LogoLink>
      </HeaderTop>
      <SidebarMenu />
      <NavbarMenuBottom sidebar={+sidebar}>
        <SelectNetwork />
      </NavbarMenuBottom>
    </NavbarContainer>
  );
};

export default Sidebar;
