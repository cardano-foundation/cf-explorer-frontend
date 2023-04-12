import React from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";
import ConnectWallet from "./ConnectWallet";
import HeaderSearch from "./HeaderSearch";
import SelectNetwork from "./SelectNetwork";
import { HeaderBox, HeaderContainer, HeaderMain, HeaderTop, Title } from "./styles";
import { useWindowSize } from "react-use";
import { useSelector } from "react-redux";

const Header: React.FC<RouteComponentProps> = props => {
  const { history } = props;
  const home = history.location.pathname === "/";
  const { onDetailView } = useSelector(({ user }: RootState) => user);
  const { width } = useWindowSize();

  const renderNetwork = () => {
    if (onDetailView && width < 1458) {
      return <></>;
    }
    return (
      <HeaderTop>
        <SelectNetwork />
        <ConnectWallet />
      </HeaderTop>
    );
  };

  return (
    <HeaderContainer>
      <HeaderBox home={home ? 1 : 0}>
        <HeaderMain home={home ? 1 : 0}>
          <Title home={home ? 1 : 0}>Cardano Blockchain Explorer</Title>
          <HeaderSearch home={home} />
        </HeaderMain>
        {renderNetwork()}
      </HeaderBox>
    </HeaderContainer>
  );
};

export default withRouter(Header);
