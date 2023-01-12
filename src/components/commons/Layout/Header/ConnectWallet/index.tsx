import { NetworkType, useCardano } from "@cardano-foundation/cardano-connect-with-wallet";
import { Box } from "@mui/material";
import React, { useCallback, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { WalletIcon } from "../../../../../commons/resources";
import { RootState } from "../../../../../stores/types";
import { setModalRegister, setOpenModal } from "../../../../../stores/user";
import ConnectedProfileOption from "../../../ConnectedProfileOption";
import ConnectWalletModal from "../../../ConnectWalletModal";
import RegisterUsernameModal from "../RegisterUsernameModal";
import { Image, Span, Spin, StyledButton } from "./styles";
import BigNumber from "bignumber.js";
import { removeAuthInfo } from "../../../../../commons/utils/helper";
import { authAxios } from "../../../../../commons/utils/axios";
interface Props {}

const ConnectWallet: React.FC<Props> = () => {
  const { network, openModal, modalRegister } = useSelector(({ user }: RootState) => user);
  const buttonRef = useRef(null);
  const { isEnabled, stakeAddress, isConnected, connect, signMessage, disconnect } = useCardano({
    limitNetwork: network === "mainnet" ? NetworkType.MAINNET : NetworkType.TESTNET,
  });

  const handleClick = () => {
    setOpenModal(!openModal);
  };

  useEffect(() => {
    disconnect();
    removeAuthInfo();
  }, [network, disconnect]);

  const getNonceValue = useCallback(async () => {
    try {
      const response = await authAxios.get("user/get-nonce", { params: { address: stakeAddress } });
      const converted = new BigNumber(response.data.toString());
      return converted.toString();
    } catch (error: any) {
      const errorStatus = error.response?.status;
      if (errorStatus === 400) {
        setModalRegister(true);
      }
    }
  }, [stakeAddress]);

  const handleSignIn = async (signature: string) => {
    try {
      const payload = {
        address: stakeAddress,
        signature,
        ipAddress: "testip",
      };
      const response = await authAxios.post("auth/sign-in", payload);
      const data = response.data;
      localStorage.setItem("token", data.token);
      localStorage.setItem("username", data.username);
      localStorage.setItem("refreshToken", data.refreshToken);
      localStorage.setItem("walletId", data.walletId);
      localStorage.setItem("email", data.email);
    } catch (error) {}
  };

  const onTriggerSignMessage = () => {
    setTimeout(() => {
      (buttonRef.current as any).click();
    }, 100);
  };

  const onSignMessage = async () => {
    const nonceValue = await getNonceValue();
    if (nonceValue) {
      signMessage(
        nonceValue,
        (signature: string) => {
          handleSignIn(signature);
        },
        () => {
          disconnect();
        }
      );
    }
  };

  return isEnabled && stakeAddress ? (
    <>
      <ConnectedProfileOption isConnected={isConnected} disconnect={disconnect} stakeAddress={stakeAddress} />
      <button onClick={onSignMessage} ref={buttonRef} hidden={true} />
      <RegisterUsernameModal open={modalRegister} address={stakeAddress} onTriggerSignMessage={onTriggerSignMessage} />
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
      {openModal && <ConnectWalletModal connect={connect} onTriggerSignMessage={onTriggerSignMessage} />}
    </Box>
  );
};

export default ConnectWallet;
