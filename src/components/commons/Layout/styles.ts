import { styled, Theme, CSSObject, alpha } from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import { Box } from "@mui/material";

const drawerWidth = 260;
const drawerCollaspWidth = 85;

export const Layout = styled(Box)`
  display: flex;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  @media screen and (max-width: 1023px) {
    flex-direction: column;
    height: auto;
  }
  * {
    &::-webkit-scrollbar {
      width: 16px;
    }

    &::-webkit-scrollbar-thumb {
      background: ${props => props.theme.palette.grey["A400"]};
      border-radius: 8px;
      border: 4px solid transparent;
      background-clip: padding-box;
      &:hover {
        background: ${props => props.theme.palette.grey[300]};
        background-clip: padding-box;
      }
      &:active {
        background: ${props => props.theme.palette.grey[400]};
        background-clip: padding-box;
      }
    }
  }
`;

export const BackDrop = styled("div")<{ isShow: number }>`
  position: fixed;
  z-index: 997;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: ${props => alpha(props.theme.palette.common.black, 0.4)};
  display: none;
  @media screen and (max-width: 1023px) {
    display: ${props => (props.isShow ? "block" : "none")};
  }
`;

export const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  minWidth: drawerCollaspWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowY: "unset",
  borderRightWidth: 0,
  [theme.breakpoints.down(theme.breakpoints.values.md)]: {
    width: "100%",
    minWidth: "100%",
    height: "auto",
    boxShadow: theme.shadow.card,
  },
});

export const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowY: "unset",
  width: drawerCollaspWidth,
  borderRightWidth: 0,
  [theme.breakpoints.down(theme.breakpoints.values.md)]: {
    width: "100%",
    height: "auto",
    boxShadow: theme.shadow.card,
  },
});

export const Drawer = styled(MuiDrawer, { shouldForwardProp: prop => prop !== "open" })(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  borderRightWidth: 0,
  boxShadow: theme.shadow.draw,
  zIndex: 20,
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
  [theme.breakpoints.down(theme.breakpoints.values.md)]: {
    width: "100%",
    height: "auto",
    boxShadow: theme.shadow.card,
  },
  "&>div": {
    "&>button": {
      visibility: "hidden",
    },
    "&:hover": {
      "&>button": {
        visibility: "visible",
      },
    },
  },
}));

export const ToggleMenu = styled("button")`
  position: absolute;
  top: 50px;
  right: 0px;
  display: flex;
  justify-content: center;
  align-items: center;
  transform: translateX(50%) translateY(-50%);
  font-size: 18px;
  line-height: 18px;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background-image: ${props => props.theme.palette.gradient[0]};
  border: none;
  color: ${props => props.theme.palette.primary.contrastText};
  cursor: pointer;
  z-index: 1;
  @media screen and (max-width: 1023px) {
    display: none;
  }
`;

export const MainContainer = styled(Box)`
  width: 100%;
`;

export const Main = styled(Box)<{ open: number; sidebar: number }>`
  flex-grow: 1;
  overflow-x: hidden;
  overflow-y: auto;
  width: calc(100vw - ${({ open, sidebar }) => (open ? 461 : 0) + (sidebar ? 260 : 85)}px);
  height: calc(100vh - 61px);
  @media screen and (max-width: 1023px) {
    width: 100vw;
    height: auto;
  }
`;
