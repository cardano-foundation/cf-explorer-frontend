import { styled } from "@mui/material";
import { Link } from "react-router-dom";

export const StyledLink = styled(Link)`
  color: ${(props) => props.theme.palette.secondary.main} !important;
  font-family: var(--font-family-text) !important;
`;
