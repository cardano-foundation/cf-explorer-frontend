import { alpha, Box, Button, Drawer, IconButton, Skeleton, styled } from "@mui/material";
import { FiInfo } from "react-icons/fi";
import { Link } from "react-router-dom";

import { CONFIRMATION_STATUS, STAKE_KEY_STATUS, TRANSACTION_STATUS } from "src/commons/utils/constants";

import { BoxRaised } from "../BoxRaised";

export const ViewDetailDrawer = styled(Drawer)(({ theme }) => ({
  "& > div": {
    zIndex: 1302,
    background: `${theme.palette.secondary[0]}`,
    border: "none",
    height: "100%",
    boxShadow: theme.shadow.rightDraw,
    [theme.breakpoints.down("md")]: {
      display: "flex",
      height: "calc(100% - 76px)",
      top: "76px"
    },
    [theme.breakpoints.down("sm")]: {
      right: "auto",
      width: "100%",
      overflowY: "hidden"
    }
  }
}));

export const ViewDetailHeader = styled(Box)(({ theme }) => ({
  margin: "0px 30px 0px",
  padding: "15px 0",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  borderBottom: `1px solid ${alpha(theme.palette.common.black, 0.1)}`,
  [theme.breakpoints.down("sm")]: {
    margin: "0px 16px"
  }
}));

export const CloseButton = styled(IconButton)`
  color: ${(props) => props.theme.palette.text.hint};
  padding: 5.5px;
`;

export const ViewDetailContainer = styled(Box)(({ theme }) => ({
  position: "relative",
  width: "430px",
  height: "100%",
  overflowX: "hidden",
  overflowY: "auto",
  marginLeft: "30px",
  textAlign: "center",
  [theme.breakpoints.down("sm")]: {
    display: "flex",
    width: "100%",
    marginLeft: "0px"
  }
}));

export const ViewDetailScroll = styled(Box)(({ theme }) => ({
  width: "400px",
  maxWidth: "400px",
  marginRight: "16px",
  overflowX: "hidden",
  overflow: "hidden",
  paddingTop: "15px",
  [theme.breakpoints.down("sm")]: {
    marginRight: "0px",
    overflowY: "auto",
    width: "100%",
    padding: "15px 16px",
    maxWidth: "unset",
    "&::-webkit-scrollbar": {
      width: "2px"
    }
  }
}));
export const HeaderContainer = styled(Box)`
  display: flex;
  justify-content: center;
`;

export const TokenContainer = styled(Box)`
  width: calc(100% - 40px);
  background: ${(props) => props.theme.palette.secondary.light};
  border-radius: 12px;
  padding: 25px 20px;
  text-align: left;
`;

export const TokenHeaderContainer = styled(Box)`
  border-bottom: 1px solid ${(props) => props.theme.palette.primary[200]};
  padding-bottom: 1rem;
  margin-bottom: 1rem;
`;
export const TokenHeader = styled(Box)`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 10px;
  margin-bottom: 1rem;
`;

export const TokenTitleIcon = styled("img")`
  width: auto;
  min-width: 28px;
  height: 33px;
`;
export const TokenTitle = styled("h3")`
  color: ${(props) => props.theme.palette.primary.contrastText};
  margin: 0px;
`;

export const TokenMetaData = styled(Box)`
  border-bottom: 1px solid ${(props) => props.theme.palette.primary[200]};
  margin-bottom: 1rem;
`;

export const TokenInfo = styled(Box)`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 5px;
  margin-bottom: 10px;
`;

export const TokenName = styled("h4")`
  font-size: var(--font-size-text-large);
  color: ${(props) => props.theme.palette.secondary[0]};
  margin: 0;
`;

export const TokenIcon = styled("img")`
  width: auto;
  height: 36px;
`;

export const MetaData = styled("small")`
  color: ${(props) => props.theme.palette.secondary[0]};
  font-size: var(--font-size-text-x-small);
`;

export const TokenHeaderInfo = styled(Box)`
  display: flex;
  width: 100%;
  gap: 10px;
  overflow: hidden;
`;
export const TokenTotalSupply = styled(Box)`
  flex: 1;
  padding-right: 10px;
`;
export const TokenDecimal = styled(Box)`
  flex: 1;
  padding-left: 20px;
  border-left: 1px solid ${(props) => props.theme.palette.primary[200]};
`;

export const TokenInfoLabel = styled("small")`
  display: block;
  color: ${(props) => props.theme.palette.secondary[0]};
  font-size: var(--font-size-text-x-small);
  margin-bottom: 5px;
`;

export const TokenInfoValue = styled("span")`
  display: block;
  width: 100%;
  color: ${(props) => props.theme.palette.primary.contrastText};
  font-weight: var(--font-weight-bold);
`;

export const EpochNumber = styled("h1")`
  color: ${(props) => props.theme.palette.secondary.main};
  margin: 0;
`;

