import { Box, styled, Typography } from "@mui/material";

export const StyledBox = styled(Box)(() => ({
  marginBottom: "20px",
  display: "flex",
  justifyContent: "flex-end",
  flexDirection: "column"
}));
export const StyledCard = styled(Box)(({ theme }) => ({
  padding: "24px",
  backgroundColor: theme.isDark ? "#54596E" : "#FFFFFF",
  color: theme.isDark ? "#F7F9FF" : "#000000",
  borderRadius: "24px",
  minHeight: "350px",
  textAlign: "left",
  [theme.breakpoints.down("sm")]: {
    padding: "18px",
    minHeight: "250px"
  }
}));
export const StyledBoxIcon = styled(Box)(() => ({
  borderRadius: "20%",
  padding: 1.5,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  mb: 4,
  width: "56px",
  height: "56px"
}));
export const Title = styled(Typography)(() => ({
  fontWeight: 700
}));
export const Value = styled(Typography)(({ theme }) => ({
  fontSize: "20px",
  fontWeight: 500,
  marginBottom: "32px",
  [theme.breakpoints.down("sm")]: {
    marginBottom: "12px"
  }
}));