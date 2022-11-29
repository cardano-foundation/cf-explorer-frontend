import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { NavLink, RouteComponentProps, withRouter } from "react-router-dom";
import { LogoIcon, LogoMobileIcon } from "../../../../commons/resources";
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
  const [toggle, setToggle] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    setToggle(false);
  }, [history.location.pathname]);

  useEffect(() => {
    const handleClickBody = (e: Event) => {
      const target = e.target as Element;
      if (!ref.current?.contains(target)) {
        setToggle(false);
      }
    };
    document.addEventListener("click", handleClickBody, true);
    return () => {
      document.removeEventListener("click", handleClickBody, true);
    };
  }, []);

  return (
    <header className={history.location.pathname === "/" ? styles.home : styles.page}>
      <div className={styles.background} />
      <div className={styles.headerTop} ref={ref}>
        <div className={styles.container}>
          <NavLink to="/" className={styles.logo}>
            <img className={styles.logoMobile} src={LogoMobileIcon} alt="logo mobile" />
            <img className={styles.logoDesktop} src={LogoIcon} alt="logo desktop" />
            <small className={styles[network]}>{network}</small>
          </NavLink>
          <i className={styles.collapse} onClick={() => setToggle(!toggle)} />
          <div className={`${styles.headerMenu} ${toggle ? styles.active : ""}`}>
            <HeaderMenu />
            <SelectNetwork />
            <ConnectWallet />
          </div>
        </div>
      </div>
      <div className={styles.headerMain}>
        <div className={styles.container}>
          <h1>Cardano Blockchain Explorer</h1>
          <HeaderSearch />
        </div>
      </div>
      <ConnectWalletModal />
    </header>
  );
};

export default withRouter(Header);
