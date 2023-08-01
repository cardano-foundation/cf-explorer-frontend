import { styled, Box, Container, alpha, Button } from "@mui/material";
import { Link } from "react-router-dom";

export const Wrapper = styled(Container)(() => ({}));
export const ContentBox = styled(Box)(({ theme }) => ({
  display: "flex",
  background: theme.palette.secondary[0],
  minHeight: "calc(100vh - 252px)",
  borderTopLeftRadius: 10,
  borderTopRightRadius: 10,
  [theme.breakpoints.down("md")]: {
    flexDirection: "column"
  }
}));
export const SideBar = styled(Box)(({ theme }) => ({
  borderRight: `1px solid ${theme.palette.primary[200]}`,
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  width: "20%",
  [theme.breakpoints.down("sm")]: {
    width: "100%"
  },
  [theme.breakpoints.down("md")]: {
    width: "100%"
  }
}));

export const NavItem = styled(Link)<{ active: boolean }>(({ theme, active }) => ({
  textAlign: "left",
  display: "block",
  width: "100%",
  padding: "10px 0",
  margin: "auto",
  backgroundColor: active ? alpha(theme.palette.primary.main, 0.1) : theme.palette.background.paper,
  color: `${active ? theme.palette.primary.main : theme.palette.secondary.light} !important`,
  fontWeight: "bold",
  [theme.breakpoints.down("md")]: {
    display: "none"
  }
}));

export const WrapItemMobile = styled(Box)(({ theme }) => ({
  width: "100%",
  [theme.breakpoints.down("md")]: {
    display: "flex",
    width: "unset",
    backgroundColor: theme.palette.grey["A200"],
    borderRadius: "8px"
  },
  [theme.breakpoints.down("sm")]: {
    width: "100%",
    margin: "0 23px",
    justifyContent: "space-between"
  }
}));

export const NavItemMobile = styled(Link)<{ active: boolean }>(({ theme, active }) => ({
  [theme.breakpoints.down("md")]: {
    display: "block"
  },
  textAlign: "center",
  fontWeight: 700,
  fontSize: "14px",
  lineHeight: "16px",
  display: "none",
  color: `${active ? theme.palette.common.white : theme.palette.secondary.light} !important`,
  backgroundColor: active ? theme.palette.primary.main : theme.palette.grey["A200"],
  padding: "10px 17px",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
  overflow: "hidden",
  [theme.breakpoints.down("sm")]: {
    width: "100%",
    fontSize: "13px",
    padding: "10px 0px"
  }
}));

export const StyledUsername = styled(Box)`
  max-width: 100%;
  padding-left: ${({ theme }) => theme.spacing(1)};
  padding-right: ${({ theme }) => theme.spacing(1)};
  overflow: hidden;
  color: ${({ theme }) => theme.palette.secondary.main};
  text-overflow: ellipsis;
`;

export const StyledButton = styled("span")(({ theme }) => ({
  textTransform: "lowercase",
  cursor: "pointer",
  color: theme.palette.primary.main,
  padding: 0,
  minWidth: "unset",
  lineHeight: 1,
  fontSize: "0.75rem",
  fontFamily: "var(--font-family-text)"
}));

export const StyledButtonReport = styled(Button)(() => ({ padding: 0 }));
export const StyledButtonClose = styled(Button)(({ theme }) => ({
  border: `2px solid ${theme.palette.border.hint} `,
  textTransform: "capitalize",
  fontWeight: "bold",
  color: theme.palette.secondary.main,
  fontSize: "1rem",
  width: "150px",
  height: "44px",
  borderRadius: "8px",
  ":hover": {
    border: `2px solid ${theme.palette.border.hint} `
  }
}));

export const ModalTitle = styled("h3")`
  font-family: var(--font-family-title);
  margin-top: 0px;
`;

export const MissingItemWrapper = styled(Box)(({ theme }) => ({
  display: "none",
  [theme.breakpoints.up("md")]: {
    display: "block"
  }
}));
