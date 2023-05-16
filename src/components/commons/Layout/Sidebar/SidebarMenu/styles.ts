import { Box, Collapse, List, ListItemText, styled, Theme } from "@mui/material";
import { SystemStyleObject } from "@mui/system";

export const StyledCollapse = styled(Collapse)`
  ${({ theme }) => theme.breakpoints.down("md")} {
    max-height: calc(100vh - 80px);
    overflow-x: hidden;
    overflow-y: auto;
  }
`;

export const Menu = styled(List)<{ open: number }>(({ theme, open }) => ({
  maxHeight: `calc(100vh - 181px)`,
  "@media screen and (max-device-width: 1200px) and (orientation: portrait), screen and (max-device-height: 1200px) and (orientation: landscape)":
    {
      maxHeight: "calc(100vh - 240px)"
    },
  overflowY: "auto",
  overflowX: "hidden",
  marginBottom: "5px",
  "&::-webkit-scrollbar": {
    display: "none"
  },
  "&:hover::-webkit-scrollbar": {
    display: "block"
  },
  [theme.breakpoints.down("md")]: {
    maxHeight: "unset"
  },
  [theme.breakpoints.down("sm")]: {
    "& > div, & > a": {
      paddingLeft: "16px"
    },
    "& ul > a": {
      paddingLeft: "40px"
    }
  }
}));

export const itemStyle = (theme: Theme, sidebar: boolean): SystemStyleObject<Theme> => ({
  minHeight: 48,
  padding: `8px ${sidebar ? 20 : 8}px 8px 30px`,
  cursor: "pointer",
  position: "relative",
  marginBottom: "5px",
  justifyContent: sidebar ? "initial" : "center",
  [theme.breakpoints.down("md")]: {
    padding: "8px 20px 8px 30px",
    marginBottom: 0
  }
});

export const MenuIcon = styled("img")<{ iconOnly?: number; active?: number; text?: number; disable?: number }>`
  width: 24px;
  height: 24px;
  min-width: 24px;
  margin-right: ${(props) => (props.iconOnly ? 0 : 15)}px;
  filter: ${(props) => (props.active ? (props.text ? `none` : `brightness(5)`) : `grayscale(1)`)};
  ${({ theme }) => theme.breakpoints.down("md")} {
    margin-right: 15px;
  }
`;

export const SubMenu = styled(List)<{ isActive?: number }>`
  margin-left: 0px;
`;

export const MenuText = styled(ListItemText)<{ open?: number; active?: number; text?: number; disable?: number }>`
  opacity: ${(props) => (props.open ? 1 : 0)};
  width: ${(props) => (props.open ? "unset" : 0)};
  * {
    font-family: var(--font-family-title) !important;
    font-weight: var(--font-weight-bold) !important;
    color: ${({ active, text, disable, theme }) =>
      active
        ? text
          ? theme.palette.text.primary
          : theme.palette.common.white
        : disable
        ? theme.palette.text.disabled
        : theme.palette.grey[400]};
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
    font-weight: var(--font-weight-normal) !important;
    color: ${({ active, theme }) => (active ? theme.palette.primary.contrastText : theme.palette.grey[400])};
  }
`;

export const NavbarMenuBottom = styled("div")`
  display: none;
  ${({ theme }) => theme.breakpoints.down("md")} {
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
  transform: "translate(0, -50%)"
}));

export const WrapNetwork = styled(Box)`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 16px;
  & > div {
    width: 100%;
  }
  margin-top: auto;
  @media screen and (max-height: 780px) {
    position: relative !important;
  }
`;
