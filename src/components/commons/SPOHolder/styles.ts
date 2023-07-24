import { styled, IconButton as IconButtonMui, Box } from "@mui/material";

export const IconButton = styled(IconButtonMui)(({ theme }) => ({
  background: theme.palette.primary[100]
}));

export const ButtonSPO = styled(Box)(() => ({
  position: "absolute",
  bottom: "12%",
  padding: 0,
  zIndex: 3
}));

export const StakeKeyItem = styled(Box)(() => ({
  display: "flex"
}));

export const StakeKeyItemList = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
  gap: 4
}));
