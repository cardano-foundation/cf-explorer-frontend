import { Button, alpha, Box, Container, IconButton, styled } from "@mui/material";
import { Link } from "react-router-dom";

export const StyledContainer = styled(Container)`
  padding-top: 30px;
  position: relative;
  min-height: calc(100vh - 170px);
`;

export const BoxContainerStyled = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItem: "center",
  flexDirection: "row",
  flexWrap: "wrap",
  gap: 20,
  marginBottom: 35,
  [theme.breakpoints.down("md")]: {
    marginBottom: 30,
    flexDirection: "column"
  }
}));

export const LifeCycleHeader = styled(Box)<{ sidebar?: number }>(() => ({
  textAlign: "left"
}));

export const LifeCycleTitle = styled("h2")(({ theme }) => ({
  margin: "0px 0px 5px",
  fontSize: 36,
  lineHeight: "42px",
  whiteSpace: "nowrap",
  color: theme.palette.secondary.main,
  [theme.breakpoints.down("sm")]: {
    fontSize: 24,
    lineHeight: "28px"
  },
  [theme.breakpoints.down(355)]: {
    fontSize: 22
  }
}));

export const AddressLine = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  color: theme.palette.text.secondary
}));

export const Label = styled("small")(({ theme }) => ({
  color: theme.palette.secondary.light,
  lineHeight: 1
}));

export const StakeId = styled(Link)(({ theme }) => ({
  lineHeight: 1,
  fontWeight: "bold",
  color: `${theme.palette.primary.main} !important`,
  margin: `0 ${theme.spacing(1)} `,
  fontSize: "0.875rem"
}));

export const BoxItemStyled = styled(Box)<{ sidebar?: number }>(({ theme }) => ({
  display: "flex",
  justifyContent: "flex-end",
  alignItems: "center",
  gap: 20,
  [theme.breakpoints.down("lg")]: {
    flexDirection: "row",
    width: "100%"
  },
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
    width: "100%"
  }
}));

export const BoxSwitchContainer = styled(Box)<{ sidebar?: number }>(({ theme, sidebar }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  gap: 15,
  [theme.breakpoints.down("lg")]: {
    width: sidebar ? "100%" : "auto",
    flex: 1,
    justifyContent: "flex-start"
  },
  [theme.breakpoints.down("sm")]: {
    width: "100%",
    justifyContent: "space-between"
  }
}));

export const LabelSwitch = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  color: theme.palette.secondary.light,
  whiteSpace: "break-spaces"
}));

export const SwitchGroup = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  background: alpha(theme.palette.secondary.light, 0.1),
  padding: 3,
  borderRadius: 22,
  gap: 8
}));

export const ButtonSwitch = styled(IconButton)<{ active: number }>(({ theme, active }) => ({
  background: active ? theme.palette.primary.main : "transparent",
  width: 38,
  height: 38,
  ":hover": {
    background: active ? theme.palette.primary.main : "transparent"
  }
}));

export const ButtonReport = styled(Button)<{ sidebar?: number }>(({ theme }) => ({
  color: theme.palette.secondary[0],
  background: theme.palette.secondary.main,
  height: "44px",
  textTransform: "capitalize",
  fontWeight: 700,
  padding: "10px 20px",
  borderRadius: "8px",
  whiteSpace: "nowrap",
  ":hover": {
    background: theme.palette.secondary.main
  },
  "&:disabled": {
    opacity: 0.5,
    color: theme.palette.secondary[0],
    background: theme.palette.secondary[600]
  },
  [theme.breakpoints.down("lg")]: {
    width: "auto"
  },
  [theme.breakpoints.down("sm")]: {
    width: "100%"
  }
}));

export const ReportButtonContainer = styled(Box)(({ theme }) => ({
  [theme.breakpoints.down("sm")]: { width: "100%" }
}));
