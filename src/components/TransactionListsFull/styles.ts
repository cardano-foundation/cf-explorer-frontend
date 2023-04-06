import { styled, Container, Box } from "@mui/material";
import { Link } from "react-router-dom";

export const StyledContainer = styled(Container)`
  margin-top: 18px;
`;

export const StyledLink = styled(Link)`
  font-family: var(--font-family-text) !important;
  color: ${props => props.theme.palette.secondary.main} !important;
`;
export const Label = styled(Box)`
  min-width: 50px;
`;
