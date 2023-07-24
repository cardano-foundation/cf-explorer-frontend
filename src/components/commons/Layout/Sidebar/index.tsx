import React from "react";
import { useSelector } from "react-redux";
import { useWindowSize } from "react-use";

import { RootState } from "src/stores/types";
import { LogoFullIcon, LogoIcon } from "src/commons/resources";

import SidebarMenu from "./SidebarMenu";
import { NavbarContainer, NavBarLogo, LogoLink, HeaderTop, NavbarMenuBottom } from "./styles";
import SelectNetwork from "../Header/SelectNetwork";

const Sidebar: React.FC = () => {
  const { sidebar } = useSelector(({ user }: RootState) => user);
  const { height } = useWindowSize();
  return (
    <NavbarContainer vh={height}>
      <HeaderTop>
        <LogoLink to="/" open={sidebar ? 1 : 0}>
          <NavBarLogo src={sidebar ? LogoFullIcon : LogoIcon} sidebar={+sidebar} alt="logo cardano" />
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
