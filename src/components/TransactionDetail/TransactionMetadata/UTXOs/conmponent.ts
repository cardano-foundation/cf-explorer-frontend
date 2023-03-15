import { Box, styled } from "@mui/material";
import { Link } from "react-router-dom";

export const Img = styled("img")(({ theme }) => ({
  paddingRight: "10px",
  width: "35px",
}));

export const Header = styled(Box)(({ theme }) => ({
  padding: "25px 0 0",
  marginRight: "25px",
  marginLeft: "25px",
  display: "flex",
  justifyContent: "space-between",
  fontSize: "14px",
  color: theme.textColor,
  borderBottom: "1px solid #0000001a",
  paddingBottom: "8px",
  alignItems: "flex-end",
}));

export const TokenLink = styled(Link)(({ theme }) => ({
  margin: "0px 4px",
  textTransform: "uppercase",
  borderRadius: "2px",
  padding: "2px 10px",
  backgroundColor: "#ced1d8",
  color: `${theme.textColorPale} !important`,
  fontSize: "var(--font-size-text)",
  lineHeight: "1.5rem",
  fontWeight: "bold",
  display: "inline",
  whiteSpace: "nowrap",
}));
