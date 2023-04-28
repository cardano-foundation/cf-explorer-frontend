import React from "react";
import { useSelector } from "react-redux";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { useWindowSize } from "react-use";
import HeaderSearch from "./HeaderSearch";
import LoginButton from "./LoginButton";
import SelectNetwork from "./SelectNetwork";
import { HeaderBox, HeaderContainer, HeaderMain, HeaderTop, Title } from "./styles";

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
        <LoginButton />
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
