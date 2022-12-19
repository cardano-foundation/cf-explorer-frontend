import { styled, Box } from "@mui/material";

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
}));
