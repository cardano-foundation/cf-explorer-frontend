import { Box, styled, IconButton as IconButtonMui, alpha } from "@mui/material";

export const HoldBox = styled(Box)(({ theme }) => ({
  width: "200px",
  height: "35px",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: theme.spacing(2),
  border: `2px solid ${theme.palette.red[100]}`,
  borderRadius: "10px",
  marginRight: theme.spacing(5),
  position: "relative",
  background: theme.palette.common.white,
  "::after": {
    content: '"HOLD"',
    borderRadius: "4px",
    fontWeight: "bold",
    color: theme.palette.common.white,
    padding: "6px 8px",
    fontSize: "14px",
    position: "absolute",
    top: "-50%",
    left: theme.spacing(2),
    background: theme.palette.red[100],
    transform: " translate(0, 60%)"
  }
}));
export const FeeBox = styled(Box)(({ theme }) => ({
  width: "200px",
  height: "35px",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: theme.spacing(2),
  border: `2px solid ${theme.palette.red[100]}`,
  borderRadius: "10px",
  background: theme.palette.common.white,
  position: "relative",
  "::after": {
    content: '"FEES"',
    borderRadius: "4px",
    fontWeight: "bold",
    color: theme.palette.common.white,
    padding: "6px 8px",
    fontSize: "14px",
    position: "absolute",
    top: "-50%",
    left: theme.spacing(2),
    background: theme.palette.red[100],
    transform: " translate(0, 60%)"
  }
}));

export const IconButton = styled(IconButtonMui)(({ theme }) => ({
  background: theme.palette.grey[100]
}));
export const IconButtonBack = styled(IconButtonMui)(() => ({
  padding: 0
}));

export const Info = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  marginLeft: theme.spacing(2)
}));
export const InfoText = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  marginLeft: theme.spacing(1),
  fontWeight: 600,
  fontSize: "14px"
}));
export const Price = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  marginLeft: theme.spacing(1),
  fontSize: "14px",
  color: theme.palette.common.white
}));

export const WalletButton = styled(IconButton)(({ theme }) => ({
  background: alpha(theme.palette.common.white, 0.1)
}));
export const WalletBox = styled(Box)(() => ({
  transform: "translateX(-50%)",
  position: "absolute",
  bottom: 50,
  left: "50%",
  display: "flex"
}));

export const RewarWallet = styled(Box)(() => ({
  position: "absolute",
  left: "50%",
  bottom: "15%",
  display: "flex",
  alignItems: "center",
  transform: "translateX(-50%)"
}));
