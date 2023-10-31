import { Box, Typography, styled } from "@mui/material";

import { StyledLink } from "../Tabs/styles";

export const Header = styled(Box)`
  text-align: left;
  margin-bottom: 20px;
`;

export const Title = styled(Typography)`
  color: ${({ theme }) => theme.palette.secondary.main};
  font-size: 36px;
  font-style: normal;
  font-weight: 700;
  display: flex;
`;

export const Key = styled(Typography)`
  color: ${({ theme }) => theme.palette.secondary.light};
  font-size: 16px;
  white-space: nowrap;
`;

export const Value = styled(Typography)`
  color: ${({ theme }) => theme.palette.secondary.light};
  font-size: 16px;
  font-weight: 700;
`;

export const ScriptHashLink = styled(StyledLink)`
  font-size: 16px;
  font-weight: 700;
`;
