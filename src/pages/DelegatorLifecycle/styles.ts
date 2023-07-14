import { Button, alpha, Box, Container, IconButton, styled } from "@mui/material";
import { Link } from "react-router-dom";

export const StyledContainer = styled(Container)`
  padding-top: 20px;
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
  color: theme.palette.grey[400],
  whiteSpace: "nowrap",
  [theme.breakpoints.down("sm")]: {
    fontSize: 24,
    lineHeight: "28px"
  }
}));

export const AddressLine = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  color: theme.palette.text.secondary
}));

export const Label = styled("small")(() => ({
  lineHeight: 1
}));

export const StakeId = styled(Link)(({ theme }) => ({
  lineHeight: 1,
  fontWeight: "bold",
  color: `${theme.palette.blue[100]} !important`,
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
  color: theme.palette.grey[300],
  whiteSpace: "break-spaces"
}));

export const SwitchGroup = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  background: alpha(theme.palette.grey[300], 0.1),
  padding: 3,
  borderRadius: 22,
  gap: 8
}));

export const ButtonSwitch = styled(IconButton)<{ active: number }>(({ theme, active }) => ({
  background: active ? theme.palette.green[200] : "transparent",
  width: 38,
  height: 38,
  ":hover": {
    background: active ? theme.palette.green[200] : theme.palette.green[200_10]
  }
}));

export const ButtonReport = styled(Button)<{ sidebar?: number }>(({ theme }) => ({
  color: theme.palette.common.white,
  background: theme.palette.text.primary,
  height: "44px",
  textTransform: "capitalize",
  fontWeight: 700,
  padding: "10px 20px",
  borderRadius: "8px",
  whiteSpace: "nowrap",
  ":hover": {
    background: alpha(theme.palette.grey[400], 0.8)
  },
  "&:disabled": {
    opacity: 0.5,
    color: theme.palette.common.white
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
