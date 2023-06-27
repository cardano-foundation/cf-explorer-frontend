import { Box, styled, Theme, CSSObject, alpha, Drawer as MuiDrawer } from "@mui/material";

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
  [theme.breakpoints.down("md")]: {
    zIndex: 1302,
    minWidth: 0,
    height: "100vh",
    maxHeight: "fill-available",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  [theme.breakpoints.down("sm")]: {
    width: drawerWidthMobile
  }
});

export const closedMixin = (theme: Theme): CSSObject => ({
  overflowY: "unset",
  width: drawerCollaspWidth,
  [theme.breakpoints.down("md")]: {
    zIndex: 1302,
    width: 0,
    height: "100vh",
    maxHeight: "fill-available",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
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
    height: 0
  },
  [theme.breakpoints.down("sm")]: {
    width: drawerWidthMobile
  },
  "&>div": {
    "& > button": {
      visibility: "hidden",
    },
    "&:hover": {
      "& > button": {
        transitionDelay: "0s",
        visibility: "visible",
      },
    },
    "&:not(:hover)": {
      "& > button": {
        transitionDelay: "1s",
      },
    },
  }
}));

export const MainContainer = styled(Box)`
  width: 100%;
  overflow-y: scroll;
  overflow-x: hidden;
`;

export const Main = styled(Box)<{ open: number; sidebar: number }>(({ theme, sidebar, open }) => ({
  flexGrow: 1,
  overflowX: "hidden",
  overflowY: "auto",
  width: `calc(100vw - ${(open ? 461 : 0) + (sidebar ? 280 : 105)}px)`,
  minHeight: "calc(100vh - 61px)",
  [theme.breakpoints.down("lg")]: {
    width: `calc(100vw - ${sidebar ? 280 : 105}px)`
  },
  [theme.breakpoints.down("md")]: {
    paddingTop: 80,
    width: "100vw",
    height: "auto"
  }
}));
