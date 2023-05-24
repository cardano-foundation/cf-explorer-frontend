import { Box, CircularProgress, Input, useTheme } from "@mui/material";
import { ReactElement, useState } from "react";
import {
  Label,
  StyledAction,
  StyledButton,
  StyledRowItem,
  TextNote,
  Value,
  WalletAddress,
  WrapInfoItemMobile
} from "./styles";
import { ReactComponent as Edit } from "../../../commons/resources/icons/pen.svg";
import { ReactComponent as Search } from "../../../commons/resources/icons/search.svg";
import questionConfirm from "../../../commons/resources/icons/questionConfirm.svg";
import { useSelector } from "react-redux";
import { RootState } from "../../../stores/types";
import moment from "moment";
import CopyButton from "../../commons/CopyButton";
import { useHistory } from "react-router-dom";
import { routers } from "../../../commons/routers";
import { useScreen } from "../../../commons/hooks/useScreen";
import { GoCheck } from "react-icons/go";
import { IoMdClose } from "react-icons/io";
import { getShortWallet, regexEmail } from "~/commons/utils/helper";
import useToast from "~/commons/hooks/useToast";
import { editInfo, getInfo } from "~/commons/utils/userRequest";
import { setUserData } from "~/stores/user";
import { NETWORK, NETWORKS, NETWORK_TYPES, SUPPORTED_WALLETS } from "~/commons/utils/constants";
import StyledModal from "~/components/commons/StyledModal";
import StorageUtils from "~/commons/utils/storage";
import { NetworkType, isWalletInstalled, useCardano } from "@cardano-foundation/cardano-connect-with-wallet";
import {
  GroupFlex,
  InstallButton,
  Title,
  WalletIcon,
  WalletItem,
  WalletName
} from "~/components/commons/ConnectWalletModal/style";
import { MdOutlineFileDownload } from "react-icons/md";
import { SupportedWallets, Wallet } from "~/types/user";
import { StyledDarkLoadingButton } from "~/components/share/styled";

type TRowItem = {
  label: string;
  value?: string | ReactElement;
  action?: ReactElement;
  isTablet?: boolean;
  isInput?: boolean;
  placeholder?: string;
  valueInput?: string;
  setvalueInput?: (v: string) => void;
};

const RowItem: React.FC<TRowItem> = ({
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
      <WrapInfoItemMobile>
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
  const history = useHistory();
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
    <Box textAlign='left'>
      <TextNote>Below are the username, email and overview information for your account</TextNote>
      <RowItem
        label='Your email address '
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
                    color={theme.palette.red[700]}
                    onClick={() => setShowInput(false)}
                    mr={1}
                  />
                )}
                {!loading ? (
                  <Box color={theme.palette.green[700]} component={GoCheck} size={"24px"} onClick={handleSubmitEmail} />
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
        placeholder='Enter your email'
        setvalueInput={setEmail}
        valueInput={email}
      />
      <RowItem
        label='Private Notes'
        value={`${userData?.sizeNote} out of 2000 available limit`}
        action={<Search onClick={() => history.push(routers.PRIVATE_NOTES)} />}
        isTablet={isTablet}
      />
      <RowItem
        label='Address Bookmark'
        value={`${userData?.sizeBookmark} out of 2000 available limit`}
        action={<Search onClick={() => history.push(routers.BOOKMARK)} />}
        isTablet={isTablet}
      />
      <RowItem
        label='Wallet'
        value={
          <Box display='flex' alignItems='center'>
            <WalletAddress>{userData?.wallet || userData?.address}</WalletAddress>
            {userData?.wallet || userData?.address ? <CopyButton text={userData?.wallet || userData?.address} /> : null}
          </Box>
        }
        isTablet={isTablet}
        action={!userData?.wallet && !userData?.address ? <Edit onClick={() => setOpenModal(true)} /> : <></>}
      />
      <RowItem
        label='Last Login'
        value={moment(userData?.lastLogin).format("MM/DD/YYYY hh:mm:ss")}
        isTablet={isTablet}
      />
      <ConnectWalletModal open={openModal} setOpen={setOpenModal} />
    </Box>
  );
};

