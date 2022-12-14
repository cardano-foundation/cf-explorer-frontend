import { Box, Drawer, Grid, IconButton, Skeleton, styled } from "@mui/material";
import { FiInfo } from "react-icons/fi";
import { Link } from "react-router-dom";
import { CONFIRMATION_STATUS, TRANSACTION_STATUS } from "../../../commons/utils/constants";
import CopyButton from "../CopyButton";

export const ViewDetailDrawer = styled(Drawer)`
  & > div {
    background: #ececec;
    border: none;
  }
`;

export const ViewDetailContainer = styled(Box)`
  position: relative;
  width: 400px;
  max-width: 400px;
  margin: 100px 14px 0px 30px;
  height: calc(100vh - 160px);
  overflow-x: hidden;
  overflow-y: auto;
  padding: 40px 0px 20px;
  border-top: 1px solid ${props => props.theme.colorBlack}11;
  text-align: center;
`;

export const CloseButton = styled(IconButton)`
  position: absolute;
  top: 5px;
  right: 0px;
  color: ${props => props.theme.titleColor};
`;

export const EpochNumber = styled("h1")`
  color: ${props => props.theme.colorGreenLight};
  margin: 0;
`;

export const EpochText = styled("span")`
  color: ${props => props.theme.textColorPale};
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
  background: linear-gradient(0deg, #5a9c56 0%, #184c78 100%);
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
  color: #344054;
  line-height: 26px;
`;
export const InfoIcon = styled(FiInfo)`
  font-size: 1rem;
  margin-right: 6.5px;
  color: ${props => props.theme.titleColor};
`;

export const DetailValue = styled("small")`
  color: ${props => props.theme.colorBlack};
  font-weight: var(--font-weight-bold);
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 5px;
`;
export const DetailLabelSkeleton = styled(Skeleton)`
  height: 1em;
  width: 50%;
  min-width: 100px;
  border-radius: 4px;
`;

export const StyledLink = styled(Link)`
  color: ${props => props.theme.colorBlue} !important;
  font-family: var(--font-family-text) !important;
`;

export const Group = styled(Box)`
  margin-bottom: 10px;
  padding: 10px 0px 0px;
  border-bottom: 1px solid ${props => props.theme.colorBlack}16;
`;

export const ProgressLiner = styled("div")<{ progress: number }>`
  position: relative;
  width: 100%;
  background: ${props => props.theme.colorBlack}32;
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
    background: linear-gradient(90deg, #e65c00 0%, #f9d423 100%);
  }
`;

export const ProgressStatusText = styled("h4")`
  color: #344054;
  font-weight: var(--font-weight-normal);
  margin: 0;
`;

export const ProgressPercent = styled("h4")`
  color: ${props => props.theme.colorYellow};
  font-weight: var(--font-weight-normal);
  margin: 0;
`;
export const DetailLink = styled(Link)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  color: ${props => props.theme.colorBlack};
  font-weight: var(--font-weight-bold);
  font-family: var(--font-family-normal);
  &:hover{
    bac
  }
`;

export const DetailLinkIcon = styled("h3")`
  color: ${props => props.theme.colorGreenLight};
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
  color: ${props => props.theme.textColorPale};
`;

export const DetailCopy = styled(CopyButton)`
  padding: 0px;
  margin-bottom: 3px;
`;
export const TxStatus = styled("small")<{ status?: keyof typeof TransactionStatus }>`
  color: ${props => {
    switch (props.status) {
      case TRANSACTION_STATUS.SUCCESS:
        return props.theme.colorGreenLight;
      default:
        return props.theme.colorGreenLight;
    }
  }};
  background-color: ${props => {
    switch (props.status) {
      case TRANSACTION_STATUS.SUCCESS:
        return `${props.theme.colorGreenLight}32`;
      default:
        return `${props.theme.colorGreenLight}32`;
    }
  }};
  margin-left: 15px;
  font-weight: var(--font-weight-bold);
  text-transform: uppercase;
  padding: 5px 10px;
  border-radius: 2px;
`;
export const ConfirmStatus = styled("small")<{ status: keyof typeof ConfirmationStatus }>`
  color: ${props => {
    switch (props.status) {
      case CONFIRMATION_STATUS.MEDIUM:
        return props.theme.colorYellow;
      default:
        return props.theme.colorYellow;
    }
  }};
  background-color: ${props => {
    switch (props.status) {
      case CONFIRMATION_STATUS.MEDIUM:
        return `${props.theme.colorYellow}32`;
      default:
        return `${props.theme.colorYellow}32`;
    }
  }};
  margin-left: 10px;
  font-weight: var(--font-weight-bold);
  text-transform: uppercase;
  padding: 5px 10px;
  border-radius: 2px;
`;
// sawq

export const BackText = styled("small")`
  color: #344054;
  font-weight: var(--font-weight-bold);
`;

export const HeaderContainer = styled(Box)`
  display: flex;
  justify-content: center;
`;

export const HeaderTitle = styled("h2")`
  color: ${props => props.theme.colorBlack};
  font-size: 2.25rem;
  margin: 0.5rem 0;
`;

export const HeaderTitleSkeleton = styled(Skeleton)`
  height: 1em;
  width: 200px;
  max-width: 100%;
  border-radius: 4px;
`;

export const SlotLeader = styled("p")`
  margin-top: 0px;
`;

export const SlotLeaderSkeleton = styled(Skeleton)`
  height: 1em;
  width: 50%;
  border-radius: 4px;
`;

export const SlotLeaderValue = styled("span")`
  font-family: var(--font-family-text);
  color: ${props => props.theme.colorBlue};
  white-space: pre-wrap;
  display: inline-block;
  word-break: break-word;
  line-height: 1.5;
`;

export const DetailsInfo = styled(Grid)`
  margin-top: 15px;
  background-image: ${props => props.theme.linearGradientGreen};
  border-radius: 15px;
  color: ${props => props.theme.textColorReverse};
`;

export const ProgressSkeleton = styled(Skeleton)`
  width: 150px;
  height: 150px;
  border-radius: ;
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

export const DetailValueSmall = styled(DetailValue)`
  font-size: var(--font-size-text-small);
`;

export const ConfirmationValue = styled(DetailValue)`
  display: flex;
  align-items: center;
`;

export const ProgressStatus = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
`;
