import { styled } from "@mui/material";

export const Img = styled("img")(() => ({
  display: "flex",
  alignItems: "center",
}));

export const Icon = styled("img")(() => ({
  paddingRight: "10px",
  width: "35px",
}));

export const LabelStatus = styled("h4")(({ theme }) => ({
  margin: 0,
  textTransform: "uppercase",
  borderRadius: "2px",
  padding: "0 12px",
  backgroundColor: theme.gray_5_20,
  color: theme.textColorLight,
  fontWeight: "bold",
  lineHeight: "2rem",
  display: "inline",
  marginRight: "4px",
  whiteSpace: "nowrap",
}));
