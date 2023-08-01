import { Box, Typography, alpha, styled } from "@mui/material";

import { AdaLogoIcon } from "src/components/commons/ADAIcon";
import CardanoBlockchain from "src/components/commons/CardanoBlockchain";

export const DrawContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  width: "100%",
  height: "max-content",
  position: "relative",
  marginTop: 35,
  [theme.breakpoints.down("lg")]: {
    flexDirection: "column",
    alignItems: "center",
    margin: "auto",
    maxWidth: 540,
    minWidth: 540,
    gap: 50
  },
  [theme.breakpoints.down("sm")]: {
    maxWidth: 320,
    minWidth: 320
  }
}));

export const StyledCardanoBlockchain = styled(CardanoBlockchain)(() => ({
  width: 270,
  height: 270,
  margin: "0px -15px"
}));

export const RectBox = styled(Box)<{ disabled?: number }>(({ disabled, theme }) => ({
  width: "100%",
  maxWidth: 270,
  display: "flex",
  alignItems: "center",
  boxShadow: "0px 10px 25px rgba(0, 0, 0, 0.03)",
  borderRadius: 12,
  gap: 12,
  padding: "15px 20px",
  backgroundColor: disabled ? theme.palette.secondary[600] : theme.palette.common.white,
  boxSizing: "border-box",
  position: "relative",
  "& > image": {
    opacity: disabled ? 0.5 : 1
  },
  [theme.breakpoints.down("lg")]: {
    flexDirection: "column"
  }
}));

export const DisableAbleLabel = styled(Typography)<{ disabled?: number }>(({ theme, disabled }) => ({
  fontSize: "1ren",
  fontWeight: 700,
  color: disabled ? theme.palette.common.white : theme.palette.secondary[600],
  textAlign: "left",
  flex: 1,
  [theme.breakpoints.down("lg")]: {
    textAlign: "center"
  }
}));

export const RewardAccountCcontainer = styled(RectBox)(({ theme }) => ({
  borderRadius: 50,
  width: "100%",
  maxWidth: 225,
  height: 266,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  gap: 12,
  cursor: "pointer",
  [theme.breakpoints.between("lg", "xl")]: {
    maxWidth: 200
  }
}));

export const HolderWrapper = styled(Box)(({ theme }) => ({
  padding: "20px 35px",
  border: `1.5px dashed ${theme.palette.primary[200]}`,
  background: alpha(theme.palette.secondary.light, 0.03),
  borderRadius: 25,
  width: "100%",
  maxWidth: 340,
  boxSizing: "border-box",
  display: "flex",
  flexDirection: "column",
  gap: 25,
  [theme.breakpoints.down("xl")]: {
    maxWidth: 310,
    padding: 20,
    gap: 30
  },
  [theme.breakpoints.down("lg")]: {
    maxWidth: 328,
    padding: "24px 34px",
    flexDirection: "row-reverse"
  }
}));

export const AdaAmountWrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: 55,
  [theme.breakpoints.down("lg")]: {
    flexDirection: "row-reverse",
    gap: 75
  }
}));

export const RewardValueLabel = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: 10,
  fontSize: 14
}));

export const ClickAbleButton = styled(Box)(() => ({
  display: "inline-block",
  cursor: "pointer",
  marginRight: 4,
  height: 30
}));

export const FacingImg = styled("img")(() => ({
  width: 70,
  height: 70
}));

export const RewardBoxImg = styled("img")(() => ({
  width: 100,
  height: 100
}));

export const RewardValue = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: 5,
  color: theme.palette.secondary.main
}));

export const StyledAdaLogoIcon = styled(AdaLogoIcon)(({ theme }) => ({
  fontSize: 11,
  color: theme.palette.text.secondary,
  marginBottom: ".125em"
}));

export const AdaBox = styled(Box)(() => ({
  width: 70,
  height: 70,
  display: "flex",
  justifyItems: "center",
  alignItems: "center",
  cursor: "pointer"
}));
