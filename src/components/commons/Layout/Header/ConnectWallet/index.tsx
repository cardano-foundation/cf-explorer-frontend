import { NetworkType, useCardano } from "@cardano-foundation/cardano-connect-with-wallet";
import { Box } from "@mui/material";
import React, { useCallback, useState } from "react";
import { useSelector } from "react-redux";
import { WalletIcon } from "../../../../../commons/resources";
import { RootState } from "../../../../../stores/types";
import { setModalRegister, setModalSignMessage, setOpenModal } from "../../../../../stores/user";
import ConnectedProfileOption from "../../../ConnectedProfileOption";
import ConnectWalletModal from "../../../ConnectWalletModal";
import RegisterUsernameModal from "../RegisterUsernameModal";
import { Image, Span, Spin, StyledButton } from "./styles";
import BigNumber from "bignumber.js";
import { getNonce, signIn } from "../../../../../commons/utils/userRequest";
import { NETWORK, NETWORKS } from "../../../../../commons/utils/constants";
import { useHistory } from "react-router-dom";
import { routers } from "../../../../../commons/routers";
import SignMessageModal from "../SignMessageModal";
interface Props {}

const ConnectWallet: React.FC<Props> = () => {
  const { openModal, modalRegister, modalSignMessage } = useSelector(({ user }: RootState) => user);
  const history = useHistory();
  const { isEnabled, stakeAddress, isConnected, connect, signMessage, disconnect } = useCardano({
    limitNetwork: NETWORK === NETWORKS.mainnet ? NetworkType.MAINNET : NetworkType.TESTNET,
  });
  const [submitting, setSubmitting] = useState(false);

  const handleClick = () => {
    setOpenModal(!openModal);
  };

  const getNonceValue = useCallback(async () => {
    try {
      const response = await getNonce({ address: stakeAddress || "" });
      const converted = new BigNumber(response.data.toString());
      return converted.toString();
    } catch (error: any) {
      const errorStatus = error.response?.status;
      if (errorStatus === 400) {
        setModalRegister(true);
        setModalSignMessage(false);
      }
    }
  }, [stakeAddress]);

  const handleSignIn = async (signature: string) => {
    try {
      const payload = {
        address: stakeAddress || "",
        signature,
      };
      const response = await signIn(payload);
      const data = response.data;
      localStorage.setItem("token", data.token);
      localStorage.setItem("username", data.username);
      localStorage.setItem("refreshToken", data.refreshToken);
      localStorage.setItem("walletId", data.walletId);
      localStorage.setItem("email", data.email);
    } catch (error) {
    } finally {
      setModalRegister(false);
      setModalSignMessage(false);
    }
  };

  const onSignMessage = async () => {
    setSubmitting(true);
    const nonceValue = await getNonceValue();
    if (nonceValue) {
      await signMessage(nonceValue, handleSignIn, () => {
        disconnect();
        history.push(routers.HOME);
      });
    }
    setSubmitting(false);
  };

  return isEnabled && stakeAddress ? (
    <>
      <ConnectedProfileOption isConnected={isConnected} disconnect={disconnect} stakeAddress={stakeAddress} />
      <SignMessageModal
        open={modalSignMessage}
        handleCloseModal={() => {
          setModalSignMessage(false);
          disconnect();
        }}
        onSignMessage={onSignMessage}
        loadingSubmit={submitting}
      />
      <RegisterUsernameModal
        open={modalRegister}
        address={stakeAddress}
        onTriggerSignMessage={() => setModalSignMessage(true)}
      />
    </>
  ) : isConnected ? (
    <StyledButton type="button">
      <Spin size={20} />
      <Span>Re-Connecting</Span>
    </StyledButton>
  ) : (
    <Box position="relative">
      <StyledButton type="button" onClick={handleClick}>
        <Image src={WalletIcon} alt="wallet" />
        <Span>Connect Wallet</Span>
      </StyledButton>
      {openModal && <ConnectWalletModal connect={connect} onTriggerSignMessage={() => setModalSignMessage(true)} />}
    </Box>
  );
};

export default ConnectWallet;
