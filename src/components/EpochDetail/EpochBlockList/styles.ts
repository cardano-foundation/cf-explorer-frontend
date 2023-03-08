import { styled, Container, Box } from "@mui/material";
import { Link } from "react-router-dom";

export const StyledContainer = styled(Box)``;

export const StyledColorBlueDard = styled("span")`
  color: ${props => props.theme.colorBlueDark};
`;

export const FakedLink = styled("span")`
  font-family: var(--font-family-text);
  color: ${props => props.theme.colorBlue};
`;

export const StyledLink = styled(Link)`
  margin-left: 15px;
  font-family: var(--font-family-text) !important;
  color: ${props => props.theme.colorBlue} !important;
`;

export const StyledOutput = styled("div")`
  display: inline-flex;
  align-items: center;
  gap: 10px;
`;
