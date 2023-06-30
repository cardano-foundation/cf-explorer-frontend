import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { Box } from "@mui/material";

import { LogoIcon, SearchIcon } from "src/commons/resources";
import { setSidebar } from "src/stores/user";
import { routers } from "src/commons/routers";

import TopSearch from "../Sidebar/TopSearch";
import HeaderSearch from "./HeaderSearch";
import LoginButton from "./LoginButton";
import SelectNetwork from "./SelectNetwork";
import {
  HeaderBox,
  HeaderContainer,
  HeaderMain,
  HeaderTop,
  HeaderLogoLink,
  HeaderLogo,
  Title,
  SideBarRight,
  SearchButton,
  Toggle,
  NetworkContainer
} from "./styles";

const HIDDEN_HEADER_SEARCH_PATHS: string[] = [
  routers.STAKING_LIFECYCLE.replace(":tab", "stake-key"),
  routers.STAKING_LIFECYCLE.replace(":tab", "pools"),
  `/${routers.DELEGATOR_LIFECYCLE.split("/")[1]}/`,
  `/${routers.SPO_LIFECYCLE.split("/")[1]}/`
];

const Header: React.FC<RouteComponentProps> = (props) => {
  const { history } = props;
  const home = history.location.pathname === "/";
  const { sidebar } = useSelector(({ user }: RootState) => user);
  const [openSearch, setOpenSearch] = React.useState(false);
  const handleToggle = () => setSidebar(!sidebar);

  const pathMatched = HIDDEN_HEADER_SEARCH_PATHS.find((subPath: string) =>
    `${history.location.pathname}/`.includes(subPath)
  );

  const refElement = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = () => {
      setOpenSearch(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <HeaderContainer data-testid="header">
      <HeaderBox home={home ? 1 : 0}>
        <HeaderMain home={home ? 1 : 0}>
          <Title home={home ? 1 : 0} data-testid="home-title">
            Cardano Blockchain Explorer
          </Title>
          {!pathMatched && <HeaderSearch home={home} />}
        </HeaderMain>
        <HeaderTop data-testid="header-top">
          <HeaderLogoLink to="/" data-testid="header-logo">
            <HeaderLogo src={LogoIcon} alt="logo desktop" />
          </HeaderLogoLink>
          <SideBarRight>
            <NetworkContainer>
              <SelectNetwork />
            </NetworkContainer>
            <LoginButton />
            {history.location.pathname !== routers.STAKING_LIFECYCLE && (
              <SearchButton onClick={() => setOpenSearch((prev) => !prev)}>
                <SearchIcon fontSize={24} />
              </SearchButton>
            )}
            <Toggle onClick={handleToggle} />
          </SideBarRight>
        </HeaderTop>
      </HeaderBox>
      <Box ref={refElement}>
        <TopSearch open={openSearch} onClose={setOpenSearch} />
      </Box>
    </HeaderContainer>
  );
};

export default withRouter(Header);
