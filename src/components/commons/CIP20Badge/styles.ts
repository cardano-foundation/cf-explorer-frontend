import { Box, Typography, styled } from "@mui/material";

export const BadgeContainer = styled(Box)<{ success: number }>`
  border-radius: 10px;
  background-color: ${({ theme, success }) => (success ? theme.palette.success[100] : theme.palette.primary[100])};
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 24px;
  border: 1px solid ${({ theme, success }) => (success ? theme.palette.success[800] : theme.palette.secondary[600])};
  gap: 6px;
  width: auto;
  padding-right: 8px;
  padding-left: ${({ success }) => (success ? 0 : 2)}px;
  box-sizing: border-box;
  cursor: pointer;
  min-width: 78px;
`;

export const CIPLabel = styled(Typography)`
  font-size: 12px;
  text-transform: uppercase;
  color: ${({ theme }) => (theme.isDark ? theme.palette.common.white : theme.palette.common.black)};
`;
