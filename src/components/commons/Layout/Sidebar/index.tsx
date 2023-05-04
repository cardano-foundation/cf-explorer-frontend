import { Box } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { LogoFullIcon, LogoIcon, SearchIcon } from "../../../../commons/resources";
import { NETWORK, NETWORK_NAMES } from "../../../../commons/utils/constants";
import { RootState } from "../../../../stores/types";
import SidebarMenu from "./SidebarMenu";
import { NavbarContainer, NavBarLogo, LogoLink, NetworkName, HeaderTop, Toggle, SearchButton } from "./styles";
import ConnectWallet from "../Header/ConnectWallet";
import { useScreen } from "../../../../commons/hooks/useScreen";
import { setSidebar } from "../../../../stores/user";

const Sidebar: React.FC = () => {
  const { sidebar } = useSelector(({ user }: RootState) => user);
  const handleToggle = () => setSidebar(!sidebar);
  const { isMobile } = useScreen();

  return (
    <NavbarContainer>
      <HeaderTop>
        <LogoLink to="/" open={sidebar ? 1 : 0}>
          <NavBarLogo src={!isMobile && sidebar ? LogoFullIcon : LogoIcon} alt="logo desktop" />
          {!isMobile && sidebar && <NetworkName network={NETWORK}>{NETWORK_NAMES[NETWORK]}</NetworkName>}
        </LogoLink>
        {isMobile && (
          <Box display="flex" alignItems="center">
            <ConnectWallet />
            <SearchButton>
              <SearchIcon />
            </SearchButton>
            <Toggle onClick={handleToggle} />
          </Box>
        )}
      </HeaderTop>
      <SidebarMenu />
    </NavbarContainer>
  );
};

export default Sidebar;
