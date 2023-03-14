import { Grid, Skeleton, Button, styled, Box, alpha } from "@mui/material";

export const BoxInfo = styled(Box)(({ theme }) => ({
  height: `100%`,
  background: theme.palette.secondary.dark,
  borderRadius: "10px",
  color: theme.palette.primary.contrastText,
  display: "flex",
  flexDirection: "column",
  textAlign: "center",
  [theme.breakpoints.down("lg")]: {
    flexDirection: "row",
  },
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
  },
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
    paddingTop: 0,
  },
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
    paddingTop: 0,
  },
  [theme.breakpoints.down("sm")]: {
    width: "80%",
    borderRight: "none",
    borderBottom: `1px solid ${alpha(theme.palette.common.white, 0.07)}`,
  },
}));

export const Title = styled(Box)(({ theme }) => ({
  fontWeight: "bold",
  padding: `${theme.spacing(2)} 0`,
}));

export const ValueInfo = styled(Box)(({ theme }) => ({
  fontWeight: "bold",
  fontSize: "2rem",
  margin: "0 auto",
}));

export const Wrapper = styled(Grid)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  borderRadius: 10,
  minHeight: "400px",
  boxShadow: theme.shadow.card,
  padding: "25px",
  textAlign: "left",
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
}));

export const ChartBox = styled(Box)(({ theme }) => ({
  paddingTop: theme.spacing(3),
}));

export const SkeletonUI = styled(Skeleton)(({ theme }) => ({
  paddingTop: theme.spacing(3),
  marginRight: theme.spacing(2),
  borderRadius: 10,
}));

export const Tabs = styled(Box)(({ theme }) => ({
  [theme.breakpoints.up("md")]: {
    textAlign: "end",
    paddingRight: theme.spacing(3),
  },
  [theme.breakpoints.down("md")]: {
    display: "flex",
    justifyContent: "space-between",
  },
}));

export const Tab = styled(Button)<{ active: number }>(({ theme, active }) => ({
  textTransform: "lowercase",
  borderRadius: 10,
  border: `2px solid ${theme.palette.green[800_20]}`,
  marginRight: theme.spacing(1),
  color: active ? `${theme.palette.primary.contrastText} !important` : theme.palette.grey[400],
  fontWeight: "bold",
  backgroundColor: active ? theme.palette.primary.main : "none",
}));
export const StyledLine = styled(Box)<{ left?: number }>(({ theme, left }) => ({
  position: "absolute",
  height: 10,
  width: 1.5,
  top: 0,
  left: left,
  background: theme.palette.grey[200],
}));
