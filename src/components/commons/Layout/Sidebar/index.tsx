import { Box } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { LogoFullIcon, LogoIcon, SearchIcon } from "~/commons/resources";
import { NETWORK, NETWORK_NAMES } from "~/commons/utils/constants";
import { RootState } from "~/stores/types";
import SidebarMenu from "./SidebarMenu";
import { NavbarContainer, NavBarLogo, LogoLink, NetworkName, HeaderTop, Toggle, SearchButton } from "./styles";
import { useScreen } from "~/commons/hooks/useScreen";
import { setSidebar } from "~/stores/user";
import LoginButton from "../Header/LoginButton";
import TopSearch from "./TopSearch";
import { useLocation } from "react-router-dom";

const Sidebar: React.FC = () => {
  const { sidebar } = useSelector(({ user }: RootState) => user);
  const handleToggle = () => setSidebar(!sidebar);
  const { isMobile, isTablet, width } = useScreen();
  const [openSearch, setOpenSearch] = React.useState(false);
  const { pathname } = useLocation();

  return (
    <NavbarContainer>
      <HeaderTop>
        <LogoLink to='/' open={sidebar ? 1 : 0}>
          <NavBarLogo src={!isMobile && sidebar ? LogoFullIcon : LogoIcon} alt='logo desktop' />
          {!isTablet && sidebar && <NetworkName network={NETWORK}>{NETWORK_NAMES[NETWORK]}</NetworkName>}
        </LogoLink>
        {isTablet ? (
          <Box display='flex' alignItems='center'>
            <LoginButton />
            {pathname !== "/" && (
              <SearchButton onClick={() => setOpenSearch((prev) => !prev)}>
                <SearchIcon />
              </SearchButton>
            )}
            <Toggle onClick={handleToggle} />
          </Box>
        ) : null}
      </HeaderTop>
      <TopSearch open={openSearch} onClose={setOpenSearch} />
      <SidebarMenu />
    </NavbarContainer>
  );
};

export default Sidebar;
