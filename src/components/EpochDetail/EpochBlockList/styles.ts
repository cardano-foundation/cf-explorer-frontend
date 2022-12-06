import { styled } from "@mui/material";
import { Link } from "react-router-dom";

export const StyledLink = styled("span")`
  font-weight: var(--font-weight-bold);
  font-family: var(--font-family-text);
  color: ${props => props.theme.colorBlue};
`;

export const StyledAddress = styled(Link)`
  display: inline-flex;
  align-items: center;
  margin-left: 15px;
  font-weight: var(--font-weight-bold);
  font-family: var(--font-family-text) !important;
  color: ${props => props.theme.colorBlue} !important;
`;

export const StyledOutput = styled("div")`
  display: flex;
  align-items: center;
`;

export const StyledAIcon = styled("img")`
  margin-right: 8px;
`;
