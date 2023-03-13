import { styled, Box, Container, Theme, Button } from "@mui/material";
import { Link } from "react-router-dom";

export const Wrapper = styled(Container)(({ theme }) => ({}));
export const ContentBox = styled(Box)(({ theme }) => ({
  display: "flex",
  background: "#fff",
  height: "calc(100vh - 252px)",
  borderTopLeftRadius: theme.borderRadius,
  borderTopRightRadius: theme.borderRadius,
}));
export const SideBar = styled(Box)(({ theme }) => ({
  borderRight: "1px solid #f6f6f6",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
}));

export const NavItem = styled(Link)(({ theme, active }: { active: boolean; theme?: Theme }) => ({
  textAlign: "left",
  display: "block",
  backgroundColor: active ? "rgba(67, 143, 104, 0.1)" : "#fff",
  color: `${active ? theme?.colorGreenLight : theme?.textColorPale} !important`,
  fontWeight: "bold",
}));

export const StyledUsername = styled(Box)`
  max-width: 200px;
  over-flow: hidden;
  text-overflow: ellipsis;
`;

export const StyledButton = styled(Button)(() => ({
  textTransform: "lowercase",
  padding: 0,
  minWidth: "unset",
  lineHeight: 1,
  fontSize: "0.75rem",
  fontFamily: "var(--font-family-text)",
}));

export const StyledButtonReport = styled(Button)(() => ({ padding: 0 }));
export const StyledButtonClose = styled(Button)(({ theme }) => ({
  border: "1px solid #C8CDD8",
  textTransform: "capitalize",
  fontWeight: "bold",
  color: "#344054",
  fontSize: "1rem",
}));
