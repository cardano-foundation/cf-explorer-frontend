import { styled } from "@mui/material";
import { Link } from "react-router-dom";

export const StyledColorBlueDard = styled("span")`
  color: ${props => props.theme.colorBlueDark};
`;

export const StyledLink = styled(Link)`
  font-family: var(--font-family-text) !important;
  color: ${props => props.theme.colorBlue} !important;
`;

export const StyledImage = styled("img")`
  margin-right: 8px;
`;

export const PriceWrapper = styled(StyledColorBlueDard)`
  display: flex;
  align-items: center;
  gap: 10px;
`;
