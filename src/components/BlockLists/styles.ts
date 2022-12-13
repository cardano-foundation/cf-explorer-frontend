import { styled } from "@mui/material";
import { BiLinkExternal } from "react-icons/bi";
import Table from "../commons/Table";

export const BlocksTable = styled(Table)`
  margin-top: 18px;
`;

export const StyledColorBlueDard = styled("span")`
  color: ${props => props.theme.colorBlueDark};
`;

export const StyledLink = styled("div")`
  color: ${props => props.theme.colorBlue};
  display: flex;
  align-items: center;
  font-weight: var(--font-weight-bold);
`;

export const StyledIcon = styled(BiLinkExternal)`
  font-size: 18px;
  margin-left: 8px;
`;

export const StyledImage = styled("img")`
  margin-right: 8px;
`;
