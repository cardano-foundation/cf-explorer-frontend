import { Box, Typography, styled } from "@mui/material";

export const CardGovernanceVote = styled(Box)`
  padding: 20px;
  border-radius: 8px;
  cursor: pointer;
  box-shadow: 2px 2px 10px 0px #43465633;
  background: ${({ theme }) => (theme.isDark ? theme.palette.secondary[100] : "")};
  &:hover {
    box-shadow: ${({ theme }) =>
      theme.isDark ? ` 2px 2px 10px 0px ${theme.palette.secondary[100]}` : theme.shadow.cardHover};
  }
`;
export const StatusContainer = styled(Box)`
  & > div:first-child {
    padding: 4px 12px !important;
    margin: unset !important;
    border-radius: 20px;
  }
`;

export const CIPLabel = styled(Typography)`
  font-size: 12px;
  text-transform: uppercase;
  color: ${({ theme }) => (theme.isDark ? theme.palette.common.white : theme.palette.common.black)};
`;
