import { Box, styled } from "@mui/material";

export const Img = styled("img")(({ theme }) => ({
  paddingRight: "10px",
  width: "35px",
}));

export const Header = styled(Box)(({ theme }) => ({
  padding: "25px 0 0",
  marginRight:'25px',
  marginLeft:'25px',
  display: "flex",
  justifyContent: "space-between",
  fontSize: "14px",
  color: theme.textColor,
  borderBottom: "1px solid #0000001a",
  paddingBottom: "8px",
  alignItems: "flex-end",
}));

export const LabelStatus = styled("h4")(({ theme }) => ({
  margin: 0,
  textTransform: "uppercase",
  borderRadius: "2px",
  padding: "0 12px",
  backgroundColor: "#ced1d8",
  color: theme.textColorPale,
  fontWeight: "bold",
  lineHeight: "2rem",
  display: "inline",
  marginRight: "4px",
  whiteSpace: "nowrap",
}));
