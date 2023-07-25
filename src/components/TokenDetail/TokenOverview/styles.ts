import { alpha, Box, Button, Container, Skeleton, styled } from "@mui/material";
import { FiInfo } from "react-icons/fi";
import { Link } from "react-router-dom";

import CopyButton from "../../commons/CopyButton";

export const HeaderDetailContainer = styled(Container)`
  margin-top: 24px;
  text-align: left;
`;

export const WrapTitle = styled(Box)(({ theme }) => ({
  color: theme.palette.secondary.light,
  [theme.breakpoints.down("md")]: {
    paddingBottom: "4px"
  }
}));
export const BackButton = styled(Box)`
  display: inline-flex;
  text-align: left;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
  cursor: pointer;
`;

export const BackText = styled("small")`
  color: ${(props) => props.theme.palette.text.secondary};
  font-weight: var(--font-weight-bold);
`;

export const HeaderContainer = styled(Box)`
  display: flex;
  align-items: center;
`;

export const HeaderTitle = styled("h2")`
  color: ${(props) => props.theme.palette.common.black};
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
  align-items: center;
  margin-bottom: 20px;
`;

export const SlotLeaderTitle = styled("small")`
  font-family: var(--font-family-text);
  margin-right: 5px;
`;

export const SlotLeader = styled("small")`
  margin-top: 0px;
  font-weight: bold;
  color: ${(props) => props.theme.palette.secondary.main};
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
  color: ${(props) => props.theme.palette.secondary.main};
  white-space: pre-wrap;
  display: inline-block;
  word-break: break-word;
  line-height: 1.5;
`;

export const SlotLeaderCopy = styled(CopyButton)`
  margin-bottom: 3px;
`;
export const EpochNumber = styled("h3")`
  color: ${(props) => props.theme.palette.primary.contrastText};
  margin: 0;
`;

export const EpochText = styled("small")`
  opacity: 0.8;
`;

export const Icon = styled("img")`
  width: 24px;
  height: 24px;
`;

export const PolicyId = styled(Box)(({ theme }) => ({
  color: theme.palette.secondary.main,
  fontSize: "1rem",
  fontWeight: "bold",
  wordBreak: "break-word",
  overflow: "hidden",
  whiteSpace: "nowrap",
  textOverflow: "ellipsis",
  width: "90%",
  [theme.breakpoints.down("sm")]: {
    width: "80%"
  }
}));

export const BlockDefault = styled("span")`
  font-size: var(--font-size-text);
  color: ${(props) => props.theme.palette.primary.contrastText};
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

export const ProgressStatus = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
`;

export const ProgressStatusText = styled("h4")`
  color: ${(props) => props.theme.palette.primary.contrastText};
  font-weight: var(--font-weight-normal);
  margin: 0;
`;

export const ProgressPercent = styled("h4")`
  color: ${(props) => props.theme.palette.warning.main};
  font-weight: var(--font-weight-normal);
  margin: 0;
`;

export const CardInfo = styled(Box)(({ theme }) => ({
  display: "flex",
  borderRadius: 10,
  background: theme.palette.text.secondary,
  padding: `${theme.spacing(2)} ${theme.spacing(4)}`,
  alignItems: "center",
  justifyContent: "space-between"
}));
export const TokenInfo = styled(Box)(({ theme }) => ({
  color: theme.palette.primary.contrastText,
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
    backgroundImage: theme.palette.gradient[8]
  }
}));

export const ViewMetaData = styled(Link)`
  display: block;
  font-family: var(--font-family-text) !important;
  color: ${(props) => props.theme.palette.text.primary} !important;
  text-decoration: underline !important;
`;

export const CardInfoOverview = styled(Box)(({ theme }) => ({
  padding: `${theme.spacing(3)} ${theme.spacing(5)}`,
  backgroundColor: theme.palette.background.paper,
  display: "flex",
  textAlign: "left",
  boxShadow: theme.shadow.card,
  borderRadius: 10,
  marginTop: theme.spacing(2),
  flexWrap: "wrap",
  gap: theme.spacing(2)
}));

