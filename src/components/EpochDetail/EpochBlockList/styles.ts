import { styled } from "@mui/material";
import { BiLinkExternal } from "react-icons/bi";

export const StyledDiv = styled("div")`
  font-weight: var(--font-weight-bold);
`;

export const StyledBold = styled("span")`
  font-weight: var(--font-weight-bold);
`;

export const StyledLink = styled(StyledBold)`
  font-family: var(--font-family-text);
  color: ${props => props.theme.colorBlue};
`;

export const StyledAddress = styled(StyledLink)`
  display: inline-flex;
  align-items: center;
  margin-left: 15px;
`;

export const StyledCopyIcon = styled(BiLinkExternal)`
  margin-left: 8px;
`;

export const StyledOutput = styled("div")`
  display: flex;
  align-items: center;
`;

export const StyledAIcon = styled("img")`
  margin-right: 8px;
`;
