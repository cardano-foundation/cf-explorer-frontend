import { Box, Button, Card, Typography, styled } from "@mui/material";
import { AdaLogoIcon } from "~/components/commons/ADAIcon";

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
  boxShadow: theme.shadow.card,
  borderRadius: 12,
  minWidth: "calc(50% - 10px)",
  overflow: "hidden",
  [theme.breakpoints.down("lg")]: {
    minWidth: sidebar ? "100%" : "calc(50% - 10px)"
  },
  [theme.breakpoints.down("md")]: {
    minWidth: "100%"
  }
}));

export const ItemIcon = styled("img")(() => ({
  width: 80,
  height: 80
}));

export const CardContent = styled(Box)(() => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: 10,
  flex: 1,
  boxSizing: "border-box",
  flexWrap: "wrap"
}));

export const CardInfo = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  gap: 8,
  flex: 1
}));

export const CardTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  fontSize: 16,
  lineHeight: "19px",
  color: theme.palette.grey[400],
  [theme.breakpoints.down("sm")]: {
    fontSize: 14,
    lineHeight: "16px"
  }
}));

export const CardValue = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  fontSize: 24,
  lineHeight: "23px",
  color: theme.palette.grey[700],
  whiteSpace: "nowrap",
  wordBreak: "break-all",
  [theme.breakpoints.down("sm")]: {
    fontSize: 20,
    lineHeight: "23px",
    whiteSpace: "wrap",
    wordBreak: "break-all"
  }
}));

export const StyledAdaLogoIcon = styled(AdaLogoIcon)(({ theme }) => ({
  fontSize: 18,
  marginLeft: 8,
  [theme.breakpoints.down("sm")]: {
    marginLeft: 5,
    fontSize: 16
  }
}));

export const TransferButton = styled(Button)(({ theme }) => ({
  background: theme.palette.primary.main,
  color: theme.palette.common.white,
  fontSize: 14,
  fontWeight: 700,
  lineHeight: "16px",
  padding: "8px 16px",
  borderRadius: 8,
  textTransform: "unset",
  boxShadow: "none",
  width: "max-content"
}));
