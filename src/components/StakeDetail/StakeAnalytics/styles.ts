import { Grid, Skeleton, Button, styled, Box, alpha } from "@mui/material";

export const StyledGrid = styled(Grid)(({ theme }) => ({
  [theme.breakpoints.down("lg")]: {
    height: "100%",
    minHeight: 160
  }
}));

export const BoxInfo = styled(Box)(({ theme }) => ({
  background: theme.palette.secondary.dark,
  borderRadius: "10px",
  color: theme.palette.primary.contrastText,
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

export const CustomButton = styled("button")<{ active: number }>(({ theme, active }) => ({
  width: "115px",
  border: "none",
  borderRadius: "5px",
  padding: "6px 0",
  fontWeight: "var(--font-weight-bold)",
  color: active ? theme.palette.primary.contrastText : theme.palette.grey[400],
  backgroundColor: active ? theme.palette.green[700] : theme.palette.background.neutral,
  cursor: "pointer",
  fontFamily: "var(--font-family-title)",
  fontSize: "16px",
  lineHeight: "24px",

  [theme.breakpoints.down("sm")]: {
    width: "60px",
    padding: "6px 10px",
    marginRight: "6px !important",
    fontSize: "12px"
  }
}));

export const BoxInfoItem = styled(Box)(({ theme }) => ({
  height: "100%",
  paddingTop: theme.spacing(2),
  width: "80%",
  margin: "0 auto",
  overflow: "hidden",
  [theme.breakpoints.down("lg")]: {
    borderTop: "none",
    width: "100%",
    minHeight: "200px",
    height: "100%",
    paddingTop: 0
  },
  [theme.breakpoints.down("sm")]: {
    width: "100%",
    borderRight: "none",
    borderBottom: `1px solid ${alpha(theme.palette.common.white, 0.07)}`,
    minHeight: "0px",

    "& > div": {
      width: "100%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "0 10px",
      margin: "25px 0"
    }
  }
}));

export const BoxInfoItemRight = styled(Box)(({ theme }) => ({
  height: "100%",
  paddingTop: theme.spacing(2),
  width: "80%",
  margin: "0 auto",
  borderBottom: `1px solid ${alpha(theme.palette.common.white, 0.07)}`,
  overflow: "hidden",
  [theme.breakpoints.down("lg")]: {
    borderRight: `1px solid ${alpha(theme.palette.common.white, 0.07)}`,
    height: "100%",
    borderBottom: "none",
    width: "100%",
    minHeight: "200px",
    paddingTop: 0
  },
  [theme.breakpoints.down("sm")]: {
    width: "100%",
    borderRight: "none",
    borderBottom: `1px solid ${alpha(theme.palette.common.white, 0.07)}`,
    minHeight: "0",

    "& > div": {
      width: "100%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "0 10px",
      margin: "25px 0",
      borderRight: `1px solid ${alpha(theme.palette.common.white, 0.06)}`
    }
  }
}));

export const Title = styled(Box)(({ theme }) => ({
  fontWeight: "bold",
  padding: `${theme.spacing(2)} 0`
}));

export const ValueInfo = styled(Box)(({ theme }) => ({
  fontWeight: "bold",
  fontSize: "2rem",
  margin: "0 auto",
  overflowWrap: "anywhere",
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

export const ButtonTitle = styled("button")<{ active: boolean }>(({ theme, active }) => ({
  borderRadius: "5px",
  padding: "8px 30px",
  fontWeight: "bold",
  fontSize: "1rem",
  color: active ? `${theme.palette.primary.contrastText} !important` : theme.palette.grey[400],
  backgroundColor: active ? theme.palette.green[700] : "none",
  fontFamily: "var(--font-family-title)",
  border: `2px solid ${theme.palette.green[800_20]}`,
  cursor: "pointer",
  [theme.breakpoints.down("sm")]: {
    width: "95px",
    textAlign: "center",
    padding: "8px 0px"
  }
}));

export const ChartBox = styled(Box)(({ theme }) => ({
  paddingTop: theme.spacing(3),
  fontSize: 12
}));

export const SkeletonUI = styled(Skeleton)(({ theme }) => ({
  paddingTop: theme.spacing(3),
  marginRight: theme.spacing(2),
  borderRadius: 10
}));

export const Tabs = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "flex-end",
  gap: "5px",
  [theme.breakpoints.down("sm")]: {
    gap: "2px"
  }
}));

export const Tab = styled(Button)<{ active: number }>(({ theme, active }) => ({
  textTransform: "lowercase",
  borderRadius: 10,
  border: `2px solid ${theme.palette.green[800_20]}`,
  fontWeight: "bold",
  color: active ? `${theme.palette.primary.contrastText} !important` : theme.palette.grey[400],
  backgroundColor: active ? theme.palette.green[700] : "none",
  "&:hover": {
    color: active ? `${theme.palette.text.dark} !important` : theme.palette.grey[400]
  },
  [theme.breakpoints.down("lg")]: {
    backgroundColor: active ? `${theme.palette.primary.main} !important` : "none",
    color: active ? `${theme.palette.primary.contrastText} !important` : theme.palette.grey[400],
    "&:hover": {
      backgroundColor: theme.palette.primary.main,
      color: active ? `${theme.palette.primary.contrastText} !important` : theme.palette.grey[400]
    }
  },
  [theme.breakpoints.down("sm")]: {
    minWidth: `40px !important`,
    height: `28px !important`,
    marginRight: "0px"
  }
}));

export const TooltipBody = styled(Box)(({ theme }) => ({
  backgroundColor: alpha(theme.palette.common.white, 0.8),
  borderRadius: 2,
  padding: 8,
  border: "1px solid #146635",
  fontSize: 12,
  color: theme.palette.grey[500]
}));

export const TooltipLabel = styled(Box)(() => ({
  marginBottom: 3
}));

export const TooltipValue = styled(Box)(() => ({
  fontWeight: 700
}));
