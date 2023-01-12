import { Grid, Skeleton, Button, styled, Box } from "@mui/material";

export const BoxInfo = styled(Box)(({ theme }) => ({
  height: `100%`,
  background: "#344054",
  borderRadius: theme.borderRadius,
  color: "white",
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
  borderBottom: "1px solid #424d60",
  overflow: "hidden",
  [theme.breakpoints.down("lg")]: {
    borderRight: "1px solid #424d60",
    height: "100%",
    borderBottom: "none",
    width: "100%",
    minHeight: "200px",
    paddingTop: 0,
  },
  [theme.breakpoints.down("sm")]: {
    width: "80%",
    borderRight: "none",
    borderBottom: "1px solid #424d60",
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
  backgroundColor: "#fff",
  borderRadius: theme.borderRadius,
  minHeight: "400px",
  boxShadow: theme.shadowRaised,
  padding: "25px",
  textAlign: "left",
}));

export const ButtonTitle = styled("button")(({ theme }) => ({
  border: "none",
  borderRadius: theme.borderRadius,
  padding: "8px 30px",
  fontWeight: "bold",
  fontSize: "1rem",
  marginRight: 5,
  color: "#fff",
  backgroundColor: theme.colorGreenLight,
  fontFamily: "var(--font-family-title)",
}));

export const ChartBox = styled(Box)(({ theme }) => ({
  paddingTop: theme.spacing(3),
}));

export const SkeletonUI = styled(Skeleton)(({ theme }) => ({
  paddingTop: theme.spacing(3),
  marginRight: theme.spacing(2),
  borderRadius: theme.borderRadius,
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
  borderRadius: theme.borderRadius,
  border: "2px solid rgba(24, 76, 120, 0.2)",
  marginRight: theme.spacing(1),
  color: active ? "#fff !important" : theme.textColorPale,
  fontWeight: "bold",
  backgroundColor: active ? theme.colorGreenLight : "none",
}));
