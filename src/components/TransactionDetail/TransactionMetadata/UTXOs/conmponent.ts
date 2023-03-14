import { alpha, Box, styled } from "@mui/material";

export const Img = styled("img")(({ theme }) => ({
  paddingRight: "10px",
  width: "35px",
}));

export const Header = styled(Box)(({ theme }) => ({
  padding: "25px 25px 0",
  display: "flex",
  justifyContent: "space-between",
  fontSize: "14px",
  color: theme.palette.text.primary,
  borderBottom: `1px solid ${alpha(theme.palette.common.black, 0.1)}`,
  paddingBottom: "8px",
  alignItems: "flex-end",
}));

export const LabelStatus = styled("h4")(({ theme }) => ({
  margin: 0,
  textTransform: "uppercase",
  borderRadius: "2px",
  padding: "0 12px",
  backgroundColor: alpha(theme.palette.grey[300], 0.2),
  color: theme.palette.grey[400],
  fontWeight: "bold",
  lineHeight: "2rem",
  display: "inline",
  marginRight: "4px",
  whiteSpace: "nowrap",
}));
