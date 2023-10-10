import { alpha, Box, Grid, styled } from "@mui/material";

export const StyledContainer = styled(Box)`
  text-align: left;
`;

export const GridWrapper = styled(Grid)(() => ({
  borderRadius: 10,
  minHeight: "400px",
  textAlign: "left"
}));

export const Tab = styled("div")`
  display: inline-block;
`;

export const Button = styled("button")<{ active: number }>`
  width: 115px;
  border: none;
  border-radius: 5px;
  padding: 6px 0;
  font-weight: var(--font-weight-bold);
  color: ${({ theme, active }) =>
    active
      ? `${theme.isDark ? theme.palette.secondary[0] : theme.palette.secondary.light} !important`
      : theme.palette.secondary.main};
  border: 1px solid ${({ theme }) => (theme.isDark ? theme.palette.secondary[700] : theme.palette.primary[200])};
  background-color: ${({ theme, active }) =>
    active ? `${theme.isDark ? theme.palette.primary.main : theme.palette.primary[200]} !important` : "transparent"};
  cursor: pointer;
  font-family: var(--font-family-title);
  font-size: 16px;
  line-height: 24px;
`;

export const BoxInfo = styled(Box)<{ space: number }>(({ theme }) => ({
  background: theme.palette.secondary[0],
  borderRadius: "10px",
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
    minHeight: "0px",
    alignItems: "flex-start",
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
  borderBottom: `1px solid ${theme.palette.primary[200]}`,
  overflow: "hidden",
  [theme.breakpoints.down("lg")]: {
    borderRight: `1px solid ${theme.palette.primary[200]}`,
    height: "100%",
    borderBottom: "none",
    width: "100%",
    minHeight: "200px",
    paddingTop: 0
  },
  [theme.breakpoints.down("sm")]: {
    width: "100%",
    borderRight: `1px solid ${theme.palette.primary[200]}`,
    minHeight: "0",
    alignItems: "flex-start",
    "& > div": {
      width: "100%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "0 10px",
      margin: "25px 0",
      borderRight: `1px solid ${theme.palette.primary[200]}`
    }
  }
}));

export const ChartContainer = styled(Box)(({ theme }) => ({
  paddingTop: theme.spacing(3),
  fontSize: 12
}));

export const GridRight = styled(Grid)<{ space: number }>(({ theme, space }) => ({
  flex: 1,
  maxHeight: `calc(100% - ${space}px)`,
  background: theme.palette.text.secondary,
  borderRadius: 12,
  boxShadow: theme.shadow.card,
  padding: "0px 20px",
  [theme.breakpoints.down("lg")]: {
    padding: "25px 0px",
    maxHeight: "unset"
  }
}));

export const Item = styled(Grid)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "column",
  textAlign: "center",
  padding: "25px 0px",

  "&:first-of-type": {
    borderBottom: `1px solid ${alpha(theme.palette.common.white, 0.06)}`
  },
  [theme.breakpoints.down("sm")]: {
    "&:first-of-type": {
      borderBottom: "none",
      borderRight: `1px solid ${alpha(theme.palette.common.white, 0.06)}`
    }
  }
}));

export const AnalyticsTitle = styled("h2")(({ theme }) => ({
  margin: "40px 0 15px",
  width: "max-content",
  fontSize: "20px",
  color: theme.palette.secondary.main,
  borderBottom: `2px solid ${theme.isDark ? theme.palette.primary.main : theme.palette.primary[200]}`,
  [theme.breakpoints.down("sm")]: {
    margin: "30px 0 15px"
  }
}));
export const Title = styled(Box)(({ theme }) => ({
  fontWeight: "bold",
  color: theme.palette.secondary.light,
  padding: `${theme.spacing(2)} 0`
}));

export const Value = styled("div")(({ theme }) => ({
  fontWeight: "bold",
  fontSize: "2rem",
  overflowWrap: "anywhere",
  color: theme.palette.secondary.main,
  [theme.breakpoints.down("md")]: {
    padding: "0 10px"
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: "1.25rem",
    padding: "0 10px"
  }
}));

export const Horizon = styled("div")`
  width: 100%;
  opacity: 0.07;
  border: 1px solid ${(props) => props.theme.palette.common.white};
`;

export const TooltipLabel = styled(Box)(() => ({
  marginBottom: 3
}));

export const TooltipValue = styled(Box)(() => ({
  fontWeight: 700
}));
