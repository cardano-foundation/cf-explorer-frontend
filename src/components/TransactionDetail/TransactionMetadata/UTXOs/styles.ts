import { alpha, Box, styled } from "@mui/material";
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
  color: theme.palette.text.primary,
  borderBottom: `1px solid ${alpha(theme.palette.common.black, 0.1)}`,
  paddingBottom: "8px",
  alignItems: "flex-end",
}));

export const TokenLink = styled(Link)(({ theme }) => ({
  margin: "0px 4px",
  textTransform: "uppercase",
  borderRadius: "2px",
  padding: "2px 10px",
  backgroundColor: alpha(theme.palette.grey[300], 0.2),
  color: theme.palette.grey[400],
  fontSize: "var(--font-size-text)",
  lineHeight: "1.5rem",
  fontWeight: "bold",
  display: "inline",
  whiteSpace: "nowrap",
}));

export const Item = styled(Box)(({ theme }) => ({
  textAlign: "left",
  padding: "15px 0px",
  margin: "0px 25px",
  borderBottom: `1px solid ${alpha(theme.palette.common.black, 0.1)}`,
  "&:last-of-type": {
    borderBottom: "none",
  },
}));
