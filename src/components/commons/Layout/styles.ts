import { styled, Theme, CSSObject } from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import { Box } from "@mui/material";

const drawerWidth = 260;
const drawerCollaspWidth = 85;

export const Layout = styled(Box)`
  display: flex;
  @media screen and (max-width: 1023px) {
    flex-direction: column;
  }
`;

export const BackDrop = styled("div")<{ isShow: boolean }>`
  position: fixed;
  z-index: 997;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: #0006;
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
  [theme.breakpoints.down(1023)]: {
    width: "100%",
    minWidth: "100%",
    height: "auto",
    boxShadow: theme.shadowRaised,
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
    width: "100%",
    height: "auto",
    boxShadow: theme.shadowRaised,
  },
});

export const Drawer = styled(MuiDrawer, { shouldForwardProp: prop => prop !== "open" })(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  borderRightWidth: 0,
  boxShadow: "0px 1px 20px rgba(0, 0, 0, 0.05)",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
  [theme.breakpoints.down(1023)]: {
    width: "100%",
    height: "auto",
    boxShadow: theme.shadowRaised,
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
  background-image: ${props => props.theme.linearGradientGreen};
  border: none;
  color: #fff;
  cursor: pointer;
  z-index: 1;
  @media screen and (max-width: 1023px) {
    display: none;
  }
`;

export const MainContainer = styled(Box)`
  width: 100%;
`;

export const Main = styled(Box)<{ onDetailView: boolean; sidebar: boolean }>`
  flex-grow: 1;
  overflow: hidden;
  max-width: calc(100vw - ${({ onDetailView, sidebar }) => (onDetailView ? 445 : 0) + (sidebar ? 260 : 85) + 16}px);
  @media screen and (max-width: 1023px) {
    max-width: 100vw;
  }
`;
