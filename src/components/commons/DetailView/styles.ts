import { Box, Button, Drawer, IconButton, Skeleton, styled } from "@mui/material";
import { FiInfo } from "react-icons/fi";
import { Link } from "react-router-dom";
import { CONFIRMATION_STATUS, STAKE_KEY_STATUS, TRANSACTION_STATUS } from "../../../commons/utils/constants";
import { BoxRaised } from "../BoxRaised";
import ViewAllButton from "../ViewAllButton";

export const ViewDetailDrawer = styled(Drawer)`
  & > div {
    background: ${props => props.theme.gray_10};
    border: none;
    height: calc(100vh - 61px);
    @media screen and (max-width: 1023px) {
      display: none;
    }
  }
`;

export const ViewDetailContainer = styled(Box)`
  position: relative;
  width: 430px;
  height: calc(100vh - 244px);
  overflow-x: hidden;
  overflow-y: auto;
  margin: 100px 0 0 30px;
  padding: 40px 0px 0px;
  border-top: 1px solid ${props => props.theme.black_10};
  text-align: center;
`;
export const ViewDetailScroll = styled(Box)`
  width: 400px;
  max-width: 400px;
  margin-right: 16px;
  overflow-x: hidden;
  overflow: hidden;
`;

export const StyledViewMore = styled(ViewAllButton)`
  position: absolute;
  top: 10px;
  left: 0px;
`;
export const CloseButton = styled(IconButton)`
  position: absolute;
  top: 10px;
  left: 365px;
  color: ${props => props.theme.textColorLighter};
`;

export const HeaderContainer = styled(Box)`
  display: flex;
  justify-content: center;
`;

export const TokenContainer = styled(Box)`
  width: calc(100% - 40px);
  background: ${props => props.theme.gray_3};
  box-shadow: 0px 10px 25px ${props => props.theme.black_10};
  border-radius: 12px;
  padding: 25px 20px;
  margin-top: 10px;
  text-align: left;
`;

export const TokenHeaderContainer = styled(Box)`
  border-bottom: 1px solid ${props => props.theme.white_10};
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
  color: ${props => props.theme.textColorReverse};
  margin: 0px;
`;

export const TokenMetaData = styled(Box)`
  border-bottom: 1px solid ${props => props.theme.white_10};
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
  color: ${props => props.theme.textColorReverse};
  margin: 0;
`;

export const TokenIcon = styled("img")`
  width: auto;
  height: 36px;
`;

export const MetaData = styled("small")`
  color: ${props => props.theme.white_50};
  font-size: var(--font-size-text-x-small);
`;

export const TokenHeaderInfo = styled(Box)`
  display: flex;
  width: calc(100% - 40px);
  gap: 10px;
  overflow: hidden;
`;
export const TokenTotalSupply = styled(Box)`
  flex: 1;
  padding-right: 20px;
`;
export const TokenDecimal = styled(Box)`
  flex: 1;
  padding-left: 20px;
  border-left: 1px solid ${props => props.theme.white_10};
`;

export const TokenInfoLabel = styled("small")`
  display: block;
  color: ${props => props.theme.textColorReverse};
  font-size: var(--font-size-text-x-small);
  margin-bottom: 5px;
  opacity: 0.5;
`;

export const TokenInfoValue = styled("span")`
  display: block;
  width: 100%;
  color: ${props => props.theme.textColorReverse};
  font-weight: var(--font-weight-bold);
`;

export const EpochNumber = styled("h1")`
  color: ${props => props.theme.green_2};
  margin: 0;
`;

export const EpochText = styled("span")`
  color: ${props => props.theme.textColorLight};
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
  background: ${props => props.theme.gradient_1};
  color: ${props => props.theme.textColorReverse};
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
  color: ${props => props.theme.textColorReverse};
  text-transform: uppercase;
  margin-bottom: 5px;
  opacity: 0.8;
`;
export const ItemValue = styled("h4")`
  font-family: var(--font-family-text);
  font-size: var(--font-size-text-large);
  color: ${props => props.theme.textColorReverse};
  text-transform: uppercase;
  margin-top: 0px;
  margin-bottom: 5px;
`;

export const BlockDefault = styled("small")`
  color: ${props => props.theme.textColorReverse};
  font-weight: var(--font-weight-normal);
  opacity: 0.5;
  margin: 0;
  margin-top: 0.25rem;
`;
export const DetailsInfoItem = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
`;

export const DetailLabel = styled("small")`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  color: ${props => props.theme.gray_3};
  line-height: 26px;
`;
export const InfoIcon = styled(FiInfo)`
  font-size: 1rem;
  margin-right: 6.5px;
  color: ${props => props.theme.textColorLighter};
