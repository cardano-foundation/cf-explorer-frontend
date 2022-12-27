import { styled } from "@mui/material";
import { Link } from "react-router-dom";

export const Bold = styled("span")`
  font-weight: var(--font-weight-bold);
`;

export const Flex = styled("div")`
  display: flex;
`;

export const StyledLink = styled(Link)`
  display: inline-block;
  font-family: var(--font-family-text) !important;
  font-size: var(--font-size-text-small);
  color: ${props => props.theme.colorBlue} !important;
  margin-bottom: 5px;
`;

export const SmallText = styled("small")`
  display: inline-block;
  color: #344054;
  margin-bottom: 5px;
`;

export const PriceValue = styled(Flex)`
  align-items: center;
`;
 

export const Label = styled(SmallText)`
  min-width: 50px;
`;

export const PriceIcon = styled("img")`
  height: var(--font-size-text-small);
  width: auto;
  margin-left: 8px;
  margin-bottom: 5px;
`;

