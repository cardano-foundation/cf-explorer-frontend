import { styled } from "@mui/material";
import { BiLinkExternal } from "react-icons/bi";

export const Flex = styled("div")`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const StyledLink = styled("span")`
  font-family: var(--font-family-text) !important;
  color: ${props => props.theme.colorBlue} !important;
`;

export const StyledSpan = styled("span")`
  display: flex;
  align-items: center;
`;

export const StyledImage = styled("img")`
  margin-left: 10px;
`;

export const StyledIcon = styled(BiLinkExternal)`
  font-size: 18px;
  margin-left: 8px;
  color: ${props => props.theme.colorBlue}
`;