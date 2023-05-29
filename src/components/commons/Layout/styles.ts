import { styled, Theme, CSSObject, alpha } from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import { Box } from "@mui/material";

const drawerWidth = 260;
const drawerWidthMobile = 240;
const drawerCollaspWidth = 85;

export const Layout = styled(Box)<{ sidebar: number }>`
  display: flex;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  ${({ theme }) => theme.breakpoints.down("md")} {
    flex-direction: column;
    height: ${({ sidebar }) => (sidebar ? "100vh" : "auto")};
    max-height: ${({ sidebar }) => (sidebar ? "fill-avalible" : "auto")};
  }
  * {
    &::-webkit-scrollbar {
      width: 16px;
    }

    &::-webkit-scrollbar-thumb {
      background: ${(props) => props.theme.palette.grey["A400"]};
      border-radius: 8px;
      border: 4px solid transparent;
      background-clip: padding-box;
      &:hover {
        background: ${(props) => props.theme.palette.grey[300]};
        background-clip: padding-box;
      }
      &:active {
        background: ${(props) => props.theme.palette.grey[400]};
        background-clip: padding-box;
      }
    }
    ${({ theme }) => theme.breakpoints.down("sm")} {
      &::-webkit-scrollbar {
        display: none !important;
      }
    }
  }
`;

export const BackDrop = styled("div", { shouldForwardProp: (prop) => prop !== "isShow" })<{ isShow: number }>(
  ({ theme, isShow }) => ({
    position: "fixed",
    zIndex: 1301,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    display: "none",
    [theme.breakpoints.down("md")]: {
      background: alpha(theme.palette.common.black, 0.4),
      display: isShow ? "block" : "none"
    },
    [theme.breakpoints.up("md")]: {
      background: "transparent",
      display: "none"
    }
  })
);

export const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  minWidth: drawerCollaspWidth,
  overflowY: "unset",
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen
  }),
  [theme.breakpoints.down("md")]: {
    minWidth: 0,
    height: "100vh",
    maxHeight: "fill-available"
  },
  [theme.breakpoints.down("sm")]: {
    width: drawerWidthMobile
  }
});

export const closedMixin = (theme: Theme): CSSObject => ({
  overflowY: "unset",
  width: drawerCollaspWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  [theme.breakpoints.down("md")]: {
    width: 0,
    height: "100vh",
    maxHeight: "fill-available"
  }
});

export const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== "open" })(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  borderRightWidth: 0,
  boxShadow: theme.shadow.draw,
  [theme.breakpoints.down("md")]: {
    zIndex: 1302,
  },
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme)
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme)
  }),
  [theme.breakpoints.down("md")]: {
    height: 0
  },
  [theme.breakpoints.down("sm")]: {
    width: drawerWidthMobile
  },
  "&>div": {
    "&>button": {
      visibility: "hidden"
    },
    "&:hover": {
      "&>button": {
        visibility: "visible"
      }
    }
  }
}));

export const ToggleMenu = styled("button")`
  position: absolute;
  top: 50px;
  right: 0px;
  transform: translateX(50%) translateY(-50%);
  width: 22px;
  height: 22px;
  padding: 0;
  border-radius: 50%;
  background-image: ${(props) => props.theme.palette.gradient[0]};
  border: none;
  color: ${(props) => props.theme.palette.primary.contrastText};
  cursor: pointer;
  z-index: 1;
  ${({ theme }) => theme.breakpoints.down("md")} {
    display: none;
  }
`;

export const MainContainer = styled(Box)`
  width: 100%;
`;

export const Main = styled(Box)<{ open: number; sidebar: number }>(({ theme, sidebar, open }) => ({
  flexGrow: 1,
  overflowX: "hidden",
  overflowY: "auto",
  width: `calc(100vw - ${(open ? 461 : 0) + (sidebar ? 260 : 85)}px)`,
  height: "calc(100vh - 61px)",
  [theme.breakpoints.down("md")]: {
    paddingTop: 80,
    width: "100vw",
    height: "auto"
  }
}));

export const ArrowCollapse = styled("span")`
  z-index: 100;
  width: 22px;
  height: 22px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  line-height: 14px;
`;
