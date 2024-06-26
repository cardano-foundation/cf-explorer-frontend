import { Box, styled, Table } from "@mui/material";
import { Link } from "react-router-dom";
import { TabList } from "@mui/lab";

export const LinkComponent = styled(Link)(({ theme }) => ({
  color: `${theme.palette.primary.main} !important`
}));
export const TitleTab = styled(Box)<{ active: number }>(({ active, theme }) => ({
  fontWeight: "bold",
  textTransform: "capitalize",
  fontFamily: '"Roboto", sans-serif',
  fontSize: "1.125rem",
  color: active ? theme.palette.primary.main : theme.palette.secondary.light
}));

export const StyledTabList = styled(TabList)(({ theme }) => ({
  "& button": {
    paddingLeft: "0px",
    paddingRight: "0px",
    marginRight: "40px"
  },
  [theme.breakpoints.down("sm")]: {
    "& button": {
      marginRight: "20px"
    }
  }
}));
export const StyledBoxContainer = styled(Box)(({ theme }) => ({
  marginTop: "32px",
  [theme.breakpoints.down("sm")]: {
    marginRight: "16px"
  }
}));
export const StyledTable = styled(Table)(() => ({
  "& .table-wrapper": {
    minHeight: "75px"
  }
}));

export const TimeDuration = styled("small")(({ theme }) => ({
  color: theme.palette.secondary.light,
  display: "block",
  textAlign: "left",
  marginTop: "20px"
}));
