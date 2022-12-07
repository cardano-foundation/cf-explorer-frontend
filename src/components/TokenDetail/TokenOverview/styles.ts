import { styled } from "@mui/material";

export const TokenId = styled("div")`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const TokenIdValue = styled("span")`
  color: ${props => props.theme.colorBlue};
  margin-right: 12.25px;
`;

export const Logo = styled("img")`
  height: 30px;
  width: 30px;
  margin-right: 5px;
`;
