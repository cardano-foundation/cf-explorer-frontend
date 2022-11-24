import React from "react";
import { useSelector } from "react-redux";
import { NavLink, RouteComponentProps, withRouter } from "react-router-dom";
import { LogoIcon } from "../../../../commons/resources";
import { RootState } from "../../../../stores/types";
import ConnectWalletModal from "../../ConnectWalletModal";
import ConnectWallet from "./ConnectWallet";
import HeaderMenu from "./HeaderMenu";
import HeaderSearch from "./HeaderSearch";
import styles from "./index.module.scss";
import SelectNetwork from "./SelectNetwork";

const Header: React.FC<RouteComponentProps> = props => {
  const { history } = props;
  const { network } = useSelector(({ user }: RootState) => user);
  return (
    <header className={history.location.pathname === "/" ? styles.home : styles.page}>
      <div className={styles.background} />
      <div className={styles.container}>
        <div className={styles.headerTop}>
          <NavLink to="/" className={styles.logo}>
            <img src={LogoIcon} alt="logo" />
            <small className={styles[network]}>{network}</small>
          </NavLink>
          <div className={styles.headerMenu}>
            <HeaderMenu />
            <SelectNetwork />
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
