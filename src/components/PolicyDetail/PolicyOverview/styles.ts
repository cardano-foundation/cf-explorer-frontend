import { alpha, Box, Button, styled } from "@mui/material";
import { Link } from "react-router-dom";

import { CommonSkeleton } from "src/components/commons/CustomSkeleton";
import { TruncateSubTitleContainer } from "src/components/share/styled";

export const Status = styled("span")`
  font-family: var(--font-family-text);
  font-size: var(--font-size-text);
  margin-left: 25px;
  padding: 5px 12px;
  border-radius: 2px;
`;

export const Active = styled(Status)`
  background: ${(props) => props.theme.palette.success[100]};
  color: ${(props) => props.theme.palette.success[800]};
`;

export const Title = styled("div")`
  display: flex;
  align-items: center;
`;

export const Flex = styled("div")`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const StyledLink = styled("span")`
  font-family: var(--font-family-text) !important;
  color: ${(props) => props.theme.palette.secondary.main} !important;
`;

export const BackButton = styled("button")`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
  border: none;
  background: transparent;
  cursor: pointer;
  padding: 0;
  font-family: "Roboto", sans-serif;
  ${({ theme }) => theme.breakpoints.down("xl")} {
    svg {
      fill: ${(props) => props.theme.palette.secondary.light} !important;
    }
  }
`;
export const BackText = styled("small")`
  color: ${(props) => props.theme.palette.secondary.light};
  font-weight: var(--font-weight-bold);
`;

export const HeaderContainer = styled(Box)`
  display: flex;
  align-items: center;
`;

export const HeaderTitle = styled("h2")`
  color: ${(props) => props.theme.palette.secondary.main};
  font-size: 2.25rem;
  margin: 0.5rem 0;
`;
export const HeaderTitleSkeleton = styled(CommonSkeleton)`
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

export const SlotLeaderSkeleton = styled(CommonSkeleton)`
  height: 1em;
  width: 50%;
  border-radius: 4px;
`;
export const SlotLeader = styled(Box)`
  margin-top: 0px;
  font-weight: bold;
  color: ${(props) => props.theme.palette.secondary.main};
  display: flex;
  align-items: center;
`;

export const ViewMetaData = styled(Link)`
  display: block;
  font-family: var(--font-family-text) !important;
  color: ${(props) => props.theme.palette.text.primary}!important;
  text-decoration: underline !important;
`;
export const LabelStatus = styled(Box)(({ theme }) => ({
  marginLeft: theme.spacing(2),
  textTransform: "uppercase",
  padding: `${theme.spacing(1)} ${theme.spacing(3)}`,
  fontFamily: '"Roboto", sans-serif',
  fontWeight: "bold",
  fontSize: "0.875rem",
  borderRadius: 4,
  height: "60%"
}));

export const CardInfoOverview = styled(Box)(({ theme }) => ({
  padding: `${theme.spacing(3)} ${theme.spacing(5)}`,
  backgroundColor: theme.palette.background.paper,
  display: "flex",
  textAlign: "left",
  boxShadow: theme.shadow.card,
  borderRadius: 10,
  marginTop: theme.spacing(2),
  flexWrap: "wrap"
}));

export const CardItem = styled(Box)(({ theme }) => ({
  padding: `${theme.spacing(2)} ${theme.spacing(5)}`,
  background: theme.palette.secondary[0],
  borderRadius: 10
}));

export const TitleCard = styled(Box)(({ theme }) => ({
  color: `${alpha(theme.palette.common.black, 0.5)}`,
  fontSize: "0.875rem"
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
  maxHeight: "80vh",
  overflow: "hidden",
  display: "flex",
  flexDirection: "column",
  position: "relative",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "min(80vw, 600px)",
  backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(4),
  borderRadius: 10
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
  overflowY: "auto",
  backgroundColor: alpha(theme.palette.secondary.light, 0.1),
  borderRadius: 10,
  padding: theme.spacing(2),
  marginTop: theme.spacing(2),

  "& .MuiSvgIcon-root": {
    display: "none !important"
  }
}));
export const OverViewContainer = styled(Box)(({ theme }) => ({
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
    "& > *": {
      width: "100%"
    },
    "& h2": {
      fontSize: "24px",
      marginBottom: "0px"
    },
    "& > button": {
      height: "100px",
      flexDirection: "column",
      alignItems: "center"
    },
    "& > button > div": {
      height: "auto"
    }
  }
}));

export const PolicyIdContainer = styled(TruncateSubTitleContainer)(({ theme }) => ({
  fontWeight: "bold",
  color: theme.palette.primary.main,
  textWrap: "nowrap",
  marginLeft: theme.spacing(2)
}));
