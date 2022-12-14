import React from "react";
import { useSelector } from "react-redux";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { RootState } from "../../../../stores/types";
import ConnectWalletModal from "../../ConnectWalletModal";
import ConnectWallet from "./ConnectWallet";
import HeaderSearch from "./HeaderSearch";
import SelectNetwork from "./SelectNetwork";
import { HeaderBackground, HeaderBox, HeaderContainer, HeaderMain, HeaderTop, Title } from "./styles";

const Header: React.FC<RouteComponentProps> = props => {
  const { onDetailView } = useSelector(({ user }: RootState) => user);
  const { history } = props;
  const isHome = history.location.pathname === "/";

  return (
    <HeaderContainer isHome={isHome}>
      <HeaderBackground isHome={isHome} />
      <HeaderBox isHome={isHome}>
        <HeaderMain isHome={isHome}>
          <Title isHome={isHome}>Cardano Blockchain Explorer</Title>
          <HeaderSearch isHome={isHome} />
        </HeaderMain>
        <HeaderTop fixed={onDetailView}>
          <SelectNetwork />
          <ConnectWallet />
        </HeaderTop>
      </HeaderBox>
      <ConnectWalletModal />
    </HeaderContainer>
  );
};

export default withRouter(Header);
