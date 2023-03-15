import { alpha, Box, Container, Grid, Skeleton, styled } from "@mui/material";
import { FiInfo } from "react-icons/fi";
import { Link } from "react-router-dom";
import { CONFIRMATION_STATUS, TRANSACTION_STATUS } from "../../../commons/utils/constants";
import CopyButton from "../CopyButton";

export const HeaderDetailContainer = styled(Box)`
  margin-top: 24px;
  text-align: left;
`;

export const BackButton = styled(Link)`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
`;

export const BackText = styled("small")`
  color: ${props => props.theme.palette.text.secondary};
  font-weight: var(--font-weight-bold);
`;

export const HeaderContainer = styled(Box)`
  display: flex;
  align-items: center;
`;

export const HeaderTitle = styled("h2")`
  color: ${props => props.theme.palette.common.black};
  font-size: 2.25rem;
  margin: 0.5rem 0;
`;

export const HeaderTitleSkeleton = styled(Skeleton)`
  height: 1em;
  width: 200px;
  max-width: 100%;
  border-radius: 4px;
`;

export const HeaderStatus = styled("small")<{ status?: keyof typeof TransactionStatus | IDataEpoch["status"] }>`
  color: ${props => {
    switch (props.status) {
      case TRANSACTION_STATUS.SUCCESS:
        return props.theme.palette.primary.main;
      case "IN_PROGRESS":
        return props.theme.palette.warning.main;
      case "FINISHED":
        return props.theme.palette.info.main;
      default:
        return props.theme.palette.primary.main;
    }
  }};
  background-color: ${props => {
    switch (props.status) {
      case TRANSACTION_STATUS.SUCCESS:
        return `${props.theme.palette.success.light}`;
      case "IN_PROGRESS":
        return `${props.theme.palette.warning.light}`;
      case "FINISHED":
        return `${props.theme.palette.info.light}`;
      default:
        return `${props.theme.palette.success.light}`;
    }
  }};
  font-weight: var(--font-weight-bold);
  text-transform: uppercase;
  padding: 5px 10px;
  border-radius: 2px;
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
  color: ${props => props.theme.palette.secondary.main};
  white-space: pre-wrap;
  display: inline-block;
  word-break: break-word;
  line-height: 1.5;
  font-weight: bold;
`;
export const SlotLeaderTitle = styled("small")`
  font-family: var(--font-family-text);
`;

export const SlotLeaderCopy = styled(CopyButton)`
  margin-bottom: 3px;
`;

export const DetailsInfo = styled(Grid)<{ multiRow?: number }>`
  padding: 30px ${props => (props.multiRow ? 25 : 15)}px;
  margin-top: 15px;
  background: ${props => props.theme.palette.background.paper};
  border-radius: 15px;
  ${({ theme }) => theme.breakpoints.down(theme.breakpoints.values.lg)} {
    padding: 30px 25px;
  }
`;

export const DetailsInfoItem = styled(Grid)<{ center?: number }>`
  display: flex;
  justify-content: center;
  align-items: ${props => (props.center ? `center` : `flex-start`)};
  flex-direction: column;
  padding: 22.5px 20px;
  position: relative;
  &::after {
    content: "";
    position: absolute;
    left: 0;
    top: 50%;
    width: 1px;
    height: 70%;
    transform: translateY(-50%);
    background-image: ${props => props.theme.palette.gradient[8]};
  }
  &:first-of-type::after {
    display: none;
  }
`;

export const ProgressSkeleton = styled(Skeleton)`
  width: 100px;
  height: 100px;
`;

export const EpochNumber = styled("h3")`
  color: ${props => props.theme.palette.common.black};
  margin: 0;
`;

export const EpochText = styled("small")`
  opacity: 0.8;
`;

export const Icon = styled("img")`
  width: 25px;
  height: 25px;
`;

export const IconSkeleton = styled(Skeleton)`
  width: 24px;
  height: 24px;
`;
export const DetailLabel = styled("small")`
  margin: 10px 10px 5px 0px;
  opacity: 0.8;
`;

export const DetailLabelSkeleton = styled(Skeleton)`
  height: 1em;
  width: 50%;
  min-width: 100px;
  border-radius: 4px;
`;

export const DetailValue = styled("h3")`
  color: ${props => props.theme.palette.primary.contrastText};
  font-family: var(--font-family-text);
  font-size: var(--font-size-text-x-large);
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 10px 10px;
`;

export const DetailValueSkeleton = styled(Skeleton)`
  height: 1em;
  width: 50%;
  min-width: 100px;
  border-radius: 4px;
`;

export const BlockDefault = styled("span")`
  font-size: var(--font-size-text);
  color: ${props => props.theme.palette.primary.contrastText};
  font-weight: var(--font-weight-normal);
  opacity: 0.5;
  margin: 0;
  margin-top: 0.25rem;
`;

