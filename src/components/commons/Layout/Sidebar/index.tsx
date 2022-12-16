import React from "react";
import { useSelector } from "react-redux";
import { useWindowSize } from "react-use";
import { LogoFullIcon, LogoIcon } from "../../../../commons/resources";
import { RootState } from "../../../../stores/types";
import { setSidebar } from "../../../../stores/user";
import SidebarMenu from "./SidebarMenu";
import { NavbarContainer, NavBarLogo, LogoLink, NetworkName, HeaderTop, Toggle } from "./styles";

const Sidebar: React.FC = () => {
  const { network, sidebar } = useSelector(({ user }: RootState) => user);
  const handleToggle = () => setSidebar(!sidebar);
  const { width } = useWindowSize(0);

  return (
    <NavbarContainer>
      <HeaderTop>
        <LogoLink to="/" open={sidebar}>
          <NavBarLogo src={sidebar || width <= 1023 ? LogoFullIcon : LogoIcon} alt="logo desktop" />
          <NetworkName network={network}>{network}</NetworkName>
        </LogoLink>
        <Toggle onClick={handleToggle} />
      </HeaderTop>
      <SidebarMenu />
    </NavbarContainer>
  );
};

export default Sidebar;