export const EpochText = styled("span")`
  color: ${(props) => props.theme.palette.secondary.light};
  text-transform: uppercase;
`;

export const ListItem = styled(Box)`
  display: flex;
  align-items: center;
  gap: 15px;
  width: 100%;
  margin: 20px 0px;
`;

export const Item = styled(Box)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex: 1;
  background: ${(props) => props.theme.palette.secondary.light};
  color: ${(props) => props.theme.palette.secondary[0]};
  border-radius: 20px;
  padding: 15px;
`;

export const Icon = styled("img")`
  width: 24px;
  height: 24px;
  margin-bottom: 10px;
`;

export const ItemName = styled("small")`
  font-size: var(--font-size-text-x-small);
  font-weight: var(--font-weight-bold);
  color: ${(props) => props.theme.palette.primary.contrastText};
  text-transform: uppercase;
  margin-bottom: 5px;
`;
export const ItemValue = styled("h4")`
  font-family: var(--font-family-text);
  font-size: var(--font-size-text-large);
  color: ${(props) => props.theme.palette.secondary[0]};
  text-transform: uppercase;
  margin-top: 0px;
  margin-bottom: 5px;
`;

export const BlockDefault = styled("small")`
  color: ${(props) => props.theme.palette.secondary[0]};
  font-weight: var(--font-weight-normal);
  margin: 0;
  margin-top: 0.25rem;
`;
export const DetailsInfoItem = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
`;

export const WrapDetailInfo = styled(Box)`
  display: flex;
  flex-direction: row;
  gap: 5px;
  align-items: center;
`;
export const DetailLabel = styled("small")`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  color: ${(props) => props.theme.palette.secondary.main};
  line-height: 26px;
  white-space: nowrap;
  text-transform: capitalize;
`;
export const InfoIcon = styled(FiInfo)`
  font-size: 1rem;
  margin-right: 6.5px;
  color: ${(props) => props.theme.palette.text.hint};
`;

export const DetailValue = styled("small")`
  color: ${(props) => props.theme.palette.secondary.main};
  font-weight: var(--font-weight-bold);
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 5px;
`;
export const DelegatedDetail = styled("small")`
  display: block;
  color: ${(props) => props.theme.palette.primary.main};
  overflow: hidden;
  font-weight: var(--font-weight-bold);
  font-family: var(--font-family-text) !important;
  max-width: 200px;
  text-overflow: ellipsis;
  white-space: nowrap;
  text-align: right;
`;
export const DelegatedEmptyPool = styled("span")`
  color: ${(props) => props.theme.palette.secondary.main};
`;
export const DetailLabelSkeleton = styled(Skeleton)`
  height: 1em;
  width: 50%;
  min-width: 100px;
  border-radius: 4px;
`;

export const StyledLink = styled(Link)`
  color: ${(props) => props.theme.palette.primary.main} !important;
  font-family: var(--font-family-text) !important;
`;

export const Group = styled(Box)`
  margin-bottom: 0px;
  padding: 15px 0px;
  border-bottom: 1px solid ${(props) => props.theme.palette.primary[200]};
`;

export const ProgressLiner = styled("div")<{ progress: number }>`
  position: relative;
  width: 100%;
  background: ${(props) => alpha(props.theme.palette.common.black, 0.2)};
  height: 12px;
  margin-bottom: 10px;
  border-radius: 12px;
  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: ${(props) => props.progress || 0}%;
    height: 100%;
    border-radius: 12px;
    background: ${(props) => props.theme.palette.gradient[4]};
  }
`;

export const ProgressStatusText = styled("h4")`
  color: ${(props) => props.theme.palette.text.secondary};
  font-weight: var(--font-weight-normal);
  margin: 0;
`;

export const ProgressPercent = styled("h4")`
  color: ${(props) => props.theme.palette.warning.main};
  font-weight: var(--font-weight-normal);
  margin: 0;
`;
export const DetailLink = styled(Link)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: ${(props) => props.theme.palette.common.black};
  font-weight: var(--font-weight-bold);
  font-family: var(--font-family-normal);
`;

export const DetailLinkIcon = styled("h3")(({ theme }) => ({
  color: theme.palette.primary.main,
  margin: 0,
  lineHeight: 1,
  marginRight: 10,
  "svg path": {
    fill: theme.palette.secondary.light
  }
}));

export const DetailLinkImage = styled("img")`
  width: 1.5rem;
  height: 1.5rem;
`;

export const DetailLinkName = styled("h4")`
  margin: 0;
  font-size: var(--font-size-text-large);
  color: ${(props) => props.theme.palette.secondary.main};
`;
export const DetailLinkRight = styled("span")`
  color: ${(props) => props.theme.palette.secondary.light};
