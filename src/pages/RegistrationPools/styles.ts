import { Box, Container, styled, Tab, Tabs } from "@mui/material";
import { Link } from "react-router-dom";

export const StakeKey = styled(Box)`
  display: block;
`;

export const StyledLink = styled(Link)`
  font-family: var(--font-family-text) !important;
  color: ${(props) => props.theme.palette.primary.main} !important;
`;

export const RegistrationContainer = styled(Container)(({ theme }) => ({
  maxWidth: "95vw !important",
  paddingTop: "30px",
  textAlign: "left",
  position: "relative",
  [theme.breakpoints.down("md")]: {
    padding: "25px 16px 30px"
  }
}));

export const StyledTabs = styled(Tabs)`
  .MuiTabs-flexContainer {
    gap: 50px;
    ${({ theme }) => theme.breakpoints.down("md")} {
      gap: 30px;
    }
  }
  ${({ theme }) => theme.breakpoints.down("md")} {
    border-bottom: 1px solid ${(props) => props.theme.palette.border.main};
    width: 100%;
  }
`;

export const WrapHeader = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  borderBottom: `1px solid ${theme.palette.border.main}`,
  [theme.breakpoints.down("md")]: {
    alignItems: "flex-start",
    borderBottom: "none",
    flexDirection: "column"
  }
}));

export const StyledTab = styled(Tab)`
  color: ${(props) => props.theme.palette.secondary.light};
  padding: 0;
  &.Mui-selected {
    color: ${(props) => props.theme.palette.text.primary};
  }
`;

export const TabLabel = styled("h3")`
  text-transform: none;
  color: inherit;
`;

export const TimeDuration = styled("small")(({ theme }) => ({
  color: theme.palette.secondary.light,
  display: "block",
  textAlign: "right",
  width: "max-content",
  lineHeight: 1,
  marginTop: "0.5rem",
  [theme.breakpoints.down("sm")]: {
    position: "relative",
    width: "100%",
    textAlign: "left",
    marginTop: 10,
    top: "unset",
    right: "unset"
  }
}));
