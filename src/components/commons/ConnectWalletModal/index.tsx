import React, { useState } from "react";
import { Modal, Spin } from "antd";
import { useSelector } from "react-redux";
import { setOpenModal } from "../../../stores/user";
import { SUPPORTED_WALLETS } from "../../../commons/utils/constants";
import styles from "./index.module.scss";
import { useCardano } from "@cardano-foundation/cardano-connect-with-wallet";
import { RootState } from "../../../stores/types";

const ConnectWalletModal: React.FC = () => {
  const { connect } = useCardano();
  const { openModal, theme } = useSelector(({ user }: RootState) => user);
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
<<<<<<< HEAD
              className={`${styles.wallet} ${walletConnecting === wallet.name ? styles.selected : ""}`}
              onClick={() => (walletConnecting ? null : handleConnect(wallet.name))}
=======
              className={`${styles.wallet} ${
                walletConnecting === wallet.name ? styles.selected : ""
              }`}
              onClick={() =>
                walletConnecting ? null : handleConnect(wallet.name)
              }
>>>>>>> d3d14c148c7a3049619e4d2e4d335fe809103dff
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
