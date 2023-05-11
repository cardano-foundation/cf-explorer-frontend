import { MenuItem, Select, alpha, styled } from "@mui/material";
import { Link } from "react-router-dom";

export const Img = styled("img")(() => ({
  display: "flex",
  alignItems: "center",
}));

export const Icon = styled("img")(() => ({
  paddingRight: "10px",
  width: "35px",
}));

export const TokenLink = styled(Link)(({ theme }) => ({
  margin: "0px 4px",
  textTransform: "uppercase",
  borderRadius: "2px",
  padding: "2px 10px",
  backgroundColor: alpha(theme.palette.grey[300], 0.2),
  color: `${theme.palette.grey[400]} !important`,
  fontSize: "var(--font-size-text)",
  lineHeight: "1.5rem",
  fontWeight: "bold",
  display: "inline",
  whiteSpace: "nowrap",
}));

export const StyledSelect = styled(Select)(({ theme }) => ({
  backgroundColor: theme.palette.common.white,
  borderRadius: 8,
  height: 35,
  width: "100%",
  maxWidth: 280,
  [theme.breakpoints.down("sm")]: {
    marginTop: 15,
  }
}));

export const StyledMenuItem = styled(MenuItem)(({ theme }) => ({
  height: 40,
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  "&.Mui-selected": {
    backgroundColor: theme.palette.background.paper,
  },
}));
