import { Box, Button, Grid, alpha, styled } from "@mui/material";

import { CommonSkeleton } from "src/components/commons/CustomSkeleton";

export const BoxInfo = styled(Box)<{ space: number }>(({ theme }) => ({
  background: theme.palette.secondary[0],
  borderRadius: "10px",
  color: theme.palette.secondary.main,
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
  borderBottom: `1px solid ${alpha(theme.palette.secondary.main, 0.1)}`,
  overflow: "hidden",
  alignItems: "center",
  [theme.breakpoints.down("lg")]: {
    alignItems: "flex-start",
    borderRight: `1px solid ${alpha(theme.palette.secondary.main, 0.1)}`,
    height: "100%",
    borderBottom: "none",
    width: "100%",
    minHeight: "160px"
  },
  [theme.breakpoints.down("sm")]: {
    width: "100%",
    borderRight: "none",
    minHeight: "0",

    "& > div": {
      width: "100%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "0 10px 20px 10px",
      borderRight: `1px solid ${alpha(theme.palette.secondary.main, 0.1)}`
    }
  }
}));

export const Title = styled(Box)(({ theme }) => ({
  fontWeight: "bold",
  padding: `${theme.spacing(2)} 0`,
  color: theme.palette.secondary.light
}));

export const ValueInfo = styled(Box)(({ theme }) => ({
  fontWeight: "bold",
  fontSize: "2rem",
  margin: "0 auto",
  overflowWrap: "anywhere",
  padding: "0 18px",
  color: theme.palette.secondary.main,
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
    width: "80px",
    padding: "6px 10px"
  }
}));

export const ChartBox = styled(Box)<{ highest: number; lowest: number }>(({ theme, highest, lowest }) => {
  const isEqual = highest === lowest;
  return {
    paddingTop: theme.spacing(3),
    fontSize: 12,
    ".yAxis .recharts-layer": {
      [`&:nth-of-type(${lowest})`]: {
        filter: "url(#lowest)",
        text: {
          fill: isEqual ? theme.palette.primary.main : theme.palette.error[700],
          color: isEqual ? theme.palette.primary.main : theme.palette.error[700]
        }
      },
      [`&:nth-of-type(${highest})`]: {
        filter: "url(#highest)",
        text: {
          fill: isEqual ? theme.palette.primary.main : theme.palette.success[800],
          color: isEqual ? theme.palette.primary.main : theme.palette.success[800]
        }
      }
    }
  };
});

export const SkeletonUI = styled(CommonSkeleton)(({ theme }) => ({
  paddingTop: theme.spacing(3),
  marginRight: theme.spacing(2),
  borderRadius: 10,
  boxSizing: "border-box"
}));

export const Tabs = styled(Box)(() => ({
  display: "flex",
  justifyContent: "flex-end",
  gap: "5px"
}));

export const Tab = styled(Button)<{ active: number }>(({ theme, active }) => ({
  textTransform: "lowercase",
  borderRadius: 10,
  border: active ? "none" : `2px solid ${theme.palette.primary[200]}`,
  marginRight: "4px",
  fontWeight: "bold",
  color: active ? `${theme.palette.secondary[0]} !important` : theme.palette.secondary.main,
  backgroundColor: active ? theme.palette.secondary.light : "none",
  "&:hover": {
    color: active ? `${theme.palette.secondary[0]} !important` : theme.palette.secondary.main,
    backgroundColor: active ? theme.palette.secondary.light : "none"
  },
  [theme.breakpoints.down("lg")]: {
    backgroundColor: active ? theme.palette.secondary.light : "none",
    color: active ? `${theme.palette.secondary[0]} !important` : theme.palette.secondary.main
  },
  [theme.breakpoints.down("sm")]: {
    minWidth: "40px !important",
    height: "28px !important"
  }
}));

export const TextCardHighlight = styled("span")`
  font-size: 20px;
  border-bottom: ${(props) =>
    `2px solid ${props.theme.mode === "light" ? props.theme.palette.primary[200] : props.theme.palette.primary.main}`};
`;

export const TooltipLabel = styled(Box)(() => ({
  marginBottom: 3
}));

export const TooltipValue = styled(Box)(() => ({
  fontWeight: 700
}));
