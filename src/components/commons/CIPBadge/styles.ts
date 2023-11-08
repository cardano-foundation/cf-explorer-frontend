import { Box, Typography, styled } from "@mui/material";

export const BadgeContainer = styled(Box)`
  border-radius: 10px;
  background-color: ${({ theme }) => theme.palette.warning[100]};
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5px 9px 0.5px 0.5px;
  border: 1px solid ${({ theme }) => theme.palette.warning[800]};
  gap: 6px;
  width: 100%;
  max-width: 70px;
`;

export const CIPLabel = styled(Typography)`
  font-size: 12px;
  text-transform: uppercase;
`;
