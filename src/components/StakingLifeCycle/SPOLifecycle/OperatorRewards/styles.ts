import { Box, styled } from "@mui/material";
import { Link } from "react-router-dom";

export const StyledLink = styled(Link)`
  color: ${(props) => props.theme.palette.secondary.main} !important;
  font-family: var(--font-family-text) !important;
  text-decoration: underline !important;
`;

export const DrawContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  height: "max-content",
  position: "relative",
  marginTop: 35,
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
    alignItems: "center",
    margin: "auto",
    maxWidth: 320,
    minWidth: 320,
    gap: "65px"
  }
}));

export const ADAOperator = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  paddingTop: "31px",
  cursor: "pointer",
  [theme.breakpoints.down("sm")]: {
    padding: "0px 0px 20px"
  }
}));
export const ADATitle = styled(Box)(() => ({
  background: "#F6F6F6",
  height: "30px",
  display: "flex",
  alignItems: "flex-end",
  fontWeight: 700
}));
