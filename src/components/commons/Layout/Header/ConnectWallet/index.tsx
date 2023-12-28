import React, { useCallback, useState, useEffect } from "react";
import { Backdrop, Box, useTheme } from "@mui/material";
import { useCardano } from "@cardano-foundation/cardano-connect-with-wallet";
import { NetworkType } from "@cardano-foundation/cardano-connect-with-wallet-core";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { AxiosError } from "axios";

import { WalletIconComponent } from "src/commons/resources";
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
import { ACCOUNT_ERROR, NETWORK, NETWORKS, NETWORK_TYPES } from "src/commons/utils/constants";
import { removeAuthInfo, validateTokenExpired } from "src/commons/utils/helper";
import useToast from "src/commons/hooks/useToast";
import ConnectedProfileOption from "src/components/commons/ConnectedProfileOption";
import ConnectWalletModal from "src/components/commons/ConnectWalletModal";

import { Span, Spin, StyledButton } from "./styles";
import RegisterUsernameModal from "../RegisterUsernameModal";
import SignMessageModal from "../SignMessageModal";

interface Props {
  customButton?: ({ handleClick }: { handleClick: () => void }) => React.ReactNode;
  onSuccess?: () => void;
}

const ConnectWallet: React.FC<Props> = ({ customButton, onSuccess }) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const { openModal, modalRegister, modalSignMessage, nonce } = useSelector(({ user }: RootState) => user);
  const { isEnabled, stakeAddress, isConnected, connect, signMessage, disconnect, enabledWallet } = useCardano({
    limitNetwork: NETWORK === NETWORKS.mainnet ? NetworkType.MAINNET : NetworkType.TESTNET
  });
  const isValidToken = validateTokenExpired();
  const [signature, setSignature] = React.useState("");
  const [submitting, setSubmitting] = useState(false);
  const [isSign, setIsSign] = useState(isValidToken);
  const [isSignP2P, setIsSignP2P] = React.useState(false);

  const handleSignP2P = () => {
    setIsSignP2P(!isSignP2P);
  };

  const handleCloseP2P = () => {
    setIsSignP2P(false);
  };

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
    } catch (error) {
      if (error instanceof AxiosError) {
        const message = t(error.response?.data?.errorCode || ACCOUNT_ERROR.INTERNAL_ERROR);
        toast.error(message);
        setModalSignMessage(false);
      }
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
          (signature: string) => handleSignIn(signature, nonceValue),
          () => {
            toast.error(t("message.user.rejected"));
            setModalSignMessage(false);
            disconnect();
            removeAuthInfo();
          }
        );
      }
    } catch (error) {
      toast.error(t("message.common.somethingWentWrong"));
    } finally {
      setSubmitting(false);
    }
  };

  if (isEnabled && stakeAddress && isSign && customButton) {
    return <>{customButton({ handleClick })}</>;
  }

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
        <Span>{t("common.reconnecting")}</Span>
      </StyledButton>
    );
  }

  return (
    <Box position="relative">
      <Backdrop sx={{ backgroundColor: "unset" }} open={openModal} onClick={() => setOpenModal(false)} />
      {customButton ? (
        customButton({ handleClick })
      ) : (
        <StyledButton
          sx={{
            background: theme.isDark ? theme.palette.primary.main : theme.palette.secondary.main
          }}
          type="button"
          onClick={handleClick}
        >
          <WalletIconComponent
            stroke={theme.mode === "light" ? theme.palette.secondary[0] : theme.palette.secondary[100]}
          />
          <Span sx={{ color: theme.isDark ? theme.palette.secondary[0] : theme.palette.secondary[700] }}>
            {t("account.connectWallet")}
          </Span>
        </StyledButton>
      )}
      {
        <ConnectWalletModal
          openModal={openModal}
          connect={connect}
          modalRegister={modalRegister}
          modalSignMessage={modalSignMessage}
          onTriggerSignMessage={() => setModalSignMessage(true)}
          handleSignP2P={handleSignP2P}
          handleCloseP2P={handleCloseP2P}
        />
      }
      <SignMessageModal
        open={modalSignMessage}
        handleCloseModal={() => {
          setModalSignMessage(false);
          disconnect();
          removeAuthInfo();
        }}
        onSignMessage={onSignMessage}
        loadingSubmit={submitting}
        isSignP2P={isSignP2P}
      />
      <RegisterUsernameModal open={modalRegister} nonce={nonce} signature={signature} setIsSign={setIsSign} />
    </Box>
  );
};

export default ConnectWallet;
