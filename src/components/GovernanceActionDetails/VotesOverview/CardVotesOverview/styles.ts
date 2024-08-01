import { Box, styled, Typography } from "@mui/material";

import Card from "src/components/commons/Card";

export const CardContainer = styled(Card)`
  display: flex;
  gap: 12px;
  flex-direction: column;
  padding: 24px;
  width: 100%;
  background: ${({ theme }) => (theme.isDark ? theme.palette.secondary[100] : theme.palette.secondary[700])};
  box-shadow: 0px 2px 10px 0px #00000033;
`;

export const TitleField = styled(Typography)`
  font-size: 16px;
  font-weight: 600;
  color: ${({ theme }) => theme.palette.secondary.light};
  line-height: 18.75px;
`;

export const ValueField = styled(Typography)`
  font-size: 16px;
  font-weight: 400;
  color: ${({ theme }) => theme.palette.secondary.light};
  line-height: 18.75px;
`;
export const ContainerField = styled(Box)`
  display: flex;
  gap: 8px;
  align-items: center;
`;
