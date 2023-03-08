import { Box, Button, Skeleton, styled } from "@mui/material";
import { Link } from "react-router-dom";

export const Status = styled("span")`
  font-family: var(--font-family-text);
  font-size: var(--font-size-text);
  margin-left: 25px;
  padding: 5px 12px;
  border-radius: 2px;
`;

export const Active = styled(Status)`
  background: ${props => props.theme.green_2_20};
  color: ${props => props.theme.green_2};
`;

export const Deactive = styled(Status)`
  background: ${props => props.theme.green_9_10};
  color: ${props => props.theme.textColorLight};
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
  color: ${props => props.theme.linkColor} !important;
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
`;
export const BackText = styled("small")`
  color: ${props => props.theme.gray_3};
  font-weight: var(--font-weight-bold);
`;

export const HeaderContainer = styled(Box)`
  display: flex;
  align-items: center;
`;

export const HeaderTitle = styled("h2")`
  color: ${props => props.theme.textColorBold};
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

export const SlotLeaderSkeleton = styled(Skeleton)`
  height: 1em;
  width: 50%;
  border-radius: 4px;
`;
export const SlotLeader = styled(Box)`
  margin-top: 0px;
  font-weight: bold;
  color: ${props => props.theme.linkColor};
  display: flex;
  align-items: center;
`;

export const ViewMetaData = styled(Link)`
  display: block;
  font-family: var(--font-family-text) !important;
  color: ${props => props.theme.textColor}!important;
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
  height: "60%",
}));

export const CardInfoOverview = styled(Box)(({ theme }) => ({
  padding: `${theme.spacing(3)} ${theme.spacing(5)}`,
  backgroundColor: theme.boxBackgroundColor,
  display: "flex",
  textAlign: "left",
  boxShadow: theme.shadow_0,
  borderRadius: 10,
  marginTop: theme.spacing(2),
  flexWrap: "wrap",
}));

export const CardItem = styled(Box)(({ theme }) => ({
  padding: `${theme.spacing(2)} ${theme.spacing(5)}`,
  background: theme.boxBackgroundColor,
  borderRadius: 10,
}));

export const TitleCard = styled(Box)(({ theme }) => ({
  color: `${theme.black_50}`,
  fontSize: "0.875rem",
}));
export const ValueCard = styled(Box)(({ theme }) => ({
  color: theme.textColorBold,
  fontSize: "1rem",
  fontWeight: "bold",
}));

export const ButtonView = styled(Link)(({ theme }) => ({
  background: "transperant",
  padding: 0,
  minWidth: 0,
  fontWeight: "bold",
  textTransform: "capitalize",
  color: `${theme.linkColor} !important`,
  fontFamily: "Helvetica, monospace",
}));

export const ModalContainer = styled(Box)(({ theme }) => ({
  position: "relative",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "min(80vw, 600px)",
  backgroundColor: theme.boxBackgroundColor,
  padding: theme.spacing(4),
  borderRadius: 10,
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
  backgroundColor: `${theme.gray_5_10}`,
  borderRadius: 10,
  padding: theme.spacing(2),
  marginTop: theme.spacing(2),

  "& .MuiSvgIcon-root": {
    display: "none !important",
  },
}));
