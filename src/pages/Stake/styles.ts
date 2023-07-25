import { styled, Container, Tabs, Tab } from "@mui/material";
import { Link } from "react-router-dom";

export const StyledContainer = styled(Container)`
  padding-top: 30px;
  text-align: left;

  ${({ theme }) => theme.breakpoints.down("md")} {
    padding-top: 0px;
  }

  ${({ theme }) => theme.breakpoints.down("sm")} {
    margin-top: 0px !important;
    .stake-list {
      padding: 0px 16px;
    }
  }
`;

export const StyledTabs = styled(Tabs)`
  .MuiTabs-flexContainer {
    gap: 50px;
    ${({ theme }) => theme.breakpoints.down("md")} {
      gap: 30px;
    }
  }
`;

export const StyledTab = styled(Tab)`
  color: ${(props) => props.theme.palette.grey[400]};
  padding: 0;
  &.Mui-selected {
    color: ${(props) => props.theme.palette.text.primary};
  }
`;

export const TabLabel = styled("h3")`
  text-transform: none;
  color: inherit;
`;

export const StyledLink = styled(Link)`
  font-family: var(--font-family-text) !important;
  color: ${(props) => props.theme.palette.secondary.main} !important;
`;

export const TimeDuration = styled("small")(({ theme }) => ({
  color: theme.palette.grey[400],
  display: "block",
  textAlign: "right",
  position: "absolute",
  width: "max-content",
  top: 30,
  right: 24,
  lineHeight: 1,
  marginTop: "0.5rem",
  [theme.breakpoints.down("sm")]: {
    position: "relative",
    width: "100%",
    textAlign: "left",
    marginTop: 15,
    top: "unset",
    right: "unset"
  }
}));
