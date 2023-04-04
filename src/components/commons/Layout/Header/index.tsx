import React from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";
import ConnectWallet from "./ConnectWallet";
import HeaderSearch from "./HeaderSearch";
import SelectNetwork from "./SelectNetwork";
import { HeaderBox, HeaderContainer, HeaderMain, HeaderTop, Title } from "./styles";

const Header: React.FC<RouteComponentProps> = props => {
  const { history } = props;
  const home = history.location.pathname === "/";

  return (
    <HeaderContainer>
      <HeaderBox home={home ? 1 : 0}>
        <HeaderMain home={home ? 1 : 0}>
          <Title home={home ? 1 : 0}>Cardano Blockchain Explorer</Title>
          <HeaderSearch home={home} />
        </HeaderMain>
        <HeaderTop>
          <SelectNetwork />
          <ConnectWallet />
        </HeaderTop>
      </HeaderBox>
    </HeaderContainer>
  );
};

export default withRouter(Header);
