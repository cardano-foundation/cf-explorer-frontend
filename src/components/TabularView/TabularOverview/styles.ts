import { Box, Button, Card, Typography, styled } from "@mui/material";
import { Link } from "react-router-dom";

import { AdaLogoIcon } from "src/components/commons/ADAIcon";

export const CardList = styled(Box)(() => ({
  display: "flex",
  flexWrap: "wrap",
  gap: "20px 15px",
  width: "100%"
}));

export const CardItem = styled(Card)<{ sidebar?: number }>(({ theme, sidebar }) => ({
  display: "flex",
  alignItems: "center",
  padding: "20px 25px",
  boxSizing: "border-box",
  gap: 20,
  flex: 1,
  background: theme.palette.secondary[0],
  boxShadow: theme.shadow.card,
  borderRadius: 12,
  minWidth: "calc(50% - 10px)",
  overflow: "hidden",
  width: "100%",
  [theme.breakpoints.down("lg")]: {
    minWidth: sidebar ? "100%" : "calc(50% - 10px)"
  },
  [theme.breakpoints.down("md")]: {
    minWidth: "100%"
  },
  [theme.breakpoints.between("sm", "lg")]: {
    padding: "20px",
    height: 140,
    overflowX: "auto",
    "&::-webkit-scrollbar": {
      height: "0"
    }
  }
}));

export const ItemIcon = styled("img")(({ theme }) => ({
  width: 80,
  height: 80,
  [theme.breakpoints.between("sm", "lg")]: {
    width: 60,
    height: 60
  }
}));

export const CardContent = styled(Box)(() => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: 10,
  flex: 1,
  boxSizing: "border-box",
  flexWrap: "wrap",
  width: "calc(100% - 100px)"
}));

export const CardInfo = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  gap: 8,
  flex: 1,
  width: "100%"
}));

export const CardTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  fontSize: 16,
  lineHeight: "19px",
  color: theme.palette.secondary.light,
  [theme.breakpoints.down("sm")]: {
    fontSize: 14,
    lineHeight: "16px"
  },
  whiteSpace: "nowrap"
}));

export const CardValue = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  fontSize: 24,
  lineHeight: "23px",
  color: theme.palette.secondary.main,
  whiteSpace: "nowrap",
  wordBreak: "break-word",
  width: "100%",
  display: "flex",
  [theme.breakpoints.down("sm")]: {
    fontSize: 14,
    lineHeight: "23px",
    alignItems: "center"
  }
}));

export const CardValueDelegating = styled(CardValue)(() => ({
  width: "100%"
}));

export const BoxStyled = styled(CardValue)(({ theme }) => ({
  display: "block",
  lineHeight: "28px",
  textOverflow: "ellipsis",
  overflow: "hidden",
  textAlign: "left",
  color: theme.palette.primary.main,
  [theme.breakpoints.down("sm")]: {
    fontSize: 14,
    lineHeight: "23px",
    whiteSpace: "nowrap"
  }
}));
export const BoxValue = styled(CardValue)(() => ({
  display: "block",
  textOverflow: "ellipsis",
  overflow: "hidden",
  textAlign: "left",
  width: "max-content",
  fontSize: "24px"
}));

export const StyledBoxDelegating = styled(Link)(() => ({
  width: "max-content",
  maxWidth: "100%",
  display: "flex",
  justifyContent: "flex-start",
  alignItems: "center"
}));
export const NoDelegatedStakePool = styled(Box)(({ theme }) => ({
  color: theme.palette.error[700],
  fontWeight: 500,
  fontSize: 16,
  textAlign: "left"
}));

export const StyledAdaLogoIcon = styled(AdaLogoIcon)(({ theme }) => ({
  fontSize: 18,
  marginLeft: 8,
  fill: theme.palette.secondary.main,
  paddingTop: 2,
  [theme.breakpoints.down("sm")]: {
    marginLeft: 5,
    fontSize: 11
  }
}));

export const TransferButton = styled(Button)(({ theme }) => ({
  background: theme.palette.primary.main,
  color: theme.isDark ? theme.palette.secondary[100] : theme.palette.secondary[0],
  fontSize: 14,
  fontWeight: 700,
  lineHeight: "16px",
  padding: "8px 16px",
  borderRadius: 8,
  textTransform: "unset",
  boxShadow: "none",
  width: "max-content",
  [theme.breakpoints.down("sm")]: {
    whiteSpace: "nowrap"
  }
}));