export const CardItem = styled(Box)(({ theme }) => ({
  maxWidth: "max-content",
  borderLeft: `1px solid ${alpha(theme.palette.common.black, 0.1)}`,
  [theme.breakpoints.up("sm")]: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2)
  },
  ":first-of-type": {
    borderLeft: "none"
  }
}));

export const TitleCard = styled(Box)(({ theme }) => ({
  color: alpha(theme.palette.common.black, 0.5),
  fontSize: "0.875rem",
  width: "max-content"
}));
export const ValueCard = styled(Box)(({ theme }) => ({
  color: theme.palette.common.black,
  fontSize: "1rem",
  fontWeight: "bold"
}));

export const ButtonView = styled(Link)(({ theme }) => ({
  background: "transperant",
  padding: 0,
  minWidth: 0,
  fontWeight: "bold",
  textTransform: "capitalize",
  color: `${theme.palette.secondary.main} !important`,
  fontFamily: "Roboto, sans-serif"
}));

export const ModalContainer = styled(Box)(({ theme }) => ({
  position: "relative",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "min(80vw, 350px)",
  backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(4),
  borderRadius: 10,
  textAlign: "left"
}));

export const ButtonClose = styled(Button)(({ theme }) => ({
  position: "absolute",
  top: theme.spacing(2),
  right: theme.spacing(2),
  width: 30,
  height: 30,
  borderRadius: "50%",
  padding: 0,
  minWidth: 0
}));

export const ViewJson = styled(Box)(({ theme }) => ({
  textAlign: "left",
  backgroundColor: alpha(theme.palette.secondary.light, 0.1),
  borderRadius: 10,
  padding: theme.spacing(2),
  "& .object-contentw": {
    pointerEvents: "none"
  },
  "& .variable-row": {
    border: " none !important"
  },
  "& .object-key": {
    color: `${theme.palette.text.secondary} !important`,
    opacity: "1 !important",
    "& span": {
      "&:first-of-type ": {
        display: "none"
      },
      "&:last-child ": {
        display: "none"
      }
    }
  },
  "& .string-value": {
    color: theme.palette.text.secondary,
    wordBreak: "break-all"
  },
  "& .icon-container": {
    display: "none !important"
  }
}));

export const ButtonLink = styled("a")(({ theme }) => ({
  fontWeight: "bold",
  color: `${theme.palette.secondary.main} !important`,
  fontFamily: "Roboto, sans-serif !important",
  textAlign: "left",
  wordBreak: "break-all",
  marginTop: theme.spacing(1),
  fontSize: "14px",
  display: "inline-block",
  textDecoration: "underline !important"
}));

export const LogoEmpty = styled(Box)`
  width: 20px;
  height: 20px;
  background: ${(props) => alpha(props.theme.palette.common.white, 0.6)};
  border-radius: 50%;
  border: 1px solid ${(props) => props.theme.palette.grey[200]};
`;

export const TokenHeader = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  fontWeight: "bold",
  marginBottom: theme.spacing(2),
  color: theme.palette.secondary.main,
  overflowWrap: "anywhere"
}));

export const TokenDescription = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "left",
  fontSize: "0.75rem",
  color: theme.palette.secondary.light,
  flexDirection: "column"
}));

export const TokenUrl = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(1),
  cursor: "pointer",
  color: theme.palette.primary.main
}));

export const PolicyScriptBtn = styled(Button)(({ theme }) => ({
  color: theme.palette.primary.main,
  fontFamily: '"Roboto", sans-serif',
  fontSize: "14px",
  border: "none",
  backgroundColor: "transparent",
  textTransform: "capitalize",
  padding: 0,
  marginTop: theme.spacing(1),
  justifyContent: "flex-start",
  textAlign: "left",
  cursor: "pointer"
}));
