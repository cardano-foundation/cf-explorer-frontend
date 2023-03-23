import React from "react";
import { useSelector } from "react-redux";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { RootState } from "../../../../stores/types";
import ConnectWallet from "./ConnectWallet";
import HeaderSearch from "./HeaderSearch";
import SelectNetwork from "./SelectNetwork";
import { HeaderBackground, HeaderBox, HeaderContainer, HeaderMain, HeaderTop, Title } from "./styles";

const Header: React.FC<RouteComponentProps> = props => {
  const { onDetailView } = useSelector(({ user }: RootState) => user);
  const { history } = props;
  const home = history.location.pathname === "/";

  return (
    <HeaderContainer home={home ? 1 : 0}>
      <HeaderBackground home={home ? 1 : 0} />
      <HeaderBox home={home ? 1 : 0}>
        <HeaderMain home={home ? 1 : 0}>
          <Title home={home ? 1 : 0}>Cardano Blockchain Explorer</Title>
          <HeaderSearch home={home} />
        </HeaderMain>
        <HeaderTop fixed={onDetailView ? 1 : 0}>
          <SelectNetwork home={home} />
          <ConnectWallet />
        </HeaderTop>
      </HeaderBox>
    </HeaderContainer>
  );
};

export default withRouter(Header);
