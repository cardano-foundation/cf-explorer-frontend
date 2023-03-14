import { Container, styled, Tab, Tabs } from "@mui/material";
import { Link } from "react-router-dom";

export const StyledLink = styled(Link)`
  font-family: var(--font-family-text) !important;
  color: ${props => props.theme.palette.secondary.main} !important;
`;

export const RegistrationContainer = styled(Container)`
  padding: 30px 0px 40px;
  text-align: left;
`;

export const StyledTabs = styled(Tabs)`
  .MuiTabs-flexContainer {
    gap: 50px;
    @media screen and (max-width: 1023px) {
      gap: 30px;
    }
  }
`;

export const StyledTab = styled(Tab)`
  color: ${props => props.theme.palette.grey[400]};
  padding: 0;
  &.Mui-selected {
    color: ${props => props.theme.palette.text.primary};
  }
`;

export const TabLabel = styled("h3")`
  text-transform: none;
  color: inherit;
`;
