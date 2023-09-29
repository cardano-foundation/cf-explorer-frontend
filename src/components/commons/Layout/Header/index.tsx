import { Box, useTheme } from "@mui/material";
import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { RouteComponentProps, withRouter } from "react-router-dom";

import { useScreen } from "src/commons/hooks/useScreen";
import {
  CardanoBlueDarkmodeLogo,
  CardanoBlueLogo,
  LogoIcon,
  MenuIconComponent,
  SearchIcon
} from "src/commons/resources";
import { lists, routers } from "src/commons/routers";
import { setOnDetailView, setSidebar } from "src/stores/user";

import CustomIcon from "../../CustomIcon";
import TopSearch from "../Sidebar/TopSearch";
import HeaderSearch from "./HeaderSearch";
import LoginButton from "./LoginButton";
import SelectNetwork from "./SelectNetwork";
import {
  ButtonSideBar,
  HeaderBox,
  HeaderContainer,
  HeaderLogo,
  HeaderLogoLink,
  HeaderMain,
  HeaderSearchContainer,
  HeaderTop,
  NetworkContainer,
  SearchButton,
  SideBarRight,
  Title
} from "./styles";

const HIDDEN_HEADER_SEARCH_PATHS: string[] = [lists.dashboard()];

const Header: React.FC<RouteComponentProps> = (props) => {
  const { history } = props;
  const { isMobile } = useScreen();
  const home = history.location.pathname === "/";
  const { sidebar } = useSelector(({ user }: RootState) => user);
  const [openSearch, setOpenSearch] = React.useState(false);
  const handleToggle = () => setSidebar(!sidebar);
  const theme = useTheme();
  const pathMatched = HIDDEN_HEADER_SEARCH_PATHS.find((subPath: string) => history.location.pathname.includes(subPath));

  const refElement = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (refElement.current && event.target instanceof Node && refElement.current.contains(event.target)) {
        setOpenSearch(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleOpenSearch = () => {
    setOpenSearch((prev) => !prev);
    setOnDetailView(false);
  };

  return (
    <HeaderContainer data-testid="header">
      <HeaderBox home={home ? 1 : 0}>
        <HeaderMain home={home ? 1 : 0}>
          <Title home={home ? 1 : 0} data-testid="home-title">
            <Box
              display={"flex"}
              alignItems={"center"}
              justifyContent={"center"}
              flexDirection={isMobile ? "column" : "row"}
            >
              <Box
                component={"img"}
                src={theme.mode === "light" ? CardanoBlueLogo : CardanoBlueDarkmodeLogo}
                width={isMobile ? "80vw" : "auto"}
                sx={{ margin: "2rem" }}
              />
            </Box>
          </Title>
          <HeaderSearchContainer home={+home}>{!pathMatched && <HeaderSearch home={home} />}</HeaderSearchContainer>
        </HeaderMain>
        <HeaderTop data-testid="header-top" ref={refElement}>
          <HeaderLogoLink to="/" data-testid="header-logo">
            {!sidebar && <HeaderLogo src={LogoIcon} alt="logo desktop" />}
          </HeaderLogoLink>
          <SideBarRight>
            {/* {!isGalaxyFoldSmall && (
                <SwitchMode
                  checked={themeMode === "dark"}
                  onChange={(e) => {
                    setTheme(e.target.checked ? "dark" : "light");
                  }}
                />
            )} */}
            <NetworkContainer>
              <SelectNetwork />
            </NetworkContainer>
            <LoginButton />
            {history.location.pathname !== routers.STAKING_LIFECYCLE && (
              <SearchButton onClick={handleOpenSearch} home={+home}>
                <SearchIcon fontSize={24} stroke={theme.palette.secondary.light} fill={theme.palette.secondary[0]} />
              </SearchButton>
            )}
            <ButtonSideBar onClick={handleToggle}>
              <CustomIcon icon={MenuIconComponent} height={18} fill={theme.palette.secondary.light} />
            </ButtonSideBar>
          </SideBarRight>
        </HeaderTop>
      </HeaderBox>

      <TopSearch open={openSearch} onClose={setOpenSearch} />
    </HeaderContainer>
  );
};

export default withRouter(Header);