`;

export const TxStatus = styled("small")<{ status?: TransactionStatus }>`
  color: ${({ status, theme }) => {
    switch (status) {
      case TRANSACTION_STATUS.FAILED:
        return theme.palette.error[700];
      case TRANSACTION_STATUS.PENDDING:
        return theme.palette.warning[800];
      default:
        return theme.palette.success[800];
    }
  }};
  background-color: ${({ status, theme }) => {
    switch (status) {
      case TRANSACTION_STATUS.FAILED:
        return theme.palette.error[100];
      case TRANSACTION_STATUS.PENDDING:
        return theme.palette.warning[100];
      default:
        return theme.palette.success[100];
    }
  }};
  margin-left: 15px;
  font-weight: var(--font-weight-bold);
  text-transform: uppercase;
  padding: 5px 10px;
  border-radius: 2px;
`;
export const ConfirmStatus = styled("small")<{ status?: keyof typeof CONFIRMATION_STATUS }>`
  color: ${({ status, theme }) => {
    switch (status) {
      case CONFIRMATION_STATUS.HIGH:
        return theme.palette.success[800];
      case CONFIRMATION_STATUS.MEDIUM:
        return theme.palette.warning[800];
      default:
        return theme.palette.error[700];
    }
  }};
  background-color: ${({ status, theme }) => {
    switch (status) {
      case CONFIRMATION_STATUS.HIGH:
        return theme.palette.success[100];
      case CONFIRMATION_STATUS.MEDIUM:
        return theme.palette.warning[100];
      default:
        return theme.palette.error[100];
    }
  }};
  margin-left: 10px;
  font-weight: var(--font-weight-bold);
  text-transform: uppercase;
  padding: 5px 10px;
  border-radius: 2px;
`;

export const TokenDetailInfo = styled(Box)`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 5px;
`;

export const TokenDetailName = styled("small")`
  color: ${(props) => props.theme.palette.secondary.main};
`;

export const TokenDetailIcon = styled("img")`
  width: "auto";
  height: 30px;
`;

export const SeemoreBox = styled(Box)`
  position: absolute;
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 20px 0px;
`;
export const SeemoreButton = styled(Link)`
  display: flex;
  align-items: center;
  gap: 5px;
  color: ${(props) => props.theme.palette.primary.main}!important;
  &:hover {
    text-shadow: 0px 0px 1px ${(props) => props.theme.palette.primary.dark};
  }
`;

export const SeemoreText = styled("span")`
  color: ${(props) => props.theme.palette.primary.main};
  font-weight: var(--font-weight-bold);
`;

export const ProgressSkeleton = styled(Skeleton)`
  width: 150px;
  height: 150px;
  border-radius: 10px;
`;
export const IconSkeleton = styled(Skeleton)`
  width: 24px;
  height: 24px;
`;
export const DetailValueSkeleton = styled(Skeleton)`
  height: 1em;
  width: 50%;
  min-width: 100px;
  border-radius: 4px;
`;

export const StakeKeyHeader = styled(BoxRaised)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 17px 20px;
  gap: 20px;
  margin: 10px 0px;
  background-color: ${({ theme }) => theme.palette.primary[200]};
`;

export const StakeKeyLink = styled(StyledLink)`
  display: block;
  white-space: pre-wrap;
  word-break: break-word;
  max-width: 90%;
  text-align: left;
  font-weight: var(--font-weight-bold);
  font-size: var(--font-size-text-small);
  line-height: 1.575;
`;

export const StakeKeyStatus = styled("small")<{ status: StakeStatus }>`
  color: ${(props) => {
    switch (props.status) {
      case STAKE_KEY_STATUS.ACTIVE:
        return props.theme.palette.success[800];
      default:
        return props.theme.palette.warning[800];
    }
  }};
  background-color: ${(props) => {
    switch (props.status) {
      case STAKE_KEY_STATUS.ACTIVE:
        return props.theme.palette.success[100];
      default:
        return props.theme.palette.warning[100];
    }
  }};
  padding: 3px 10px;
`;

export const LogoEmpty = styled(Box)`
  width: 30px;
  height: 30px;
  background: ${(props) => alpha(props.theme.palette.common.white, 0.5)};
  border-radius: 50%;
  border: 1px solid ${(props) => props.theme.palette.border.main};
  display: inline-block;
  padding: 3px 10px;
`;
export const ButtonModal = styled(Button)(() => ({
  textTransform: "capitalize",
  padding: 0,
  textDecoration: "underline",
  ":hover": {
    textDecoration: "underline"
  }
}));

export const TimeDuration = styled("small")(({ theme }) => ({
  color: theme.palette.secondary.light,
  display: "block",
  textAlign: "left",
  flex: 1,
  padding: 10
}));

export const ViewDetailDrawerContractHash = styled(ViewDetailDrawer)``;

export const ViewDetailContainerContractHash = styled(ViewDetailContainer)``;
export const ViewDetailScrollContractHash = styled(ViewDetailScroll)``;

export const StyledSpendviewDrawer = styled(Drawer)`
  z-index: 1302;
  ${({ theme }) => theme.breakpoints.down("sm")} {
    top: 76px;
    height: calc(100vh - 76px);
    max-width: unset;
  }
`;
