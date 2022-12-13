import { Container, styled, Tab } from "@mui/material";
import { Link } from "react-router-dom";

export const StyledLink = styled(Link)`
  font-family: var(--font-family-text);
  font-weight: var(--font-weight-bold);
  color: ${props => props.theme.colorBlue};
`;

export const RegistrationContainer = styled(Container)`
  padding: 30px 0px 40px;
  text-align: left;
`;

export const StyledTab = styled(Tab)`
  color: ${props => props.theme.textColorPale};
  &.Mui-selected {
    color: ${props => props.theme.textColor};
  }
`;

export const TabLabel = styled("h3")`
  margin: 0;
  text-transform: none;
  color: inherit;
`;
