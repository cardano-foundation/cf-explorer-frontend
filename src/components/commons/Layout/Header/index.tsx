import React from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";
import ConnectWalletModal from "../../ConnectWalletModal";
import Container from "../../Container";
import ConnectWallet from "./ConnectWallet";
import HeaderSearch from "./HeaderSearch";
import SelectNetwork from "./SelectNetwork";
import { HeaderBackground, HeaderContainer, HeaderMain, HeaderTop, Title } from "./styles";

const Header: React.FC<RouteComponentProps> = props => {
  const { history } = props;
  const isHome = history.location.pathname === "/";

  return (
    <HeaderContainer>
      <HeaderBackground isHome={isHome} />
      <HeaderTop>
        <SelectNetwork />
        <ConnectWallet />
      </HeaderTop>
      <HeaderMain isHome={isHome}>
        <Title isHome={isHome}>Cardano Blockchain Explorer</Title>
        <HeaderSearch isHome={isHome} />
      </HeaderMain>
      <ConnectWalletModal />
    </HeaderContainer>
  );
};

export default withRouter(Header);
