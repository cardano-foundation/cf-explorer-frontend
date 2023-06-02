import { Grid, Skeleton, Button, styled, Box, alpha } from "@mui/material";

export const BoxInfo = styled(Box)<{ space: number }>(({ theme, space }) => ({
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
      padding: "0 10px 20px 10px"
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
  alignItems: "center",
  [theme.breakpoints.down("lg")]: {
    alignItems: "flex-start",
    borderRight: `1px solid ${alpha(theme.palette.common.white, 0.07)}`,
    height: "100%",
    borderBottom: "none",
    width: "100%",
    minHeight: "160px"
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
      padding: "0 10px 20px 10px",
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
  padding: "0 18px",
  [theme.breakpoints.down("md")]: {
    padding: "0 10px"
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: "1.25rem",
    padding: "0 10px"
  }
}));

export const Wrapper = styled(Grid)(({ theme }) => ({
  borderRadius: 10,
  minHeight: "400px",
  textAlign: "left"
}));

export const ButtonTitle = styled("button")(({ theme }) => ({
  border: "none",
  borderRadius: 10,
  padding: "8px 30px",
  fontWeight: "bold",
  fontSize: "1rem",
  marginRight: 5,
  color: theme.palette.primary.contrastText,
  backgroundColor: theme.palette.primary.main,
  fontFamily: "var(--font-family-title)",

  [theme.breakpoints.down("sm")]: {
    width: "80px",
    padding: "6px 10px"
  }
}));

export const ChartBox = styled(Box)(({ theme }) => ({
  paddingTop: theme.spacing(3)
}));

export const SkeletonUI = styled(Skeleton)(({ theme }) => ({
  paddingTop: theme.spacing(3),
  marginRight: theme.spacing(2),
  borderRadius: 10
}));

export const Tabs = styled(Box)(() => ({
  display: "flex",
  justifyContent: "flex-end",
  gap: "5px"
}));

export const Tab = styled(Button)<{ active: number }>(({ theme, active }) => ({
  textTransform: "lowercase",
  borderRadius: 10,
  border: `2px solid ${theme.palette.green[800_20]}`,
  color: active ? `${theme.palette.primary.contrastText} !important` : theme.palette.grey[400],
  fontWeight: "bold",
  backgroundColor: active ? theme.palette.primary.main : "none",

  [theme.breakpoints.down("sm")]: {
    minWidth: `40px !important`,
    height: `28px !important`
  },

  [theme.breakpoints.down("lg")]: {
    backgroundColor: active ? `${theme.palette.primary.main} !important` : "none",
    color: active ? `${theme.palette.primary.contrastText} !important` : theme.palette.grey[400]
  },

  [theme.breakpoints.down("md")]: {
    "&:hover": {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.primary.contrastText
    }
  }
}));
