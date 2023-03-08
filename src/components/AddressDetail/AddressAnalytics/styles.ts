import { Grid, Skeleton, Button, styled, Box } from "@mui/material";

export const BoxInfo = styled(Box)(({ theme }) => ({
  height: `100%`,
  background: theme.gray_3,
  borderRadius: "10px",
  color: theme.textColorReverse,
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
  borderBottom: `1px solid ${theme.white_7}`,
  overflow: "hidden",
  [theme.breakpoints.down("lg")]: {
    borderRight: `1px solid ${theme.white_7}`,
    height: "100%",
    borderBottom: "none",
    width: "100%",
    minHeight: "200px",
    paddingTop: 0,
  },
  [theme.breakpoints.down("sm")]: {
    width: "80%",
    borderRight: "none",
    borderBottom: `1px solid ${theme.white_7}`,
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
  backgroundColor: theme.boxBackgroundColor,
  borderRadius: 10,
  minHeight: "400px",
  boxShadow: theme.shadow_0,
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
  color: theme.textColorReverse,
  backgroundColor: theme.green_2,
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
  border: `2px solid ${theme.green_9_20}`,
  marginRight: theme.spacing(1),
  color: active ? `${theme.textColorReverse} !important` : theme.textColorLight,
  fontWeight: "bold",
  backgroundColor: active ? theme.green_2 : "none",
}));
export const StyledLine = styled(Box)<{ left?: number }>(({ theme, left }) => ({
  position: "absolute",
  height: 10,
  width: 1.5,
  top: 0,
  left: left,
  background: theme.gray_6,
}));
