import React, { useState } from "react";
import { useSelector } from "react-redux";
import { setOpenModal } from "../../../stores/user";
import { SUPPORTED_WALLETS } from "../../../commons/utils/constants";
import styles from "./index.module.scss";
import { useCardano } from "@cardano-foundation/cardano-connect-with-wallet";
import { RootState } from "../../../stores/types";
import { CircularProgress, Dialog, DialogTitle, IconButton } from "@mui/material";
import { IoMdClose } from "react-icons/io";

const ConnectWalletModal: React.FC = () => {
  const { connect } = useCardano();
  const { openModal } = useSelector(({ user }: RootState) => user);
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
    <Dialog
      onClose={walletConnecting ? undefined : handleClose}
      open={openModal}
      className={`${styles.connectModal} ${walletConnecting ? styles.connecting : ""}`}
      PaperProps={{ style: { borderRadius: 20 } }}
    >
      <div className={styles.connectContainer}>
        <DialogTitle className={styles.dialogTitle}>
          <h3 className={styles.title}>Connect to a Wallet</h3>
          <IconButton onClick={handleClose} className={styles.closeIcon}>
            <IoMdClose />
          </IconButton>
        </DialogTitle>
        {SUPPORTED_WALLETS.map(wallet => {
          return (
            <div
              key={wallet.name}
              className={`${styles.wallet} ${walletConnecting === wallet.name ? styles.selected : ""}`}
              onClick={() => (walletConnecting ? null : handleConnect(wallet.name))}
            >
              <img src={wallet.icon} alt={wallet.name} />
              {walletConnecting === wallet.name ? <CircularProgress className={styles.loading} /> : ""}
              <h4>{wallet.name}</h4>
            </div>
          );
        })}
      </div>
    </Dialog>
  );
};

export default ConnectWalletModal;
