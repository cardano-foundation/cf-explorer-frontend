import React from "react";
import { useSelector } from "react-redux";
import { RouteComponentProps, withRouter } from "react-router-dom";
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
import { LogoIcon, SearchIcon } from "src/commons/resources";
import TopSearch from "../Sidebar/TopSearch";
import { setSidebar } from "src/stores/user";

const Header: React.FC<RouteComponentProps> = (props) => {
  const { history } = props;

  const home = history.location.pathname === "/";
  const { sidebar, onDetailView } = useSelector(({ user }: RootState) => user);
  const [openSearch, setOpenSearch] = React.useState(false);
  const handleToggle = () => setSidebar(!sidebar);

  return (
    <HeaderContainer>
      <HeaderBox home={home ? 1 : 0}>
        <HeaderMain home={home ? 1 : 0}>
          <Title home={home ? 1 : 0}>Cardano Blockchain Explorer</Title>
          <HeaderSearch home={home} />
        </HeaderMain>
        <HeaderTop collasped={+onDetailView}>
          <HeaderLogoLink to='/'>
            <HeaderLogo src={LogoIcon} alt='logo desktop' />
          </HeaderLogoLink>
          <SideBarRight>
            <NetworkContainer>
              <SelectNetwork />
            </NetworkContainer>
            <LoginButton />
            <SearchButton home={+home} onClick={() => setOpenSearch((prev) => !prev)}>
              <SearchIcon fontSize={24} />
            </SearchButton>
            <Toggle onClick={handleToggle} />
          </SideBarRight>
        </HeaderTop>
      </HeaderBox>
      <TopSearch open={openSearch} onClose={setOpenSearch} />
    </HeaderContainer>
  );
};

export default withRouter(Header);
