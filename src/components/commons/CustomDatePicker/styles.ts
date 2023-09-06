import { Box, styled, alpha, IconButton } from "@mui/material";
import ReactDatePicker from "react-datepicker";

import { DateRangeIcon } from "src/commons/resources";

export const DatePickerContainer = styled(Box)<{ open: number }>(({ theme, open }) => ({
  border: `1.5px solid ${theme.palette.primary[open ? "main" : 200]}`,
  borderRadius: 8,
  backgroundColor: theme.palette.common.white,
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  "div[class=react-datepicker-wrapper]": {
    flex: 1,
    zIndex: 2
  },
  "div[class=react-datepicker]": {
    fontFamily: theme.typography.fontFamily
  },
  "div[class*=react-datepicker__header]": {
    backgroundColor: theme.palette.secondary[0],
    borderBottom: 0
  },
  "div[class*=react-datepicker__month-container]": {
    padding: "5px 10px 10px"
  },
  ['div[class*="react-datepicker__day "]']: {
    width: 40,
    height: 40,
    margin: "1px 0",
    borderRadius: "50%",
    color: theme.palette.secondary.main,
    "&:not([class*=selected]):not([class*=disabled]):hover": {
      backgroundColor: theme.palette.primary[200]
    },
    div: {
      width: "100%",
      height: "100%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center"
    }
  },
  "div[class*=react-datepicker__day--outside-month], div[class*=react-datepicker__day--disabled]": {
    color: theme.palette.secondary[600]
  },
  "div[class=react-datepicker__day-name]": {
    width: 40,
    margin: "2.5px 0"
  },
  "div[class*=react-datepicker__day--keyboard-selected]": {
    backgroundColor: "transparent"
  },
  "div[class*=react-datepicker__day--selected]": {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.secondary[0],
    "&hover": {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.secondary[0]
    }
  },
  "div[class*=react-datepicker__day--in-]": {
    backgroundColor: theme.palette.primary[200],
    color: "#000",
    borderRadius: "0%"
  },
  "div[class*=react-datepicker__day--range-], div[class*=react-datepicker__day--selecting-range-]": {
    color: theme.palette.secondary[0],
    div: {
      borderRadius: "50%",
      backgroundColor: theme.palette.primary.main
    }
  },
  "div[class*=react-datepicker__day--range-start], div[class*=react-datepicker__day--in-]:first-of-type": {
    borderTopLeftRadius: "50%",
    borderBottomLeftRadius: "50%"
  },
  "div[class*=react-datepicker__day--selecting-range-start]": {
    borderTopLeftRadius: "50%",
    borderBottomLeftRadius: "50%"
  },
  "div[class*=react-datepicker__day--range-end], div[class*=react-datepicker__day--in-]:last-of-type": {
    borderTopRightRadius: "50%",
    borderBottomRightRadius: "50%"
  },
  "div[class*=react-datepicker__day--selecting-range-end]": {
    borderTopRightRadius: "50%",
    borderBottomRightRadius: "50%"
  },
  "button[class=react-datepicker__close-icon]": {
    right: 12,
    padding: 0,
    "&::after": {
      backgroundColor: theme.palette.grey["A100"]
    }
  },
  [theme.breakpoints.down("sm")]: {
    "div[class*=react-datepicker-popper]": {
      zIndex: 2,
      top: "-100% !important"
    },
    "div[class=react-datepicker__triangle]": {
      display: "none"
    }
  }
}));

export const PlaceHolder = styled(Box)(({ theme }) => ({
  color: theme.palette.secondary.light
}));

export const Value = styled(Box)(({ theme }) => ({
  color: theme.palette.secondary.main
}));

export const StyledDatePicker = styled(ReactDatePicker)(() => ({
  width: "100%",
  border: "none",
  padding: "12px 14px",
  boxSizing: "border-box",
  borderRadius: 8,
  fontSize: "16px",
  fontWeight: 400,
  background: "transparent",
  cursor: "pointer"
}));

export const HeaderContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  [theme.breakpoints.down("sm")]: {
    paddingTop: 15
  }
}));

export const CloseButton = styled(IconButton)(({ theme }) => ({
  position: "absolute",
  top: 0,
  right: -5,
  width: 24,
  height: 24,
  border: `1px solid ${theme.palette.primary[200]}`,
  cursor: "pointer",
  padding: 0,
  zIndex: 1306,
  display: "none",
  [theme.breakpoints.down("sm")]: {
    display: "inline-flex"
  }
}));

export const YearSelect = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
  fontWeight: 600,
  fontSize: 16,
  paddingLeft: 12
}));

export const SelectYear = styled(Box)<{ isActive: number }>(({ theme, isActive }) => ({
  padding: "8px 16px",
  cursor: "pointer",
  borderRadius: "18px",
  backgroundColor: isActive ? theme.palette.primary.main : "transparent",
  color: isActive ? theme.palette.common.white : theme.palette.text.primary,
  "&:hover": {
    backgroundColor: isActive ? theme.palette.primary.main : theme.palette.primary[100]
  }
}));

export const HiddenScroll = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: "60%",
  left: 0,
  width: "fit-content",
  height: "200px",
  overflow: "auto",
  backgroundColor: theme.palette.common.white,
  boxShadow: `0px 4px 16px ${alpha(theme.palette.common.black, 0.12)}`,
  borderRadius: "8px",
  zIndex: 1,
  "&::-webkit-scrollbar": {
    width: "5px"
  },
  "&::-webkit-scrollbar-track": {
    background: "transparent"
  },
  "&::-webkit-scrollbar-thumb": {
    background: "transparent"
  },
  "&:hover": {
    borderRadius: "8px 0px 0px 8px",
    "&::-webkit-scrollbar-thumb": {
      background: theme.palette.secondary.light
    },
    "&::-webkit-scrollbar-track": {
      background: theme.palette.primary[100]
    }
  }
}));

export const YearList = styled(Box)(() => ({
  display: "grid",
  gridTemplateColumns: "repeat(4, 1fr)",
  gridGap: "8px",
  padding: "10px 6px"
}));

export const DateIconContainer = styled(Box)(() => ({
  position: "relative",
  width: 0,
  height: 43
}));

export const DateIcon = styled(DateRangeIcon)(() => ({
  position: "absolute",
  top: 12,
  right: 12
}));
