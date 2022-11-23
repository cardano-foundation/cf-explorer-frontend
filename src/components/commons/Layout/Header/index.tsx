import React from "react";
import { NavLink, RouteComponentProps, useHistory, withRouter } from "react-router-dom";
import { LogoIcon } from "../../../../commons/resources";
import ConnectWalletModal from "../../ConnectWalletModal";
import ConnectWallet from "./ConnectWallet";
import HeaderMenu from "./HeaderMenu";
import HeaderSearch from "./HeaderSearch";
import styles from "./index.module.scss";

const Header: React.FC<RouteComponentProps> = props => {
  const { history } = props;
  return (
    <header className={history.location.pathname === "/" ? styles.home : styles.page}>
      <div className={styles.background} />
      <div className={styles.container}>
        <div className={styles.headerTop}>
          <NavLink to="/">
            <img src={LogoIcon} alt="logo" />
          </NavLink>
          <div className={styles.headerMenu}>
            <HeaderMenu />
            <ConnectWallet />
          </div>
        </div>
        <div className={styles.headerMain}>
          <h1>Cardano Block Chain Explorer</h1>
          <HeaderSearch />
        </div>
      </div>
      <ConnectWalletModal />
    </header>
  );
};

export default withRouter(Header);
