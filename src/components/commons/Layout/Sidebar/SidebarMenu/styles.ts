import { Box, Collapse, List, ListItemText, styled, Theme } from "@mui/material";
import { alpha, SystemStyleObject } from "@mui/system";

export const StyledCollapse = styled(Collapse)`
  @media screen and (max-width: 1023px) {
    max-height: calc(100vh - 80px);
    overflow-x: hidden;
    overflow-y: auto;
  }
`;

export const Menu = styled(List)<{ open: number }>`
  max-height: calc(100vh - 181px);
  overflow-y: auto;
  overflow-x: hidden;
  margin-bottom: 5px;
  @media screen and (max-width: 1023px) {
    max-height: unset;
  }
`;

export const itemStyle = (theme: Theme, sidebar: boolean): SystemStyleObject<Theme> => ({
  minHeight: 48,
  padding: `8px ${sidebar ? 20 : 8}px 8px 30px`,
  cursor: "pointer",
  position: "relative",
  marginBottom: "5px",
  justifyContent: sidebar ? "initial" : "center",
  [theme.breakpoints.down(theme.breakpoints.values.md)]: {
    padding: "8px 20px 8px 30px",
    marginBottom: 0,
  },
});

export const MenuIcon = styled("img")<{ iconOnly?: number; active?: number; text?: number; disable?: number }>`
  width: 24px;
  height: 24px;
  min-width: 24px;
  margin-right: ${props => (props.iconOnly ? 0 : 15)}px;
  filter: ${props => (props.active ? (props.text ? `none` : `brightness(5)`) : `grayscale(1)`)};
  @media screen and (max-width: 1023px) {
    margin-right: 15px;
  }
`;

export const SubMenu = styled(List)<{ isActive?: number }>`
  margin-left: 0px;
`;

export const MenuText = styled(ListItemText)<{ open?: number; active?: number; text?: number; disable?: number }>`
  opacity: ${props => (props.open ? 1 : 0)};
  width: ${props => (props.open ? "unset" : 0)};
  * {
    font-family: var(--font-family-title) !important;
    font-weight: var(--font-weight-bold) !important;
    color: ${({ active, text, disable, theme }) =>
      active
        ? text
          ? theme.palette.text.primary
          : theme.palette.grey[400]
        : disable
        ? theme.palette.text.disabled
        : theme.palette.grey[400]};
    white-space: break-spaces;
    width: 165px;
  }
  @media screen and (max-width: 1023px) {
    opacity: 1;
    width: unset;
  }
`;

export const SubMenuText = styled(MenuText)`
  * {
    font-weight: var(--font-weight-normal) !important;
    color: ${({ active, theme }) => (active ? theme.palette.primary.contrastText : theme.palette.grey[400])};
  }
`;

export const NavbarMenuBottom = styled("div")`
  display: none;
  @media screen and (max-width: 1023px) {
    display: flex;
    align-items: center;
    gap: 10px 20px;
    flex-wrap: wrap;
    padding: 0px 20px 10px;
    margin-bottom: 10px;
  }
`;

export const IconMenu = styled(Box)(({ theme }) => ({
  position: "absolute",
  zIndex: 10,
  top: "50%",
  left: "210px",
  transform: "translate(0, -50%)",
}));
