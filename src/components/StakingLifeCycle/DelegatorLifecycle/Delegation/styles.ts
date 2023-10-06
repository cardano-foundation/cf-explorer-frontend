import { Box, styled } from "@mui/material";
import { Link } from "react-router-dom";

export const ItemList = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: "5px 15px",
  justifyContent: "space-between",
  flexWrap: "wrap",
  width: 500,
  [theme.breakpoints.down("md")]: {
    width: "100%"
  }
}));

export const Item = styled(Box)(({ theme, flexDirection }) => ({
  backgroundColor: theme.isDark ? theme.palette.secondary[100] : theme.palette.secondary[0],
  padding: 20,
  flex: 1,
  display: "flex",
  flexDirection: typeof flexDirection === "string" ? flexDirection : "column",
  justifyContent: flexDirection === "row" ? "space-between" : "flex-start",
  alignItems: flexDirection === "row" ? "center" : "flex-start",
  minWidth: "calc(50% - 8px)",
  maxWidth: "calc(50% - 8px)",
  boxSizing: "border-box",
  [theme.breakpoints.down("md")]: {
    padding: "15px 20px"
  },
  [theme.breakpoints.down("sm")]: {
    padding: 15,
    paddingRight: flexDirection === "row" ? 5 : 15
  }
}));

export const Label = styled(Box)(({ theme }) => ({
  fontWeight: 700,
  fontSize: 14,
  lineHeight: "16px",
  color: theme.palette.secondary.light,
  marginBottom: 8
}));

export const LineData = styled(Box)(() => ({
  marginBottom: 8,
  ":last-of-type": {
    marginBottom: 0
  }
}));

export const StyledLink = styled(Link)(({ theme }) => ({
  fontSize: "0.875rem",
  color: `${theme.palette.primary.main} !important`
}));