export const ConfirmationValue = styled(DetailValue)`
  display: flex;
  align-items: center;
`;

export const ConfirmStatus = styled("small")<{ status?: keyof typeof ConfirmationStatus }>`
  color: ${props => {
    switch (props.status) {
      case CONFIRMATION_STATUS.MEDIUM:
        return props.theme.palette.warning.main;
      default:
        return props.theme.palette.warning.main;
    }
  }};
  background-color: ${props => {
    switch (props.status) {
      case CONFIRMATION_STATUS.MEDIUM:
        return `${props.theme.palette.warning.light}`;
      default:
        return `${props.theme.palette.warning.light}`;
    }
  }};
  margin-left: 10px;
  font-weight: var(--font-weight-bold);
  text-transform: uppercase;
  padding: 5px 10px;
  border-radius: 2px;
`;

export const InfoIcon = styled(FiInfo)`
  margin-bottom: -2px;
  margin-left: 2px;
`;

export const ProgressLiner = styled("div")<{ progress: number }>`
  position: relative;
  width: 100%;
  background: ${props => alpha(props.theme.palette.common.black, 0.2)};
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
    background: ${props => props.theme.palette.gradient[4]};
  }
`;

export const ProgressStatus = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
`;

export const ProgressStatusText = styled("h4")`
  color: ${props => props.theme.palette.primary.contrastText};
  font-weight: var(--font-weight-normal);
  margin: 0;
`;

export const ProgressPercent = styled("h4")`
  color: ${props => props.theme.palette.warning.main};
  font-weight: var(--font-weight-normal);
  margin: 0;
`;

export const CardInfoOverview = styled(Box)(({ theme }) => ({
  padding: 25,
  backgroundColor: theme.palette.background.paper,
  display: "flex",
  textAlign: "left",
  boxShadow: theme.shadow.card,
  borderRadius: 10,
  marginTop: theme.spacing(5),
  flexWrap: "wrap",
}));

export const CardItem = styled(Grid)<{ multiRow: number }>(({ theme, multiRow }) => ({
  position: "relative",
  width: "max-content",
  padding: multiRow ? "20px 25px" : "0px 15px",
  borderLeft: `1px solid ${alpha(theme.palette.common.black, 0.1)}`,
  borderBottom: `1px solid ${alpha(theme.palette.common.black, 0.1)}`,
  ":first-of-type": {
    borderLeft: "none",
  },
  ...(multiRow
    ? {
        borderBottomWidth: 1,
        [theme.breakpoints.up(theme.breakpoints.values.lg)]: {
          ":nth-child(4n+1)": {
            borderLeftWidth: 0,
            paddingLeft: 0,
          },
          ":nth-last-child(-n + 4)": {
            ":nth-child(4n + 1)": {
              borderBottomWidth: 0,
              "&~div": {
                borderBottomWidth: 0,
                paddingTop: 20,
                paddingBottom: 0,
              },
            },
          },
        },
      }
    : {
        borderBottomWidth: 0,
        [theme.breakpoints.down(theme.breakpoints.values.lg)]: {
          padding: "20px 25px",
        },
      }),
  [theme.breakpoints.between(theme.breakpoints.values.md, theme.breakpoints.values.lg)]: {
    paddingTop: 20,
    paddingBottom: 20,
    borderBottomWidth: 1,
    ":last-of-type::after": {
      content: `""`,
      position: "absolute",
      top: 0,
      bottom: 0,
      right: -1,
      borderRight: `1px solid ${alpha(theme.palette.common.black, 0.1)}`,
    },
    ":nth-child(3n)::after": {
      borderRight: 0,
    },
    ":nth-child(3n+1)": {
      borderLeftWidth: 0,
      paddingLeft: 0,
    },
    ":nth-last-child(-n+3)": {
      ":nth-child(3n+1)": {
        borderBottomWidth: 0,
        "&~div": {
          borderBottomWidth: 0,
        },
      },
    },
  },
  [theme.breakpoints.between(theme.breakpoints.values.sm, theme.breakpoints.values.md)]: {
    paddingTop: 20,
    paddingBottom: 20,
    borderBottomWidth: 1,
    ":nth-child(2n+1)": {
      borderLeftWidth: 0,
      paddingLeft: 0,
    },
    ":nth-last-child(-n+2)": {
      ":nth-child(2n+1)": {
        borderBottomWidth: 0,
        "&~div": {
          borderBottomWidth: 0,
        },
      },
    },
  },
  [theme.breakpoints.down(theme.breakpoints.values.sm)]: {
    padding: "20px 0px",
    borderBottomWidth: 1,
    borderLeftWidth: 0,
    ":last-of-type": {
      borderBottomWidth: 0,
    },
  },
}));

export const ValueCard = styled(Box)(({ theme }) => ({
  color: theme.palette.common.black,
  fontSize: "1rem",
  fontWeight: "bold",
}));
