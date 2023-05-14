import { Box } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';
import { LogoFullIcon, LogoIcon, SearchIcon } from '../../../../commons/resources';
import { NETWORK, NETWORK_NAMES } from '../../../../commons/utils/constants';
import { RootState } from '../../../../stores/types';
import SidebarMenu from './SidebarMenu';
import { NavbarContainer, NavBarLogo, LogoLink, NetworkName, HeaderTop, Toggle, SearchButton } from './styles';
import { useScreen } from '../../../../commons/hooks/useScreen';
import { setSidebar } from '../../../../stores/user';
import LoginButton from '../Header/LoginButton';

const Sidebar: React.FC = () => {
  const { sidebar } = useSelector(({ user }: RootState) => user);
  const handleToggle = () => setSidebar(!sidebar);
  const { isMobile, isTablet } = useScreen();
  const isMd = isMobile || isTablet;
  return (
    <NavbarContainer>
      <HeaderTop>
        <LogoLink to='/' open={sidebar ? 1 : 0}>
          <NavBarLogo src={!isMobile && sidebar ? LogoFullIcon : LogoIcon} alt='logo desktop' />
          {!isMd && sidebar && <NetworkName network={NETWORK}>{NETWORK_NAMES[NETWORK]}</NetworkName>}
        </LogoLink>
        {isMd && (
          <Box display='flex' alignItems='center'>
            <LoginButton />
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
