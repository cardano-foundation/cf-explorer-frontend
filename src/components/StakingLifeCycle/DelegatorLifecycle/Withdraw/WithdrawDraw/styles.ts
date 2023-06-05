import { Box, styled, IconButton as IconButtonMui, alpha } from "@mui/material";

import { AdaLogoIcon } from "src/components/commons/ADAIcon";
import FeeBox from "src/components/commons/FeeBox";
import HoldBox from "src/components/commons/HoldBox";

export const IconButtonBack = styled(IconButtonMui)(() => ({
  padding: 0
}));

export const Info = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  marginLeft: theme.spacing(2),
  width: "max-content"
}));

export const InfoText = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  marginLeft: theme.spacing(1),
  fontWeight: 600,
  fontSize: "14px"
}));

export const StepInfo = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: 20,
  marginBottom: 36,
  [theme.breakpoints.down("sm")]: {
    alignItems: "flex-start",
    marginBottom: 30
  }
}));

export const InfoGroup = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "flex-end",
  alignItems: "center",
  gap: 20,
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    gap: 5
  }
}));

export const DrawContainer = styled(Box)<{ sidebar?: number }>(({ theme, sidebar }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  width: "calc(100% + 30px)",
  height: "max-content",
  position: "relative",
  margin: "0px -15px",
  marginTop: 35,
  [theme.breakpoints.down("lg")]: {
    minWidth: 1120,
    margin: "auto",
    marginTop: 35,
    width: "100%"
  },
  [theme.breakpoints.down(sidebar ? "xl" : "lg")]: {
    flexDirection: "column",
    alignItems: "center",
    margin: "auto",
    marginTop: 35,
    maxWidth: 540,
    minWidth: 540
  },
  [theme.breakpoints.down("sm")]: {
    maxWidth: 320,
    minWidth: 320
  }
}));

export const AccountContainer = styled(Box)<{ sidebar?: number }>(({ theme, sidebar }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  gap: 38,
  width: 245,
  height: 238,
  padding: "30px 20px",
  border: "1.5px dashed #D2D2D2",
  background: alpha(theme.palette.grey[300], 0.1),
  borderRadius: 25,
  [theme.breakpoints.down("lg")]: {
    marginTop: 50
  },
  [theme.breakpoints.down(sidebar ? "xl" : "lg")]: {
    marginTop: 33
  }
}));

export const PaymentWalletContainer = styled(Box)(({ theme }) => ({
  background: theme.palette.common.white,
  borderRadius: 12,
  padding: "15px 10px",
  display: "flex",
  alignItems: "center",
  width: 245,
  boxSizing: "border-box",
  gap: 8
}));

export const PaymentWalletIcon = styled("img")(() => ({
  width: 70,
  height: 70
}));

export const PaymentWalletInfo = styled(Box)(() => ({
  flex: 1,
  textAlign: "left"
}));

export const PaymentWalletTitle = styled(Box)(({ theme }) => ({
  fontWeight: 700,
  fontSize: 16,
  lineHeight: "19px",
  color: theme.palette.common.black,
  marginBottom: 5
}));

export const PaymentWalletValueContainer = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
  gap: 8
}));

export const PaymentWalletIconBox = styled(Box)(({ theme }) => ({
  backgroundColor: alpha(theme.palette.common.white, 0.1),
  display: "flex",
  alignItems: "center",
  gap: 5
}));

export const PaymentWalleValue = styled(Box)(({ theme }) => ({
  fontWeight: 400,
  fontSize: "14px",
  color: theme.palette.common.black
}));

export const AmountGroup = styled(Box)<{ sidebar?: number }>(({ theme, sidebar }) => ({
  display: "flex",
  justifyContent: "center",
  width: "max-content",
  flexDirection: "row",
  gap: 8,
  [theme.breakpoints.down("lg")]: {
    flexDirection: "column",
    gap: 49,
    marginTop: 72
  },
  [theme.breakpoints.down(sidebar ? "xl" : "lg")]: {
    flexDirection: "column",
    gap: 49,
    marginTop: 72,
    marginBottom: 30
  },
  [theme.breakpoints.down("sm")]: {
    marginTop: 45,
    marginBottom: 15
  }
}));

export const StyledAdaLogoIcon = styled(AdaLogoIcon)(({ theme }) => ({
  fontSize: 11,
  color: theme.palette.text.secondary,
  marginBottom: ".125em"
}));

export const BoxGroup = styled(Box)<{ sidebar?: number }>(({ theme, sidebar }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  alignItems: "center",
  gap: 68,
  width: 200,
  height: "100%",
  margin: "auto",
  [theme.breakpoints.down("lg")]: {
    flexDirection: "row-reverse",
    gap: 15,
    width: "100%"
  },
  [theme.breakpoints.down(sidebar ? "xl" : "lg")]: {
    flexDirection: "row-reverse",
    gap: 15,
    width: "100%"
  },
  [theme.breakpoints.down("sm")]: {
    gap: 18
  }
}));

export const NetAmountBox = styled(HoldBox)<{ sidebar?: number }>(({ theme, sidebar }) => ({
  boxSizing: "border-box",
  minHeight: 70,
  height: "max-content",
  borderColor: theme.palette.green[600],
  width: "100%",
  maxWidth: 200,
  minWidth: 180,
  "::after": {
    content: '"NET AMOUNT"',
    background: theme.palette.green[600]
  },
  [theme.breakpoints.down(sidebar ? "lg" : "xl")]: {
    width: 180,
    maxWidth: 180,
    minWidth: 180,
    padding: "16px 10px"
  },
  [theme.breakpoints.down("sm")]: {
    width: 155,
    maxWidth: 155,
    minWidth: 155,
    padding: "16px 8px"
  }
}));

export const WithdrawnBox = styled(NetAmountBox)(() => ({
  "::after": {
    content: '"WITHDRAWN"'
  }
}));

export const StyledFeeBox = styled(FeeBox)(({ theme }) => ({
  width: 144,
  [theme.breakpoints.down("lg")]: {
    width: 156,
    padding: "16px 10px"
  },
  [theme.breakpoints.down("sm")]: {
    width: 135,
    padding: "16px 8px"
  }
}));

export const BufferBox = styled(Box)<{ sidebar?: number }>(({ theme, sidebar }) => ({
  display: "none",

  [theme.breakpoints.down(sidebar ? "xl" : "lg")]: {
    display: "block"
  }
}));
