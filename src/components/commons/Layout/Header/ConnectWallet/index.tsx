import { useCardano } from "@cardano-foundation/cardano-connect-with-wallet";
import { Button, Spin } from "antd";
import React from "react";
import { WalletIcon } from "../../../../../commons/resources";
import { getShortWallet } from "../../../../../commons/utils/helper";
import { setOpenModal } from "../../../../../stores/user";
import styles from "./index.module.scss";

interface Props {}

const ConnectWallet: React.FC<Props> = () => {
  const { isEnabled, stakeAddress, isConnected } = useCardano();
  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    setOpenModal(true);
  };

  return isEnabled && stakeAddress ? (
    <Button htmlType="button" className={styles.connectWallet}>
      <span>{getShortWallet(stakeAddress)}</span>
    </Button>
  ) : isConnected ? (
    <Button htmlType="button" className={styles.connectWallet}>
      <Spin className={styles.loading} />
      <span>Re-Connecting</span>
    </Button>
  ) : (
    <Button htmlType="button" className={styles.connectWallet} onClick={handleClick}>
      <img src={WalletIcon} alt="wallet" />
      <span>Connect Wallet</span>
    </Button>
  );
};

export default ConnectWallet;
