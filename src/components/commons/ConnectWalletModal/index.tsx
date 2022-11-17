import React, { useState } from "react";
import { Modal, Spin } from "antd";
import { useSelector } from "react-redux";
import { setOpenModal } from "../../../stores/user";
import { SUPPORTED_WALLETS } from "../../../commons/utils/constants";
import styles from "./index.module.scss";
import { useCardano } from "@cardano-foundation/cardano-connect-with-wallet";
import { UserStoreType } from "../../../types/user";

const ConnectWalletModal: React.FC = () => {
  const { connect } = useCardano();
  const { openModal, theme } = useSelector(
    ({ user }: { user: UserStoreType }) => user
  );
  const [walletConnecting, setWalletConnecting] = useState<string | null>(null);

  const handleClose = () => {
    setOpenModal(false);
  };
  const onSuccess = () => {
    setWalletConnecting(null);
    setOpenModal(false);
  };
  const onError = (error: Error) => {
    setWalletConnecting(null);
  };
  const handleConnect = (walletName: string) => {
    setWalletConnecting(walletName);
    connect(walletName, onSuccess, onError);
  };

  return (
    <Modal
      open={openModal}
      onCancel={walletConnecting ? undefined : handleClose}
      footer={null}
      data-theme={theme}
      className={`${styles.connectModal} ${
        walletConnecting ? styles.connecting : ""
      }`}
    >
      <div className={styles.connectContainer}>
        <h3>Connect to a wallet</h3>
        {SUPPORTED_WALLETS.map((wallet) => {
          return (
            <div
              key={wallet.name}
              className={`${styles.wallet} ${
                walletConnecting === wallet.name ? styles.selected : ""
              }`}
              onClick={() =>
                walletConnecting ? null : handleConnect(wallet.name)
              }
            >
              <img src={wallet.icon} alt={wallet.name} />
              {walletConnecting === wallet.name ? (
                <Spin className={styles.loading} />
              ) : (
                ""
              )}
              <h4>{wallet.name}</h4>
            </div>
          );
        })}
      </div>
    </Modal>
  );
};

export default ConnectWalletModal;
