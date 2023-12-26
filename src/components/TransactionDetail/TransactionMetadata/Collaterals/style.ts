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

export const Img = styled("img")(({ theme }) => ({
  paddingRight: "10px",
  width: "35px",
  [theme.breakpoints.down("md")]: {
    width: 30,
    paddingRight: "8px"
  }
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
    margin: "0 5px"
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
  alignItems: "flex-start",
  [theme.breakpoints.down(430)]: {
    overflow: "hidden"
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

export const WrapContent = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  width: "100%",
  gap: "10px",
  justifyContent: "space-between",
  overflowX: "auto",
  overflowY: "hidden",
  [theme.breakpoints.down("md")]: {
    gap: 0
  }
}));

export const WrapAmountHeader = styled(Box)(({ theme }) => ({
  [theme.breakpoints.down("sm")]: {
    display: "none"
  }
}));

export const StyleAmount = styled(Box)(({ theme }) => ({
  textWrap: "nowrap",
  [theme.breakpoints.down("sm")]: {
    display: "flex",
    gap: 20,
    marginTop: 20,
    marginLeft: "-30px"
  }
}));

export const TitleAmountMobile = styled(Box)(({ theme }) => ({
  display: "none",
  [theme.breakpoints.down("sm")]: {
    display: "inline-block",
    marginLeft: 5
  }
}));

export const StyledContainerInfo = styled(Box)(({ theme }) => ({
  display: "flex",
  flex: 1,
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column"
  }
}));

export const EllipsisContainer = styled(Box)<{ isFailed?: boolean }>`
  font-weight: bold;
  color: ${({ theme, isFailed }) => (isFailed ? theme.palette.secondary[600] : theme.palette.primary.main)};
  max-width: 50vw;
  ${({ theme }) => theme.breakpoints.up(420)} {
    max-width: 66vw;
  }
  ${({ theme }) => theme.breakpoints.up("sm")} {
    max-width: 57vw;
  }
  ${({ theme }) => theme.breakpoints.up("md")} {
    max-width: 47vw;
  }
  ${({ theme }) => theme.breakpoints.up("lg")} {
    max-width: 55vw;
  }
`;

export const RowItemContent = styled(Box)(() => ({
  display: "flex",
  justifyContent: "flex-start",
  alignItems: "baseline",
  width: "100%"
}));
