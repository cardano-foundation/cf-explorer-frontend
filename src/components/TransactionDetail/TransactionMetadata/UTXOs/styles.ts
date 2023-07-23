import { MenuItem, Select, alpha, Box, styled } from "@mui/material";
import { Link } from "react-router-dom";

export const Img = styled("img")(() => ({
  paddingRight: "10px",
  width: "35px"
}));

export const Header = styled(Box)(({ theme }) => ({
  padding: "8px 0 10px",
  marginRight: "25px",
  marginLeft: "25px",
  fontSize: "12px",
  color: theme.palette.text.primary,
  borderBottom: `1px solid ${alpha(theme.palette.common.black, 0.1)}`,
  [theme.breakpoints.down("sm")]: {
    margin: "0 15px"
  }
}));

export const WrapInfo = styled(Box)(() => ({
  display: "flex",
  width: "100%",
  alignItems: "center"
}));

export const WrapUTXOs = styled(Box)(({ theme }) => ({
  justifyContent: "space-between",
  width: "100%",
  display: "flex",
  flexDirection: "row",
  paddingBottom: "5px",
  alignItems: "center",
  [theme.breakpoints.down("md")]: {
    flexDirection: "column",
    alignItems: "flex-start"
  }
}));

export const ItemContent = styled(Box)(() => ({
  display: "flex"
}));

export const ItemFooter = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "12px 25px",
  background: theme.palette.green[300_10],
  [theme.breakpoints.down("sm")]: {
    padding: "12px 15px"
  }
}));

export const TokenLink = styled(Link)(({ theme }) => ({
  margin: "0px 4px",
  textTransform: "uppercase",
  borderRadius: "2px",
  padding: "2px 10px",
  backgroundColor: alpha(theme.palette.secondary.light, 0.2),
  color: `${theme.palette.secondary.light} !important`,
  fontSize: "var(--font-size-text-small)",
  lineHeight: "1.5rem",
  fontWeight: "bold",
  display: "inline",
  whiteSpace: "nowrap"
}));

export const Item = styled(Box)(({ theme }) => ({
  textAlign: "left",
  padding: "15px 0px",
  margin: "0px 25px",
  borderBottom: `1px solid ${alpha(theme.palette.common.black, 0.1)}`,
  "&:last-of-type": {
    borderBottom: "none"
  },
  [theme.breakpoints.down("sm")]: {
    margin: "0 15px"
  }
}));

export const WrapToken = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-start",
  flexWrap: "wrap",
  width: "auto",
  [theme.breakpoints.down("md")]: {
    wordBreak: "break-all",
    "& > a": {
      whiteSpace: "unset",
      margin: 0
    }
  }
}));

export const CustomSelect = styled(Select)`
  font-family: var(--font-family-text);
  background: ${(props) => props.theme.palette.background.paper};
  color: ${(props) => props.theme.palette.text.secondary};
  border-radius: 8px;
  border: 1px solid rgba(152, 162, 179, 0.5);
  min-width: 250px;
  height: 35px;
  & > div {
    padding: 7.5px 14px;
    cursor: pointer;
    font-weight: 400;
    text-align: left;
    font-size: 14px;
  }
  & > fieldset {
    top: 0;
    border: none !important;
  }
  & > svg {
    color: ${(props) => props.theme.palette.text.secondary};
    font-size: 20px;
  }
  & .MuiList-root {
    border-radius: 8px;
  }
`;

export const OptionSelect = styled(MenuItem)(({ theme }) => ({
  textAlign: "center",
  alignItems: "center",
  display: "flex",
  padding: "12px 16px",
  justifyContent: "space-between",
  height: "40px",
  cursor: "pointer",
  "&:hover": {
    background: theme.palette.green[200_10]
  }
}));

export const CustomLink = styled(Link)(({ theme }) => ({
  textAlign: "center",
  alignItems: "center",
  display: "flex",
  padding: "12px 16px",
  justifyContent: "space-between",
  height: "40px",
  cursor: "pointer",
  "&:hover": {
    background: theme.palette.green[200_10]
  }
}));
