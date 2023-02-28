import { Box, Container, Grid, Skeleton, styled } from "@mui/material";
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
  color: #344054;
  font-weight: var(--font-weight-bold);
`;

export const HeaderContainer = styled(Box)`
  display: flex;
  align-items: center;
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

export const HeaderStatus = styled("small")<{ status?: keyof typeof TransactionStatus | IDataEpoch["status"] }>`
  color: ${props => {
    switch (props.status) {
      case TRANSACTION_STATUS.SUCCESS:
        return props.theme.colorGreenLight;
      case "IN_PROGRESS":
        return props.theme.colorYellow;
      case "FINISHED":
        return props.theme.colorBlue;
      default:
        return props.theme.colorGreenLight;
    }
  }};
  background-color: ${props => {
    switch (props.status) {
      case TRANSACTION_STATUS.SUCCESS:
        return `${props.theme.colorGreenLight}32`;
      case "IN_PROGRESS":
        return `${props.theme.colorYellow}32`;
      case "FINISHED":
        return `${props.theme.colorBlue}32`;
      default:
        return `${props.theme.colorGreenLight}32`;
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
  color: ${props => props.theme.colorBlue};
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

export const DetailsInfo = styled(Grid)`
  padding: ${props => props.theme.spacing(3)} ${props => props.theme.spacing(2)};
  margin-top: 15px;
  background: #ffffff;
  border-radius: 15px;
  // color: ${props => props.theme.textColorReverse};
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
    background-image: linear-gradient(0deg, #ffffff00 0%, #ffffff40 50%, #ffffff00 100%);
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
  color: ${props => props.theme.colorBlack};
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
  color: ${props => props.theme.textColorReverse};
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
  color: ${props => props.theme.textColorReverse};
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

export const InfoIcon = styled(FiInfo)`
  margin-bottom: -2px;
  margin-left: 2px;
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

export const ProgressStatus = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
`;

export const ProgressStatusText = styled("h4")`
  color: ${props => props.theme.textColorReverse};
  font-weight: var(--font-weight-normal);
  margin: 0;
`;

export const ProgressPercent = styled("h4")`
  color: ${props => props.theme.colorYellow};
  font-weight: var(--font-weight-normal);
  margin: 0;
`;

export const CardInfoOverview = styled(Box)(({ theme }) => ({
  padding: `${theme.spacing(3)} ${theme.spacing(5)}`,
  backgroundColor: "#fff",
  display: "flex",
  textAlign: "left",
  boxShadow: theme.shadowRaised,
  borderRadius: theme.borderRadius,
  marginTop: theme.spacing(5),
  flexWrap: "wrap",
}));

export const CardItem = styled(Grid)<{ multiRow: number }>(({ theme, multiRow }) => ({
  position: "relative",
  width: "max-content",
  borderLeft: "1px solid rgba(0,0,0,0.1)",
  paddingLeft: theme.spacing(2),
  paddingRight: theme.spacing(2),
  ":first-of-type": {
    borderLeft: "none",
  },
  "::after": {
    content: '""',
    position: "absolute",
    bottom: -15,
    width: "calc(100% - 30px)",
    left: "50%",
    transform: "translateX(-50%)",
    borderBottom: "0px solid rgba(0,0,0,0.1)",
  },
  [theme.breakpoints.between(theme.breakpoints.values.md, theme.breakpoints.values.lg)]: {
    ":nth-child(3n+1)": {
      borderLeftWidth: 0,
    },
    ":nth-last-child(-n + 3)": {
      ":nth-child(3n + 1)": {
        "::after": {
          borderBottomWidth: 0,
        },
        "&~div::after": {
          borderBottomWidth: 0,
        },
      },
    },
  },
  [theme.breakpoints.between(theme.breakpoints.values.sm, theme.breakpoints.values.md)]: {
    ":nth-child(2n+1)": {
      borderLeftWidth: 0,
    },
    ":nth-last-child(-n + 2)": {
      ":nth-child(2n + 1)": {
        "::after": {
          borderBottomWidth: 0,
        },
        "&~div::after": {
          borderBottomWidth: 0,
        },
      },
    },
  },
  [theme.breakpoints.down(theme.breakpoints.values.sm)]: {
    borderLeftWidth: 0,
    ":last-of-type::after": {
      borderBottomWidth: 0,
    },
  },
}));

export const ValueCard = styled(Box)(({ theme }) => ({
  color: theme.colorBlack,
  fontSize: "1rem",
  fontWeight: "bold",
}));

export const CardItemTrx = styled(CardItem)(({ theme }) => ({
  ":nth-child(5)": {
    borderLeft: "none",
  },
  ":nth-child(-n+4)": {
    borderBottom: "1px solid rgba(0,0,0,0.1)",
    paddingBottom: theme.spacing(1),
  },
  ":nth-child(n+4)": {
    paddingTop: theme.spacing(2),
    borderTop: "none",
  },
}));
export const CardItems = styled(CardItem)(({ theme, multiRow }) => ({
  ...(multiRow
    ? {
        marginBottom: 30,
        "&::after": {
          borderBottomWidth: 1,
        },
        [theme.breakpoints.up(theme.breakpoints.values.lg)]: {
          ":nth-child(4n+1)": {
            borderLeftWidth: 0,
          },
          ":nth-last-child(-n + 4)": {
            ":nth-child(4n + 1)": {
              "::after": {
                borderBottomWidth: 0,
              },
              "&~div::after": {
                borderBottomWidth: 0,
              },
            },
          },
        },
      }
    : {
        [theme.breakpoints.down(theme.breakpoints.values.lg)]: {
          marginBottom: 30,
          "&::after": {
            borderBottomWidth: 1,
          },
        },
      }),
}));
