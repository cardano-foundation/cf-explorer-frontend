import { List, ListItemText, styled } from "@mui/material";

export const Menu = styled(List)`
  max-height: calc(100vh - 105px);
  overflow-y: auto;
  overflow-x: hidden;
  @media screen and (max-width: 1023px) {
    color: inherit;
  }
`;

export const MenuIcon = styled("img")<{ iconOnly?: boolean; active?: boolean; textOnly?: boolean }>`
  width: 24px;
  height: 24px;
  margin-right: ${props => (props.iconOnly ? 0 : 15)}px;
  filter: ${props => (props.active ? (props.textOnly ? `none` : `brightness(5)`) : `grayscale(1)`)};
`;

export const SubMenu = styled(List)<{ isActive?: boolean }>`
  margin-left: 39px;
`;

export const MenuText = styled(ListItemText)<{ open?: boolean; active?: boolean; textOnly?: boolean }>`
  opacity: ${props => (props.open ? 1 : 0)};
  * {
    font-family: var(--font-family-title);
    ${props => (props.textOnly && props.active ? `font-weight: var(--font-weight-bold);` : ``)}
    color: ${props => (!props.textOnly && props.active ? props.theme.textColorReverse : props.theme.textColor)};
    white-space: break-spaces;
  }
`;
