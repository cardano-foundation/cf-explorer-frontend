import { useCardano } from "@cardano-foundation/cardano-connect-with-wallet";
import { NetworkType, isWalletInstalled } from "@cardano-foundation/cardano-connect-with-wallet-core";
import { Box, CircularProgress, Input } from "@mui/material";
import moment from "moment";
import { ReactElement, useEffect, useState } from "react";
import { MdOutlineFileDownload } from "react-icons/md";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { AxiosError } from "axios";

import { useScreen } from "src/commons/hooks/useScreen";
import useToast from "src/commons/hooks/useToast";
import { ACCOUNT_ERROR, NETWORK, NETWORKS, NETWORK_TYPES, SUPPORTED_WALLETS } from "src/commons/utils/constants";
import { getShortWallet } from "src/commons/utils/helper";
import { editInfo, getInfo } from "src/commons/utils/userRequest";
import {
  GroupFlex,
  InstallButton,
  Title,
  WalletIcon,
  WalletItem,
  WalletName
} from "src/components/commons/ConnectWalletModal/style";
import StyledModal from "src/components/commons/StyledModal";
import { RootState } from "src/stores/types";
import { setUserData } from "src/stores/user";
import { SupportedWallets, Wallet } from "src/types/user";

import { Label, StyledAction, StyledRowItem, Value, WrapInfoItemMobile } from "./styles";

export type TRowItem = {
  label: string;
  value?: string | ReactElement;
  action?: ReactElement;
  isTablet?: boolean;
  isInput?: boolean;
  placeholder?: string;
  valueInput?: string;
  setvalueInput?: (v: string) => void;
};

export const RowItem: React.FC<TRowItem> = ({
  label,
  value,
  action,
  isTablet,
  isInput = false,
  placeholder,
  setvalueInput,
  valueInput
}) => {
  return isTablet ? (
    <StyledRowItem justifyContent={"space-between"}>
      <WrapInfoItemMobile data-testid="mobile-wraper">
        <Label>{label}</Label>
        {isInput ? <Box component={Input} width={"100%"} placeholder={placeholder || ""} /> : <Value>{value}</Value>}
      </WrapInfoItemMobile>
      <StyledAction>{action}</StyledAction>
    </StyledRowItem>
  ) : (
    <StyledRowItem>
      <Label minWidth={"190px"}>{label}</Label>
      {isInput ? (
        <Box
          component={Input}
          width={"100%"}
          placeholder={placeholder || ""}
          mr={2}
          onChange={(e) => setvalueInput && setvalueInput(e.target.value)}
          value={valueInput || ""}
        />
      ) : (
        <Value>{value}</Value>
      )}
      <StyledAction>{action}</StyledAction>
    </StyledRowItem>
  );
};

const OverviewTab = () => {
  const { t } = useTranslation();
  const { userData } = useSelector(({ user }: RootState) => user);
  const { isTablet, isMobile } = useScreen();
  const [openModal, setOpenModal] = useState(false);

  return (
    <Box textAlign="left">
      <RowItem
        label={t("account.loggedInAs")}
        value={
          userData?.loginType === "connectWallet"
            ? isMobile
              ? getShortWallet(userData.address || "")
              : userData?.address
            : userData?.email
        }
        isTablet={isTablet}
      />
      <RowItem
        label={t("account.lastLogin")}
        value={moment(userData?.lastLogin).format("MM/DD/YYYY hh:mm:ss")}
        isTablet={isTablet}
      />
      {openModal && <ConnectWalletModal open={openModal} setOpen={setOpenModal} />}
    </Box>
  );
};

export default OverviewTab;

interface ConnectWalletModal {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export const ConnectWalletModal: React.FC<ConnectWalletModal> = ({ open, setOpen }) => {
  const { t } = useTranslation();
  const { stakeAddress, connect, disconnect } = useCardano({
    limitNetwork: NETWORK === NETWORKS.mainnet ? NetworkType.MAINNET : NetworkType.TESTNET
  });
  const [stakeKey, setStakeKey] = useState<string | null>("");
  const [selectedWallet, setSelectedWallet] = useState("");
  const { userData } = useSelector(({ user }: RootState) => user);

  useEffect(() => {
    if (stakeKey === null && selectedWallet) {
      handleClick(selectedWallet as SupportedWallets, true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stakeKey]);

  const handleSubmitWallet = async (stakeAddress: string) => {
    if (!stakeAddress) return;

    try {
      await editInfo({ address: stakeAddress || "" });
      const response = await getInfo({ network: NETWORK_TYPES[NETWORK] });
      setUserData({ ...response.data, loginType: userData?.loginType || "" });
      disconnect();
      toast.success(t("message.wallet.changeSuccess"));
      setOpen(false);
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(
          t(
            (error.response && error?.response?.data && error?.response?.data?.errorCode) ||
              ACCOUNT_ERROR.INTERNAL_ERROR
          )
        );
      }
    }
  };

  const handleOpenLink = (wallet: Wallet) => {
    window.open(wallet.link, "_blank");
  };
  const toast = useToast();

  const onClose = () => {
    setOpen(false);
    setStakeKey(null);
  };
  const handleClick = (name: SupportedWallets, loading = true) => {
    connect(
      name,
      () => {
        setStakeKey(stakeAddress);
        handleSubmitWallet(stakeAddress as string);
      },
      (e) => {
        if (e.name === "EnablementFailedError") {
          loading &&
            toast.error(
              t("message.changeNetwork", {
                wrongNetwork: NETWORK.charAt(0).toUpperCase() + NETWORK.slice(1).toLowerCase(),
                correctNetwork: NETWORK.charAt(0).toUpperCase() + NETWORK.slice(1).toLowerCase()
              })
            );
          return;
        }
        loading && toast.error(t("message.common.somethingWentWrong"));
      }
    );
  };

  return (
    <StyledModal open={open} handleCloseModal={onClose}>
      <>
        <>
          <Title>Link wallet to your account</Title>
          <Box color={({ palette }) => palette.secondary.light} fontWeight={"bold"} fontSize={"14px"}>
            You can only link wallet once per account
          </Box>
          <>
            {SUPPORTED_WALLETS.filter((wallet) => wallet.networks.includes(NETWORK)).map((wallet) => {
              return (
                <WalletItem
                  key={wallet.name}
                  active={0}
                  connecting={0}
                  onClick={() => {
                    setSelectedWallet(wallet.name);
                    handleClick(wallet.name);
                  }}
                >
                  <GroupFlex>
                    <WalletName>{wallet.name}</WalletName>
                    {wallet.name === selectedWallet ? <CircularProgress size={30} /> : ""}
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
        </>
      </>
    </StyledModal>
  );
};
