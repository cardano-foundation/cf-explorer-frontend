import { Grid, Skeleton, Button, styled, Box, alpha } from "@mui/material";

export const BoxInfo = styled(Box)<{ space: number }>(({ theme, space }) => ({
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
    flexDirection: "row",
  },
}));

export const CustomButton = styled("button")<{ active: number }>`
  width: 115px;
  border: none;
  border-radius: 5px;
  padding: 6px 0;
  font-weight: var(--font-weight-bold);
  color: ${({ theme, active }) => (active ? theme.palette.primary.contrastText : theme.palette.grey[400])};
  background-color: ${({ theme, active }) => (active ? theme.palette.primary.main : theme.palette.background.neutral)};
  cursor: pointer;
  font-family: var(--font-family-title);
  font-size: 16px;
  line-height: 24px;
`;

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
  [theme.breakpoints.down("sm")]: {
    width: "80%",
    borderRight: "none",
    borderBottom: `1px solid ${alpha(theme.palette.common.white, 0.07)}`,

    div: {
      width: "100%",
      height: "100px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "space-between",
    },
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

    div: {
      width: "100%",
      height: "100px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "space-between",
    },
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
  overflowWrap: "anywhere",
}));

export const Wrapper = styled(Grid)(({ theme }) => ({
  borderRadius: 10,
  minHeight: "400px",
  textAlign: "left",
}));

export const ButtonTitle = styled("button")<{ active: boolean }>(({ theme, active }) => ({
  borderRadius: 10,
  padding: "8px 30px",
  fontWeight: "bold",
  fontSize: "1rem",
  marginRight: 5,
  color: active ? `${theme.palette.primary.contrastText} !important` : theme.palette.grey[400],
  backgroundColor: active ? theme.palette.primary.main : "none",
  fontFamily: "var(--font-family-title)",
  border: `2px solid ${theme.palette.green[800_20]}`,
  cursor: "pointer",
  [`@media screen and (max-width: ${theme.breakpoints.values.sm}px)`]: {
    width: "95px",
    textAlign: "center",
    marginRight: 0,
    padding: "8px 0px",
  },
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
  },
  [theme.breakpoints.down("md")]: {
    display: "flex",
    justifyContent: "space-between",
    gap: theme.spacing(1),
  },
}));

export const Tab = styled(Button)<{ active: number }>(({ theme, active }) => ({
  textTransform: "lowercase",
  borderRadius: 10,
  border: `2px solid ${theme.palette.green[800_20]}`,
  marginRight: theme.spacing(1),
  fontWeight: "bold",
  color: active ? `${theme.palette.primary.contrastText} !important` : theme.palette.grey[400],
  backgroundColor: active ? theme.palette.primary.main : "none",
  ":hover": {
    color: active ? `${theme.palette.primary.contrastText} !important` : theme.palette.grey[400],
    backgroundColor: active ? theme.palette.primary.main : "none",
  },
}));
