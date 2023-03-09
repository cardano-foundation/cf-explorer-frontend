import React, { useState } from "react";
import { setOpenModal, setWallet } from "../../../stores/user";
import { NETWORK, SUPPORTED_WALLETS } from "../../../commons/utils/constants";
import { CircularProgress } from "@mui/material";
import { IoMdClose } from "react-icons/io";
import {
  CloseButton,
  ConnectOption,
  GroupFlex,
  InstallButton,
  Title,
  WalletIcon,
  WalletItem,
  WalletName,
  WrapContent,
} from "./style";
import { SupportedWallets, Wallet } from "../../../types/user";
import { isWalletInstalled } from "@cardano-foundation/cardano-connect-with-wallet";
import { MdOutlineFileDownload } from "react-icons/md";
import Toast from "../Toast";

interface IProps {
  connect: (name: string, onSuccess: () => void, onError: (error: Error) => void) => Promise<any>;
  onTriggerSignMessage: () => void;
}
const ConnectWalletModal: React.FC<IProps> = ({ connect, onTriggerSignMessage }) => {
  const [walletConnecting, setWalletConnecting] = useState<SupportedWallets | null>(null);
  const [message, setMessage] = React.useState("");
  const handleCloseToast = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    setMessage("");
  };
  const handleClose = () => {
    setOpenModal(false);
  };
  const onSuccess = () => {
    setWalletConnecting(null);
    setOpenModal(false);
    onTriggerSignMessage();
  };
  const onError = (error: Error) => {
    if (error.name === "EnablementFailedError") {
      setMessage(`You are currently connect to ${NETWORK}, please switch to  ${NETWORK}!`);
    } else {
      setMessage("Something went wrong!");
    }
    setWalletConnecting(null);
  };
  const handleConnect = (walletName: SupportedWallets) => {
    setWalletConnecting(walletName);
    setWallet(walletName);
    connect(walletName, () => onSuccess(), onError);
  };

  const handleOpenLink = (wallet: Wallet) => {
    window.open(wallet.link, "_blank");
  };
  return (
    <ConnectOption>
      <WrapContent>
        <Title>Connect to a wallet</Title>
        <CloseButton connecting={walletConnecting ? 1 : 0} onClick={walletConnecting ? undefined : handleClose}>
          <IoMdClose />
        </CloseButton>
        {SUPPORTED_WALLETS.map(wallet => {
          const active = walletConnecting === wallet.name;
          return (
            <WalletItem
              key={wallet.name}
              active={active ? 1 : 0}
              connecting={walletConnecting ? 1 : 0}
              onClick={() => !walletConnecting && handleConnect(wallet.name)}
            >
              <GroupFlex>
                <WalletName>{wallet.name}</WalletName>
                {active ? <CircularProgress size={30} /> : ""}
              </GroupFlex>
              <GroupFlex>
                {!isWalletInstalled(wallet.name.toLocaleLowerCase()) ? (
                  <InstallButton onClick={() => handleOpenLink(wallet)}>
                    Not Installed <MdOutlineFileDownload size={18} />
                  </InstallButton>
                ) : (
                  <i />
                )}
                <WalletIcon src={wallet.icon} alt={wallet.name} />
              </GroupFlex>
            </WalletItem>
          );
        })}
      </WrapContent>
      <Toast open={!!message} onClose={handleCloseToast} messsage={message} severity={"error"} />
    </ConnectOption>
  );
};

export default ConnectWalletModal;
