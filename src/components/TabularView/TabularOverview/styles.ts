import { Box, Button, Typography, styled } from "@mui/material";
import { PaymentWallet } from "~/commons/resources";

export const CardOverview = styled(Box)`
  background: white;
  border-radius: 12px;
  height: 120px;
  display: flex;
  flex: wrap;
  padding: 0 25px;
  position: relative;
  overflow: hidden;
  box-shadow: 0px 10px 25px rgba(0, 0, 0, 0.03);
  & > svg {
    position: absolute;
    width: 127px;
    height: 120px;
    left: 0;
  }
`;

export const CardContent = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
  gap: "12px",
  width: "100%",
  padding: "15px 0px"
}));

export const WrapIcon = styled(Box)(() => ({
  width: 95,
  marginRight: 12,
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-start"
}));

export const CardTitle = styled(Typography)(({ theme }) => ({
  fontWeight: theme.typography.fontWeightBold,
  fontSize: "1rem",
  color: theme.palette.grey[400],
  marginBottom: 4,
  [theme.breakpoints.down("md")]: {
    fontSize: "0.785rem"
  }
}));

export const CardValue = styled(Typography)(({ theme }) => ({
  fontWeight: theme.typography.fontWeightBold,
  fontSize: 16,
  color: theme.palette.grey[700]
}));

export const WalletBox = styled(Box)(({ theme }) => ({
  display: " block",
  [theme.breakpoints.down("md")]: {
    display: "none"
  }
}));

export const StyledPaymentWalletIcon = styled(PaymentWallet)(({ theme }) => ({
  [theme.breakpoints.down("md")]: {
    transform: "scale(0.8)"
  },
  [theme.breakpoints.down("sm")]: {
    transform: "none"
  }
}));

export const TransferButton = styled(Button)(({ theme }) => ({
  background: theme.palette.primary.main,
  color: theme.palette.common.white,
  fontSize: 14,
  fontWeight: theme.typography.fontWeightBold,
  padding: "10px 16px",
  borderRadius: 8,
  textTransform: "unset",
  boxShadow: "none",
  width: "160px",
  [theme.breakpoints.down("md")]: {
    padding: "6px 12px",
    width: "min(100%, 160px)",
    fontSize: 10,
  },
  [theme.breakpoints.down("sm")]: {
    padding: "6px 16px",
    width: "160px",
    fontSize: 14,
  }
}));

export const WrapFlex = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  flexWrap: "wrap",
  gap: "5px",
  flex: 1
}));

export const WrapWalletIcon = styled(Box)`
  width: 30px;
  height: 30px;
  border-radius: 15px;
  background: rgba(67, 143, 104, 0.1);
  display: flex;
  justify-content: center;
  align-items: center;
  & > svg {
    width: 17px;
    height: 17px;
  }
`;
