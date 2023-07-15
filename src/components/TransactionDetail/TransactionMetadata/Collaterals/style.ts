import { alpha, Box, styled } from "@mui/material";
import { Link } from "react-router-dom";

export const Wrapper = styled(Box)`
  text-align: left;
  background: ${(props) => props.theme.palette.common.white};
`;

export const Img = styled("img")(() => ({
  paddingRight: "10px",
  width: "35px"
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
  whiteSpace: "nowrap"
}));

export const Item = styled(Box)(({ theme }) => ({
  textAlign: "left",
  padding: "15px 0px 25px 0px !important",
  margin: "0px 25px",
  borderBottom: `1px solid ${alpha(theme.palette.common.black, 0.1)}`,
  "&:last-of-type": {
    borderBottom: "none"
  },
  [theme.breakpoints.down("sm")]: {
    margin: "0 15px"
  }
}));
export const ItemBox = styled(Box)(() => ({
  "> *:last-child > div": {
    padding: "10px 0 0",
    borderBottom: "none"
  }
}));

export const ItemContent = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  [theme.breakpoints.down("md")]: {
    flexDirection: "column",
    alignItems: "flex-start"
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
export const BoxHeaderTop = styled(Box)(({ theme }) => ({
  color: theme.palette.text.dark,
  fontSize: "1rem",
  lineHeight: "19px",
  marginBottom: "2px"
}));
export const BoxHeaderBottom = styled(Box)(({ theme }) => ({
  color: theme.palette.grey[500],
  display: "flex",
  justifyContent: "space-between"
}));

export const ItemFooter = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "12px 25px",
  background: theme.palette.green[800_10],
  [theme.breakpoints.down("sm")]: {
    padding: "12px 15px"
  }
}));
