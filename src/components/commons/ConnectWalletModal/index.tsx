import React, { useState } from "react";
import { setOpenModal } from "../../../stores/user";
import { SUPPORTED_WALLETS } from "../../../commons/utils/constants";
import { useCardano } from "@cardano-foundation/cardano-connect-with-wallet";
import { CircularProgress } from "@mui/material";
import { IoMdClose } from "react-icons/io";
import { CloseButton, ConnectOption, Title, WalletIcon, WalletItem, WalletName, WrapContent } from "./style";
import { SupportedWallets } from "../../../types/user";

const ConnectWalletModal: React.FC = () => {
  const { connect } = useCardano();
  const [walletConnecting, setWalletConnecting] = useState<SupportedWallets | null>(null);

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
  const handleConnect = (walletName: SupportedWallets) => {
    setWalletConnecting(walletName);
    connect(walletName, onSuccess, onError);
  };

  return (
    <ConnectOption>
      <WrapContent>
        <Title>Connect to a Wallet</Title>
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
              <WalletIcon src={wallet.icon} alt={wallet.name} />
              {active ? <CircularProgress size={30} /> : ""}
              <WalletName>{wallet.name}</WalletName>
            </WalletItem>
          );
        })}
      </WrapContent>
    </ConnectOption>
  );
};

export default ConnectWalletModal;
