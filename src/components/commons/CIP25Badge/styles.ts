import { Box, Typography, styled } from "@mui/material";

export const BadgeContainer = styled(Box)<{ success: number }>`
  border-radius: 10px;
  background-color: ${({ theme, success }) => (success ? theme.palette.success[100] : theme.palette.warning[100])};
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 24px;
  border: 1px solid ${({ theme, success }) => (success ? theme.palette.success[800] : theme.palette.warning[800])};
  gap: 6px;
  padding-right: 8px;
  box-sizing: border-box;
  min-width: 78px;
  cursor: pointer;
`;

export const CIPLabel = styled(Typography)`
  font-size: 12px;
  text-transform: uppercase;
  color: ${({ theme }) => (theme.isDark ? theme.palette.common.white : theme.palette.common.black)};
`;
