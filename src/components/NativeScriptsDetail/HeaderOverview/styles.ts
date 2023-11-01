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

export const ScriptHashLabel = styled(Typography)`
  font-size: 16px;
  font-weight: 700;
  display: inline-block;
  font-family: var(--font-family-text) !important;
  font-size: var(--font-size-text-small);
  color: ${(props) => props.theme.palette.primary.main} !important;
  margin-bottom: 5px;
`;
