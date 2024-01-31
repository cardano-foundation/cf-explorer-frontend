import { Box, Typography, styled } from "@mui/material";

import { TCIPType } from ".";

export const BadgeContainer = styled(Box)<{ type: TCIPType }>`
  border-radius: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 24px;
  gap: 6px;
  padding-right: 8px;
  box-sizing: border-box;
  min-width: 78px;
  cursor: pointer;
  background-color: ${({ theme, type }) => {
    switch (type) {
      case "success":
        return theme.palette.success[100];
      case "warning":
        return theme.palette.warning[100];
      default:
        return theme.palette.primary[200];
    }
  }};
  border: 1px solid
    ${({ theme, type }) => {
      switch (type) {
        case "success":
          return theme.palette.success[800];
        case "warning":
          return theme.palette.warning[800];
        default:
          return theme.palette.primary.main;
      }
    }};
`;

export const CIPLabel = styled(Typography)`
  font-size: 12px;
  text-transform: uppercase;
  color: ${({ theme }) => (theme.isDark ? theme.palette.common.white : theme.palette.common.black)};
`;
