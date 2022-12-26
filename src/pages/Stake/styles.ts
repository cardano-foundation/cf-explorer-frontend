import { styled, Container, Tabs, Tab } from "@mui/material";
import { Link } from "react-router-dom";

export const StyledContainer = styled(Container)`
  padding: 30px 0 40px;
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
  color: ${props => props.theme.textColorPale};
  padding: 0;
  &.Mui-selected {
    color: ${props => props.theme.textColor};
  }
`;

export const TabLabel = styled("h3")`
  text-transform: none;
  color: inherit;
`;

export const StyledLink = styled(Link)`
  font-family: var(--font-family-text) !important;
  color: ${props => props.theme.colorBlue} !important;
`;
