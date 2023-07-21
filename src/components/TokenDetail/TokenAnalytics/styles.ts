import { Grid, Skeleton, Button, styled, Box, alpha } from "@mui/material";

export const BoxInfo = styled(Box)<{ space: number }>(({ theme }) => ({
  background: theme.palette.common.white,
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
    minHeight: "150px"
  }
}));

export const BoxInfoItemRight = styled(Box)(({ theme }) => ({
  height: "100%",
  paddingTop: theme.spacing(2),
  width: "80%",
  margin: "0 auto",
  borderBottom: `1px solid ${alpha(theme.palette.grey[400], 0.1)}`,
  overflow: "hidden",
  alignItems: "center",
  [theme.breakpoints.down("lg")]: {
    alignItems: "flex-start",
    borderRight: `1px solid ${alpha(theme.palette.grey[400], 0.1)}`,
    height: "100%",
    borderBottom: "none",
    width: "100%",
    minHeight: "160px"
  },
  [theme.breakpoints.down("sm")]: {
    borderRight: `1px solid ${alpha(theme.palette.grey[400], 0.1)}`,
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
  color: theme.palette.primary[100],
  backgroundColor: theme.palette.primary.main,
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
  fontSize: 12
}));

export const SkeletonUI = styled(Skeleton)(({ theme }) => ({
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
  border: `2px solid ${theme.palette.green[300_20]}`,
  marginRight: theme.spacing(1),
  color: active ? `${theme.palette.primary[100]} !important` : theme.palette.grey[300],
  fontWeight: "bold",
  backgroundColor: active ? theme.palette.primary.main : "none",
  "&:hover": {
    color: active ? `${theme.palette.text.dark} !important` : theme.palette.grey[300]
  },
  [theme.breakpoints.down("lg")]: {
    backgroundColor: active ? `${theme.palette.primary.main} !important` : "none",
    color: active ? `${theme.palette.primary.contrastText} !important` : theme.palette.grey[300],
    "&:hover": {
      backgroundColor: theme.palette.primary.main,
      color: active ? `${theme.palette.primary.contrastText} !important` : theme.palette.grey[300]
    }
  }
}));

export const TooltipBody = styled(Box)(({ theme }) => ({
  backgroundColor: alpha(theme.palette.secondary[0], 0.8),
  borderRadius: 2,
  padding: 8,
  border: "1px solid #146635",
  fontSize: 12,
  color: theme.palette.secondary.light
}));

export const TooltipLabel = styled(Box)(() => ({
  marginBottom: 3
}));

export const TooltipValue = styled(Box)(() => ({
  fontWeight: 700
}));
