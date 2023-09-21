import { Box, styled, Theme, CSSObject, alpha, Drawer as MuiDrawer } from "@mui/material";

export const drawerWidth = 260;
export const drawerWidthTablet = 360;
export const drawerWidthMobile = 240;
export const drawerCollaspWidth = 85;

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
      width: 5px;
      height: 5px;
    }
    &::-webkit-scrollbar-track {
      background: transparent;
    }
    &::-webkit-scrollbar-thumb {
      background: transparent;
    }
    &:hover {
      &::-webkit-scrollbar-thumb {
        background: ${({ theme }) => theme.palette.secondary.light};
      }
      &::-webkit-scrollbar-track {
        background: ${({ theme }) => theme.palette.primary[100]};
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
    height: "120vh",
    width: "100vw",
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
    zIndex: 1302,
    minWidth: 0,
    height: "100vh",
    maxHeight: "fill-available",
    width: drawerWidthTablet
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
    zIndex: 1302,
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
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme)
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme)
  }),
  [theme.breakpoints.down("md")]: {
    height: 0,
    width: drawerWidthTablet
  },
  [theme.breakpoints.down("sm")]: {
    width: drawerWidthMobile
  },
  "&>div": {
    "& > button": {
      visibility: "hidden"
    },
    [theme.breakpoints.down("md")]: {
      border: "none",
      "& > button": {
        visibility: "visible",
        display: open ? "flex" : "none"
      }
    },
    "&:hover": {
      "& > button": {
        transitionDelay: "0s",
        visibility: "visible"
      }
    },
    "&:not(:hover)": {
      "& > button": {
        transitionDelay: "1s"
      }
    }
  }
}));

export const MainContainer = styled(Box)`
  width: 100%;
  overflow-y: scroll;
  overflow-x: hidden;
`;

export const Main = styled(Box)<{ open: number }>(({ theme, open }) => ({
  flexGrow: 1,
  overflowX: "hidden",
  overflowY: "auto",
  width: `calc(100vw - ${drawerCollaspWidth}px)`,
  minHeight: "calc(100vh - 61px)",
  boxSizing: "border-box",
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  ...(open && {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    }),
    width: `calc(100vw - ${drawerWidth}px)`
  }),
  [theme.breakpoints.down("md")]: {
    paddingTop: 80,
    width: "100vw",
    minHeight: "calc(100vh - 136px)",
    height: "auto"
  },
  [theme.breakpoints.down("sm")]: {
    minHeight: "calc(100vh - 263px)"
  }
}));
