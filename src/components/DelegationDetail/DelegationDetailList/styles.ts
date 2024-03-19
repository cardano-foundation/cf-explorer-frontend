import { Button, styled } from "@mui/material";
import { Link } from "react-router-dom";

export const StyledLink = styled(Link)`
  color: ${(props) => props.theme.palette.primary.main} !important;
  font-family: var(--font-family-text) !important;
`;

export const Tab = styled(Button)<{ isActive?: number }>`
  color: ${(props) => props.theme.palette.primary.main} !important;
  padding: 16px 24px;
  border: 1px solid ${(props) => props.theme.palette.primary[200]};
`;
