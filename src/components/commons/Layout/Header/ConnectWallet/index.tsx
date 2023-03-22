import React, { useCallback, useState, useEffect } from "react";
import { Box } from "@mui/material";
import { NetworkType, useCardano } from "@cardano-foundation/cardano-connect-with-wallet";
import { useSelector } from "react-redux";
import { WalletIcon } from "../../../../../commons/resources";
import { RootState } from "../../../../../stores/types";
import { setModalRegister, setModalSignMessage, setOpenModal, setNonce, setAddress } from "../../../../../stores/user";
import ConnectedProfileOption from "../../../ConnectedProfileOption";
import ConnectWalletModal from "../../../ConnectWalletModal";
import RegisterUsernameModal from "../RegisterUsernameModal";
import { Image, Span, Spin, StyledButton } from "./styles";
import { getAllBookmarks, getNonce, signIn } from "../../../../../commons/utils/userRequest";
import { NETWORK, NETWORKS, NETWORK_TYPES } from "../../../../../commons/utils/constants";
import SignMessageModal from "../SignMessageModal";
import SyncBookmarkModal from "../SyncBookmarkModal";
import { useLocalStorage } from "react-use";
import { BookMark } from "../../../../../types/bookmark";
import { removeAuthInfo } from "../../../../../commons/utils/helper";
import useToast from "../../../../../commons/hooks/useToast";
interface Props {}

const ConnectWallet: React.FC<Props> = () => {
  const { openModal, modalRegister, modalSignMessage, nonce } = useSelector(({ user }: RootState) => user);
  const { isEnabled, stakeAddress, isConnected, connect, signMessage, disconnect } = useCardano({
    limitNetwork: NETWORK === NETWORKS.mainnet ? NetworkType.MAINNET : NetworkType.TESTNET,
  });
  const [, setBookmark] = useLocalStorage<BookMark[]>("bookmark", []);

  const [openSyncBookmark, setOpenSyncBookmark] = useState(false);
  const [signature, setSignature] = React.useState("");
  const [submitting, setSubmitting] = useState(false);
  const [isSign, setIsSign] = useState(isConnected);
  const toast = useToast();

  useEffect(() => {
    window.onbeforeunload = function () {
      if (!localStorage.getItem("token")) {
        disconnect();
        removeAuthInfo();
      }
    };
  }, []);

  const handleClick = () => {
    setOpenModal(!openModal);
  };

  const getNonceValue = useCallback(async () => {
    try {
      const response = await getNonce({ address: stakeAddress || "" });
      return response.data;
    } catch (error: any) {
      toast.error(error.data?.errorMessage || "Something went wrong!");
      setModalSignMessage(false);
    }
  }, [stakeAddress]);

  const handleSignIn = async (signature: string, nonce: NonceObject | null) => {
    try {
      setSignature(signature);
      if (nonce?.message === "SS_0") {
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
      } else {
        setAddress(stakeAddress);
        setModalRegister(true);
      }
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
          signature => handleSignIn(signature, nonceValue),
          (error: Error) => {
            toast.error("User rejected the request!");
            setModalSignMessage(false);
            disconnect();
            removeAuthInfo();
          }
        );
      }
    } catch (error) {
      toast.error("Something went wrong!");
    } finally {
      setSubmitting(false);
    }
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
          removeAuthInfo();
        }}
        onSignMessage={onSignMessage}
        loadingSubmit={submitting}
      />
      <RegisterUsernameModal
        open={modalRegister}
        nonce={nonce}
        signature={signature} 
        setIsSign={setIsSign}
      />
    </Box>
  );
};

export default ConnectWallet;
