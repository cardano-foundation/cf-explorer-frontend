import React from "react";
import { useSelector } from "react-redux";
import { LogoMobileIcon } from "../../../../commons/resources";
import { RootState } from "../../../../stores/types";
import { setSidebar } from "../../../../stores/user";
import SidebarMenu from "./SidebarMenu";
import { NavbarContainer, NavBarLogo, LogoLink, NetworkName, HeaderTop, Collapse } from "./styles";

const Sidebar: React.FC = () => {
  const { network, sidebar } = useSelector(({ user }: RootState) => user);
  const handleToggle = () => setSidebar(!sidebar);

  return (
    <NavbarContainer>
      <HeaderTop>
        <LogoLink to="/" open={sidebar}>
          <NavBarLogo src={LogoMobileIcon} alt="logo desktop" />
          <NetworkName network={network}>{network}</NetworkName>
        </LogoLink>
        <Collapse onClick={handleToggle} />
      </HeaderTop>
      <SidebarMenu open={sidebar} handleToggle={handleToggle} />
    </NavbarContainer>
  );
};

export default Sidebar;
