import { styled, Theme, CSSObject } from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";

const drawerWidth = 260;
const drawerCollaspWidth = 85;

export const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  minWidth: drawerCollaspWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowY: "unset",
  borderRightWidth: 0,
  [theme.breakpoints.down(1023)]: {
    minWidth: 0,
    width: 0,
    transform: "translateX(-1px)",
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
  [theme.breakpoints.down(1023)]: {
    minWidth: 0,
    width: 0,
    transform: "translateX(-1px)",
  },
});

export const Drawer = styled(MuiDrawer, { shouldForwardProp: prop => prop !== "open" })(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  borderRightWidth: 0,
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
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
  background-image: ${props => props.theme.linearGradientGreen};
  border: none;
  color: #fff;
  cursor: pointer;
  z-index: 1;
  @media screen and (max-width: 1023px) {
    display: none;
  }
`;
