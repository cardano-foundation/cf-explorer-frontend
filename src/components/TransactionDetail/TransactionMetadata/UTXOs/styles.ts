import { Select, alpha, Box, styled } from "@mui/material";
import { Link } from "react-router-dom";

export const Img = styled("img")(({ theme }) => ({
  paddingRight: "10px",
  width: "35px",
  [theme.breakpoints.down("sm")]: {
    width: 30,
    paddingRight: "8px"
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

export const WrapInfo = styled(Box)(({ theme }) => ({
  display: "flex",
  width: "100%",
  alignItems: "center",
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column"
  }
}));

export const WrapLeftSide = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  paddingTop: "5px",
  flexGrow: 1,
  [theme.breakpoints.down("sm")]: {
    alignItems: "baseline",
    width: "100%"
  }
}));

export const WrapRightSide = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "end",
  [theme.breakpoints.down("sm")]: {
    alignItems: "baseline",
    marginTop: "18px",
    marginLeft: "-45px",
    width: "100%"
  }
}));

export const WrapIcon = styled(Box)<{ type: string }>(({ theme, type }) => ({
  display: "flex",
  alignItems: "center",
  [theme.breakpoints.down("sm")]: {
    height: type === "up" ? 34 : 100
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

export const ItemContent = styled(Box)(() => ({
  display: "flex",
  overflowX: "auto",
  overflowY: "hidden",
  justifyContent: "space-between"
}));

export const WrapTokenLink = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  [theme.breakpoints.down("sm")]: {
    width: "100%"
  }
}));

export const AmountHeader = styled(Box)(({ theme }) => ({
  [theme.breakpoints.down("sm")]: {
    display: "none"
  }
}));

export const AmountMobile = styled(Box)(({ theme }) => ({
  display: "none",
  color: theme.palette.secondary.light,
  marginRight: theme.spacing(1),
  fontWeight: "bold",
  [theme.breakpoints.down("sm")]: {
    display: "block"
  }
}));

export const WrapTokenDropdown = styled(Box)(({ theme }) => ({
  marginTop: "16px",
  [theme.breakpoints.down("sm")]: {
    width: "100%"
  }
}));

export const ItemFooter = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "12px 25px",
  background: theme.palette.primary[200],
  borderEndEndRadius: theme.spacing(1),
  borderEndStartRadius: theme.spacing(1),
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
  borderBottom: `1px solid ${theme.isDark ? theme.palette.secondary[700] : theme.palette.primary[200]}`,
  "&:last-of-type": {
    borderBottom: "none"
  },
  [theme.breakpoints.down("sm")]: {
    margin: "0 5px"
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

export const EllipsisContainer = styled(Box)<{ isFailed?: boolean }>`
  font-weight: bold;
  color: ${({ theme, isFailed }) => (isFailed ? theme.palette.secondary[600] : theme.palette.primary.main)};
  max-width: 58vw;
  ${({ theme }) => theme.breakpoints.up(420)} {
    max-width: 68vw;
  }
  ${({ theme }) => theme.breakpoints.up("sm")} {
    max-width: 48vw;
  }
  ${({ theme }) => theme.breakpoints.up("md")} {
    max-width: 35vw;
  }
  ${({ theme }) => theme.breakpoints.up("lg")} {
    max-width: 54vw;
  }
`;
