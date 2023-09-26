import { Box } from "@mui/material";
import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { RouteComponentProps, withRouter } from "react-router-dom";

import { useScreen } from "src/commons/hooks/useScreen";
import { CardanoBlueLogo, LogoIcon, SearchIcon } from "src/commons/resources";
import { lists, routers } from "src/commons/routers";
import { setOnDetailView, setSidebar } from "src/stores/user";

import TopSearch from "../Sidebar/TopSearch";
import HeaderSearch from "./HeaderSearch";
import LoginButton from "./LoginButton";
import SelectNetwork from "./SelectNetwork";
import {
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
  Title,
  Toggle
} from "./styles";

const HIDDEN_HEADER_SEARCH_PATHS: string[] = [lists.dashboard()];

const Header: React.FC<RouteComponentProps> = (props) => {
  const { history } = props;
  const { isMobile } = useScreen();
  const home = history.location.pathname === "/";
  const { sidebar } = useSelector(({ user }: RootState) => user);
  const [openSearch, setOpenSearch] = React.useState(false);
  const handleToggle = () => setSidebar(!sidebar);

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
      <HeaderBox home={home ? 1 : 0} sx={{ background: "#ddd" }}>
        <HeaderMain home={home ? 1 : 0}>
          <Title home={home ? 1 : 0} data-testid="home-title">
            <Box
              display={"flex"}
              alignItems={"center"}
              justifyContent={"center"}
              flexDirection={isMobile ? "column" : "row"}
            >
              <Box component={"img"} src={CardanoBlueLogo} width={isMobile ? "80vw" : "auto"} sx={{ margin: "2rem" }} />
            </Box>
          </Title>
          <HeaderSearchContainer>{!pathMatched && <HeaderSearch home={home} />}</HeaderSearchContainer>
        </HeaderMain>
        <HeaderTop data-testid="header-top" ref={refElement}>
          <HeaderLogoLink to="/" data-testid="header-logo">
            {!sidebar && <HeaderLogo src={LogoIcon} alt="logo desktop" />}
          </HeaderLogoLink>
          <SideBarRight>
            <NetworkContainer>
              <SelectNetwork />
            </NetworkContainer>
            <LoginButton />
            {history.location.pathname !== routers.STAKING_LIFECYCLE && (
              <SearchButton onClick={handleOpenSearch} home={+home}>
                <SearchIcon fontSize={24} />
              </SearchButton>
            )}
            <Toggle onClick={handleToggle} />
          </SideBarRight>
        </HeaderTop>
      </HeaderBox>

      <TopSearch open={openSearch} onClose={setOpenSearch} />
    </HeaderContainer>
  );
};

export default withRouter(Header);
