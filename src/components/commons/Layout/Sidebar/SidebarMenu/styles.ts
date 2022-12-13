import { List, ListItemText, styled } from "@mui/material";

export const Menu = styled(List)`
  max-height: calc(100vh - 165px);
  overflow-y: auto;
  overflow-x: hidden;
  margin-bottom: 5px;
`;

export const MenuIcon = styled("img")<{ iconOnly?: boolean; active?: boolean; textOnly?: boolean }>`
  width: 24px;
  height: 24px;
  margin-right: ${props => (props.iconOnly ? 0 : 15)}px;
  filter: ${props => (props.active ? (props.textOnly ? `none` : `brightness(5)`) : `grayscale(1)`)};
`;

export const SubMenu = styled(List)<{ isActive?: boolean }>`
  margin-left: 0px;
`;

export const MenuText = styled(ListItemText)<{ open?: boolean; active?: boolean; textOnly?: boolean }>`
  opacity: ${props => (props.open ? 1 : 0)};
  * {
    font-family: var(--font-family-title) !important;
    font-weight: var(--font-weight-bold) !important;
    color: ${props => (props.active ? props.theme.textColor : props.theme.textColorPale)};
    color: ${props =>
      props.active
        ? props.textOnly
          ? props.theme.textColor
          : props.theme.textColorReverse
        : props.theme.textColorPale};
    white-space: break-spaces;
    width: 165px;
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