`;

export const DetailValue = styled("small")`
  color: ${props => props.theme.textColorBold};
  font-weight: var(--font-weight-bold);
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 5px;
`;
export const DelegatedDetail = styled("small")`
  display: block;
  color: ${props => props.theme.linkColor};
  overflow: hidden;
  font-weight: var(--font-weight-bold);
  font-family: var(--font-family-text) !important;
  max-width: 250px;
  text-overflow: ellipsis;
  white-space: nowrap;
  text-align: right;
`;
export const DetailLabelSkeleton = styled(Skeleton)`
  height: 1em;
  width: 50%;
  min-width: 100px;
  border-radius: 4px;
`;

export const StyledLink = styled(Link)`
  color: ${props => props.theme.linkColor} !important;
  font-family: var(--font-family-text) !important;
`;

export const Group = styled(Box)`
  margin-bottom: 0px;
  padding: 15px 0px;
  border-bottom: 1px solid ${props => props.theme.black_10};
`;

export const ProgressLiner = styled("div")<{ progress: number }>`
  position: relative;
  width: 100%;
  background: ${props => props.theme.black_20};
  height: 12px;
  margin-bottom: 10px;
  border-radius: 12px;
  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: ${props => props.progress || 0}%;
    height: 100%;
    border-radius: 12px;
    background: ${props => props.theme.gradient_4};
  }
`;

export const ProgressStatusText = styled("h4")`
  color: ${props => props.theme.gray_3};
  font-weight: var(--font-weight-normal);
  margin: 0;
`;

export const ProgressPercent = styled("h4")`
  color: ${props => props.theme.warning_1};
  font-weight: var(--font-weight-normal);
  margin: 0;
`;
export const DetailLink = styled(Link)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: ${props => props.theme.textColorBold};
  font-weight: var(--font-weight-bold);
  font-family: var(--font-family-normal);
`;

export const DetailLinkIcon = styled("h3")`
  color: ${props => props.theme.green_2};
  margin: 0;
  line-height: 1;
  margin-right: 10px;
`;

export const DetailLinkImage = styled("img")`
  width: 1.5rem;
  height: 1.5rem;
`;

export const DetailLinkName = styled("h4")`
  margin: 0;
  font-size: var(--font-size-text-large);
`;
export const DetailLinkRight = styled("span")`
  color: ${props => props.theme.textColorLight};
`;

export const TxStatus = styled("small")<{ status?: keyof typeof TransactionStatus }>`
  color: ${props => {
    switch (props.status) {
      case TRANSACTION_STATUS.SUCCESS:
        return props.theme.green_2;
      default:
        return props.theme.green_2;
    }
  }};
  background-color: ${props => {
    switch (props.status) {
      case TRANSACTION_STATUS.SUCCESS:
        return `${props.theme.green_2_20}`;
      default:
        return `${props.theme.green_2_20}`;
    }
  }};
  margin-left: 15px;
  font-weight: var(--font-weight-bold);
  text-transform: uppercase;
  padding: 5px 10px;
  border-radius: 2px;
`;
export const ConfirmStatus = styled("small")<{ status?: keyof typeof ConfirmationStatus }>`
  color: ${props => {
    switch (props.status) {
      case CONFIRMATION_STATUS.MEDIUM:
        return props.theme.warning_1;
      default:
        return props.theme.warning_1;
    }
  }};
  background-color: ${props => {
    switch (props.status) {
      case CONFIRMATION_STATUS.MEDIUM:
        return `${props.theme.warning_1_20}`;
      default:
        return `${props.theme.warning_1_20}`;
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
  color: ${props => props.theme.textColorBold};
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
  color: ${props => props.theme.green_2}!important;
  &:hover {
    text-shadow: 0px 0px 1px ${props => props.theme.green_1};
  }
`;

export const SeemoreText = styled("span")`
  color: ${props => props.theme.green_2};
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

export const StakeKeyStatus = styled("small")<{ status: StakeStaus }>`
  color: ${props => {
    switch (props.status) {
      case STAKE_KEY_STATUS.ACTIVE:
        return props.theme.green_1;
      default:
        return props.theme.warning_1;
    }
  }};
  background-color: ${props => {
    switch (props.status) {
      case STAKE_KEY_STATUS.ACTIVE:
        return props.theme.green_1_20;
      default:
        return props.theme.warning_1_20;
    }
  }};
`;

export const LogoEmpty = styled(Box)`
  width: 30px;
  height: 30px;
  background: ${props => props.theme.white_50};
  border-radius: 50%;
  border: 1px solid ${props => props.theme.borderColor};
`;
export const ButtonModal = styled(Button)(({ theme }) => ({
  textTransform: "capitalize",
  padding: 0,
  textDecoration: "underline",
  ":hover": {
    textDecoration: "underline",
  },
}));