export default OverviewTab;

interface ConnectWalletModal {
  open: boolean;
  setOpen: (open: boolean) => void;
}
const ConnectWalletModal: React.FC<ConnectWalletModal> = ({ open, setOpen }) => {
  const { stakeAddress, connect } = useCardano({
    limitNetwork: NETWORK === NETWORKS.mainnet ? NetworkType.MAINNET : NetworkType.TESTNET
  });
  const [stakeKey, setStakeKey] = useState<string | null>("");
  const [loading, setLoading] = useState(false);
  const [selectedWallet, setSelectedWallet] = useState("");
  const [loadingStake, setLoadingStake] = useState(false);
  const { userData } = useSelector(({ user }: RootState) => user);

  const handleSubmitWallet = async () => {
    if (!stakeKey) return;

    try {
      setLoading(true);
      await editInfo({ address: stakeKey || "" });
      const response = await getInfo({ network: NETWORK_TYPES[NETWORK] });
      setUserData({ ...response.data, loginType: userData?.loginType || "" });
      toast.success("Change wallet successfully!");
      setOpen(false);
    } catch (error) {
      toast.error(
        ((error as any)?.response && (error as any)?.response?.data && (error as any)?.response?.data?.errorMessage) ||
          "Something went wrong!"
      );
    } finally {
      setLoading(false);
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
  const handleClick = (name: SupportedWallets) => {
    setLoadingStake(true);
    connect(
      name,
      () => {
        setStakeKey(stakeAddress);
        setLoadingStake(false);
      },
      (e) => {
        setLoadingStake(false);
        if (e.name === "EnablementFailedError") {
          toast.error(
            `You are currently connect to ${
              NETWORK.charAt(0).toUpperCase() + NETWORK.slice(1).toLowerCase()
            }, please switch to  ${NETWORK.charAt(0).toUpperCase() + NETWORK.slice(1).toLowerCase()}!`
          );
          return;
        }
        toast.error("Something went wrong!");
      }
    );
  };
  const renderConfirm = () => {
    return (
      <Box mt={3}>
        <Box textAlign={"center"} mb={3}>
          <Box component={"img"} src={questionConfirm} />
        </Box>
        <Box textAlign={"center"} color={({ palette }) => palette.grey[700]} fontWeight={"bold"} fontSize={"20px"}>
          Confirmation Required
        </Box>
        <Box textAlign={"center"} color={({ palette }) => palette.grey[700]} fontWeight={"bold"} fontSize={"18px"}>
          This is your stake key {getShortWallet(stakeKey || "")}, are you sure to continue?
        </Box>
        <Box display={"flex"} justifyContent={"center"} mt={2}>
          <StyledButton disabled={loading} onClick={() => setStakeKey(null)}>
            Close
          </StyledButton>
          <StyledDarkLoadingButton loading={loading} onClick={handleSubmitWallet}>
            Continue
          </StyledDarkLoadingButton>
        </Box>
      </Box>
    );
  };

  return (
    <StyledModal open={open} handleCloseModal={onClose}>
      <>
        {stakeKey && renderConfirm()}
        {!stakeKey && (
          <>
            <Title>Link wallet to your account</Title>
            <Box color={({ palette }) => palette.grey[300]} fontWeight={"bold"} fontSize={"14px"}>
              You can only link wallet once per account
            </Box>
            <>
              {SUPPORTED_WALLETS.filter((wallet) => wallet.networks.includes(StorageUtils.getNetwork())).map(
                (wallet) => {
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
                        {wallet.name === selectedWallet && loadingStake ? <CircularProgress size={30} /> : ""}
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
                }
              )}
            </>
          </>
        )}
      </>
    </StyledModal>
  );
};
