import React, { useCallback, useState, useEffect } from "react";
import { Backdrop, Box } from "@mui/material";
import { useCardano } from "@cardano-foundation/cardano-connect-with-wallet";
import { NetworkType } from "@cardano-foundation/cardano-connect-with-wallet-core";
import { useSelector } from "react-redux";
import { hotjar } from "react-hotjar";

import { WalletIcon } from "src/commons/resources";
import { RootState } from "src/stores/types";
import {
  setModalRegister,
  setModalSignMessage,
  setOpenModal,
  setNonce,
  setAddress,
  setUserData
} from "src/stores/user";
import { getInfo, getNonce, signIn } from "src/commons/utils/userRequest";
import { NETWORK, NETWORKS, NETWORK_TYPES } from "src/commons/utils/constants";
import { removeAuthInfo, validateTokenExpired } from "src/commons/utils/helper";
import useToast from "src/commons/hooks/useToast";
import ConnectedProfileOption from "src/components/commons/ConnectedProfileOption";
import ConnectWalletModal from "src/components/commons/ConnectWalletModal";

import { Image, Span, Spin, StyledButton } from "./styles";
import RegisterUsernameModal from "../RegisterUsernameModal";
import SignMessageModal from "../SignMessageModal";

interface Props {
  customButton?: ({ handleClick }: { handleClick: () => void }) => React.ReactNode;
  onSuccess?: () => void;
}

const ConnectWallet: React.FC<Props> = ({ customButton, onSuccess }) => {
  const { openModal, modalRegister, modalSignMessage, nonce } = useSelector(({ user }: RootState) => user);
  const { isEnabled, stakeAddress, isConnected, connect, signMessage, disconnect, enabledWallet } = useCardano({
    limitNetwork: NETWORK === NETWORKS.mainnet ? NetworkType.MAINNET : NetworkType.TESTNET
  });
  const isValidToken = validateTokenExpired();
  const [signature, setSignature] = React.useState("");
  const [submitting, setSubmitting] = useState(false);
  const [isSign, setIsSign] = useState(isValidToken);
  const toast = useToast();

  useEffect(() => {
    window.onbeforeunload = function () {
      if (!localStorage.getItem("token")) {
        disconnect();
        removeAuthInfo();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClick = () => {
    setOpenModal(!openModal);
  };

  const getNonceValue = useCallback(async () => {
    try {
      const response = await getNonce({ address: stakeAddress || "", walletName: enabledWallet?.toUpperCase() || "" });
      return response.data;
    } catch (error: any) {
      toast.error(error.data?.errorMessage || "Something went wrong!");
      setModalSignMessage(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stakeAddress]);

  const handleSignIn = async (signature: string, nonce: NonceObject | null) => {
    try {
      setSignature(signature);
      if (nonce?.nonce) {
        const payload = {
          address: stakeAddress || "",
          signature,
          type: 1
        };
        const response = await signIn(payload);
        hotjar.event("Wallet signed in successfully!");
        setIsSign(true);
        const data = response.data;

        localStorage.setItem("token", data.token);
        localStorage.setItem("username", data.username);
        localStorage.setItem("refreshToken", data.refreshToken);
        localStorage.setItem("walletId", data.address);
        localStorage.setItem("email", data.email);
        localStorage.setItem("loginType", "connectWallet");
        const userInfo = await getInfo({ network: NETWORK_TYPES[NETWORK] });
        setUserData({ ...userInfo.data, loginType: "connectWallet" });
      } else {
        setAddress(stakeAddress);
        setModalRegister(true);
      }
      onSuccess?.();
    } catch (error) {
      disconnect();
      removeAuthInfo();
      hotjar.event("Wallet signing unsuccessful!");
    } finally {
      setModalSignMessage(false);
    }
  };

  const onSignMessage = async () => {
    setSubmitting(true);
    try {
      const nonceValue = await getNonceValue();
      if (nonceValue) {
        setNonce(nonceValue);
        await signMessage(
          nonceValue.nonce,
          (signature: any) => handleSignIn(signature, nonceValue),
          () => {
            toast.error("User rejected the request!");
            setModalSignMessage(false);
            disconnect();
            removeAuthInfo();
          }
        );
      }
    } catch (error) {
      toast.error("Something went wrong!");
      hotjar.event("Wallet signing message unsuccessful!");
    } finally {
      setSubmitting(false);
    }
  };
  if (isEnabled && stakeAddress && isSign) {
    return (
      <>
        <ConnectedProfileOption isConnected={isConnected} disconnect={disconnect} stakeAddress={stakeAddress} />
      </>
    );
  }

  if (isConnected && isSign) {
    return (
      <StyledButton type="button">
        <Spin size={20} />
        <Span>Reconnecting</Span>
      </StyledButton>
    );
  }

  return (
    <Box position="relative">
      <Backdrop sx={{ backgroundColor: "unset" }} open={openModal} onClick={() => setOpenModal(false)} />
      {customButton ? (
        customButton({ handleClick })
      ) : (
        <StyledButton type="button" onClick={handleClick}>
          <Image src={WalletIcon} alt="wallet" />
          <Span>Connect Wallet</Span>
        </StyledButton>
      )}
      {openModal && (
        <ConnectWalletModal
          isModal={!!customButton}
          connect={connect}
          onTriggerSignMessage={() => setModalSignMessage(true)}
        />
      )}
      <SignMessageModal
        open={modalSignMessage}
        handleCloseModal={() => {
          setModalSignMessage(false);
          disconnect();
          removeAuthInfo();
        }}
        onSignMessage={onSignMessage}
        loadingSubmit={submitting}
      />
      <RegisterUsernameModal open={modalRegister} nonce={nonce} signature={signature} setIsSign={setIsSign} />
    </Box>
  );
};

export default ConnectWallet;
