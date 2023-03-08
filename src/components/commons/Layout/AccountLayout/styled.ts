import { styled, Box, Container } from "@mui/material";
import { Link } from "react-router-dom";

export const Wrapper = styled(Container)(({ theme }) => ({}));
export const ContentBox = styled(Box)(({ theme }) => ({
  display: "flex",
  background: theme.boxBackgroundColor,
  height: "calc(100vh - 252px)",
  borderTopLeftRadius: 10,
  borderTopRightRadius: 10,
}));
export const SideBar = styled(Box)(({ theme }) => ({
  borderRight: `1px solid ${theme.gray_8}`,
}));

export const NavItem = styled(Link)<{ active: boolean }>(({ theme, active }) => ({
  textAlign: "left",
  display: "block",
  backgroundColor: active ? theme.green_2_10 : theme.boxBackgroundColor,
  color: `${active ? theme.green_2 : theme.textColorLight} !important`,
  fontWeight: "bold",
}));

export const StyledUsername = styled(Box)`
  max-width: 200px;
  over-flow: hidden;
  text-overflow: ellipsis;
`;
