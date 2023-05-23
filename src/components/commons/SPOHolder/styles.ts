import { styled, IconButton as IconButtonMui, Box } from "@mui/material";

export const IconButton = styled(IconButtonMui)(({ theme }) => ({
  background: theme.palette.grey[100]
}));

export const ButtonSPO = styled(Box)(({ theme }) => ({
  position: "absolute",
  bottom: "12%",
  padding: 0,
  zIndex: 3
}));
