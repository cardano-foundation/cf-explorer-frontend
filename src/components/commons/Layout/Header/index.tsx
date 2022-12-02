import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { LogoIcon, LogoMobileIcon } from "../../../../commons/resources";
import { RootState } from "../../../../stores/types";
import ConnectWalletModal from "../../ConnectWalletModal";
import Container from "../../Container";
import ConnectWallet from "./ConnectWallet";
import HeaderMenu from "./HeaderMenu";
import HeaderSearch from "./HeaderSearch";
import SelectNetwork from "./SelectNetwork";
import {
  BackDrop,
  Collapse,
  HeaderBackground,
  HeaderBar,
  HeaderContainer,
  HeaderMain,
  HeaderTop,
  LogoDesktop,
  LogoLink,
  LogoMobile,
  NetworkName,
  Title,
} from "./styles";

const Header: React.FC<RouteComponentProps> = props => {
  const { history } = props;
  const { network } = useSelector(({ user }: RootState) => user);
  const [toggle, setToggle] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    setToggle(false);
  }, [history.location.pathname]);

  const handleToggle = () => setToggle(!toggle);

  const isHome = history.location.pathname === "/";

  return (
    <HeaderContainer>
      <HeaderBackground isHome={isHome} />
      <BackDrop isShow={toggle} onClick={handleToggle} />
      <HeaderTop ref={ref}>
        <Container>
          <LogoLink to="/">
            <LogoDesktop src={LogoIcon} alt="logo desktop" />
            <LogoMobile src={LogoMobileIcon} alt="logo mobile" />
            <NetworkName network={network}>{network}</NetworkName>
          </LogoLink>
          <Collapse onClick={handleToggle} />
          <HeaderBar active={toggle}>
            <HeaderMenu />
            <SelectNetwork />
            <ConnectWallet />
          </HeaderBar>
        </Container>
      </HeaderTop>
      <HeaderMain isHome={isHome}>
        <Container>
          <Title isHome={isHome}>Cardano Blockchain Explorer</Title>
          <HeaderSearch />
        </Container>
      </HeaderMain>
      <ConnectWalletModal />
    </HeaderContainer>
  );
};

export default withRouter(Header);
