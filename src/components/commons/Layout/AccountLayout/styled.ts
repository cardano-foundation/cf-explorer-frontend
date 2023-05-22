import { styled, Box, Container, alpha, Button } from "@mui/material";
import { Link } from "react-router-dom";

export const Wrapper = styled(Container)(({ theme }) => ({}));
export const ContentBox = styled(Box)(({ theme }) => ({
  display: "flex",
  background: theme.palette.background.paper,
  minHeight: "calc(100vh - 252px)",
  borderTopLeftRadius: 10,
  borderTopRightRadius: 10,
  [theme.breakpoints.down("md")]: {
    flexDirection: "column"
  }
}));
export const SideBar = styled(Box)(({ theme }) => ({
  borderRight: `1px solid ${theme.palette.grey[50]}`,
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between"
}));

export const NavItem = styled(Link)<{ active: boolean }>(({ theme, active }) => ({
  textAlign: "left",
  display: "block",
  backgroundColor: active ? alpha(theme.palette.primary.main, 0.1) : theme.palette.background.paper,
  color: `${active ? theme.palette.primary.main : theme.palette.grey[400]} !important`,
  fontWeight: "bold"
}));

export const NavItemMobile = styled(Link)<{ active: boolean, smallWidth: number }>(({ theme, active, smallWidth }) => ({
  textAlign: "center",
  fontWeight: 700,
  fontSize: "14px",
  lineHeight: "16px",
  color: `${active ? theme.palette.common.white : theme.palette.grey[400]} !important`,
  backgroundColor: active ? theme.palette.primary.main : "#E7E8EA",
  padding: "10px 17px",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
  overflow: "hidden",
  [theme.breakpoints.down("sm")]: {
    padding: smallWidth ? "10px 13px" : "10px 19px",
    fontSize: "13px",
  }
}));

export const StyledUsername = styled(Box)`
  max- width: 200px;
padding - left: ${({ theme }) => theme.spacing(1)};
padding - right: ${({ theme }) => theme.spacing(1)};
overflow: hidden;
text - overflow: ellipsis;
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
  color: "#344054",
  fontSize: "1rem",
  width: "150px",
  height: "44px",
  borderRadius: "8px",
  ":hover": {
    border: `2px solid ${theme.palette.border.hint} `
  }
}));

export const ModalTitle = styled("h3")`
font - family: var(--font - family - title);
margin - top: 0px;
`;
