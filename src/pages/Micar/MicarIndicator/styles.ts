import { Box, styled, Typography } from "@mui/material";

export const StyledBox = styled(Box)(() => ({
  marginBottom: "20px",
  display: "flex",
  justifyContent: "flex-end",
  flexDirection: "column"
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
export const Value = styled(Typography)(() => ({
  fontSize: "20px",
  fontWeight: 500,
  marginBottom: "32px"
}));
