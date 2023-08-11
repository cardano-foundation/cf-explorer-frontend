import { useCardano } from "@cardano-foundation/cardano-connect-with-wallet";
import { NetworkType, isWalletInstalled } from "@cardano-foundation/cardano-connect-with-wallet-core";
import { Box, CircularProgress, Input, useTheme } from "@mui/material";
import moment from "moment";
import { ReactElement, useEffect, useState } from "react";
import { GoCheck } from "react-icons/go";
import { IoMdClose } from "react-icons/io";
import { MdOutlineFileDownload } from "react-icons/md";
import { useSelector } from "react-redux";

import { useScreen } from "src/commons/hooks/useScreen";
import useToast from "src/commons/hooks/useToast";
import { ReactComponent as Edit } from "src/commons/resources/icons/pen.svg";
import { NETWORK, NETWORKS, NETWORK_TYPES, SUPPORTED_WALLETS } from "src/commons/utils/constants";
import { regexEmail } from "src/commons/utils/helper";
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
  const { userData } = useSelector(({ user }: RootState) => user);
  const { isTablet } = useScreen();
  const [showInput, setShowInput] = useState(false);
  const [email, setEmail] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const theme = useTheme();
  const toast = useToast();

  const handleSubmitEmail = async () => {
    if (!email) return;
    if (!regexEmail.test(email)) {
      toast.error("Invalid email!");
    } else {
      try {
        setLoading(true);
        await editInfo({ email });
        const response = await getInfo({ network: NETWORK_TYPES[NETWORK] });
        setUserData({ ...response.data, loginType: userData?.loginType || "" });
        toast.success("Change email successfully!");
        setShowInput(false);
      } catch (error) {
        toast.error(
          ((error as any)?.response &&
            (error as any)?.response?.data &&
            (error as any)?.response?.data?.errorMessage) ||
            "Something went wrong!"
        );
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <Box textAlign="left">
      <RowItem
        label="You are logged in as"
        value={userData?.email}
        isTablet={isTablet}
        action={
          !userData?.email ? (
            showInput ? (
              <Box display={"flex"} alignItems={"center"}>
                {!loading && (
                  <Box
                    component={IoMdClose}
                    size={"24px"}
                    color={theme.palette.error[700]}
                    onClick={() => setShowInput(false)}
                    mr={1}
                  />
                )}
                {!loading ? (
                  <Box
                    color={theme.palette.success[800]}
                    component={GoCheck}
                    size={"24px"}
                    onClick={handleSubmitEmail}
                  />
                ) : (
                  <CircularProgress size={"24px"} />
                )}
              </Box>
            ) : (
              <Edit onClick={() => setShowInput(true)} />
            )
          ) : (
            <></>
          )
        }
        isInput={showInput}
        placeholder="Enter your email"
        setvalueInput={setEmail}
        valueInput={email}
      />
      <RowItem
        label="Last Login"
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
      toast.success("Change wallet successfully!");
      setOpen(false);
    } catch (error) {
      toast.error(
        ((error as any)?.response && (error as any)?.response?.data && (error as any)?.response?.data?.errorMessage) ||
          "Something went wrong!"
      );
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
              `You are currently connect to ${
                NETWORK.charAt(0).toUpperCase() + NETWORK.slice(1).toLowerCase()
              }, please switch to  ${NETWORK.charAt(0).toUpperCase() + NETWORK.slice(1).toLowerCase()}!`
            );
          return;
        }
        loading && toast.error("Something went wrong!");
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
