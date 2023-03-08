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
  background: rgba(67, 143, 104, 0.2);
  color: #438f68;
`;

export const Deactive = styled(Status)`
  background: rgba(24, 76, 120, 0.1);
  color: #667085;
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

export const StyledLink = styled(Link)`
  max-width: 250px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  font-family: var(--font-family-text) !important;
  display: inline-block;
`;

export const BackButton = styled(Link)`
  display: inline-flex;
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
`;

export const SlotLeaderSkeleton = styled(Skeleton)`
  height: 1em;
  width: 50%;
  border-radius: 4px;
`;
export const SlotLeader = styled(Box)`
  margin-top: 0px;
  font-weight: bold;
  color: ${props => props.theme.colorBlue};
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
  textTransform: "uppercase",
  padding: "1.5px 10px",
  fontFamily: '"Roboto", sans-serif',
  fontWeight: "bold",
  fontSize: "var(--font-size-text-small)",
  borderRadius: 4,
  height: "60%",
}));

export const CardInfoOverview = styled(Box)(({ theme }) => ({
  padding: `${theme.spacing(3)} 0`,
  backgroundColor: "#fff",
  display: "flex",
  textAlign: "left",
  boxShadow: theme.shadowRaised,
  borderRadius: theme.borderRadius,
  marginTop: theme.spacing(3),
  flexWrap: "wrap",
}));

export const CardItem = styled(Box)(({ theme }) => ({
  width: "max-content",
  flex: 1,
  borderLeft: "1px solid rgba(0,0,0,0.1)",
  paddingLeft: theme.spacing(3),
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
  fontSize: "var(--font-size-text-small)",
  fontWeight: "bold",
  marginTop: theme.spacing(1),
}));

export const StyledFlexValue = styled(Box)(({ theme }) => ({
  display: "inline-flex",
  fontSize: "var(--font-size-text-large)",
  alignItems: "center",
  gap: "10px",
}));

export const ButtonModal = styled(Button)(({ theme }) => ({
  textTransform: "capitalize",
  padding: 0,
  textDecoration: "underline",
  ":hover": {
    textDecoration: "underline",
  },
}));
