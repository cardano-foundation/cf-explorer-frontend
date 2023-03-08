import { styled, Container } from "@mui/material";
import { Link } from "react-router-dom";

export const StyledContainer = styled(Container)``;

export const StyledColorBlueDard = styled("span")`
  color: ${props => props.theme.textColor};
`;

export const FakedLink = styled("span")`
  font-family: var(--font-family-text);
  color: ${props => props.theme.linkColor};
`;

export const StyledLink = styled(Link)`
  margin-left: 15px;
  font-family: var(--font-family-text) !important;
  color: ${props => props.theme.linkColor} !important;
`;

export const StyledOutput = styled("div")`
  display: inline-flex;
  align-items: center;
  gap: 10px;
`;
