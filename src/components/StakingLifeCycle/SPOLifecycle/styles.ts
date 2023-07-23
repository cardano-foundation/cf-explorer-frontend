import { Box, Button, Typography, alpha, styled } from "@mui/material";
import { Link } from "react-router-dom";

export const Step = styled(Box)<{ active: number }>(({ theme, active }) => ({
  width: "100%",
  padding: `0 0 ${theme.spacing(3)}`,
  borderBottom: `3px solid ${active ? theme.palette.primary.main : theme.palette.primary[200]}`,
  [theme.breakpoints.down("sm")]: {
    padding: "16px 30px"
  },
  cursor: "pointer"
}));

export const StepButton = styled(Box)<{ active: number }>(() => ({}));
export const TitleStep = styled(Box)<{ active: number }>(({ theme, active }) => ({
  color: active ? theme.palette.secondary.main : theme.palette.secondary.light,
  fontWeight: "bold",
  fontSize: "0.875rem",
  marginTop: theme.spacing(1),
  [theme.breakpoints.down("md")]: {
    whiteSpace: "nowrap"
  }
}));

export const StepHeader = styled(Typography)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginTop: 40,
  marginBottom: 20,
  [theme.breakpoints.down("sm")]: {
    marginTop: 30,
    marginBottom: 15
  }
}));

export const WrapTitle = styled(Box)(({ theme }) => ({
  fontSize: "1.5rem",
  fontWeight: "bold",
  color: theme.palette.secondary.main
}));

export const NextButton = styled(Button)(({ theme }) => ({
  color: theme.palette.common.white,
  background: theme.palette.secondary.main,
  textTransform: "capitalize",
  fontWeight: "bold",
  padding: "8px 20px",
  borderRadius: "8px",
  border: "2px solid transparent",
  ":hover": {
    background: alpha(theme.palette.secondary.main, 0.8)
  },
  display: "flex",
  gap: 12,
  alignItems: "center"
}));
export const PreviousButton = styled(Button)(({ theme }) => ({
  color: theme.palette.secondary.main,
  background: "transparent",
  textTransform: "capitalize",
  fontWeight: "bold",
  padding: "8px 20px",
  borderRadius: "8px",
  border: `2px solid ${theme.palette.border.hint}`,
  ":hover": {
    background: alpha(theme.palette.secondary.main, 0.1)
  },
  display: "flex",
  alignItems: "center"
}));

export const StyledComponent = styled(Box)(({ theme }) => ({
  [theme.breakpoints.down("sm")]: {
    margin: "0px",
    "& > div:nth-of-type(1)": {
      margin: "0 -16px",
      overflowX: "scroll",
      "-ms-overflow-style": "none",
      scrolbarWidth: "none",
      "&::-webkit-scrollbar": {
        display: "none"
      }
    },
    "& > div:nth-of-type(4)": {
      borderTop: `1px solid ${alpha(theme.palette.grey[200], 1)}`
    }
  }
}));

export const StyledGroupButton = styled(Box)<{ isShowPrev: boolean }>(({ theme, isShowPrev }) => ({
  marginBottom: "40px",
  justifyContent: `${isShowPrev ? `space-between` : `flex-end`}`,
  alignItems: "center",
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
    gap: "16px",
    paddingTop: "30px",
    "& > button": {
      width: "100%",
      "& p": {
        fontSize: "14px"
      }
    }
  }
}));

export const StyledLink = styled(Link)`
  font-size: inherit;
  font-weight: inherit;
  color: inherit;
`;
