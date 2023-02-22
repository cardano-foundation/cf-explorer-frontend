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
import { getAllBookmarks, getNonce, signIn } from "../../../../../commons/utils/userRequest";
import { NETWORK, NETWORKS, NETWORK_TYPES } from "../../../../../commons/utils/constants";
import { useHistory } from "react-router-dom";
import { routers } from "../../../../../commons/routers";
import SignMessageModal from "../SignMessageModal";
import SyncBookmarkModal from "../SyncBookmarkModal";
import { useLocalStorage } from "react-use";
import useFetch from "../../../../../commons/hooks/useFetch";
import { BookMark } from "../../../../../types/bookmark";
import Toast from "../../../Toast";
interface Props {}

const ConnectWallet: React.FC<Props> = () => {
  const { openModal, modalRegister, modalSignMessage } = useSelector(({ user }: RootState) => user);
  const history = useHistory();
  const { isEnabled, stakeAddress, isConnected, connect, signMessage, disconnect } = useCardano({
    limitNetwork: NETWORK === NETWORKS.mainnet ? NetworkType.MAINNET : NetworkType.TESTNET,
  });
  const [, setBookmark] = useLocalStorage<BookMark[]>("bookmark", []);

  const [openSyncBookmark, setOpenSyncBookmark] = useState(false);
  const [message, setMessage] = React.useState("");
  const [submitting, setSubmitting] = useState(false);
  const [isSign, setIsSign] = useState(isConnected);

  const handleCloseToast = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }

    setMessage("");
  };

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
      setIsSign(true);
      const data = response.data;
      localStorage.setItem("token", data.token);
      localStorage.setItem("username", data.username);
      localStorage.setItem("refreshToken", data.refreshToken);
      localStorage.setItem("walletId", data.walletId);
      localStorage.setItem("email", data.email);
      if ((((JSON.parse(localStorage?.bookmark) as BookMark[]) || [])?.filter(r => !r.id) || []).length > 0) {
        setOpenSyncBookmark(true);
      } else {
        const { data } = await getAllBookmarks(NETWORK_TYPES[NETWORK]);
        if (data) {
          setBookmark(data);
        }
      }
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
      await signMessage(nonceValue, handleSignIn, (error: Error) => {
        setMessage("User rejected the request!");
        setModalSignMessage(false);
        disconnect();
      });
    }
    setSubmitting(false);
  };

  if (isEnabled && stakeAddress && isSign) {
    return (
      <>
        <ConnectedProfileOption isConnected={isConnected} disconnect={disconnect} stakeAddress={stakeAddress} />

        <SyncBookmarkModal
          open={openSyncBookmark}
          handleCloseModal={() => {
            setOpenSyncBookmark(false);
          }}
          loadingSubmit={submitting}
        />
        <RegisterUsernameModal
          open={modalRegister}
          address={stakeAddress}
          onTriggerSignMessage={() => setModalSignMessage(true)}
        />
      </>
    );
  }

  if (isConnected && isSign) {
    return (
      <StyledButton type="button">
        <Spin size={20} />
        <Span>Re-Connecting</Span>
      </StyledButton>
    );
  }

  return (
    <Box position="relative">
      <StyledButton type="button" onClick={handleClick}>
        <Image src={WalletIcon} alt="wallet" />
        <Span>Connect Wallet</Span>
      </StyledButton>
      {openModal && <ConnectWalletModal connect={connect} onTriggerSignMessage={() => setModalSignMessage(true)} />}
      <SignMessageModal
        open={modalSignMessage}
        handleCloseModal={() => {
          setModalSignMessage(false);
          disconnect();
        }}
        onSignMessage={onSignMessage}
        loadingSubmit={submitting}
      />
      <Toast open={!!message} onClose={handleCloseToast} messsage={message} severity={"error"} />
    </Box>
  );
};

export default ConnectWallet;
