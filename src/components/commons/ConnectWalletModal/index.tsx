import React, { useState } from "react";
import { capitalize, isWalletInstalled } from "@cardano-foundation/cardano-connect-with-wallet-core";
import { CircularProgress } from "@mui/material";
import { IoMdClose } from "react-icons/io";
import { MdOutlineFileDownload } from "react-icons/md";
import { useTranslation } from "react-i18next";

import { setOpenModal, setWallet } from "src/stores/user";
import { NETWORK, SUPPORTED_WALLETS } from "src/commons/utils/constants";
import { SupportedWallets, Wallet } from "src/types/user";
import useToast from "src/commons/hooks/useToast";

import {
  CloseButton,
  ConnectOption,
  GroupFlex,
  InstallButton,
  Title,
  WalletIcon,
  WalletItem,
  WalletName,
  WrapContent
} from "./style";
import StyledModal from "../StyledModal";

interface IProps {
  connect: (name: string, onSuccess: () => void, onError: (error: Error) => void) => Promise<any>;
  onTriggerSignMessage: () => void;
  isModal?: boolean;
}

const ConnectWalletModal: React.FC<IProps> = ({ connect, onTriggerSignMessage, isModal }) => {
  const { t } = useTranslation();
  const [walletConnecting, setWalletConnecting] = useState<SupportedWallets | null>(null);
  const toast = useToast();
  const handleClose = () => {
    setOpenModal(false);
  };
  const onSuccess = () => {
    setWalletConnecting(null);
    setOpenModal(false);
    onTriggerSignMessage();
  };
  const onError = (error: Error, walletName: string) => {
    if (error.name === "WrongNetworkTypeError") {
      toast.error(
        t("message.changeNetwork", {
          wrongNetwork: NETWORK.charAt(0).toUpperCase() + NETWORK.slice(1).toLowerCase(),
          correctNetwork: NETWORK.charAt(0).toUpperCase() + NETWORK.slice(1).toLowerCase()
        })
      );
    } else if (error.name === "WalletExtensionNotFoundError") {
      toast.error(
        t("message.wallet.notFound", {
          walletName: capitalize(walletName)
        })
      );
    } else {
      toast.error(t("message.wallet.created", { walletName }));
    }
    setWalletConnecting(null);
  };
  const handleConnect = (walletName: SupportedWallets) => {
    setWalletConnecting(walletName);
    setWallet(walletName);
    connect(
      walletName,
      () => onSuccess(),
      (error: Error) => onError(error, walletName)
    );
  };
  const WrapContainer: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return isModal ? (
      <StyledModal
        open
        title={t("common.connect2wallet.title")}
        handleCloseModal={walletConnecting ? () => null : handleClose}
      >
        <WrapContent>{children}</WrapContent>
      </StyledModal>
    ) : (
      <ConnectOption>
        <WrapContent>
          <Title>{t("common.connect2wallet.title")}</Title>
          <CloseButton connecting={walletConnecting ? 1 : 0} onClick={walletConnecting ? undefined : handleClose}>
            <IoMdClose />
          </CloseButton>
          {children}
        </WrapContent>
      </ConnectOption>
    );
  };
  const handleOpenLink = (wallet: Wallet) => {
    window.open(wallet.link, "_blank");
  };
  return (
    <WrapContainer>
      <>
        {SUPPORTED_WALLETS.filter((wallet) => wallet.networks.includes(NETWORK)).map((wallet) => {
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
                    {t("common.notInstalled")} <MdOutlineFileDownload size={18} />
                  </InstallButton>
                ) : (
                  <i />
                )}
                <WalletIcon src={wallet.icon} alt={wallet.name} />
              </GroupFlex>
            </WalletItem>
          );
        })}
      </>
    </WrapContainer>
  );
};

export default ConnectWalletModal;
