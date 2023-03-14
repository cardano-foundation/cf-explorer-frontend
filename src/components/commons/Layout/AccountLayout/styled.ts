import { styled, Box, Container, alpha } from "@mui/material";
import { Link } from "react-router-dom";

export const Wrapper = styled(Container)(({ theme }) => ({}));
export const ContentBox = styled(Box)(({ theme }) => ({
  display: "flex",
  background: theme.palette.background.paper,
  height: "calc(100vh - 252px)",
  borderTopLeftRadius: 10,
  borderTopRightRadius: 10,
}));
export const SideBar = styled(Box)(({ theme }) => ({
  borderRight: `1px solid ${theme.palette.grey[50]}`,
}));

export const NavItem = styled(Link)<{ active: boolean }>(({ theme, active }) => ({
  textAlign: "left",
  display: "block",
  backgroundColor: active ? alpha(theme.palette.primary.main, 0.1) : theme.palette.background.paper,
  color: `${active ? theme.palette.primary.main : theme.palette.grey[400]} !important`,
  fontWeight: "bold",
}));

export const StyledUsername = styled(Box)`
  max-width: 200px;
  over-flow: hidden;
  text-overflow: ellipsis;
`;
