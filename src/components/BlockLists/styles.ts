import { styled } from "@mui/material";
import { BiLinkExternal } from "react-icons/bi";

export const StyledColorBlueDard = styled("span")`
  color: ${props => props.theme.colorBlueDark};
`;

export const FWBold = styled(StyledColorBlueDard)`
  font-weight: var(--font-weight-bold);
`;

export const StyledLink = styled(FWBold)`
  color: ${props => props.theme.colorBlue};
  display: flex;
  align-items: center;
`;

export const StyledIcon = styled(BiLinkExternal)`
  font-size: 18px;
  margin-left: 8px;
`;

export const StyledImage = styled("img")`
  margin-right: 8px;
`;
