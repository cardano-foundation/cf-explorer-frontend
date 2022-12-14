import { Box, Container, Grid, Skeleton, styled } from "@mui/material";
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

export const SlotLeader = styled("p")`
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
export const CardItem = styled(Box)(({ theme }) => ({
  color: "#fff",
  position: "relative",
  minHeight: "150px",
  minWidth: 200,
  flex: 1,
  textAlign: "left",
  padding: `0 ${theme.spacing(3)}`,
  display: "flex",
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
  ":last-child": {
    "::after": {
      content: '""',
      display: "none",
    },
  },
}));
