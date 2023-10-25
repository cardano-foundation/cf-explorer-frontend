import { Box, Button, Grid, alpha, styled } from "@mui/material";

import { CommonSkeleton } from "src/components/commons/CustomSkeleton";

export const BoxInfo = styled(Box)<{ space: number }>(({ theme }) => ({
  background: theme.palette.secondary[0],
  borderRadius: "10px",
  color: theme.palette.secondary[0],
  display: "flex",
  flexDirection: "column",
  textAlign: "center",
  [theme.breakpoints.down("lg")]: {
    flexDirection: "row"
  },
  [theme.breakpoints.down("sm")]: {
    flexDirection: "row"
  }
}));
export const BoxInfoItem = styled(Box)(({ theme }) => ({
  height: "100%",
  paddingTop: theme.spacing(2),
  width: "80%",
  margin: "0 auto",
  overflow: "hidden",
  alignItems: "center",
  [theme.breakpoints.down("lg")]: {
    alignItems: "flex-start",
    borderTop: "none",
    width: "100%",
    minHeight: "160px",
    height: "100%"
  },
  [theme.breakpoints.down("sm")]: {
    minHeight: "150px"
  }
}));

export const BoxInfoItemRight = styled(Box)(({ theme }) => ({
  height: "100%",
  paddingTop: theme.spacing(2),
  width: "80%",
  margin: "0 auto",
  borderBottom: `1px solid ${alpha(theme.palette.secondary.main, 0.1)}`,
  overflow: "hidden",
  alignItems: "center",
  [theme.breakpoints.down("lg")]: {
    alignItems: "flex-start",
    borderRight: `1px solid ${alpha(theme.palette.secondary.main, 0.1)}`,
    height: "auto",
    borderBottom: "none",
    width: "100%",
    minHeight: "160px"
  },
  [theme.breakpoints.down("sm")]: {
    borderRight: `1px solid ${alpha(theme.palette.secondary.main, 0.1)}`,
    minHeight: "150px"
  }
}));

export const Title = styled(Box)(({ theme }) => ({
  color: theme.palette.secondary.light,
  fontWeight: "bold",
  padding: `${theme.spacing(2)} 0`,
  [theme.breakpoints.down("sm")]: {
    fontSize: "1rem"
  }
}));

export const ValueInfo = styled(Box)(({ theme }) => ({
  fontWeight: "bold",
  fontSize: "2rem",
  margin: "0 auto",
  color: theme.palette.secondary.main,
  overflowWrap: "anywhere",
  padding: "0 18px",
  [theme.breakpoints.down("md")]: {
    padding: "0 10px"
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: "1.25rem",
    padding: "0 10px"
  }
}));

export const Wrapper = styled(Grid)(() => ({
  borderRadius: 10,
  minHeight: "400px",
  textAlign: "left"
}));

export const ButtonTitle = styled("button")(({ theme }) => ({
  border: "none",
  borderRadius: 5,
  padding: "8px 30px",
  fontWeight: "bold",
  fontSize: "1rem",
  marginRight: 5,
  color: theme.isDark ? theme.palette.secondary[0] : theme.palette.secondary.light,
  backgroundColor: theme.isDark ? theme.palette.primary.main : theme.palette.primary[200],
  fontFamily: "var(--font-family-title)",
  [theme.breakpoints.down("sm")]: {
    width: "80px !important",
    height: "28px !important",
    padding: 0,
    borderRadius: "5px"
  }
}));

export const ChartBox = styled(Box)(({ theme }) => ({
  paddingTop: theme.spacing(3),
  paddingBottom: theme.spacing(1),
  fontSize: 12
}));

export const SkeletonUI = styled(CommonSkeleton)(({ theme }) => ({
  paddingTop: theme.spacing(3),
  marginRight: theme.spacing(2),
  borderRadius: 10
}));

export const Tabs = styled(Box)(({ theme }) => ({
  [theme.breakpoints.up("md")]: {
    textAlign: "end"
  },
  [theme.breakpoints.down("md")]: {
    display: "flex",
    justifyContent: "flex-end"
  },
  [theme.breakpoints.down("sm")]: {
    "& button": {
      width: "40px !important",
      height: "28px !important",
      padding: "0px !important",
      minWidth: "auto",
      borderRadius: "5px"
    }
  }
}));

export const Tab = styled(Button)<{ active: number }>(({ theme, active }) => ({
  textTransform: "lowercase",
  borderRadius: 10,
  border: active ? "none" : `2px solid ${theme.palette.primary[200]}`,
  marginRight: theme.spacing(1),
  fontWeight: "bold",
  color: active ? `${theme.palette.secondary[0]} !important` : theme.palette.secondary.main,
  backgroundColor: active ? theme.palette.secondary.light : "none",
  "&:hover": {
    color: active ? `${theme.palette.secondary[0]} !important` : theme.palette.secondary.main,
    backgroundColor: active ? theme.palette.secondary.light : "none"
  }
}));

export const TooltipLabel = styled(Box)(() => ({
  marginBottom: 3
}));

export const TooltipValue = styled(Box)(() => ({
  fontWeight: 700
}));
