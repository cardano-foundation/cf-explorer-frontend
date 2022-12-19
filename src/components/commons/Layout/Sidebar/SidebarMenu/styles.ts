import { Collapse, List, ListItemText, styled, Theme } from "@mui/material";
import { SystemStyleObject } from "@mui/system";

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
  marginBottom: "5px",
  justifyContent: sidebar ? "initial" : "center",
  [theme.breakpoints.down(1023)]: {
    padding: "8px 20px 8px 30px",
    marginBottom: 0,
  },
});

export const MenuIcon = styled("img")<{ iconOnly?: number; active?: number; text?: number }>`
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

export const MenuText = styled(ListItemText)<{ open?: number; active?: number; text?: number }>`
  opacity: ${props => (props.open ? 1 : 0)};
  width: ${props => (props.open ? "unset" : 0)};
  * {
    font-family: var(--font-family-title) !important;
    font-weight: var(--font-weight-bold) !important;
    color: ${props => (props.active ? props.theme.textColor : props.theme.textColorPale)};
    color: ${props =>
      props.active
        ? props.text
          ? props.theme.textColor
          : props.theme.textColorReverse
        : props.theme.textColorPale};
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
    color: ${props => (props.active ? props.theme.textColorReverse : props.theme.textColorPale)};
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
