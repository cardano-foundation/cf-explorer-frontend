import { Box, List, ListItemText, styled, Theme } from "@mui/material";
import { SystemStyleObject } from "@mui/system";

export const SidebarMenuContainer = styled(Box)(({ theme }) => ({
  height: "calc(100% - 60px)",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  [theme.breakpoints.down("sm")]: {
    height: "calc(100% - 120px)"
  }
}));

export const Menu = styled(List)(({ theme }) => ({
  maxHeight: "calc(100vh - 181px)",
  overflowY: "auto",
  overflowX: "hidden",
  marginBottom: "5px",
  "&::-webkit-scrollbar": {
    width: "0px",
    height: "0px"
  },
  [theme.breakpoints.down("md")]: {
    maxHeight: "unset"
  },
  [theme.breakpoints.down("sm")]: {
    "& ul > a": {
      paddingLeft: "59px"
    }
  }
}));

export const itemStyle = (theme: Theme, sidebar: boolean): SystemStyleObject<Theme> => ({
  minHeight: 48,
  padding: `8px ${sidebar ? 20 : 8}px 8px 30px`,
  cursor: "pointer",
  position: "relative",
  justifyContent: sidebar ? "initial" : "center",
  [theme.breakpoints.down("md")]: {
    padding: "8px 20px",
    marginBottom: 0
  }
});

export const MenuIcon = styled("img")<{ iconOnly?: number; active?: number; text?: number; disable?: number }>`
  width: 24px;
  height: 24px;
  min-width: 24px;
  margin-right: ${(props) => (props.iconOnly ? 0 : 15)}px;
  filter: ${(props) => (props.active ? `brightness(5)` : props.theme.palette.secondary.light)};
  ${({ theme }) => theme.breakpoints.down("md")} {
    margin-right: 15px;
  }
`;
// filter: ${(props) => (props.active ? (props.text ? `none` : `brightness(5)`) : `grayscale(1)`)};

export const SubMenu = styled(List)<{ isActive?: number }>`
  margin-left: 0px;
`;

export const MenuText = styled(ListItemText)<{ open?: number; active?: number; text?: number; disable?: number }>`
  opacity: ${(props) => (props.open ? 1 : 0)};
  width: ${(props) => (props.open ? "unset" : 0)};
  * {
    font-weight: inherit !important;
    font-family: var(--font-family-title) !important;
    color: ${({ active, text, disable, theme }) =>
      active
        ? text
          ? theme.palette.secondary[0]
          : theme.palette.secondary[0]
        : disable
        ? theme.palette.secondary[600]
        : theme.palette.secondary.light};
    white-space: break-spaces;
    width: 165px;
  }
  ${({ theme }) => theme.breakpoints.down("md")} {
    opacity: 1;
    width: unset;
  }
`;

export const SubMenuText = styled(MenuText)`
  * {
    color: ${({ active, theme }) => (active ? theme.palette.secondary.main : theme.palette.secondary.light)};
  }
`;
// font-weight: var(--font-weight-normal) !important;

// &:hover {
//   font-weight: ${({ active }) => (active ? "var(--font-weight-normal) !important" : "bold !important")};
// }
export const FooterMenuContainer = styled(Box)(({ theme }) => ({
  display: "block",
  [theme.breakpoints.down("md")]: {
    display: "none"
  }
}));

export const IconMenu = styled(Box)(() => ({
  position: "absolute",
  zIndex: 10,
  top: "55%",
  left: "210px",
  transform: "translate(0, -50%)"
}));
