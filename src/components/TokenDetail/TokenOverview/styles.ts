import { Box, Button, Container, Skeleton, styled } from "@mui/material";
import { FiInfo } from "react-icons/fi";
import { Link } from "react-router-dom";
import CopyButton from "../../commons/CopyButton";

export const HeaderDetailContainer = styled(Container)`
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

export const SlotLeaderContainer = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;
export const SlotLeader = styled(Box)`
  margin-top: 0px;
  font-weight: bold;
  color: ${props => props.theme.colorBlue};
  display: flex;
  align-items: center;
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

export const SlotLeaderCopy = styled(CopyButton)`
  margin-bottom: 3px;
`;
export const EpochNumber = styled("h3")`
  color: ${props => props.theme.textColorReverse};
  margin: 0;
`;

export const EpochText = styled("small")`
  opacity: 0.8;
`;

export const Icon = styled("img")`
  width: 24px;
  height: 24px;
`;

export const BlockDefault = styled("span")`
  font-size: var(--font-size-text);
  color: ${props => props.theme.textColorReverse};
  font-weight: var(--font-weight-normal);
  opacity: 0.5;
  margin: 0;
  margin-top: 0.25rem;
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

export const CardInfo = styled(Box)(({ theme }) => ({
  display: "flex",
  borderRadius: theme.borderRadius,
  background: "#344054",
  padding: `${theme.spacing(2)} ${theme.spacing(4)}`,
  alignItems: "center",
  justifyContent: "space-between",
}));
export const TokenInfo = styled(Box)(({ theme }) => ({
  color: "#fff",
  position: "relative",
  minHeight: "150px",
  minWidth: 200,
  flex: 2,
  display: "flex",
  paddingRight: theme.spacing(4),
  alignItems: "center",
  "::after": {
    content: '""',
    position: "absolute",
    right: 0,
    top: "50%",
    width: "1px",
    height: "80%",
    transform: "translateY(-50%)",
    backgroundImage: "linear-gradient(0deg, #ffffff00 0%, #ffffff40 50%, #ffffff00 100%)",
  },
}));

export const ViewMetaData = styled(Link)`
  display: block;
  font-family: var(--font-family-text) !important;
  color: ${props => props.theme.textColor}!important;
  text-decoration: underline !important;
`;

export const CardInfoOverview = styled(Box)(({ theme }) => ({
  padding: `${theme.spacing(3)} ${theme.spacing(5)}`,
  backgroundColor: "#fff",
  display: "flex",
  textAlign: "left",
  boxShadow: theme.shadowRaised,
  borderRadius: theme.borderRadius,
  marginTop: theme.spacing(2),
  flexWrap: "wrap",
}));

export const CardItem = styled(Box)(({ theme }) => ({
  width: "max-content",
  borderLeft: "1px solid rgba(0,0,0,0.1)",
  paddingLeft: theme.spacing(2),
  paddingRight: theme.spacing(2),
  ":first-of-type": {
    borderLeft: "none",
  },
}));

export const TitleCard = styled(Box)(({ theme }) => ({
  color: "rgba(0,0,0,0.5)",
  fontSize: "0.875rem",
}));
export const ValueCard = styled(Box)(({ theme }) => ({
  color: theme.colorBlack,
  fontSize: "1rem",
  fontWeight: "bold",
}));

export const ButtonView = styled(Link)(({ theme }) => ({
  background: "transperant",
  padding: 0,
  minWidth: 0,
  fontWeight: "bold",
  textTransform: "capitalize",
  color: `${theme.colorBlue} !important`,
  fontFamily: "Helvetica, monospace",
}));

export const ModalContainer = styled(Box)(({ theme }) => ({
  position: "relative",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "min(80vw, 350px)",
  backgroundColor: "#fff",
  padding: theme.spacing(4),
  borderRadius: theme.borderRadius,
  textAlign: "left",
}));

export const ButtonClose = styled(Button)(({ theme }) => ({
  position: "absolute",
  top: theme.spacing(2),
  right: theme.spacing(2),
  width: 30,
  height: 30,
  borderRadius: "50%",
  padding: 0,
  minWidth: 0,
}));

export const ViewJson = styled(Box)(({ theme }) => ({
  textAlign: "left",
  backgroundColor: "rgba(152, 162, 179, 0.1)",
  borderRadius: theme.borderRadius,
  padding: theme.spacing(2),
  "& .object-contentw": {
    pointerEvents: "none",
  },
  "& .variable-row": {
    border: " none !important",
  },
  "& .object-key": {
    color: "#344054 !important",
    opacity: "1 !important",
    "& span": {
      "&:first-of-type ": {
        display: "none",
      },
      "&:last-child ": {
        display: "none",
      },
    },
  },
  "& .string-value": {
    color: " #344054",
    wordBreak: "break-all",
  },
  "& .icon-container": {
    display: "none !important",
  },
}));

export const ButtonLink = styled(Link)(({ theme }) => ({
  fontWeight: "bold",
  color: `${theme.colorBlue} !important`,
  fontFamily: "Helvetica, monospace !important",
  textAlign: "left",
  wordBreak: "break-all",
  marginTop: theme.spacing(2),
  display: "inline-block",
}));
