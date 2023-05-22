import { Typography, styled } from "@mui/material";

export const AdaHolderImage = styled("img")(() => ({
  width: 100,
  height: 100
}));

export const AdaHolderValue = styled(Typography)`
  font-size: 14px;
  color: ${({ theme }) => theme.palette.grey[700]};
`;
