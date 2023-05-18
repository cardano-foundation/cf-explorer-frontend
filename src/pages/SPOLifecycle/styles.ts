import { Button, alpha, Box, Container, IconButton, styled } from "@mui/material";
import { Link } from "react-router-dom";

export const StyledContainer = styled(Container)(({ theme }) => ({
  padding: "20px 0 40px",
  position: "relative",
  minHeight: "calc(100vh - 170px)",
  [theme.breakpoints.down("sm")]: {
    padding: "20px 16px 30px 16px",
    overflowY: "hidden",
    "& > div:nth-of-type(2)": {
      marginLeft: "0px"
    }
  }
}));
export const StakeId = styled("span")(({ theme }) => ({
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
  background: "#E7E8EA",
  padding: "3px 2px",
  margin: `0 ${theme.spacing(2)}`,
  borderRadius: "20px",
  [theme.breakpoints.down("md")]: {
    width: "90px",
    marginTop: "10px !important",
    borderRadius: "71px",
    gap: "5px"
  },
  [theme.breakpoints.down("sm")]: {
    margin: "0px !important"
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
    minWidth: "215px",
    marginRight: "10px"
  }
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
    marginLeft: "16px"
  },
  [theme.breakpoints.down("sm")]: {
    h2: {
      fontSize: "24px"
    },
    marginLeft: "0px"
  }
}));

export const BoxSwitchContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center"

}));

export const BoxItemStyled = styled(Box)(({ theme }) => ({
  display: "flex",
  [theme.breakpoints.down("md")]: {
    flexDirection: "column",
    width: "100%"
  }
}));

export const BoxSwitch = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center"
}));

export const ButtonReportContainer = styled(Button)(({ theme }) => ({
  display: "flex",
  padding: 0,
  marginLeft: 20,
  "&:disabled": {
    opacity: 0.5
  },
  [theme.breakpoints.down("md")]: {
    justifyContent: "start",
    marginLeft: 0,
    marginTop: "18px"
  }
}));

export const PoolId = styled(Link)(({ theme }) => ({
  lineHeight: 1,
  fontWeight: "bold",
  color: `${theme.palette.blue[800]} !important`,
  margin: `0 ${theme.spacing(1)} `,
  fontSize: "0.875rem"
}));