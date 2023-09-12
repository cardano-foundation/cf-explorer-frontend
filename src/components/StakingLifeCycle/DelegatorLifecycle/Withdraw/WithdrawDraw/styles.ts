import { Box, IconButton as IconButtonMui, alpha, styled } from "@mui/material";
import i18next from "i18next";

import { AdaLogoIcon } from "src/components/commons/ADAIcon";
import FeeBox from "src/components/commons/FeeBox";
import HoldBox from "src/components/commons/HoldBox";

export const IconButtonBack = styled(IconButtonMui)(() => ({
  padding: 0
}));

export const Info = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  [theme.breakpoints.up("md")]: {
    marginLeft: theme.spacing(2)
  },
  width: "max-content"
}));

export const InfoText = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  color: theme.palette.secondary.main,
  marginLeft: theme.spacing(1),
  fontWeight: 600,
  fontSize: "14px",
  [theme.breakpoints.down("lg")]: {
    marginLeft: 0,
    whiteSpace: "nowrap"
  }
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

export const DrawContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  height: "max-content",
  position: "relative",
  marginTop: 35,
  [theme.breakpoints.down(1440)]: {
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

export const AccountContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  gap: 38,
  width: 245,
  height: 238,
  padding: "30px 20px",
  border: `1.5px dashed ${theme.palette.border.hint}`,
  background: alpha(theme.palette.secondary.light, 0.03),
  borderRadius: 25,
  [theme.breakpoints.down(1440)]: {
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
  color: theme.palette.secondary.main,
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

export const PaymentWalleValue = styled("span")(({ theme }) => ({
  wordBreak: "break-word",
  marginRight: 5,
  fontWeight: 400,
  fontSize: "14px",
  color: theme.palette.secondary.main
}));

export const AmountGroup = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  width: "max-content",
  flexDirection: "row",
  gap: 8,
  [theme.breakpoints.down(1440)]: {
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

export const BoxGroup = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  alignItems: "center",
  gap: 68,
  width: 200,
  height: "100%",
  margin: "auto",
  [theme.breakpoints.down(1440)]: {
    flexDirection: "row-reverse",
    gap: 15,
    width: "100%"
  },
  [theme.breakpoints.down("sm")]: {
    gap: 18
  }
}));

export const NetAmountBox = styled(HoldBox)(({ theme }) => ({
  boxSizing: "border-box",
  minHeight: 70,
  height: "max-content",
  borderColor: theme.palette.success[800],
  width: "100%",
  maxWidth: 200,
  minWidth: 180,
  "::after": {
    content: `"${i18next.t("glossary.netAmount").toUpperCase()}"`,
    background: theme.palette.success[800]
  },
  [theme.breakpoints.down(1440)]: {
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
    content: `"${i18next.t("common.withdrawn").toUpperCase()}"`
  }
}));

export const StyledFeeBox = styled(FeeBox)(({ theme }) => ({
  width: 144,
  [theme.breakpoints.down(1440)]: {
    width: 156,
    padding: "16px 10px"
  },
  [theme.breakpoints.down("sm")]: {
    width: 135,
    padding: "16px 8px"
  }
}));

export const BufferBox = styled(Box)(({ theme }) => ({
  display: "none",

  [theme.breakpoints.down(1440)]: {
    display: "block"
  }
}));

export const AmountWithIconBox = styled(Box)(() => ({
  display: "flex",
  alignItems: "center"
}));
