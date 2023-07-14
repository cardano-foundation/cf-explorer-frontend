import { IconButton, Box, styled } from "@mui/material";

export const SelectDateButton = styled(Box)(() => ({
  position: "absolute",
  right: "10px",
  top: "50%",
  transform: "translateY(-50%)",
  cursor: "pointer"
}));

export const WrapCustomDatePicker = styled(Box)(({ theme }) => ({
  position: "relative",
  border: `1.5px solid ${theme.palette.border.main}`,
  borderRadius: "8px",
  backgroundColor: theme.palette.common.white,
  padding: "12px 14px",
  display: "flex",
  alignItems: "center",
  flexDirection: "row",
  minHeight: "18px",
  minWidth: "200px",
  fontSize: "16px",
  fontWeight: 400,
  zIndex: 10
}));

export const MyGrid = styled(Box)(() => ({
  display: "grid",
  gridTemplateColumns: "repeat(4, 1fr)",
  gridGap: "8px",
  padding: "10px 6px"
}));

export const HiddenScroll = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: "50%",
  left: "-10%",
  width: "fit-content",
  height: "200px",
  overflow: "auto",
  backgroundColor: "#fff",
  boxShadow: "0px 4px 16px rgba(0, 0, 0, 0.12)",
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
    "&::-webkit-scrollbar-thumb": {
      background: theme.palette.grey[300]
    },
    "&::-webkit-scrollbar-track": {
      background: theme.palette.grey[100]
    }
  }
}));

export const SelectYear = styled(Box)<{ isActive: number }>(({ theme, isActive }) => ({
  padding: "8px 16px",
  cursor: "pointer",
  borderRadius: "18px",
  backgroundColor: isActive ? theme.palette.primary.main : "transparent",
  color: isActive ? "#fff" : theme.palette.text.primary,
  "&:hover": {
    backgroundColor: isActive ? theme.palette.primary.main : theme.palette.grey[100]
  }
}));

export const PickerPortalContainer = styled(Box)(({ theme }) => ({
  position: "fixed",
  zIndex: 1301,
  top: "50vh",
  left: "50vw",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  width: 322,
  transform: "translate(-322px, 0)",
  [theme.breakpoints.down(650)]: {
    top: "50vh !important",
    left: "50vw !important",
    width: 0,
    height: 660,
    transform: "translate(-161px, -340px)",
    flexDirection: "column"
  }
}));

export const CloseButton = styled(IconButton)(({ theme }) => ({
  position: "absolute",
  top: 24,
  right: -322,
  width: 24,
  height: 24,
  border: `1px solid ${theme.palette.grey["A100"]}`,
  cursor: "pointer",
  padding: 0,
  margin: 8,
  zIndex: 1306
}));

export const DatePickerContainer = styled(Box)(({ theme }) => ({
  width: 1,
  position: "relative",
  height: 1,
  "div[class=react-datepicker]": {
    display: "flex",
    minHeight: 315
  },
  "&:first-of-type div[class=react-datepicker]": {
    borderRightWidth: 0,
    borderRadius: "0.3rem 0 0 0.3rem"
  },
  "&:last-of-type div[class=react-datepicker]": {
    borderLeftWidth: 0,
    borderRadius: "0 0.3rem 0.3rem 0"
  },
  "div[class=react-datepicker-popper]": {
    zIndex: 1
  },
  "div[class=react-datepicker__input-container]": {
    display: "none"
  },
  "&:last-of-type": {
    "div[class=react-datepicker__triangle]": {
      display: "none"
    }
  },
  "div[class=react-datepicker__triangle]": {
    transform: "translate(164px, 0px) !important"
  },
  "div[class*=react-datepicker__header]": {
    backgroundColor: "#fff",
    borderBottom: 0,
    paddingBottom: 5
  },
  "div[class*=react-datepicker__month-container]": {
    padding: "20px 10px 0px"
  },
  "div[class*=react-datepicker__day--outside-month]": {
    visibility: "hidden",
    height: "0 !important"
  },
  [`div[class*="react-datepicker__day "]`]: {
    width: 36,
    height: 36,
    borderRadius: "50% !important",
    display: "inline-grid",
    alignItems: "center",
    margin: "0 0.166rem"
  },
  "div[class=react-datepicker__day-name]": {
    width: 36,
    height: 20
  },
  "div[class*=react-datepicker__day--selected]": {
    backgroundColor: "#53a57b",
    color: "white",
    "&:hover": {
      backgroundColor: "#53a57b",
      color: "white"
    }
  },
  "div[class*=react-datepicker__day--in-selecting-range]": {
    backgroundColor: "#53a57b9b",
    color: "white"
  },
  "div[class*=react-datepicker__day--keyboard-selected]": {
    backgroundColor: "#53a57b",
    color: "white",
    "&hover": {
      backgroundColor: "#53a57b",
      color: "white"
    }
  },
  "div[class*=react-datepicker__day--in-range]": {
    backgroundColor: "#53a57b",
    color: "white"
  },
  [theme.breakpoints.down(650)]: {
    "div[class=react-datepicker__triangle]": {
      display: "none"
    },
    "div[class=react-datepicker__month]": {
      margin: "0.2rem 0.4rem"
    },
    "&:first-of-type div[class=react-datepicker]": {
      borderRightWidth: 1,
      borderBottom: 0,
      borderRadius: "0.3rem 0.3rem 0 0",
      minHeight: 345
    },
    "&:last-of-type div[class=react-datepicker]": {
      borderLeftWidth: 1,
      borderTop: 0,
      borderRadius: "0 0 0.3rem 0.3rem",
      minHeight: 300,
      "div[class*=react-datepicker__month-container]": {
        padding: "0px 10px"
      },
      "div[class*=react-datepicker__header]": {
        paddingTop: 0
      }
    }
  }
}));
