import { alpha, Box, styled } from "@mui/material";
import { Link } from "react-router-dom";

export const Wrapper = styled(Box)<{ type?: "input" | "output" }>(({ theme, type }) => ({
  textAlign: "left",
  background: theme.palette.secondary[0],
  border: `1px solid ${theme.isDark ? theme.palette.secondary[700] : theme.palette.primary[200]} `,
  borderRadius: theme.spacing(2),
  borderEndEndRadius: type === "output" ? 0 : theme.spacing(2),
  borderEndStartRadius: type === "output" ? 0 : theme.spacing(2)
}));

export const Img = styled("img")(() => ({
  paddingRight: "10px",
  width: "35px"
}));

export const TokenLink = styled(Link)(({ theme }) => ({
  margin: "0px 4px",
  textTransform: "uppercase",
  borderRadius: "2px",
  padding: "2px 10px",
  backgroundColor: alpha(theme.palette.secondary.light, 0.2),
  color: theme.palette.secondary.light,
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
  borderBottom: `1px solid ${theme.isDark ? theme.palette.secondary[700] : theme.palette.primary[200]}`,
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
    wordBreak: "break-word",
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
  borderBottom: `1px solid ${theme.isDark ? theme.palette.secondary[700] : theme.palette.primary[200]}`,
  [theme.breakpoints.down("sm")]: {
    margin: "0 15px"
  }
}));
export const BoxHeaderTop = styled(Box)(({ theme }) => ({
  color: theme.palette.secondary.main,
  fontSize: "1rem",
  lineHeight: "19px",
  marginBottom: "2px"
}));
export const BoxHeaderBottom = styled(Box)(({ theme }) => ({
  color: theme.palette.secondary.light,
  display: "flex",
  justifyContent: "space-between"
}));

export const ItemFooter = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "12px 25px",
  background: theme.palette.primary[200],
  borderEndEndRadius: theme.spacing(2),
  borderEndStartRadius: theme.spacing(2),
  [theme.breakpoints.down("sm")]: {
    padding: "12px 15px"
  }
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
