import { Button, alpha, Box, Container, IconButton, styled } from "@mui/material";

import { Link } from "react-router-dom";

export const StyledContainer = styled(Container)`
  padding: 20px 0 40px;
  position: relative;
  min-height: calc(100vh - 170px);
`;
export const StakeId = styled(Link)(({ theme }) => ({
  lineHeight: 1,
  fontWeight: "bold",
  color: `${theme.palette.blue[800]} !important`,
  margin: `0 ${theme.spacing(1)} `,
  fontSize: "0.875rem"
}));

export const ButtonGroup = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  height: "44px",
  marginTop: "11px !important",
  background: "#E7E8EA",
  padding: "3px 2px",
  borderTopLeftRadius: "20px",
  borderBottomLeftRadius: "20px",
  borderTopRightRadius: "20px",
  borderBottomRightRadius: "20px",
  [theme.breakpoints.down("md")]: {
    width: "90px"
  }
}));
export const ButtonSwitch = styled(IconButton)<{ active: number }>(({ theme, active }) => ({
  margin: "0 2px",
  background: active ? theme.palette.green[600] : "transparent",
  ":hover": {
    background: active ? theme.palette.green[600] : theme.palette.green[600_10]
  },
  width: 38,
  height: 38,
  boxSizing: "border-box"
}));

export const ButtonReport = styled(Button)(({ theme }) => ({
  color: theme.palette.common.white,
  background: theme.palette.grey[700],
  height: "44px",
  textTransform: "capitalize",
  fontWeight: "bold",
  padding: "10px 20px",
  borderRadius: "8px",
  ":hover": {
    background: alpha(theme.palette.grey[700], 0.8)
  },
  [theme.breakpoints.down("md")]: {
    width: "100%",
    maxWidth: "900px",
    minWidth: "225px"
  }
}));
export const ButtonReportContainer = styled(Button)(({ theme }) => ({
  display: "flex",
  marginLeft: 20,
  [theme.breakpoints.down("md")]: {
    justifyContent: "start",
    marginLeft: 0
  },
  padding: 0
}));

export const BoxContainerStyled = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItem: "center",
  flexDirection: "row",
  [theme.breakpoints.down("md")]: {
    display: "flex",
    alignItems: "flex-start",
    flexDirection: "column",
    marginLeft: "16px",
    marginRight: "16px"
  }
}));
export const BoxSwitch = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center"
}));
export const BoxItemStyled = styled(Box)(({ theme }) => ({
  display: "flex",
  [theme.breakpoints.down("md")]: {
    flexDirection: "column",
    width: "100%"
  }
}));
export const BoxSwitchContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: 15,
  [theme.breakpoints.down("md")]: {
    justifyContent: "space-between",
    alignItems: "space-between"
  }
}));

export const StyledStakeId = styled(StakeId)`
  font-size: 1rem;
`;
