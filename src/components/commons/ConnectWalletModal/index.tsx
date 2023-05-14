import React, { useState } from 'react';
import { setOpenModal, setWallet } from '../../../stores/user';
import { NETWORK, SUPPORTED_WALLETS } from '../../../commons/utils/constants';
import { CircularProgress } from '@mui/material';
import { IoMdClose } from 'react-icons/io';
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
} from './style';
import { SupportedWallets, Wallet } from '../../../types/user';
import { isWalletInstalled } from '@cardano-foundation/cardano-connect-with-wallet';
import { MdOutlineFileDownload } from 'react-icons/md';
import useToast from '../../../commons/hooks/useToast';
import StyledModal from '../StyledModal';

interface IProps {
  connect: (name: string, onSuccess: () => void, onError: (error: Error) => void) => Promise<any>;
  onTriggerSignMessage: () => void;
  isModal?: boolean;
}

const ConnectWalletModal: React.FC<IProps> = ({ connect, onTriggerSignMessage, isModal }) => {
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
  const onError = (error: Error) => {
    if (error.name === 'EnablementFailedError') {
      toast.error(
        `You are currently connect to ${
          NETWORK.charAt(0).toUpperCase() + NETWORK.slice(1).toLowerCase()
        }, please switch to  ${NETWORK.charAt(0).toUpperCase() + NETWORK.slice(1).toLowerCase()}!`
      );
    } else if (error.name === 'WalletExtensionNotFoundError') {
      throw new Error('WalletExtensionNotFoundError');
    } else {
      toast.error('Something went wrong!');
    }
    setWalletConnecting(null);
  };
  const handleConnect = (walletName: SupportedWallets) => {
    setWalletConnecting(walletName);
    setWallet(walletName);
    connect(walletName, () => onSuccess(), onError);
  };
  const WrapContainer: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return isModal ? (
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      <StyledModal open title='Connect to a wallet' handleCloseModal={walletConnecting ? () => {} : handleClose}>
        <WrapContent>{children}</WrapContent>
      </StyledModal>
    ) : (
      <ConnectOption>
        <WrapContent>
          <Title>Connect to a wallet</Title>
          <CloseButton connecting={walletConnecting ? 1 : 0} onClick={walletConnecting ? undefined : handleClose}>
            <IoMdClose />
          </CloseButton>
          {children}
        </WrapContent>
      </ConnectOption>
    );
  };
  const handleOpenLink = (wallet: Wallet) => {
    window.open(wallet.link, '_blank');
  };
  return (
    <WrapContainer>
      <>
        {SUPPORTED_WALLETS.map((wallet) => {
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
                {active ? <CircularProgress size={30} /> : ''}
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
      </>
    </WrapContainer>
  );
};

export default ConnectWalletModal;
