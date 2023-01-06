import { styled, Box, Container, Theme } from "@mui/material";
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
}));

export const NavItem = styled(Link)(({ theme, active }: { active: boolean; theme?: Theme }) => ({
  textAlign: "left",
  display: "block",
  backgroundColor: active ? "rgba(67, 143, 104, 0.1)" : "#fff",
  color: `${active ? theme?.colorGreenLight : theme?.textColorPale} !important`,
  fontWeight: "bold",
}));
