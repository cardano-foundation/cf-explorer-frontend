import { styled } from "@mui/material";

export const Img = styled("img")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
}));

export const Icon = styled("img")(({ theme }) => ({
  paddingRight: "10px",
  width: "35px",
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
