import { Typography, styled } from "@mui/material";

export const HashName = styled(Typography)(({ theme }) => ({
  paddingBottom: "15px",
  fontSize: "32px",
  fontWeight: 600,
  lineHeight: "28px",
  textAlign: "center",
  color: theme.isDark ? theme.palette.secondary.main : theme.palette.secondary.light,
  [theme.breakpoints.down("lg")]: {
    fontSize: "24px"
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: "16px"
  }
}));
